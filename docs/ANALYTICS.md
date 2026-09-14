# Consent-based Google Analytics 4

`NEXT_PUBLIC_GA_MEASUREMENT_ID` enables the browser integration. It is a public
measurement identifier, configured independently for local, production and preview
builds. Changing it requires a new Next.js build. No schema or scheduler changes.

The localized banner gives equal accept/decline controls. Nothing from Google is
loaded or sent before acceptance (basic consent mode). Declining keeps analytics
blocked. Cookie settings in the footer allow withdrawal: disable collection, clear
GA cookies, and reload to unload Google's handlers. Other tabs reload when the
choice changes. Storage restrictions fall back to the current session only.

Only allowlisted public paths are counted; query strings, fragments, account IDs,
email addresses and private account/admin paths are not included in our events.
Google signals and advertising consent are disabled. The SDK can collect standard
device/browser metadata once enabled. Cookies expire after one year without a
sliding expiry. Signup tracking observes Clerk's `client.signUp.status === complete`
and `createdUserId`, supporting modal and routed flows without counting logins.
The identifier is only used locally for deduplication, never sent to Google.
Completions observed without consent are remembered only in memory, not written
to analytics storage, and are not replayed after consent in that page session. Events queued
by gtag are best-effort; ad blockers, immediate navigation or network failures can
prevent delivery. Analytics counts consented registrations, not total database users.

## GA property setup (outside this repository)

- Mark `sign_up` as a key event in GA Admin → Events/Key events for conversion reports.
- Disable Enhanced Measurement for this web stream (especially history-based page
  views and form interactions). This application sends manual SPA page views and
  signup events; automatic collection would duplicate them and may expose URLs.
- Set user/event data retention to 2 months and review Google data-sharing settings.
- Use DebugView/Realtime to verify a consented registration. Test/preview traffic
  uses the configured ID too; configure GA filters if it should be excluded.

These property-side settings cannot be changed by a measurement ID alone.

References: [Google basic consent](https://developers.google.com/tag-platform/security/concepts/consent-mode),
[sign_up](https://developers.google.com/analytics/devguides/collection/ga4/reference/events#sign_up),
[Google international transfers](https://business.safety.google/adsdatatransfers/).
