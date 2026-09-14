import { HOME_COPY } from "@/shared/home-copy";
import { LOCALES } from "@/shared/locale";
import { describe, expect, it } from "vitest";
import { buildDigestEmail } from "@/modules/notification/domain/email-template";
import type { DigestView } from "@/modules/digest/domain/types";

const DIGEST: DigestView = {
  digestId: "digest-1",
  date: "2026-07-27",
  items: [
    {
      rank: 1,
      storyId: "story-1",
      category: "POLITICS",
      headline: "Bir <script>alert(1)</script> başlık",
      summary: "İlk paragraf.\nİkinci paragraf.",
      whyItMatters: "Önemli çünkü \"test\".",
      tags: ["etiket"],
      sourceUrls: ["https://example.de/a"],
    },
  ],
};

describe("buildDigestEmail", () => {
  it("includes the date and item count in the subject", () => {
    const { subject } = buildDigestEmail(DIGEST);
    expect(subject).toContain("2026-07-27");
    expect(subject).toContain("1 haber");
  });

  it("escapes HTML-unsafe characters from AI-generated content", () => {
    const { html } = buildDigestEmail(DIGEST);
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("includes the plain-text fallback with headline and why-it-matters", () => {
    const { text } = buildDigestEmail(DIGEST);
    expect(text).toContain("İlk paragraf.");
    expect(text).toContain("Önemli çünkü");
  });

  it("renders one block per digest item", () => {
    const twoItemDigest: DigestView = {
      ...DIGEST,
      items: [DIGEST.items[0], { ...DIGEST.items[0], storyId: "story-2", rank: 2 }],
    };
    const { text } = buildDigestEmail(twoItemDigest);
    expect(text.split("---")).toHaveLength(2);
  });
});

it.each(LOCALES)("includes %s disclosure, commentary caption, sources and absolute legal footer in both formats", locale => {
  const { html, text } = buildDigestEmail(DIGEST, locale);
  const copy = HOME_COPY[locale];
  for (const output of [html, text]) {
    expect(output.split(copy.aiDisclosure)).toHaveLength(2);
    expect(output.indexOf(copy.aiDisclosure)).toBeLessThan(output.indexOf("İlk paragraf"));
    expect(output).toContain(copy.aiAnalysis);
    expect(output).toContain(copy.aiFooter);
    expect(output).toContain(`https://www.punkto.fyi/${locale}/impressum`);
    expect(output).toContain("https://example.de/a");
  }
  expect(html).not.toContain("aria-hidden");
  expect(html).toContain('font-weight: 400');
});
it("filters unsafe source schemes and escapes quoted URLs without duplicating links", () => {
  const email = buildDigestEmail({ ...DIGEST, items: [{ ...DIGEST.items[0], sourceUrls: ["javascript:alert(1)", "broken", "https://example.de/a", "https://example.de/a", 'https://example.de/?q="quoted"&v=1'] }] });
  expect(email.html).not.toContain("javascript:");
  expect(email.text).not.toContain("javascript:");
  expect(email.html.split('href="https://example.de/a"')).toHaveLength(2);
  expect(email.html).toContain("&quot;quoted&quot;&amp;v=1");
});
