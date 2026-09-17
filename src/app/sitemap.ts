import type { MetadataRoute } from "next";
import { LOCALES } from "@/shared/locale";
import { buildAlternates } from "@/shared/seo";
import { prisma } from "@/shared/prisma";

const STATIC_PAGES: { path: string; priority: number; changeFrequency: "yearly" | "daily" }[] = [
  { path: "", priority: 1, changeFrequency: "daily" },
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const latestDigest = await prisma.digest.findFirst({ orderBy: { date: "desc" }, select: { date: true } });
  const lastModified = latestDigest?.date ?? new Date();

  const staticEntries = STATIC_PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: buildAlternates(path, locale).canonical,
      lastModified: path === "" ? lastModified : undefined,
      changeFrequency,
      priority,
      alternates: { languages: buildAlternates(path, locale).languages },
    })),
  );

  // Every summarized story gets a permanent page — kept in the sitemap
  // indefinitely, since a story's SEO/citation value compounds over time
  // rather than expiring after a "recent" window.
  const stories = await prisma.story.findMany({
    where: { summaries: { some: {} } },
    select: { id: true, firstSeenAt: true },
    orderBy: { firstSeenAt: "desc" },
  });

  const storyEntries = stories.flatMap(({ id, firstSeenAt }) =>
    LOCALES.map((locale) => ({
      url: buildAlternates(`/story/${id}`, locale).canonical,
      lastModified: firstSeenAt,
      changeFrequency: "yearly" as const,
      priority: 0.5,
      alternates: { languages: buildAlternates(`/story/${id}`, locale).languages },
    })),
  );

  return [...staticEntries, ...storyEntries];
}
