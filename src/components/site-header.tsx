import Link from "next/link";
import {
  Show,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "../../brand/Logo";

import { SITE_COPY } from "@/shared/site-copy";
import type { Locale } from "@/shared/locale";
import { LocaleSwitch } from "./locale-switch";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const copy = SITE_COPY[locale];
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="flex items-baseline gap-1">
          <Logo size={22} />
          <span className="hidden text-sm font-medium text-muted-foreground sm:inline">.fyi</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <LocaleSwitch locale={locale} />
          <ThemeToggle label={copy.theme} />
          <Show when="signed-out">
            <Link href={`/${locale}/sign-in`} className="text-sm font-medium">
              {copy.signIn}
            </Link>
            <Link href={`/${locale}/sign-up`} className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background">
              {copy.signUp}
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href={`/${locale}/dashboard`} className="text-sm font-medium">
              {copy.account}
            </Link>
            <UserButton customMenuItems={[{ label: copy.account, href: `/${locale}/dashboard` }]} />
          </Show>
        </div>
      </div>
    </header>
  );
}
