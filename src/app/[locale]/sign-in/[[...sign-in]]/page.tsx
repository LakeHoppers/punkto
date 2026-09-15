import { SignIn } from "@clerk/nextjs";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/locale";

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="flex flex-1 items-center justify-center py-16">
      <SignIn
        path={`/${locale}/sign-in`}
        routing="path"
        signUpUrl={`/${locale}/sign-up`}
        fallbackRedirectUrl={`/${locale}/dashboard`}
      />
    </div>
  );
}
