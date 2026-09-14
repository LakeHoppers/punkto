export const CONSENT_KEY = "news-daily.analytics-consent.v1";
export type Consent = "accepted" | "declined" | null;
export const parseConsent = (value: string | null): Consent =>
  value === "accepted" || value === "declined" ? value : null;

export interface AnalyticsPorts {
  read(key: string): string | null;
  write(key: string, value: string): void;
  start(): void;
  stop(): void;
  event(name: string, params: Record<string, string>): void;
}

/** No tracking commands (including consent pings) before explicit acceptance. */
export function createAnalytics(ports: AnalyticsPorts) {
  let consent = parseConsent(ports.read(CONSENT_KEY));
  let started = false;
  let lastPath: string | null = null;
  const seen = new Set<string>();
  const start = () => {
    if (consent === "accepted" && !started) { ports.start(); started = true; }
  };
  return {
    get consent() { return consent; },
    choose(value: Exclude<Consent, null>) {
      consent = value;
      ports.write(CONSENT_KEY, value);
      if (value === "declined" && started) { started = false; ports.stop(); }
    },
    page(path: string) {
      if (consent !== "accepted") return;
      start();
      // Never send query strings, auth callbacks, arbitrary IDs, or account URLs.
      const safePath = path.match(/^\/(tr|en|de)(?:\/(privacy|impressum))?\/?$/)?.[0];
      if (!safePath || safePath === lastPath) return;
      lastPath = safePath;
      ports.event("page_view", { page_path: safePath });
    },
    signup(attempt: { status: string | null; createdUserId: string | null } | undefined) {
      if (attempt?.status !== "complete" || !attempt.createdUserId) return;
      const key = `news-daily.signup.${attempt.createdUserId}`;
      if (seen.has(key) || ports.read(key)) return;
      seen.add(key);
      // Remember denied activity only in memory, without analytics storage.
      if (consent !== "accepted") return;
      ports.write(key, "observed");
      start();
      ports.event("sign_up", { method: "clerk" });
    },
  };
}
