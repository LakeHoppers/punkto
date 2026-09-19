import type { Category } from "@/generated/prisma/enums";

/**
 * One muted accent per category, used as a CSS custom property (--cat) so
 * Tailwind's static `[var(--cat)]` arbitrary-value classes stay analyzable
 * at build time while the actual color varies per item at runtime.
 */
export const CATEGORY_ACCENT: Record<Category, string> = {
  POLITICS: "oklch(0.5 0.09 260)",
  ECONOMY: "oklch(0.58 0.13 80)",
  IMMIGRATION: "oklch(0.55 0.09 190)",
  BERLIN: "oklch(0.55 0.16 25)",
  TECHNOLOGY: "oklch(0.5 0.12 290)",
  EUROPE: "oklch(0.6 0.09 230)",
  BUSINESS: "oklch(0.5 0.08 145)",
  SOCIETY: "oklch(0.6 0.11 50)",
  SPORTS: "oklch(0.55 0.12 155)",
  PANORAMA: "oklch(0.55 0.13 330)",
  HEALTH: "oklch(0.55 0.12 102)",
  ENVIRONMENT: "oklch(0.55 0.12 123)",
  EDUCATION: "oklch(0.55 0.13 345)",
  HOUSING: "oklch(0.55 0.13 5)",
};

/**
 * Same accents as CATEGORY_ACCENT, as sRGB hex. Email clients (Outlook,
 * many mobile mail apps, older webmail) don't reliably support oklch() in
 * inline styles, so the HTML email uses this instead of the CSS custom
 * property the website uses. Each value is the sRGB conversion of the
 * matching CATEGORY_ACCENT oklch color (verified via canvas pixel readback)
 * — keep the two in sync if a category's accent color ever changes.
 */
export const CATEGORY_ACCENT_HEX: Record<Category, string> = {
  POLITICS: "#446396",
  ECONOMY: "#a27000",
  IMMIGRATION: "#16827d",
  BERLIN: "#bd413f",
  TECHNOLOGY: "#6355a2",
  EUROPE: "#3f8aac",
  BUSINESS: "#456f46",
  SOCIETY: "#b46b40",
  SPORTS: "#258651",
  PANORAMA: "#9b5295",
  HEALTH: "#807300",
  ENVIRONMENT: "#657c1f",
  EDUCATION: "#a54f83",
  HOUSING: "#ae4c67",
};
