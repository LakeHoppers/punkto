# Roadmap

## M0 — Foundation ✅
Next.js + TS + Tailwind + shadcn init, Prisma + Postgres wired (now Neon),
Clerk auth wired, repo/folder structure, CI lint/test/typecheck.

## M1 — Ingestion pipeline ✅
`Source` model + config, RSS fetcher, `RawArticle` storage, `ScrapeLog`,
manual admin-triggered run (no AI yet) — prove raw collection works
end-to-end.

## M2 — Dedup & clustering ✅
Embedding generation, similarity clustering into `Story`, basic importance
scoring (source trust + recency + cross-source count).

## M3 — AI summarization ✅
`AIProvider` abstraction + OpenAI implementation, structured fact extraction
→ Turkish headline/summary/why-it-matters/category/tags, `Summary` model
populated.

## M4 — Digest assembly + web dashboard ✅
`Digest`/`DigestItem` generation from ranked Stories, public + authenticated
digest views in the Next.js frontend, favorite-categories filter.

## M5 — Delivery: Email ✅
Daily email via a transactional provider, per-user timezone-aware send via
`/api/cron/deliver`, `DigestDelivery` tracking.

## M6 — Delivery: Telegram — **cut, will not be built**
Deliberately dropped (2026-07-27): no Telegram integration wanted. Left in
this doc only so the milestone numbering below stays stable; nothing in M6
should be started.

## M7 — Monetization ✅
Stripe Checkout + Billing Portal + webhook, Free/Pro gating (Pro = all
categories + earlier delivery + ad-free). Live-verified 2026-09-09 with a
real test-mode checkout: real Stripe customer/subscription created,
`customer.subscription.created` webhook fired and verified, `Subscription`
row synced to PRO/ACTIVE, dashboard correctly shows "Pro üye". Pricing:
€4.99/month via Stripe Managed Payments (Stripe as merchant of record for
VAT). Billing Portal (cancel/update card) round-trip verified 2026-09-11 (see
TODO.md). **2026-09-14: new-signup checkout intentionally hidden** behind a
`BILLING_ENABLED` feature flag (default off) — trademark filing and rebrand
aren't finalized yet, so we're not accepting new Pro payments for now. Free
tier, portal/cancellation, and webhook sync are all unaffected; flip the flag
back on when ready. See TODO.md.

## M8 — Admin panel ✅
Source management UI, force refresh, summary editing (versioned), pipeline
run/log viewer, audit log.

## M9 — Hardening & launch
First deploy and verify automatic scheduling, resolving hourly cron plan
compatibility and the single-request pipeline timeout risk. Then test coverage
across modules, error alerting (Sentry), rate limiting, docs
finalized, soft launch to a small user group.

## M10 — Premium feature expansion (2026-09-16)
Prioritized with Emre; mobile app pushed to the back deliberately (native app
is a much bigger, separate undertaking — a PWA is a cheaper interim step once
the others land, not started).
- **Custom delivery hour + full category access** — already built in M7
  (`digestHour`/`timezone` + `clampDigestHourForPlan`/`clampCategoriesForPlan`)
  but dormant behind the `BILLING_ENABLED` flag pending trademark/rebrand
  completion. No new engineering needed — just flip the flag when ready.
- **Wider category taxonomy, Pro-selectable ✅** — taxonomy grew from 10 to
  14: added HEALTH, EDUCATION, ENVIRONMENT, HOUSING (confirmed with Emre),
  same careful treatment as PANORAMA (prompt boundaries, migration,
  labels/colors) — see TODO.md 2026-09-16.
- **Personalized PRO digest ✅** — the shared digest's 10-item/4-per-category
  cap meant a user favoriting 1-2 categories saw only a thin filtered slice
  of it (verified: 4/10 for Politics, 2/10 for Culture on the same day).
  Added `getPersonalizedDigest`, sourcing a top-10 directly from the
  favorited categories' own story pool instead of filtering the shared
  digest; wired into email delivery for PRO users with favorites set.
  Verified live: Politics went 4 → 10. Decision with Emre: a genuinely thin
  category (e.g. only 3 real stories that day) still shows only those 3 for
  now — no backfill with unrelated top stories. Extended the same day to
  the dashboard's history view too (`getPersonalizedDigestHistory`), so the
  site and the daily email now agree.
- **Category-selection Premium teaser ✅** — Free users could check
  unlimited categories client-side; only 1 was ever saved (silently
  clamped server-side). Categories past the Free limit now show a lock icon
  and the same "expanded premium edition" teaser used on the billing card,
  so the restriction reads as a marketing moment rather than a bug.
- **Voice/audio digest** — TTS-generated audio version of the daily digest,
  one file per locale per day (not per subscriber — same content for everyone
  in a given language, so cost stays flat regardless of subscriber count).
  Not started; provider (OpenAI TTS vs. ElevenLabs) not yet chosen.

## Rebrand: "News Daily" → "Punkto" — 2026-09-14
Final brand name decided (see `punkto-marka-karar-ve-gecis-dokumani.md` for the
full naming rationale, trademark filing plan, and rename checklist). Live domain:
[punkto.fyi](https://www.punkto.fyi), bought and connected via Vercel. Completed
this pass: all user-facing UI/email/package copy renamed, GitHub repo renamed to
`LakeHoppers/punkto`, Stripe product renamed to "Punkto Pro" (business name,
Vercel project name, and Clerk application name updated directly by Emre),
Google Search Console verified, placeholder "P" app icon (real logo still
pending design), homepage description now carries the per-locale tagline
("Haberler, özetle." / "News, to the point." / "Nachrichten, auf den Punkt." —
revised same day from a Germany-only framing, since the digest also carries
world-news stories filtered through German press, not just domestic news).
Not yet started: DPMA trademark filing, business registration (still
deliberately deferred until real revenue — see TODO.md).

## Deferred to Emre (not blocking other milestones) — Resend domain: done 2026-09-14
`punkto.fyi` added to Resend (EU region) with DKIM/SPF/MX DNS records created via
Vercel; verification was still propagating as of this pass — see TODO.md for
current status before assuming it's live. `EMAIL_FROM_ADDRESS` still needs
updating to the new domain once verification completes.

## Risks to keep in view

| Risk | Mitigation |
|---|---|
| Legal: scraping vs. German publisher copyright (Leistungsschutzrecht) | RSS/APIs first-class; scraping only with per-source legal review; store facts/short excerpts, never full article text |
| AI hallucination / factual drift | Ground summaries in extracted facts, cite source URLs, admin edit workflow |
| Duplicate/clustering false merges or misses | Tune embedding-similarity threshold against a labeled test set |
| OpenAI cost at scale | Cache summaries per story, batch prompts, track token cost per `PipelineRun` |
| Source feed breakage | `ScrapeLog` per source per run + alerting on repeated failures |
| Email deliverability | Transactional provider with SPF/DKIM/DMARC |
| Vercel function timeout on full pipeline | Chain pipeline steps via a queue (Inngest/QStash) rather than one function |
| GDPR / data privacy | Minimal PII, Clerk EU data residency, clear privacy policy |
| Turkish translation nuance | Prompt glossary for German proper nouns/political terms + admin edit backstop |
| Single AI provider dependency | Provider abstraction enables failover to Claude/Gemini |

### Free-tier runtime verification
Hourly delivery workflow implemented using GitHub Actions (remote secret/URL and
activation pending). Five-worker summarization reduced the latest live run to 128.35s versus
Hobby's 300s limit (different embedding workload from the earlier 336.96s run).
Keep the single-stage pipeline for now and validate deployed runtime. Delivery
catches up after the preferred hour and deduplicates successful sends.
See [DEPLOYMENT.md](DEPLOYMENT.md).

Python migration phases 0–1 are locally verified. Proposed phases 2–4 (not yet authorized) and scope/effort estimates are in [PYTHON_MIGRATION.md](PYTHON_MIGRATION.md).


### Python migration sequencing — 2026-09-08
2a read-only ingestion/dedup/ranking replay is implemented and live-compared.
2b covers real AI adapters/samples; 2c covers manual full runs with isolated output.
Production scheduler and authoritative writer cutover remain phase 4. Current
estimates: 2a 3–5, 2b 2–4, 2c 2–3 engineering days; see PYTHON_MIGRATION.md.


Phases 2b–2c add manual Python AI/full-pipeline verification commands only. The
local orchestrator uses isolated JSON state, dependency-injected AI ports and no
production write repository. HTTP contracts, frontend behavior and production
scheduling are unchanged. See PYTHON_PIPELINE_VERIFICATION.md for evidence.
