import type { Category } from "@/generated/prisma/enums";

export const CATEGORY_LABELS_TR: Record<Category, string> = {
  POLITICS: "Politika",
  ECONOMY: "Ekonomi",
  IMMIGRATION: "Göç",
  BERLIN: "Berlin",
  TECHNOLOGY: "Teknoloji",
  EUROPE: "Avrupa",
  BUSINESS: "İş Dünyası",
  SOCIETY: "Kültür",
  SPORTS: "Spor",
  PANORAMA: "Panorama",
  HEALTH: "Sağlık",
  EDUCATION: "Eğitim",
  ENVIRONMENT: "Çevre",
  HOUSING: "Konut",
};

export const CATEGORY_LABELS_EN: Record<Category, string> = {
  POLITICS: "Politics",
  ECONOMY: "Economy",
  IMMIGRATION: "Immigration",
  BERLIN: "Berlin",
  TECHNOLOGY: "Technology",
  EUROPE: "Europe",
  BUSINESS: "Business",
  SOCIETY: "Culture",
  SPORTS: "Sports",
  PANORAMA: "Panorama",
  HEALTH: "Health",
  EDUCATION: "Education",
  ENVIRONMENT: "Environment",
  HOUSING: "Housing",
};

export const CATEGORY_LABELS_DE: Record<Category, string> = {
  POLITICS: "Politik", ECONOMY: "Wirtschaft", IMMIGRATION: "Migration", BERLIN: "Berlin",
  TECHNOLOGY: "Technologie", EUROPE: "Europa", BUSINESS: "Unternehmen", SOCIETY: "Kultur", SPORTS: "Sport",
  PANORAMA: "Panorama", HEALTH: "Gesundheit", EDUCATION: "Bildung", ENVIRONMENT: "Umwelt", HOUSING: "Wohnen",
};
export const CATEGORY_LABELS = { tr: CATEGORY_LABELS_TR, en: CATEGORY_LABELS_EN, de: CATEGORY_LABELS_DE };
