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
    <div className="flex flex-1 items-center justify-center py-16">
      <SignUp
        path={`/${locale}/sign-up`}
        routing="path"
        signInUrl={`/${locale}/sign-in`}
        fallbackRedirectUrl={`/${locale}/dashboard`}
      />
    </div>
  );
}
