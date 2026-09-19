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

/** digest.date is a plain "YYYY-MM-DD" string (see digest-view.ts) — reformat to "DD.MM.YYYY". */
function formatDateDMY(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  return `${d}.${m}.${y}`;
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
  const impressumUrl = `https://www.punkto.fyi/${locale}/impressum`;
  const why = { tr: "Neden önemli", en: "Why it matters", de: "Warum das wichtig ist" }[locale];
  const viewOnSiteLabel = { tr: "Punkto'da görüntüle", en: "View on Punkto", de: "Auf Punkto ansehen" }[locale];
  const viewOnSiteUrl = `https://www.punkto.fyi/${locale}?utm_source=email&utm_medium=email&utm_campaign=daily_digest`;
  const dateLabel = formatDateDMY(digest.date);
  const subject = {
    tr: `Punkto — ${dateLabel} özeti (${digest.items.length} haber)`,
    en: `Punkto — ${dateLabel} digest (${digest.items.length} stories)`,
    de: `Punkto — Nachrichtenüberblick vom ${dateLabel} (${digest.items.length} Nachrichten)`,
  }[locale];

  const storyText = digest.items
    .map(
      (item, i) =>
        `${i + 1}. [${labels[item.category]}] ${item.headline}\n\n${item.summary}\n\n${why}? ${item.whyItMatters}\n${copy.aiAnalysis}${sourceLinks(item.sourceUrls).length ? `\n\n${copy.sourcesLabel}:\n${sourceLinks(item.sourceUrls).join("\n")}` : ""}`,
    )
    .join("\n\n---\n\n");

  const text = `Punkto — ${dateLabel}\n${copy.description}\n\n${viewOnSiteLabel}: ${viewOnSiteUrl}\n\n${storyText}\n\n${copy.aiDisclosure}\n\n${impressumLabel}: ${impressumUrl}\n${copy.aiFooter}`;

  const html = `<div lang="${locale}" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1E1C19; background-color: #FAF7F1;">
<div style="padding: 24px 24px 16px;">
  <div style="font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #1E1C19;">
    <span style="display: inline-block; width: 10px; height: 10px; background: #9E3527; border-radius: 50%; margin-right: 6px; vertical-align: middle;"></span
    ><span style="vertical-align: middle;">Punkto</span>
  </div>
  <div style="font-size: 12px; color: #6F6558; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 6px;">${escapeHtml(dateLabel)}</div>
</div>
<p style="padding: 0 24px; font-size: 14px; line-height: 1.6; color: #1E1C19;">${escapeHtml(copy.description)}</p>
<p style="padding: 4px 24px 0;"><a href="${viewOnSiteUrl}" style="color: #9E3527; font-size: 13px; font-weight: 600; text-decoration: underline;">${escapeHtml(viewOnSiteLabel)} →</a></p>
<div style="padding: 8px 24px 0;">
${digest.items
  .map(
    (item) => `<div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #E7E0D5;">
  <div style="font-size: 12px; color: #6F6558; text-transform: uppercase;">${escapeHtml(labels[item.category])}</div>
  <h2 style="font-size: 16px; margin: 4px 0 8px; color: #1E1C19;">${escapeHtml(item.headline)}</h2>
  <p style="font-size: 14px; line-height: 1.5; color: #1E1C19;">${escapeHtml(item.summary).replace(/\n/g, "<br/>")}</p>
  <p style="font-size: 13px; background: #F2EEE6; color: #1E1C19; padding: 8px 12px; border-radius: 6px;"><strong>${why}?</strong> ${escapeHtml(item.whyItMatters)}</p>
  <p style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #6F6558;">${escapeHtml(copy.aiAnalysis)}</p>
  ${sourceLinks(item.sourceUrls).length ? `<p style="font-size: 12px; line-height: 1.5; color: #6F6558;">${escapeHtml(copy.sourcesLabel)}: ${sourceLinks(item.sourceUrls).map(url => `<a href="${escapeHtml(url)}" style="color: #6F6558; text-decoration: underline;">${escapeHtml(new URL(url).hostname)}</a>`).join(" · ")}</p>` : ""}
</div>`,
  )
  .join("\n")}
</div>
<footer style="padding: 0 24px 24px; font-size: 12px; font-weight: 400; line-height: 1.5; color: #6F6558;">
  <p>${escapeHtml(copy.aiDisclosure)}</p>
  <a href="${impressumUrl}" style="color: #6F6558; text-decoration: underline;">${escapeHtml(impressumLabel)}</a>
  <p>${escapeHtml(copy.aiFooter)}</p>
</footer>
</div>`;

  return { subject, html, text };
}
