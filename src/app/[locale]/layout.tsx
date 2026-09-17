import { AnalyticsConsent } from "@/components/analytics-consent";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { AppClerkProvider } from "@/components/app-clerk-provider";
import { ThemeProvider } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import "../globals.css";
import { notFound } from "next/navigation";
import { SITE_COPY } from "@/shared/site-copy";
import { isLocale } from "@/shared/locale";
import { SITE_URL } from "@/shared/site-url";
import { buildSocialMetadata } from "@/shared/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = SITE_COPY[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: "Punkto", template: "%s | Punkto" },
    description: copy.description,
    ...buildSocialMetadata(locale, "Punkto", copy.description),
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children, params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData locale={locale} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppClerkProvider locale={locale}>
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
            <AnalyticsConsent locale={locale} />
          </AppClerkProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
