import type { SVGProps } from "react";

/**
 * Punkto logosu.
 *
 * Wordmark outline'a çevrilmiş sabit vektördür. Font değişkenlerine bağlı DEĞİLDİR.
 * Kaynak: Instrument Sans SemiBold (600), letter-spacing -0.035em, P harfi
 * markanın kendi işaretiyle değiştirilmiş.
 *
 * Yeniden üretmek için: scripts/build-wordmark.mjs
 * SVG'yi elle düzenleme.
 */

const WORDMARK_VIEWBOX = "0 0 3135.1 739.0";
const WORDMARK_RATIO = 4.2424; // genişlik / yükseklik

/** Sadece işaret. Kare alanlar, favicon, avatar, dar mobil header. */
export function PunktoMark({ size = 24, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
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

/** Tam wordmark. Header, footer, e-posta başlığı, paylaşım görselleri. */
export function PunktoWordmark({ size = 28, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox={WORDMARK_VIEWBOX}
      width={size * WORDMARK_RATIO}
      height={size}
      fill="currentColor"
      role="img"
      aria-label="Punkto"
      {...props}
    >
      <rect x="0.0" y="8.6" width="130.0" height="720"/>
      <circle cx="315.9" cy="214.5" r="214.5"/>
      <path d="M756.4 738.6Q703.7 738.6 665.1 716.1Q626.4 693.6 605.7 654.8Q585.1 616.0 585.1 567.0V218.6H711.7V540.6Q711.7 588.0 735.2 611.6Q758.7 635.3 801.7 635.3Q840.4 635.3 870.1 617.3Q899.7 599.3 917.2 567.1Q934.7 535.0 934.7 493.3L947.7 615.6Q922.7 671.3 873.1 705.0Q823.4 738.6 756.4 738.6ZM938.4 728.6V608.6H934.7V218.6H1061.4V728.6ZM1160.1 728.6V218.6H1283.1V338.6H1286.7V728.6ZM1518.4 728.6V406.6Q1518.4 359.3 1494.4 335.6Q1470.4 312.0 1424.1 312.0Q1384.1 312.0 1352.9 330.0Q1321.7 348.0 1304.2 379.6Q1286.7 411.3 1286.7 454.0L1273.7 331.6Q1299.1 275.3 1349.2 242.0Q1399.4 208.6 1469.4 208.6Q1552.7 208.6 1598.9 255.5Q1645.1 302.3 1645.1 380.3V728.6ZM1737.1 728.6V2.0H1863.7V728.6ZM2066.1 728.6 1834.4 463.6 2059.4 218.6H2211.4L1951.7 486.6L1958.1 439.6L2221.4 728.6ZM2489.4 739.0Q2395.7 739.0 2351.2 694.5Q2306.7 650.0 2306.7 561.0V103.0L2433.4 55.6V564.0Q2433.4 601.0 2453.4 619.0Q2473.4 637.0 2516.7 637.0Q2533.4 637.0 2546.9 634.1Q2560.4 631.3 2572.1 627.3V726.0Q2560.1 732.0 2538.2 735.5Q2516.4 739.0 2489.4 739.0ZM2208.4 317.3V218.6H2572.1V317.3ZM2863.1 738.6Q2782.1 738.6 2720.7 704.6Q2659.4 670.6 2625.2 610.1Q2591.1 549.6 2591.1 471.6Q2591.1 393.3 2625.4 334.3Q2659.7 275.3 2720.9 242.0Q2782.1 208.6 2863.1 208.6Q2945.1 208.6 3006.2 242.0Q3067.4 275.3 3101.2 334.3Q3135.1 393.3 3135.1 471.6Q3135.1 549.6 3100.9 610.1Q3066.7 670.6 3005.6 704.6Q2944.4 738.6 2863.1 738.6ZM2863.1 637.3Q2903.7 637.3 2935.4 616.8Q2967.1 596.3 2985.4 559.0Q3003.7 521.6 3003.7 470.6Q3003.7 395.3 2963.9 352.6Q2924.1 310.0 2863.1 310.0Q2802.4 310.0 2762.4 353.0Q2722.4 396.0 2722.4 470.6Q2722.4 521.6 2740.7 559.0Q2759.1 596.3 2790.9 616.8Q2822.7 637.3 2863.1 637.3Z" />
    </svg>
  );
}

type LogoProps = {
  variant?: "wordmark" | "mark";
  /** Yükseklik (px). Wordmark'ta bu cap-height değil toplam yüksekliktir. */
  size?: number;
  className?: string;
};

/**
 * Kullanım:
 *   <Logo />                        header (yükseklik 28px)
 *   <Logo size={22} />              mobil header
 *   <Logo variant="mark" size={22}/> çok dar alanlar
 */
export function Logo({ variant = "wordmark", size = 28, className }: LogoProps) {
  return variant === "mark" ? (
    <PunktoMark size={size} className={className} />
  ) : (
    <PunktoWordmark size={size} className={className} />
  );
}

/**
 * Marka + descriptor kilidi. Footer ve e-posta başlığı.
 * Ayırıcı nokta marka renginde. Yazının sonunda nokta YOK.
 */
export function LogoWithDescriptor({ descriptor, size = 20 }: { descriptor: string; size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <PunktoWordmark size={size} />
      <span style={{ color: "var(--brand)", fontWeight: 700, lineHeight: 1 }}>·</span>
      <span style={{ color: "var(--muted-foreground)", fontSize: size * 0.7 }}>{descriptor}</span>
    </span>
  );
}
