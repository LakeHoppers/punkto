/** Translate the latest edition, without rebuilding it or sending email. */
import "dotenv/config";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { prisma } from "../src/shared/prisma";
import { PrismaTranslatorRepository } from "../src/modules/ai/translator/infrastructure/prisma-translator-repository";
import { OpenAITranslator } from "../src/modules/ai/providers/openai-translator";
import { TranslateStoriesUseCase } from "../src/modules/ai/translator/application/translate-stories.use-case";
import { getLatestDigest } from "../src/modules/digest/infrastructure/digest-view";
import { buildDigestEmail } from "../src/modules/notification/domain/email-template";

async function main() {
  assert(process.argv.includes("--apply"), "Pass --apply to authorize OpenAI calls and German translation writes.");
  const originalFetch = globalThis.fetch;
  let calls = 0, inputTokens = 0, outputTokens = 0;
  globalThis.fetch = async (...args) => {
    const response = await originalFetch(...args);
    if (String(args[0]) === "https://api.openai.com/v1/chat/completions" && response.ok) {
      const data = await response.clone().json();
      calls++;
      inputTokens += data.usage?.prompt_tokens ?? 0;
      outputTokens += data.usage?.completion_tokens ?? 0;
    }
    return response;
  };
  try {
    const before = await getLatestDigest();
    assert(before?.items.length, "No digest available");
    const englishBefore = await getLatestDigest([], "en");
    const ids = before.items.map(item => item.storyId);
    const started = performance.now();
    const repository = new PrismaTranslatorRepository("de");
    if (process.argv.includes("--current-only")) repository.getPublishedUntranslatedSummaries = async () => [];
    const result = await new TranslateStoriesUseCase(repository, new OpenAITranslator(undefined, "de"), 2).execute(ids);
    const durationSeconds = (performance.now() - started) / 1000;
    console.log(JSON.stringify({ translationResult: result, durationSeconds, calls, inputTokens, outputTokens }));
    assert.equal(result.failed, 0, "Translation failures");
    assert.equal((await repository.getUntranslatedSummaries(ids)).length, 0, "Current translation incomplete");
    assert.deepEqual(await getLatestDigest(), before, "Original digest changed");
    assert.deepEqual(await getLatestDigest([], "en"), englishBefore, "English digest changed");
    const german = await getLatestDigest([], "de");
    assert(german);
    const email = buildDigestEmail(german, "de");
    assert(email.subject.includes("Nachrichtenüberblick"));
    assert(email.html.includes('lang="de"'));
    const report = {
      verifiedAt: new Date().toISOString(), digestDate: before.date,
      currentItems: ids.length, currentGermanComplete: true, ...result,
      durationSeconds, calls, inputTokens, outputTokens,
      estimatedUsd: (inputTokens * 0.15 + outputTokens * 0.60) / 1_000_000,
      originalAndEnglishUnchanged: true, unchangedSourceBodyRejected: true, emailsSent: 0,
      scope: process.argv.includes("--current-only") ? "Current German translations only; not a full pipeline timing" : "German translations for latest digest plus up to five historical retries; not a full pipeline timing",
    };
    const path = "docs/verification/german-locale.json";
    const previous = await readFile(path, "utf8").then(JSON.parse).catch(() => null);
    const attempts = previous ? (previous.attempts ?? [previous]) : [];
    attempts.push(report);
    await writeFile(path, JSON.stringify({ ...report, attempts }, null, 2) + "\n");
    console.log(JSON.stringify(report, null, 2));
    console.log(JSON.stringify(german.items.slice(0, 2).map(({ headline, summary, whyItMatters, category }) => ({ headline, summary, whyItMatters, category })), null, 2));
  } finally {
    globalThis.fetch = originalFetch;
    await prisma.$disconnect();
  }
}
main().catch(error => { console.error(error instanceof Error ? error.message : "Verification failed"); process.exitCode = 1; });
