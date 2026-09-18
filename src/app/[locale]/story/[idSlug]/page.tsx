import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/shared/locale";
import { prisma } from "@/shared/prisma";
import { pickLocalizedText } from "@/modules/digest/domain/localize";
import { CATEGORY_LABELS } from "@/shared/category-labels";
import { CATEGORY_ACCENT } from "@/shared/category-colors";
import { HOME_COPY } from "@/shared/home-copy";
import { TrackedSourceLink } from "@/components/tracked-source-link";
import { buildStoryAlternates, buildSocialMetadata } from "@/shared/seo";
import { SITE_URL } from "@/shared/site-url";

// Story content is effectively immutable once published (admin corrections
// are rare and non-urgent) and identical for every visitor, so cache the
// rendered page — same reasoning as the homepage's `revalidate`.
export const revalidate = 300;

const BACK_LABEL: Record<Locale, string> = {
  tr: "← Tüm haberler",
  en: "← All stories",
  de: "← Alle Nachrichten",
};

/** The slug after the id is decorative and never validated — the id (a cuid, which never contains "-") is the only part looked up. */
function parseId(idSlug: string): string {
  return idSlug.split("-")[0];
}

async function getStory(id: string) {
  return prisma.story.findUnique({
    where: { id },
    include: {
      summaries: { orderBy: { version: "desc" as const }, take: 1 },
      rawArticles: { select: { url: true } },
    },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; idSlug: string }>;
}): Promise<Metadata> {
  const { locale, idSlug } = await params;
  if (!isLocale(locale)) notFound();
  const id = parseId(idSlug);
  const story = await getStory(id);
  if (!story) return {};
  const summary = story.summaries[0];
  if (!summary) return {};

  const headline = pickLocalizedText(locale, summary.headline, summary.headlineEn, summary.headlineDe);
  const body = pickLocalizedText(locale, summary.body, summary.bodyEn, summary.bodyDe);
  const description = body.slice(0, 200);
  const headlines = { tr: summary.headline, en: summary.headlineEn ?? summary.headline, de: summary.headlineDe ?? summary.headline };

  return {
    title: headline,
    description,
    alternates: buildStoryAlternates(id, headlines, locale),
    ...buildSocialMetadata(locale, headline, description),
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string; idSlug: string }>;
}) {
  const { locale, idSlug } = await params;
  if (!isLocale(locale)) notFound();
  const id = parseId(idSlug);
  const story = await getStory(id);
  const summary = story?.summaries[0];
  if (!story || !summary) notFound();

  const copy = HOME_COPY[locale];
  const categoryLabels = CATEGORY_LABELS[locale];
  const headline = pickLocalizedText(locale, summary.headline, summary.headlineEn, summary.headlineDe);
  const body = pickLocalizedText(locale, summary.body, summary.bodyEn, summary.bodyDe);
  const whyItMatters = pickLocalizedText(
    locale,
    summary.whyItMatters,
    summary.whyItMattersEn, summary.whyItMattersDe,
  );
  const sourceUrls = [...new Set(story.rawArticles.map((article) => article.url))];
  const storyUrl = buildStoryAlternates(
    id,
    { tr: summary.headline, en: summary.headlineEn ?? summary.headline, de: summary.headlineDe ?? summary.headline },
    locale,
  ).canonical;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description: body.slice(0, 200),
    datePublished: story.firstSeenAt.toISOString(),
    dateModified: summary.createdAt.toISOString(),
    inLanguage: locale,
    url: storyUrl,
    mainEntityOfPage: storyUrl,
    author: { "@type": "Organization", name: "Punkto", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Punkto",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png` },
    },
  };

  return (
    <main
      lang={locale}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-14 sm:py-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href={`/${locale}`} className="text-sm text-muted-foreground hover:text-foreground hover:underline">
        {BACK_LABEL[locale]}
      </Link>
      <article
        style={{ "--cat": CATEGORY_ACCENT[story.category] } as CSSProperties}
        className="flex flex-col gap-3"
      >
        <span className="inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold tracking-wide text-[var(--cat)] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--cat)]" />
          {categoryLabels[story.category]}
        </span>

        <h1 className="font-heading text-3xl leading-snug font-medium text-balance sm:text-4xl">
          {headline}
        </h1>

        <div className="flex flex-col gap-3 pt-2 text-[15px] leading-relaxed text-foreground/90">
          {body
            .split("\n")
            .filter((paragraph) => paragraph.trim().length > 0)
            .map((paragraph, i) => (
              <p key={i} className="text-pretty">
                {paragraph}
              </p>
            ))}
        </div>

        <div
          className="border-l-2 pl-4 text-sm leading-relaxed text-foreground/80"
          style={{ borderColor: "var(--cat)" }}
        >
          <span className="font-semibold text-foreground">{copy.whyItMatters}</span>
          {whyItMatters}
        </div>

        <p className="pl-4 text-xs font-normal leading-relaxed text-muted-foreground">
          {copy.aiAnalysis}
        </p>

        {sourceUrls.length > 0 && (
          <div className="flex flex-col gap-1 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">{copy.sourcesLabel}</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {sourceUrls.map((url) => (
                <TrackedSourceLink
                  key={url}
                  url={url}
                  category={story.category}
                  className="hover:text-foreground hover:underline"
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
