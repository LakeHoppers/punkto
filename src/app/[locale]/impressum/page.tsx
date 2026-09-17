import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/locale";
import { IMPRESSUM_COPY } from "@/shared/impressum-copy";
import { buildAlternates, buildSocialMetadata } from "@/shared/seo";

const RELATED_LABEL: Record<string, string> = {
  tr: "Ayrıca bkz.",
  en: "See also:",
  de: "Siehe auch:",
};

const DESCRIPTION: Record<string, string> = {
  tr: "Punkto'nun yasal işletmeci bilgileri ve iletişim adresi.",
  en: "Punkto's legal operator information and contact address.",
  de: "Anbieterkennzeichnung und Kontaktadresse von Punkto.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: IMPRESSUM_COPY[locale].title,
    description: DESCRIPTION[locale],
    alternates: buildAlternates("/impressum", locale),
    ...buildSocialMetadata(locale, IMPRESSUM_COPY[locale].title, DESCRIPTION[locale]),
  };
}

const PRIVACY_LABEL: Record<string, string> = {
  tr: "Gizlilik Politikası",
  en: "Privacy Policy",
  de: "Datenschutzerklärung",
};

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = IMPRESSUM_COPY[locale];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-14 sm:py-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {copy.title}
        </h1>
      </div>

      <div className="flex flex-col">
        {copy.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3 border-t py-8 first:pt-0">
            <h2 className="font-heading text-xl font-medium">{section.heading}</h2>
            <div className="flex flex-col gap-1 text-[15px] leading-relaxed text-foreground/90">
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t pt-8">
        <Link
          href={`/${locale}/contact`}
          className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
        >
          {copy.contactCta}
        </Link>

        {copy.bindingNote ? (
          <p className="text-xs text-muted-foreground text-pretty">{copy.bindingNote}</p>
        ) : null}

        <p className="text-xs text-muted-foreground">
          {RELATED_LABEL[locale]}{" "}
          <Link href={`/${locale}/privacy`} className="underline underline-offset-4 hover:text-foreground">
            {PRIVACY_LABEL[locale]}
          </Link>
        </p>
      </div>
    </main>
  );
}
