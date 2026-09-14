import { beforeEach, expect, it, vi } from "vitest";
const { findMany, update, query } = vi.hoisted(() => ({ findMany: vi.fn(), update: vi.fn(), query: vi.fn() }));
vi.mock("@/shared/prisma", () => ({ prisma: { story: { findMany }, summary: { update }, $queryRaw: query } }));
import { PrismaTranslatorRepository } from "@/modules/ai/translator/infrastructure/prisma-translator-repository";
import { TranslateStoriesUseCase } from "@/modules/ai/translator/application/translate-stories.use-case";
const output = { headline: "KI", body: "Deutscher Text", whyItMatters: "Darum" };
beforeEach(() => { vi.clearAllMocks(); query.mockResolvedValue([]); });
it("retries only the missing target language and stops after saving it", async () => {
  const summary = { id: "sum", headline: "YZ", body: "Metin", whyItMatters: "Önem", headlineEn: "AI", bodyEn: "English", whyItMattersEn: "Why", headlineDe: "KI", bodyDe: " ", whyItMattersDe: null };
  findMany.mockResolvedValue([{ id: "story", summaries: [summary] }]);
  update.mockImplementation(async ({ data }) => Object.assign(summary, data));
  const translator = { translate: vi.fn().mockResolvedValue(output) };
  expect(await new TranslateStoriesUseCase(new PrismaTranslatorRepository("en"), translator).execute(["story"])).toEqual({ translated: 0, failed: 0 });
  const de = new TranslateStoriesUseCase(new PrismaTranslatorRepository("de"), translator);
  expect(await de.execute(["story"])).toEqual({ translated: 1, failed: 0 });
  expect(update.mock.calls[0][0].data).toEqual({ headlineDe: "KI", bodyDe: "Deutscher Text", whyItMattersDe: "Darum" });
  expect(summary.headlineEn).toBe("AI");
  expect(await de.execute(["story"])).toEqual({ translated: 0, failed: 0 });
  expect(translator.translate).toHaveBeenCalledTimes(1);
});
it("selects latest published German versions with a bounded historical retry query", async () => {
  await new PrismaTranslatorRepository("de").getPublishedUntranslatedSummaries(["today"], 5);
  const sql = query.mock.calls[0][0];
  expect(sql.text).toContain('s."headlineDe"');
  expect(sql.text).not.toContain('s."headlineEn"');
  expect(sql.text).toContain('newer.version > s.version');
  expect(sql.text).toContain('"DigestItem"');
  expect(sql.values).toEqual(["today", 5]);
});

it("retries a nonempty German result that just copied the original Turkish body", async () => {
  findMany.mockResolvedValue([{ id: "story", summaries: [{ id: "sum", headline: "YZ", body: "Türkçe metin", whyItMatters: "Önem", headlineDe: "YZ", bodyDe: "Türkçe metin", whyItMattersDe: "Önem" }] }]);
  expect(await new PrismaTranslatorRepository("de").getUntranslatedSummaries(["story"])).toHaveLength(1);
});
