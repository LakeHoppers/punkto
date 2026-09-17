/**
 * Recreates the "P" mark from src/app/icon.svg (a vertical bar + circle) as
 * flexbox/border-radius shapes, since next/og's ImageResponse (Satori) can't
 * reliably rasterize arbitrary inline SVG paths.
 */
export function BrandMark({ size }: { size: number }) {
  const barWidth = size * 0.13;
  const barLeft = size * 0.28;
  const circleSize = size * 0.34;
  const circleLeft = size * 0.38;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: size * 0.04,
        backgroundColor: "#9E3527",
        display: "flex",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: barLeft,
          top: size * 0.18,
          width: barWidth,
          height: size * 0.64,
          backgroundColor: "#FAF7F1",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: circleLeft,
          top: size * 0.17,
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          backgroundColor: "#FAF7F1",
          display: "flex",
        }}
      />
    </div>
  );
}
