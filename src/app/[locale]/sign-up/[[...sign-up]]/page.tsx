import { InAppBrowserNotice } from "@/components/in-app-browser-notice";
import { SignUp } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/locale";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16">
      <InAppBrowserNotice locale={locale} />
      <SignUp
        path={`/${locale}/sign-up`}
        routing="path"
        signInUrl={`/${locale}/sign-in`}
        fallbackRedirectUrl={`/${locale}/dashboard`}
      />
    </div>
  );
}
