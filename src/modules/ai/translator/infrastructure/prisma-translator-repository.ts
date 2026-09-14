import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/shared/prisma";
import type { SummaryToTranslate, TranslatorRepository } from "../application/ports";

const TRANSLATION_FIELDS = {
  en: ["headlineEn", "bodyEn", "whyItMattersEn"],
  de: ["headlineDe", "bodyDe", "whyItMattersDe"],
} as const;

export class PrismaTranslatorRepository implements TranslatorRepository {
  constructor(private readonly locale: "en" | "de" = "en") {}

  async getUntranslatedSummaries(storyIds: string[]): Promise<SummaryToTranslate[]> {
    if (storyIds.length === 0) return [];

    const stories = await prisma.story.findMany({
      where: { id: { in: storyIds } },
      select: {
        id: true,
        summaries: { orderBy: { version: "desc" }, take: 1 },
      },
    });

    return stories
      .filter((story) => story.summaries[0] && (TRANSLATION_FIELDS[this.locale].some(field => !story.summaries[0][field]?.trim()) || story.summaries[0][TRANSLATION_FIELDS[this.locale][1]]?.trim() === story.summaries[0].body.trim()))
      .map((story) => {
        const summary = story.summaries[0];
        return {
          summaryId: summary.id,
          storyId: story.id,
          headline: summary.headline,
          body: summary.body,
          whyItMatters: summary.whyItMatters,
        };
      });
  }

  async getPublishedUntranslatedSummaries(
    excludeStoryIds: string[], limit: number,
  ): Promise<SummaryToTranslate[]> {
    // Select latest versions BEFORE testing completeness: an untranslated older
    // version must not repeatedly consume the budget after an admin edit.
    // EXISTS avoids duplicate work when a story appears in multiple editions.
    const excluded = excludeStoryIds.length
      ? Prisma.sql`AND s."storyId" NOT IN (${Prisma.join(excludeStoryIds)})`
      : Prisma.empty;
    const [headline, body, why] = TRANSLATION_FIELDS[this.locale].map(field => Prisma.raw(`s."${field}"`));
    return prisma.$queryRaw<SummaryToTranslate[]>(Prisma.sql`
      SELECT s.id AS "summaryId", s."storyId", s.headline, s.body, s."whyItMatters"
      FROM "Summary" s
      WHERE EXISTS (SELECT 1 FROM "DigestItem" d WHERE d."storyId" = s."storyId")
        AND NOT EXISTS (
          SELECT 1 FROM "Summary" newer WHERE newer."storyId" = s."storyId"
            AND (newer.version > s.version OR (newer.version = s.version AND newer.id > s.id))
        )
        AND (NULLIF(BTRIM(${headline}), '') IS NULL
          OR NULLIF(BTRIM(${body}), '') IS NULL
          OR NULLIF(BTRIM(${why}), '') IS NULL
          OR BTRIM(${body}) = BTRIM(s.body))
        ${excluded}
      ORDER BY s."createdAt" ASC, s.id ASC
      LIMIT ${limit}
    `);
  }

  async saveTranslation(
    summaryId: string,
    output: { headline: string; body: string; whyItMatters: string },
  ): Promise<void> {
    await prisma.summary.update({
      where: { id: summaryId },
      data: {
        [TRANSLATION_FIELDS[this.locale][0]]: output.headline,
        [TRANSLATION_FIELDS[this.locale][1]]: output.body,
        [TRANSLATION_FIELDS[this.locale][2]]: output.whyItMatters,
      },
    });
  }
}
