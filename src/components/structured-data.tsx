import { SITE_URL } from "@/shared/site-url";
import type { Locale } from "@/shared/locale";

const OG_LOCALE: Record<Locale, string> = { tr: "tr-TR", en: "en-US", de: "de-DE" };

/**
 * Organization + WebSite JSON-LD, rendered site-wide (every page, every
 * locale) — helps search engines and AI answer engines identify Punkto as a
 * real, single entity rather than three unrelated locale sites.
 */
export function StructuredData({ locale }: { locale: Locale }) {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Punkto",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      sameAs: [
        "https://www.instagram.com/punktofyi/",
        "https://linkedin.com/company/punktofyi",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Punkto",
      url: `${SITE_URL}/${locale}`,
      inLanguage: OG_LOCALE[locale],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
