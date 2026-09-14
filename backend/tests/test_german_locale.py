from types import SimpleNamespace

import pytest

from app.modules.digest.infrastructure.repository import localized
from app.modules.notification.domain.email import build_email
from app.modules.user.domain.preferences import preference_patch


def test_german_projection_is_independent_of_english_and_blank_falls_back():
    summary = SimpleNamespace(headline="Türkçe", headline_en="English", headline_de="Deutsch")
    assert localized(summary, "headline", "de") == "Deutsch"
    assert localized(summary, "headline", "en") == "English"
    summary.headline_de = "  "
    assert localized(summary, "headline", "de") == "Türkçe"


def test_german_email_and_free_preference():
    assert preference_patch({"emailLocale": "de"}, "FREE") == {"emailLocale": "de"}
    with pytest.raises(ValueError):
        preference_patch({"emailLocale": "fr"}, "PRO")
    email = build_email({"date": "2026-09-14", "items": [{"category": "TECHNOLOGY", "headline": "KI <script>", "summary": "Text", "whyItMatters": "Grund"}]}, "de")
    assert "Nachrichtenüberblick" in email["subject"]
    assert "[Technologie] KI" in email["text"]
    assert "Warum das wichtig ist" in email["html"]
    assert "<script>" not in email["html"]
    assert 'lang="de"' in email["html"]


@pytest.mark.parametrize("locale", ["tr", "en", "de"])
def test_email_transparency_in_both_formats(locale):
    from app.shared.home_copy import HOME_COPY

    email = build_email({"date": "2026-09-14", "items": [{"category": "TECHNOLOGY", "headline": "News", "summary": "Text", "whyItMatters": "Reason", "sourceUrls": ["https://example.de/news", "javascript:alert(1)"]}]}, locale)
    for output in (email["html"], email["text"]):
        for field in ("aiDisclosure", "aiAnalysis", "aiFooter"):
            assert HOME_COPY[locale][field] in output
        assert f"https://daily-news-saas.vercel.app/{locale}/impressum" in output
        assert "https://example.de/news" in output
        assert "javascript:" not in output
