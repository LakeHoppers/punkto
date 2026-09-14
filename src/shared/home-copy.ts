import type { Locale } from "@/shared/locale";

export const HOME_COPY: Record<
  Locale,
  {
    tagline: string;
    title: string;
    description: string;
    emptyTitle: string;
    emptyBody: string;
    whyItMatters: string;
    aiDisclosure: string;
    aiAnalysis: string;
    aiFooter: string;
    sourcesLabel: string;
    storiesLabel: (count: number) => string;
  }
> = {
  tr: {
    aiDisclosure: "Özetler yapay zeka ile otomatik oluşturulur. Kaynaklar her haberin altında bağlantılıdır.",
    aiAnalysis: "AI yorumu",
    aiFooter: "Özetler yapay zeka ile oluşturulur.",
    sourcesLabel: "Kaynaklar",
    tagline: "Otomatik. Her sabah. Güvenilir.",
    title: "Almanya'dan her sabah, Türkçe özet.",
    description:
      "News Daily; en önemli Alman haberlerini toplar, tekrarları ayıklar, önem sırasına koyar ve akıcı Türkçe özetler halinde neden önemli olduğunu anlatır.",
    emptyTitle: "Bugünkü özet henüz yok",
    emptyBody:
      "Haber toplama ve özetleme hattı henüz devreye alınmadı. İlk özet burada görünecek.",
    whyItMatters: "Neden önemli — ",
    storiesLabel: (count) => `${count} haber`,
  },
  de: {
    aiDisclosure: "Die Zusammenfassungen werden automatisiert mit KI erstellt. Quellen sind bei jedem Beitrag verlinkt.",
    aiAnalysis: "KI-Einordnung",
    aiFooter: "Zusammenfassungen mit KI erstellt.",
    sourcesLabel: "Quellen",
    tagline: "Automatisch. Jeden Morgen. Verlässlich.",
    title: "Die wichtigsten Nachrichten aus Deutschland, jeden Morgen.",
    description: "News Daily sammelt die wichtigsten Nachrichten aus Deutschland, entfernt Dopplungen, ordnet sie nach Bedeutung und erklärt in einer täglichen Zusammenfassung, warum sie wichtig sind.",
    emptyTitle: "Noch keine heutige Ausgabe",
    emptyBody: "Die erste Zusammenfassung erscheint hier, sobald die Nachrichten verarbeitet wurden.",
    whyItMatters: "Warum das wichtig ist — ",
    storiesLabel: (count) => `${count} Nachrichten`,
  },
  en: {
    aiDisclosure: "Summaries are generated automatically with AI. Sources are linked with every story.",
    aiAnalysis: "AI analysis",
    aiFooter: "Summaries generated with AI.",
    sourcesLabel: "Sources",
    tagline: "Automatic. Every morning. Reliable.",
    title: "The most important German news, every morning.",
    description:
      "News Daily collects the most important German news, removes duplicates, ranks them by importance, and explains why each one matters in a fluent daily summary.",
    emptyTitle: "No digest yet today",
    emptyBody: "The collection and summarization pipeline hasn't run yet. The first digest will appear here.",
    whyItMatters: "Why it matters — ",
    storiesLabel: (count) => `${count} stories`,
  },
};
