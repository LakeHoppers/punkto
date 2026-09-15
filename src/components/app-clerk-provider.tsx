"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS, trTR, deDE } from "@clerk/localizations";
import { useTheme } from "next-themes";
import type { Locale } from "@/shared/locale";

const LOCALIZATIONS = { en: enUS, tr: trTR, de: deDE };

const FONT_FAMILY = "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif";

const LIGHT_VARIABLES = {
  colorPrimary: "#1c1917",
  colorPrimaryForeground: "#fefdfb",
  colorForeground: "#1c1917",
  colorBackground: "#fefdfb",
  fontFamily: FONT_FAMILY,
  borderRadius: "0.5rem",
};

const DARK_VARIABLES = {
  colorPrimary: "#f0ece7",
  colorPrimaryForeground: "#211d1a",
  colorForeground: "#f0ece7",
  colorBackground: "#211d1a",
  colorNeutral: "#f0ece7",
  colorInput: "#312d2a",
  colorInputForeground: "#f0ece7",
  colorMutedForeground: "#9d9790",
  colorBorder: "rgba(240, 236, 231, 0.15)",
  fontFamily: FONT_FAMILY,
  borderRadius: "0.5rem",
};

export function AppClerkProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <ClerkProvider
      localization={LOCALIZATIONS[locale]}
      signInUrl={`/${locale}/sign-in`}
      signUpUrl={`/${locale}/sign-up`}
      signInFallbackRedirectUrl={`/${locale}/dashboard`}
      signUpFallbackRedirectUrl={`/${locale}/dashboard`}
      afterSignOutUrl={`/${locale}`}
      appearance={{
        variables: isDark ? DARK_VARIABLES : LIGHT_VARIABLES,
      }}
    >
      {children}
    </ClerkProvider>
  );
}
