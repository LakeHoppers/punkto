import { unstable_cache } from "next/cache";
import type { Prisma } from "@/generated/prisma/client";
import type { Category } from "@/generated/prisma/enums";
import { prisma } from "@/shared/prisma";
import type { DigestView } from "../domain/types";
import { pickLocalizedText, type Locale } from "../domain/localize";

function digestItemsInclude(categories: Category[]) {
  return {
    where: categories.length > 0 ? { story: { category: { in: categories } } } : undefined,
    orderBy: { rank: "asc" as const },
    include: {
      story: {
        include: {
          summaries: { orderBy: { version: "desc" as const }, take: 1 },
          rawArticles: { select: { url: true } },
        },
      },
    },
  } satisfies Prisma.Digest$itemsArgs;
}

const DIGEST_INCLUDE = { items: digestItemsInclude([]) } satisfies Prisma.DigestInclude;

type DigestWithItems = Prisma.DigestGetPayload<{
  include: { items: ReturnType<typeof digestItemsInclude> };
}>;

function toDigestView(digest: DigestWithItems, locale: Locale): DigestView {
  return {
    digestId: digest.id,
    date: digest.date.toISOString().slice(0, 10),
    items: digest.items.map((item) => {
      const summary = item.story.summaries[0];
      return {
        rank: item.rank,
        storyId: item.storyId,
        category: item.story.category,
        headline: pickLocalizedText(locale, summary?.headline ?? "", summary?.headlineEn, summary?.headlineDe),
        summary: pickLocalizedText(locale, summary?.body ?? "", summary?.bodyEn, summary?.bodyDe),
        whyItMatters: pickLocalizedText(
          locale,
          summary?.whyItMatters ?? "",
          summary?.whyItMattersEn, summary?.whyItMattersDe,
        ),
        tags: summary?.tags ?? [],
        sourceUrls: item.story.rawArticles.map((article) => article.url),
      };
    }),
  };
}

/**
 * The most recent digest, optionally filtered to a set of favorite
 * categories (empty = all). Cached: the public homepage calls this with the
 * same (empty-categories) arguments on every anonymous page view, and the
 * underlying data only changes once a day when the pipeline runs — a load
 * test showed this query queuing under concurrent traffic (~700ms median at
 * 50 concurrent requests vs ~200ms at 20), so most requests should hit this
 * cache instead of Postgres. A few minutes of staleness is invisible for a
 * once-daily digest.
 */
export const getLatestDigest = unstable_cache(
  async (categories: Category[] = [], locale: Locale = "tr"): Promise<DigestView | null> => {
    const digest = await prisma.digest.findFirst({
      orderBy: { date: "desc" },
      include: { items: digestItemsInclude(categories) },
    });
    return digest ? toDigestView(digest, locale) : null;
  },
  ["latest-digest"],
  { revalidate: 300 },
);

// Must match CANDIDATE_WINDOW_HOURS in build-digest.use-case.ts — the recency
// window a story has to fall within to be considered "today's news".
const PERSONALIZED_WINDOW_HOURS = 48;

/**
 * A personalized top-N pick from the user's favorite categories, sourced
 * directly from all recent summarized stories rather than filtered from the
 * shared digest's own fixed 10-item/4-per-category selection. The shared
 * digest is built once for everyone and caps how many stories from any one
 * category make the cut, so a reader who only favorites one or two
 * categories would otherwise see just whatever sliver of that shared
 * selection happens to match — often far fewer than `limit`, sometimes zero.
 * This draws from the same candidate pool the shared digest is built from,
 * so a favorited category effectively gets its own dedicated ranking.
 * Still keyed to that day's real `Digest` row (for delivery-tracking's FK),
 * just with a differently-sourced `items` list.
 */
export async function getPersonalizedDigest(
  categories: Category[],
  locale: Locale = "tr",
  limit = 10,
): Promise<DigestView | null> {
  if (categories.length === 0) return getLatestDigest([], locale);

  const digest = await prisma.digest.findFirst({ orderBy: { date: "desc" } });
  if (!digest) return null;

  const since = new Date(Date.now() - PERSONALIZED_WINDOW_HOURS * 60 * 60 * 1000);
  const stories = await prisma.story.findMany({
    where: {
      category: { in: categories },
      summaries: { some: {} },
      rawArticles: { some: { publishedAt: { gte: since } } },
    },
    orderBy: [{ importanceScore: "desc" }, { id: "asc" }],
    take: limit,
    include: {
      summaries: { orderBy: { version: "desc" as const }, take: 1 },
      rawArticles: { select: { url: true } },
    },
  });

  return {
    digestId: digest.id,
    date: digest.date.toISOString().slice(0, 10),
    items: stories.map((story, index) => {
      const summary = story.summaries[0];
      return {
        rank: index + 1,
        storyId: story.id,
        category: story.category,
        headline: pickLocalizedText(locale, summary?.headline ?? "", summary?.headlineEn, summary?.headlineDe),
        summary: pickLocalizedText(locale, summary?.body ?? "", summary?.bodyEn, summary?.bodyDe),
        whyItMatters: pickLocalizedText(
          locale,
          summary?.whyItMatters ?? "",
          summary?.whyItMattersEn, summary?.whyItMattersDe,
        ),
        tags: summary?.tags ?? [],
        sourceUrls: story.rawArticles.map((article) => article.url),
      };
    }),
  };
}

export async function getDigestByDate(
  date: Date,
  locale: Locale = "tr",
): Promise<DigestView | null> {
  const digest = await prisma.digest.findUnique({
    where: { date },
    include: DIGEST_INCLUDE,
  });
  return digest ? toDigestView(digest, locale) : null;
}

export interface DigestHistoryItem {
  date: string;
  items: { rank: number; storyId: string; category: Category; headline: string }[];
}

/** Recent digest history, optionally filtered to a set of favorite categories (empty = all). */
export async function getDigestHistory(
  categories: Category[],
  limit: number,
  locale: Locale = "tr",
): Promise<DigestHistoryItem[]> {
  const digests = await prisma.digest.findMany({
    orderBy: { date: "desc" },
    take: limit,
    include: {
      items: {
        where: categories.length > 0 ? { story: { category: { in: categories } } } : undefined,
        orderBy: { rank: "asc" },
        include: {
          story: { include: { summaries: { orderBy: { version: "desc" }, take: 1 } } },
        },
      },
    },
  });

  return digests.map((digest) => ({
    date: digest.date.toISOString().slice(0, 10),
    items: digest.items.map((item) => ({
      rank: item.rank,
      storyId: item.storyId,
      category: item.story.category,
      headline: pickLocalizedText(locale, item.story.summaries[0]?.headline ?? "", item.story.summaries[0]?.headlineEn, item.story.summaries[0]?.headlineDe),
    })),
  }));
}

/**
 * Same idea as getPersonalizedDigest, but for every day in the history list
 * instead of just the latest one — each day gets its own top-10 pick from
 * the favorite categories' own story pool (a ~48h window ending that day),
 * rather than a filtered slice of that day's shared, pre-capped digest.
 */
export async function getPersonalizedDigestHistory(
  categories: Category[],
  limit: number,
  locale: Locale = "tr",
): Promise<DigestHistoryItem[]> {
  if (categories.length === 0) return getDigestHistory([], limit, locale);

  const digests = await prisma.digest.findMany({
    orderBy: { date: "desc" },
    take: limit,
    select: { date: true },
  });

  return Promise.all(
    digests.map(async ({ date }) => {
      const since = new Date(date.getTime() - PERSONALIZED_WINDOW_HOURS * 60 * 60 * 1000);
      const until = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      const stories = await prisma.story.findMany({
        where: {
          category: { in: categories },
          summaries: { some: {} },
          rawArticles: { some: { publishedAt: { gte: since, lt: until } } },
        },
        orderBy: [{ importanceScore: "desc" }, { id: "asc" }],
        take: 10,
        include: { summaries: { orderBy: { version: "desc" as const }, take: 1 } },
      });

      return {
        date: date.toISOString().slice(0, 10),
        items: stories.map((story, index) => ({
          rank: index + 1,
          storyId: story.id,
          category: story.category,
          headline: pickLocalizedText(
            locale,
            story.summaries[0]?.headline ?? "",
            story.summaries[0]?.headlineEn, story.summaries[0]?.headlineDe,
          ),
        })),
      };
    }),
  );
}
