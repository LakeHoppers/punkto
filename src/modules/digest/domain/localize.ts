import type { Locale } from "@/shared/locale";
export type { Locale } from "@/shared/locale";

/** Missing or blank translations fall back to Turkish per field. */
export function pickLocalizedText(
  locale: Locale,
  turkish: string,
  english: string | null | undefined,
  german?: string | null,
): string {
  if (locale === "en" && english?.trim()) return english;
  if (locale === "de" && german?.trim()) return german;
  return turkish;
}
