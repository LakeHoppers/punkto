import { headers } from "next/headers";
import type { Locale } from "@/shared/locale";
import { SITE_COPY } from "@/shared/site-copy";

/** Best-effort guidance only: user-agent detection must never gate authentication. */
export async function InAppBrowserNotice({ locale }: { locale: Locale }) {
  const userAgent = (await headers()).get("user-agent") ?? "";
  if (!/Instagram/i.test(userAgent)) return null;
  return (
    <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
      {SITE_COPY[locale].instagramAuthNotice}
    </p>
  );
}
