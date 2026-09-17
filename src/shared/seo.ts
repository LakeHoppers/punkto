import type { Metadata } from "next";
import { LOCALES, type Locale } from "./locale";
import { SITE_URL } from "./site-url";
import { slugify } from "./slugify";

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

/**
 * Story URLs carry a readable slug after the id (e.g. "/tr/story/abc123-
 * openai-yapay-zeka-sorunlarini-acikladi") for readability/keyword value.
 * The id is the only part that's actually looked up — the slug is decorative
 * and never validated, so an old/stale slug in a shared link still resolves
 * instead of 404ing; the canonical tag always points at the current one.
 * Each locale has its own headline, so (unlike buildAlternates) the path
 * suffix differs per locale rather than being shared.
 */
export function storyPath(locale: Locale, id: string, headline: string): string {
  const slug = slugify(headline);
  return `/${locale}/story/${slug ? `${id}-${slug}` : id}`;
}

export function buildStoryAlternates(
  id: string,
  headlines: Record<Locale, string>,
  locale: Locale,
) {
  const languages = Object.fromEntries(
    LOCALES.map((code) => [code, `${SITE_URL}${storyPath(code, id, headlines[code])}`]),
  ) as Record<Locale, string>;

  return {
    canonical: `${SITE_URL}${storyPath(locale, id, headlines[locale])}`,
    languages: { ...languages, "x-default": `${SITE_URL}${storyPath("tr", id, headlines.tr)}` },
  };
}
