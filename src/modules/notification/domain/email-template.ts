import type { DigestView } from "@/modules/digest/domain/types";
import { CATEGORY_LABELS } from "@/shared/category-labels";

import { HOME_COPY } from "@/shared/home-copy";
import { IMPRESSUM_COPY } from "@/shared/impressum-copy";

import type { Locale } from "@/shared/locale";

export interface DigestEmailContent {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Email links must be absolute and safe even for malformed imported source URLs. */
function sourceLinks(urls: string[]): string[] {
  return [...new Set(urls)].filter(value => {
    try { return ["https:", "http:"].includes(new URL(value).protocol); }
    catch { return false; }
  });
}

/** Pure formatter: given a digest, produces the subject/HTML/plain-text for the delivery email. */
export function buildDigestEmail(digest: DigestView, locale: Locale = "tr"): DigestEmailContent {
  const labels = CATEGORY_LABELS[locale];
  const copy = HOME_COPY[locale];
  const impressumLabel = IMPRESSUM_COPY[locale].title;
  const impressumUrl = `https://daily-news-saas.vercel.app/${locale}/impressum`;
  const why = { tr: "Neden önemli", en: "Why it matters", de: "Warum das wichtig ist" }[locale];
  const subject = {
    tr: `Punkto — ${digest.date} özeti (${digest.items.length} haber)`,
    en: `Punkto — ${digest.date} digest (${digest.items.length} stories)`,
    de: `Punkto — Nachrichtenüberblick vom ${digest.date} (${digest.items.length} Nachrichten)`,
  }[locale];

  const storyText = digest.items
    .map(
      (item, i) =>
        `${i + 1}. [${labels[item.category]}] ${item.headline}\n\n${item.summary}\n\n${why}: ${item.whyItMatters}\n${copy.aiAnalysis}${sourceLinks(item.sourceUrls).length ? `\n\n${copy.sourcesLabel}:\n${sourceLinks(item.sourceUrls).join("\n")}` : ""}`,
    )
    .join("\n\n---\n\n");

  const text = `Punkto — ${digest.date}\n${copy.aiDisclosure}\n\n${storyText}\n\n${impressumLabel}: ${impressumUrl}\n${copy.aiFooter}`;

  const html = `<div lang="${locale}" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; background-color: #fff;">
<h1 style="font-size: 20px;">Punkto — ${escapeHtml(digest.date)}</h1>
<p style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #666;">${escapeHtml(copy.aiDisclosure)}</p>
${digest.items
  .map(
    (item) => `<div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e5e5e5;">
  <div style="font-size: 12px; color: #666; text-transform: uppercase;">${escapeHtml(labels[item.category])}</div>
  <h2 style="font-size: 16px; margin: 4px 0 8px;">${escapeHtml(item.headline)}</h2>
  <p style="font-size: 14px; line-height: 1.5;">${escapeHtml(item.summary).replace(/\n/g, "<br/><br/>")}</p>
  <p style="font-size: 13px; background: #f5f5f5; padding: 8px 12px; border-radius: 6px;"><strong>${why}:</strong> ${escapeHtml(item.whyItMatters)}</p>
  <p style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #666;">${escapeHtml(copy.aiAnalysis)}</p>
  ${sourceLinks(item.sourceUrls).length ? `<p style="font-size: 12px; line-height: 1.5; color: #666;">${escapeHtml(copy.sourcesLabel)}: ${sourceLinks(item.sourceUrls).map(url => `<a href="${escapeHtml(url)}" style="color: #666; text-decoration: underline;">${escapeHtml(new URL(url).hostname)}</a>`).join(" · ")}</p>` : ""}
</div>`,
  )
  .join("\n")}
<footer style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #666;">
  <a href="${impressumUrl}" style="color: #666; text-decoration: underline;">${escapeHtml(impressumLabel)}</a>
  <p>${escapeHtml(copy.aiFooter)}</p>
</footer>
</div>`;

  return { subject, html, text };
}
