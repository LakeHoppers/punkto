import { ImageResponse } from "next/og";
import { isLocale } from "@/shared/locale";
import { HOME_COPY } from "@/shared/home-copy";

export const alt = "Punkto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "tr";
  const { tagline, title } = HOME_COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 28,
          padding: "80px 96px",
          backgroundColor: "#FAF6F1",
          color: "#1D1A17",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 10,
              backgroundColor: "#9E3527",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>Punkto</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#9E3527",
          }}
        >
          {tagline}
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: 600, lineHeight: 1.15, maxWidth: 950 }}>
          {title}
        </div>
      </div>
    ),
    { ...size },
  );
}
