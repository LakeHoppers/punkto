from html import escape
from urllib.parse import urlsplit

from app.shared.home_copy import HOME_COPY

LABELS = {
    "POLITICS": "Politika",
    "ECONOMY": "Ekonomi",
    "IMMIGRATION": "Göç",
    "BERLIN": "Berlin",
    "TECHNOLOGY": "Teknoloji",
    "EUROPE": "Avrupa",
    "BUSINESS": "İş Dünyası",
    "SOCIETY": "Toplum",
    "SPORTS": "Spor",
}


def html_escape(text):
    return escape(text, quote=True).replace("&#x27;", "&#39;")


def source_links(urls):
    result = []
    for value in dict.fromkeys(urls):
        try:
            url = urlsplit(value)
            if url.scheme in ("https", "http") and url.hostname:
                result.append(value)
        except ValueError:
            pass
    return result


def build_email(digest, locale="tr"):
    if locale not in ("tr", "en", "de"):
        locale = "tr"
    labels = LABELS if locale == "tr" else dict(zip(LABELS, {
        "en": ["Politics", "Economy", "Immigration", "Berlin", "Technology", "Europe", "Business", "Society", "Sports"],
        "de": ["Politik", "Wirtschaft", "Migration", "Berlin", "Technologie", "Europa", "Unternehmen", "Gesellschaft", "Sport"],
    }[locale], strict=True))
    why = {"tr": "Neden önemli", "en": "Why it matters", "de": "Warum das wichtig ist"}[locale]
    copy = HOME_COPY[locale]
    impressum_url = f"https://daily-news-saas.vercel.app/{locale}/impressum"
    items = digest["items"]
    subject = f"News Daily — {digest['date']} özeti ({len(items)} haber)"
    if locale == "en":
        subject = f"News Daily — {digest['date']} digest ({len(items)} stories)"
    elif locale == "de":
        subject = f"News Daily — Nachrichtenüberblick vom {digest['date']} ({len(items)} Nachrichten)"
    plain = "\n\n---\n\n".join(
        f"{i + 1}. [{labels[item['category']]}] {item['headline']}\n\n{item['summary']}\n\n{why}: {item['whyItMatters']}\n{copy['aiAnalysis']}"
        + ("\n\n" + copy["sourcesLabel"] + ":\n" + "\n".join(source_links(item.get("sourceUrls", []))) if source_links(item.get("sourceUrls", [])) else "")
        for i, item in enumerate(items)
    )
    plain = f"News Daily — {digest['date']}\n{copy['aiDisclosure']}\n\n{plain}\n\n{copy['impressum']}: {impressum_url}\n{copy['aiFooter']}"
    blocks = []
    for item in items:
        summary = html_escape(item["summary"]).replace("\n", "<br/><br/>")
        urls = source_links(item.get("sourceUrls", []))
        links = " · ".join(f'<a href="{html_escape(url)}" style="color: #666; text-decoration: underline;">{html_escape(urlsplit(url).hostname)}</a>' for url in urls)
        sources = f'<p style="font-size: 12px; line-height: 1.5; color: #666;">{html_escape(copy["sourcesLabel"])}: {links}</p>' if urls else ""
        blocks.append(f"""<div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e5e5e5;">
  <div style="font-size: 12px; color: #666; text-transform: uppercase;">{html_escape(labels[item["category"]])}</div>
  <h2 style="font-size: 16px; margin: 4px 0 8px;">{html_escape(item["headline"])}</h2>
  <p style="font-size: 14px; line-height: 1.5;">{summary}</p>
  <p style="font-size: 13px; background: #f5f5f5; padding: 8px 12px; border-radius: 6px;"><strong>{why}:</strong> {html_escape(item["whyItMatters"])}</p>
  <p style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #666;">{html_escape(copy["aiAnalysis"])}</p>
  {sources}
</div>""")
    joined = "\n".join(blocks)
    html = f"""<div lang="{locale}" style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; background-color: #fff;">
<h1 style="font-size: 20px;">News Daily — {html_escape(digest["date"])}</h1>
<p style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #666;">{html_escape(copy["aiDisclosure"])}</p>
{joined}
<footer style="font-size: 12px; font-weight: 400; line-height: 1.5; color: #666;">
  <a href="{impressum_url}" style="color: #666; text-decoration: underline;">{html_escape(copy["impressum"])}</a>
  <p>{html_escape(copy["aiFooter"])}</p>
</footer>
</div>"""
    return {"subject": subject, "html": html, "text": plain}
