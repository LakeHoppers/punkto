"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { CONSENT_KEY, createAnalytics } from "@/shared/analytics/consent";
import { SITE_COPY } from "@/shared/site-copy";
import type { Locale } from "@/shared/locale";
import { usePathname } from "next/navigation";

const SETTINGS_EVENT = "news-daily:cookie-settings";
const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const enabled = !!id && /^G-[A-Z0-9]+$/.test(id);
const read = (key: string) => { try { return localStorage.getItem(key); } catch { return null; } };
const write = (key: string, value: string) => { try { localStorage.setItem(key, value); } catch { /* Session-only if storage is unavailable. */ } };

type GoogleWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Partial<Record<`ga-disable-${string}`, boolean>>;
let analytics: ReturnType<typeof createAnalytics> | undefined;
function getAnalytics() {
  if (analytics) return analytics;
  const target = window as unknown as GoogleWindow;
  analytics = createAnalytics({
    read, write,
    start() {
      target[`ga-disable-${id}`] = false;
      target.dataLayer ??= [];
      // Google’s documented queue requires an Arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      target.gtag = function () { target.dataLayer!.push(arguments); };
      target.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
      target.gtag("js", new Date());
      target.gtag("config", id, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: window.location.origin + "/", page_referrer: "", cookie_domain: window.location.hostname, cookie_expires: 60 * 60 * 24 * 365, cookie_update: false });
      const script = document.createElement("script");
      script.id = "news-daily-ga";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id!)}`;
      document.head.appendChild(script);
    },
    stop() {
      target[`ga-disable-${id}`] = true;
      target.dataLayer = [];
      document.getElementById("news-daily-ga")?.remove();
      // Remove only GA cookies; leave Clerk's essential cookies untouched.
      for (const part of document.cookie.split(";")) {
        const name = part.trim().split("=")[0];
        if (name !== "_ga" && !name.startsWith("_ga_")) continue;
        document.cookie = `${name}=; Max-Age=0; path=/`;
        const labels = window.location.hostname.split(".");
        for (let i = 0; i < labels.length; i++) {
          document.cookie = `${name}=; Max-Age=0; path=/; domain=${labels.slice(i).join(".")}`;
        }
      }
      // Removing a script cannot unload its handlers. Reload with persisted denial.
      window.location.reload();
    },
    event(name, params) {
      target.gtag?.("event", name, { ...params, page_location: window.location.origin + (params.page_path ?? "/"), page_referrer: "", page_title: "Punkto" });
    },
  });
  return analytics;
}

/** Fire a custom product event. No-ops silently if analytics is disabled or consent hasn't been given. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (!enabled) return;
  getAnalytics().track(name, params);
}

export function CookieSettings({ locale }: { locale: Locale }) {
  if (!enabled) return null;
  return <button type="button" className="hover:text-foreground hover:underline" onClick={() => window.dispatchEvent(new Event(SETTINGS_EVENT))}>{SITE_COPY[locale].cookieSettings}</button>;
}

export function AnalyticsConsent({ locale }: { locale: Locale }) {
  const clerk = useClerk();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const copy = SITE_COPY[locale];
  useEffect(() => {
    if (!enabled) return;
    const tracker = getAnalytics();
    const open = () => setVisible(true);
    const sync = (event: StorageEvent) => {
      if (event.key === CONSENT_KEY || event.key === null) window.location.reload();
    };
    window.addEventListener(SETTINGS_EVENT, open);
    window.addEventListener("storage", sync);
    // Defer the initial client-only banner state until hydration has completed.
    const timer = setTimeout(() => setVisible(tracker.consent === null), 0);
    const unsubscribe = clerk.addListener(({ client }) => {
      tracker.signup(client?.signUp);
      tracker.signin(client?.signIn);
    });
    return () => { clearTimeout(timer); unsubscribe(); window.removeEventListener(SETTINGS_EVENT, open); window.removeEventListener("storage", sync); };
  }, [clerk]);
  useEffect(() => { if (enabled) getAnalytics().page(pathname); }, [pathname]);
  if (!enabled || !visible) return null;
  const choose = (choice: "accepted" | "declined") => {
    const tracker = getAnalytics();
    tracker.choose(choice);
    tracker.page(pathname);
    setVisible(false);
  };
  return <section aria-label={copy.cookieSettings} className="fixed inset-x-0 bottom-0 z-50 border-t bg-background px-4 py-5 shadow-lg">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4">
      <p className="flex-1 basis-72 text-sm text-muted-foreground">{copy.cookieNotice} <Link className="underline" href={`/${locale}/privacy`}>{copy.privacyLink}</Link></p>
      <div className="flex gap-3">
        <button type="button" className="rounded-md border px-4 py-2 text-sm hover:bg-muted" onClick={() => choose("declined")}>{copy.cookieDecline}</button>
        <button type="button" className="rounded-md border px-4 py-2 text-sm hover:bg-muted" onClick={() => choose("accepted")}>{copy.cookieAccept}</button>
      </div>
    </div>
  </section>;
}
