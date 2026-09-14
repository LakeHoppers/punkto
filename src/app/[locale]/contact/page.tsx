import { notFound } from "next/navigation";
import { isLocale } from "@/shared/locale";
import { ContactForm } from "@/components/contact-form";

const CONTACT_COPY: Record<
  string,
  {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    submittingLabel: string;
    successMessage: string;
    errorMessage: string;
  }
> = {
  tr: {
    title: "İletişim",
    description: "Bir sorunuz mu var? Aşağıdaki formu doldur, en kısa sürede dönüş yapalım.",
    nameLabel: "Ad Soyad",
    emailLabel: "E-posta",
    messageLabel: "Mesajınız",
    submitLabel: "Gönder",
    submittingLabel: "Gönderiliyor...",
    successMessage: "Mesajınız alındı, en kısa sürede dönüş yapacağız.",
    errorMessage: "Bir şeyler ters gitti, lütfen tekrar deneyin.",
  },
  en: {
    title: "Contact",
    description: "Have a question? Fill out the form below and we'll get back to you.",
    nameLabel: "Full name",
    emailLabel: "Email",
    messageLabel: "Message",
    submitLabel: "Send",
    submittingLabel: "Sending...",
    successMessage: "Your message has been received — we'll get back to you soon.",
    errorMessage: "Something went wrong, please try again.",
  },
  de: {
    title: "Kontakt",
    description: "Haben Sie eine Frage? Füllen Sie das Formular aus, wir melden uns bei Ihnen.",
    nameLabel: "Vollständiger Name",
    emailLabel: "E-Mail",
    messageLabel: "Nachricht",
    submitLabel: "Senden",
    submittingLabel: "Wird gesendet...",
    successMessage: "Ihre Nachricht wurde empfangen, wir melden uns in Kürze.",
    errorMessage: "Etwas ist schiefgelaufen, bitte versuchen Sie es erneut.",
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = CONTACT_COPY[locale];

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-4 py-14 sm:py-20">
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {copy.title}
        </h1>
        <p className="text-pretty text-[15px] leading-relaxed text-foreground/90">{copy.description}</p>
      </div>
      <ContactForm copy={copy} />
    </main>
  );
}
