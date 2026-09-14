import type { SVGProps } from "react";

/**
 * Punkto işareti.
 * Tek renk. Rengi `currentColor` üzerinden alır, yani parent'ın text rengine uyar.
 * Asla iki renkli, gradientli veya gölgeli kullanılmaz.
 */
export function PunktoMark({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 45 65"
      width={(size * 45) / 65}
      height={size}
      fill="currentColor"
      role="img"
      aria-label="Punkto"
      {...props}
    >
      <rect x="0" y="1" width="13" height="64" />
      <circle cx="27" cy="17" r="17" />
    </svg>
  );
}

// Frozen outline paths, generated from Geist SemiBold (600) via
// scripts/build-wordmark.mjs with -0.035em tracking. Not text — never edit
// these by hand. Re-run the script to regenerate if the wordmark changes.
const WORDMARK_VIEWBOX = "8 -71 313.1 72.2";
const WORDMARK_PATH =
  "M21,0 L8,0 L8,-71 L35.5,-71 Q47.9,-71 54.95,-65 Q62,-59 62,-48.4 L62,-48.4 Q62,-37.7 54.95,-31.65 Q47.9,-25.6 35.5,-25.6 L35.5,-25.6 L21,-25.6 L21,0 M21,-59.7 L21,-36.9 L34.9,-36.9 Q41.5,-36.9 45.05,-39.8 Q48.6,-42.7 48.6,-48.4 L48.6,-48.4 Q48.6,-54 45.05,-56.85 Q41.5,-59.7 34.9,-59.7 L34.9,-59.7 L21,-59.7 M84.9,1.2 L84.9,1.2 Q76.7,1.2 72,-4.1 Q67.3,-9.4 67.3,-19 L67.3,-19 L67.3,-53.4 L80.1,-53.4 L80.1,-22.2 Q80.1,-15.4 82.35,-12.3 Q84.6,-9.2 89.2,-9.2 L89.2,-9.2 Q94.3,-9.2 97.2,-12.65 Q100.1,-16.1 100.1,-22.7 L100.1,-22.7 L100.1,-53.4 L112.9,-53.4 L112.9,0 L101.2,0 L101,-8.7 Q96.8,1.2 84.9,1.2 M136.3,0 L123.5,0 L123.5,-53.4 L135.1,-53.4 L135.4,-44.3 Q137.6,-49.8 141.85,-52.2 Q146.1,-54.6 151.4,-54.6 L151.4,-54.6 Q160.2,-54.6 164.9,-48.95 Q169.6,-43.3 169.6,-34.3 L169.6,-34.3 L169.6,0 L156.8,0 L156.8,-30.2 Q156.8,-37 154.75,-40.6 Q152.7,-44.2 147.5,-44.2 L147.5,-44.2 Q142.3,-44.2 139.3,-40.6 Q136.3,-37 136.3,-30.2 L136.3,-30.2 L136.3,0 M192.3,0 L179.5,0 L179.5,-71 L192.3,-71 L192.3,-29.3 L214.2,-53.4 L230,-53.4 L209.1,-31.2 L230.7,0 L216.3,0 L200.7,-23.6 L192.3,-14.7 L192.3,0 M266.7,0 L255.3,0 Q247.3,0 243.55,-3.65 Q239.8,-7.3 239.8,-15.3 L239.8,-15.3 L239.8,-43.5 L231.4,-43.5 L231.4,-53.4 L239.8,-53.4 L239.8,-65.9 L252.6,-65.9 L252.6,-53.4 L266.7,-53.4 L266.7,-43.5 L252.6,-43.5 L252.6,-16.5 Q252.6,-12.7 254.25,-11.3 Q255.9,-9.9 259.2,-9.9 L259.2,-9.9 L266.7,-9.9 L266.7,0 M294.9,1.2 L294.9,1.2 Q286.9,1.2 281,-2.25 Q275.1,-5.7 271.85,-11.95 Q268.6,-18.2 268.6,-26.7 L268.6,-26.7 Q268.6,-35.2 271.85,-41.45 Q275.1,-47.7 281,-51.15 Q286.9,-54.6 294.9,-54.6 L294.9,-54.6 Q302.8,-54.6 308.7,-51.15 Q314.6,-47.7 317.85,-41.45 Q321.1,-35.2 321.1,-26.7 L321.1,-26.7 Q321.1,-18.2 317.85,-11.95 Q314.6,-5.7 308.7,-2.25 Q302.8,1.2 294.9,1.2 M294.9,-9.2 L294.9,-9.2 Q301,-9.2 304.4,-13.8 Q307.8,-18.4 307.8,-26.7 L307.8,-26.7 Q307.8,-35 304.4,-39.6 Q301,-44.2 294.9,-44.2 L294.9,-44.2 Q288.7,-44.2 285.3,-39.6 Q281.9,-35 281.9,-26.7 L281.9,-26.7 Q281.9,-18.4 285.3,-13.8 Q288.7,-9.2 294.9,-9.2";

const LOCKUP_VIEWBOX = "0 -71 310.66 72.2";
// Mark stays native rect/circle (moved+scaled via transform) rather than a
// combined path string — two shapes sharing one `d` risk a fill-rule winding
// conflict in their overlap, which renders as an unwanted gap.
const LOCKUP_MARK_TRANSFORM = "translate(0 -71) scale(1.09)";
const LOCKUP_TEXT_PATH =
  "M74.46,1.2 L74.46,1.2 Q66.26,1.2 61.56,-4.1 Q56.86,-9.4 56.86,-19 L56.86,-19 L56.86,-53.4 L69.66,-53.4 L69.66,-22.2 Q69.66,-15.4 71.91,-12.3 Q74.16,-9.2 78.76,-9.2 L78.76,-9.2 Q83.86,-9.2 86.76,-12.65 Q89.66,-16.1 89.66,-22.7 L89.66,-22.7 L89.66,-53.4 L102.46,-53.4 L102.46,0 L90.76,0 L90.56,-8.7 Q86.36,1.2 74.46,1.2 M125.86,0 L113.06,0 L113.06,-53.4 L124.66,-53.4 L124.96,-44.3 Q127.16,-49.8 131.41,-52.2 Q135.66,-54.6 140.96,-54.6 L140.96,-54.6 Q149.76,-54.6 154.46,-48.95 Q159.16,-43.3 159.16,-34.3 L159.16,-34.3 L159.16,0 L146.36,0 L146.36,-30.2 Q146.36,-37 144.31,-40.6 Q142.26,-44.2 137.06,-44.2 L137.06,-44.2 Q131.86,-44.2 128.86,-40.6 Q125.86,-37 125.86,-30.2 L125.86,-30.2 L125.86,0 M181.86,0 L169.06,0 L169.06,-71 L181.86,-71 L181.86,-29.3 L203.76,-53.4 L219.56,-53.4 L198.66,-31.2 L220.26,0 L205.86,0 L190.26,-23.6 L181.86,-14.7 L181.86,0 M256.26,0 L244.86,0 Q236.86,0 233.11,-3.65 Q229.36,-7.3 229.36,-15.3 L229.36,-15.3 L229.36,-43.5 L220.96,-43.5 L220.96,-53.4 L229.36,-53.4 L229.36,-65.9 L242.16,-65.9 L242.16,-53.4 L256.26,-53.4 L256.26,-43.5 L242.16,-43.5 L242.16,-16.5 Q242.16,-12.7 243.81,-11.3 Q245.46,-9.9 248.76,-9.9 L248.76,-9.9 L256.26,-9.9 L256.26,0 M284.46,1.2 L284.46,1.2 Q276.46,1.2 270.56,-2.25 Q264.66,-5.7 261.41,-11.95 Q258.16,-18.2 258.16,-26.7 L258.16,-26.7 Q258.16,-35.2 261.41,-41.45 Q264.66,-47.7 270.56,-51.15 Q276.46,-54.6 284.46,-54.6 L284.46,-54.6 Q292.36,-54.6 298.26,-51.15 Q304.16,-47.7 307.41,-41.45 Q310.66,-35.2 310.66,-26.7 L310.66,-26.7 Q310.66,-18.2 307.41,-11.95 Q304.16,-5.7 298.26,-2.25 Q292.36,1.2 284.46,1.2 M284.46,-9.2 L284.46,-9.2 Q290.56,-9.2 293.96,-13.8 Q297.36,-18.4 297.36,-26.7 L297.36,-26.7 Q297.36,-35 293.96,-39.6 Q290.56,-44.2 284.46,-44.2 L284.46,-44.2 Q278.26,-44.2 274.86,-39.6 Q271.46,-35 271.46,-26.7 L271.46,-26.7 Q271.46,-18.4 274.86,-13.8 Q278.26,-9.2 284.46,-9.2";

type LogoProps = {
  /** "lockup" = işaret + yazı, "mark" = sadece işaret, "wordmark" = sadece yazı */
  variant?: "lockup" | "mark" | "wordmark";
  /** Yazı boyutu (px), yüksekliğe göre ölçeklenir. */
  size?: number;
  className?: string;
};

/**
 * Punkto logosu.
 *
 * Kullanım:
 *   <Logo />                       header
 *   <Logo variant="mark" size={20} />   dar alanlar, mobil header
 *   <Logo size={40} />             landing hero
 *
 * Wordmark ve lockup outline'a çevrilip dondurulmuştur (bkz. brand/BRAND.md).
 * Font değişikliği bu bileşeni etkilemez.
 */
export function Logo({ variant = "lockup", size = 24, className }: LogoProps) {
  if (variant === "mark") {
    return <PunktoMark size={size} className={className} />;
  }

  if (variant === "wordmark") {
    const [, , vbW, vbH] = WORDMARK_VIEWBOX.split(" ").map(Number);
    return (
      <svg
        viewBox={WORDMARK_VIEWBOX}
        width={(size * vbW) / vbH}
        height={size}
        fill="currentColor"
        role="img"
        aria-label="Punkto"
        className={className}
      >
        <path d={WORDMARK_PATH} />
      </svg>
    );
  }

  const [, , vbW, vbH] = LOCKUP_VIEWBOX.split(" ").map(Number);
  return (
    <svg
      viewBox={LOCKUP_VIEWBOX}
      width={(size * vbW) / vbH}
      height={size}
      fill="currentColor"
      role="img"
      aria-label="Punkto"
      className={className}
    >
      <g fill="currentColor">
        <g transform={LOCKUP_MARK_TRANSFORM}>
          <rect x="0" y="1" width="13" height="64" />
          <circle cx="27" cy="17" r="17" />
        </g>
        <path d={LOCKUP_TEXT_PATH} />
      </g>
    </svg>
  );
}

/**
 * Marka + descriptor kilidi. Footer, e-posta başlığı, paylaşım görselleri.
 * Ayırıcı nokta marka renginde, yazının sonunda nokta YOK.
 */
export function LogoWithDescriptor({
  descriptor,
  size = 20,
}: {
  descriptor: string;
  size?: number;
}) {
  return (
    <span style={{ display: "inline-flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
      <Logo size={size} />
      <span style={{ color: "var(--brand)", fontWeight: 700 }}>·</span>
      <span style={{ color: "var(--muted-foreground)", fontSize: size * 0.62 }}>
        {descriptor}
      </span>
    </span>
  );
}
