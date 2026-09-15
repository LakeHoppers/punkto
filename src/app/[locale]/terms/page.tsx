import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/shared/locale";
import { TERMS_COPY } from "@/shared/terms-copy";

const RELATED_LABEL: Record<string, string> = {
  tr: "Ayrıca bkz.",
  en: "See also:",
  de: "Siehe auch:",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = TERMS_COPY[locale];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-14 sm:py-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {copy.title}
        </h1>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{copy.updated}</p>
      </div>

      <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-foreground/90">
        {copy.intro.map((paragraph, i) => (
          <p key={i} className="text-pretty">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex flex-col">
        {copy.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3 border-t py-8 first:pt-0">
            <h2 className="font-heading text-xl font-medium">{section.heading}</h2>
            <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-foreground/90">
              {section.body.map((paragraph, i) => (
                <p key={i} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {RELATED_LABEL[locale]}{" "}
        <Link href={`/${locale}/impressum`} className="underline underline-offset-4 hover:text-foreground">
          Impressum
        </Link>
      </p>
    </main>
  );
}
