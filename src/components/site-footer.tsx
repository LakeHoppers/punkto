import { CookieSettings } from "./analytics-consent";
import Link from "next/link";
import type { Locale } from "@/shared/locale";
import { SITE_COPY } from "@/shared/site-copy";

const TERMS_LABEL: Record<Locale, string> = {
  tr: "Kullanım Koşulları",
  en: "Terms of Service",
  de: "Nutzungsbedingungen",
};

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Punkto</span>
        <span>{SITE_COPY[locale].footer}</span>
        <div className="flex flex-wrap items-center gap-3">
          <CookieSettings locale={locale} />
          <Link href={`/${locale}/impressum`} className="hover:text-foreground hover:underline">
            Impressum
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-foreground hover:underline">
            {SITE_COPY[locale].privacyLink}
          </Link>
          <Link href={`/${locale}/terms`} className="hover:text-foreground hover:underline">
            {TERMS_LABEL[locale]}
          </Link>
        </div>
      </div>
    </footer>
  );
}
