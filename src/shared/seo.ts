import type { Metadata } from "next";
import { LOCALES, type Locale } from "./locale";
import { SITE_URL } from "./site-url";

const OG_LOCALE: Record<Locale, string> = { tr: "tr_TR", en: "en_US", de: "de_DE" };

/**
 * Next.js merges sibling `metadata`/`generateMetadata` objects *shallowly* —
 * a page that sets `openGraph`/`twitter` at all replaces the WHOLE object
 * from the layout, not just the fields it names (see Next's metadata
 * "Merging" docs). So every page that wants a page-specific title/
 * description in social previews must resupply siteName/type/locale/card
 * too, rather than just `{ title, description }` — this is the one place
 * that builds the full object so nothing gets silently dropped.
 */
export function buildSocialMetadata(
  locale: Locale,
  title: string,
  description: string,
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      siteName: "Punkto",
      type: "website",
      locale: OG_LOCALE[locale],
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * hreflang + canonical alternates for a page that exists at the same
 * `pathSuffix` under every locale (e.g. "" for the homepage, "/impressum").
 * `x-default` points at the Turkish version — the site's primary audience.
 */
export function buildAlternates(pathSuffix: string, locale: Locale) {
  const languages = Object.fromEntries(
    LOCALES.map((code) => [code, `${SITE_URL}/${code}${pathSuffix}`]),
  ) as Record<Locale, string>;

  return {
    canonical: `${SITE_URL}/${locale}${pathSuffix}`,
    languages: { ...languages, "x-default": `${SITE_URL}/tr${pathSuffix}` },
  };
}
