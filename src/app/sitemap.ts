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

  return STATIC_PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map((locale) => ({
      url: buildAlternates(path, locale).canonical,
      lastModified: path === "" ? lastModified : undefined,
      changeFrequency,
      priority,
      alternates: { languages: buildAlternates(path, locale).languages },
    })),
  );
}
