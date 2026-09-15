"use client";
import { usePathname } from "next/navigation";
import { LOCALES, switchLocalePath, type Locale } from "@/shared/locale";
import { trackEvent } from "@/components/analytics-consent";
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  if (/^\/tr\/admin(?:\/|$)/.test(pathname)) return null;
  return <nav aria-label={({ tr: "Dil", en: "Language", de: "Sprache" })[locale]} className="flex gap-1 text-xs">
    {LOCALES.map((next) => (
      // Full navigation also resets Clerk's locale and any open account modal.
      <a key={next} href={switchLocalePath(pathname, next)} hrefLang={next}
        aria-current={locale === next ? "page" : undefined}
        onClick={() => { if (next !== locale) trackEvent("locale_switch", { from: locale, to: next }); }}
        className={locale === next ? "font-semibold" : "text-muted-foreground"}>{next.toUpperCase()}</a>
    ))}
  </nav>;
}
