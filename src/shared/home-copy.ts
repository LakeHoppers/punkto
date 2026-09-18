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
    aiAnalysis: "Punkto'nun yapay zeka destekli editöryal süreciyle hazırlanmıştır.",
    aiFooter: "Özetler yapay zeka ile oluşturulur.",
    sourcesLabel: "Kaynaklar",
    tagline: "Haberler, kısa ve öz.",
    title: "Almanya'dan her sabah, Türkçe özet.",
    description:
      "Punkto Almanya'nın en önemli haberlerini toplar, tekrarları kaldırır, farklı medya kuruluşlarının aynı haberi nasıl aktardığını karşılaştırır, önem sırasına koyar, özetler ve neden önemli olduklarını açıklar – hepsini tek bir anlaşılır günlük özette sunar.",
    emptyTitle: "Bugünkü özet henüz yok",
    emptyBody:
      "Haber toplama ve özetleme hattı henüz devreye alınmadı. İlk özet burada görünecek.",
    whyItMatters: "Neden önemli — ",
    storiesLabel: (count) => `${count} haber`,
  },
  de: {
    aiDisclosure: "Die Zusammenfassungen werden automatisiert mit KI erstellt. Quellen sind bei jedem Beitrag verlinkt.",
    aiAnalysis: "Erstellt im Rahmen des KI-gestützten Redaktionsprozesses von Punkto.",
    aiFooter: "Zusammenfassungen mit KI erstellt.",
    sourcesLabel: "Quellen",
    tagline: "Nachrichten, auf den Punkt.",
    title: "Die wichtigsten Nachrichten aus Deutschland, jeden Morgen.",
    description: "Punkto sammelt Deutschlands wichtigste Nachrichten, entfernt Duplikate, vergleicht die Berichterstattung verschiedener Medien, ordnet sie nach Relevanz, fasst sie zusammen und erklärt, warum sie wichtig sind – in einer klaren täglichen Zusammenfassung.",
    emptyTitle: "Noch keine heutige Ausgabe",
    emptyBody: "Die erste Zusammenfassung erscheint hier, sobald die Nachrichten verarbeitet wurden.",
    whyItMatters: "Warum das wichtig ist — ",
    storiesLabel: (count) => `${count} Nachrichten`,
  },
  en: {
    aiDisclosure: "Summaries are generated automatically with AI. Sources are linked with every story.",
    aiAnalysis: "Prepared through Punkto's AI-assisted editorial process.",
    aiFooter: "Summaries generated with AI.",
    sourcesLabel: "Sources",
    tagline: "News, to the point.",
    title: "The most important German news, every morning.",
    description:
      "Punkto collects Germany's most important news, removes duplicates, compares how outlets report the same story, ranks by importance, summarizes them and explains why they matter in one clear daily summary.",
    emptyTitle: "No digest yet today",
    emptyBody: "The collection and summarization pipeline hasn't run yet. The first digest will appear here.",
    whyItMatters: "Why it matters — ",
    storiesLabel: (count) => `${count} stories`,
  },
};
