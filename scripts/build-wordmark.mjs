import opentype from "opentype.js";
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONT_PATH = process.env.WORDMARK_FONT_PATH ?? "/tmp/fonts/Geist-SemiBold.ttf";
const SIZE = 100; // production size, 1 em = 100 units
const TRACKING = -0.035; // em, applied between every glyph pair

// Mark geometry — must match brand/punkto-mark.svg exactly (viewBox 0 0 45 65).
const MARK = {
  body: { x: 0, y: 1, w: 13, h: 64 },
  bowl: { cx: 27, cy: 17, r: 17 },
  height: 65, // top of bowl (y=0) to bottom of body (y=65)
};

function layoutGlyphs(font, text, scale, startX = 0) {
  const glyphs = font.stringToGlyphs(text);
  const path = new opentype.Path();
  let x = startX;
  for (let i = 0; i < glyphs.length; i++) {
    const g = glyphs[i];
    const gp = g.getPath(x, 0, SIZE);
    path.extend(gp);
    x += g.advanceWidth * scale;
    if (i < glyphs.length - 1) {
      x += font.getKerningValue(g, glyphs[i + 1]) * scale;
      x += SIZE * TRACKING;
    }
  }
  return { path, endX: x };
}

// opentype.js's own Path.toPathData() minifier corrupts output (emits NaN)
// once many glyphs are combined via extend() — serialize commands ourselves
// instead of relying on it.
function round2(n) {
  return Math.round(n * 100) / 100;
}

function serializePath(path) {
  return path.commands
    .map((c) => {
      switch (c.type) {
        case "M":
          return `M${round2(c.x)},${round2(c.y)}`;
        case "L":
          return `L${round2(c.x)},${round2(c.y)}`;
        case "Q":
          return `Q${round2(c.x1)},${round2(c.y1)} ${round2(c.x)},${round2(c.y)}`;
        case "C":
          return `C${round2(c.x1)},${round2(c.y1)} ${round2(c.x2)},${round2(c.y2)} ${round2(c.x)},${round2(c.y)}`;
        case "Z":
          return "Z";
        default:
          throw new Error(`Unknown path command type: ${c.type}`);
      }
    })
    .join(" ");
}

function tightViewBoxPath(path) {
  const bbox = path.getBoundingBox();
  const d = serializePath(path);
  return { d, bbox };
}

function markTransformAt(offsetX, baselineY, capHeightPx) {
  // A combined rect+circle path in one `d` string risks a fill-rule winding
  // conflict in their overlap (renders as an unwanted gap) — instead, keep
  // the mark's native rect/circle primitives untouched and move+scale them
  // with a <g transform>, exactly like PunktoMark's own 0..45 x 0..65 space.
  const markScale = capHeightPx / MARK.height;
  const topY = baselineY - capHeightPx;
  const rightEdge = offsetX + (MARK.bowl.cx + MARK.bowl.r) * markScale;
  const transform = `translate(${round2(offsetX)} ${round2(topY)}) scale(${round2(markScale)})`;
  return { transform, rightEdge, topY, bottomY: baselineY };
}

function main() {
  const buf = readFileSync(FONT_PATH);
  const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  const font = opentype.parse(arrayBuffer);
  const scale = SIZE / font.unitsPerEm;
  const capHeightPx = (font.tables.os2?.sCapHeight ?? font.unitsPerEm * 0.7) * scale;

  // ---- A. Standalone wordmark: "Punkto" ----
  const { path: wordmarkPath } = layoutGlyphs(font, "Punkto", scale, 0);
  const wm = tightViewBoxPath(wordmarkPath);
  const wmPad = 0;
  const wmViewBox = `${round2(wm.bbox.x1 - wmPad)} ${round2(wm.bbox.y1 - wmPad)} ${round2(wm.bbox.x2 - wm.bbox.x1 + 2 * wmPad)} ${round2(wm.bbox.y2 - wm.bbox.y1 + 2 * wmPad)}`;
  const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${wmViewBox}" fill="currentColor" role="img" aria-label="Punkto">\n  <path d="${wm.d}"/>\n</svg>\n`;
  writeFileSync(path.join(__dirname, "..", "brand", "punkto-wordmark.svg"), wordmarkSvg);

  // ---- B. Lockup: mark + "unkto" ----
  // Reference gap: the natural visual gap between "P" and "u" in this font,
  // used as the target gap between the mark's right edge and "u"'s ink.
  const pGlyph = font.charToGlyph("P");
  const uGlyph = font.charToGlyph("u");
  const pPath = pGlyph.getPath(0, 0, SIZE);
  const pBBox = pPath.getBoundingBox();
  const kerningPu = font.getKerningValue(pGlyph, uGlyph) * scale;
  const uAdvanceX = pGlyph.advanceWidth * scale + kerningPu;
  const uPathAtNatural = uGlyph.getPath(uAdvanceX, 0, SIZE);
  const uBBoxAtNatural = uPathAtNatural.getBoundingBox();
  const naturalPuGap = uBBoxAtNatural.x1 - pBBox.x2;

  const uBBoxAtZero = uGlyph.getPath(0, 0, SIZE).getBoundingBox();

  const mark = markTransformAt(0, 0, capHeightPx);
  const uStartX = mark.rightEdge + naturalPuGap - uBBoxAtZero.x1;

  const { path: unktoPath } = layoutGlyphs(font, "unkto", scale, uStartX);
  const unkto = tightViewBoxPath(unktoPath);

  const combinedX1 = Math.min(0, unkto.bbox.x1);
  const combinedY1 = Math.min(mark.topY, unkto.bbox.y1);
  const combinedX2 = Math.max(mark.rightEdge, unkto.bbox.x2);
  const combinedY2 = Math.max(mark.bottomY, unkto.bbox.y2);
  const lockupViewBox = `${round2(combinedX1)} ${round2(combinedY1)} ${round2(combinedX2 - combinedX1)} ${round2(combinedY2 - combinedY1)}`;

  const lockupSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${lockupViewBox}" role="img" aria-label="Punkto">\n  <g fill="currentColor">\n    <g transform="${mark.transform}">\n      <rect x="${MARK.body.x}" y="${MARK.body.y}" width="${MARK.body.w}" height="${MARK.body.h}"/>\n      <circle cx="${MARK.bowl.cx}" cy="${MARK.bowl.cy}" r="${MARK.bowl.r}"/>\n    </g>\n    <path d="${unkto.d}"/>\n  </g>\n</svg>\n`;
  writeFileSync(path.join(__dirname, "..", "brand", "punkto-lockup.svg"), lockupSvg);

  console.log("Wordmark viewBox:", wmViewBox);
  console.log("Lockup viewBox:", lockupViewBox);
  console.log("capHeightPx:", round2(capHeightPx), "naturalPuGap:", round2(naturalPuGap));
}

main();
