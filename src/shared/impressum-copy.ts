import type { Locale } from "./locale";

export interface ImpressumSection {
  heading: string;
  body: string[];
}

export interface ImpressumCopy {
  title: string;
  contactCta: string;
  sections: ImpressumSection[];
  bindingNote?: string;
}

const FULL_NAME = "Emre Küçükşahin";
const STREET = "Ebelingstr. 16";
const CITY = "10249 Berlin";
const CONTACT_EMAIL = "emrekucuksahin@gmail.com";

export const IMPRESSUM_COPY: Record<Locale, ImpressumCopy> = {
  de: {
    title: "Impressum",
    contactCta: "Kontaktformular",
    sections: [
      {
        heading: "Angaben gemäß § 5 DDG",
        body: [FULL_NAME, STREET, CITY, "Deutschland"],
      },
      {
        heading: "Kontakt",
        body: [
          `E-Mail: ${CONTACT_EMAIL}`,
          "Für schnelle Anfragen nutzen Sie bitte unser Kontaktformular.",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        body: [FULL_NAME, STREET, CITY],
      },
      {
        heading: "Hinweis zu den Inhalten",
        body: [
          "Dieses Angebot fasst Berichte öffentlich zugänglicher deutscher Nachrichtenquellen zusammen. Die Zusammenfassungen werden automatisiert mit Hilfe von künstlicher Intelligenz erstellt. Die jeweiligen Originalquellen sind bei jedem Beitrag verlinkt. Die Rechte an den Originalinhalten liegen bei den jeweiligen Verlagen.",
        ],
      },
      {
        heading: "Haftung für Inhalte",
        body: [
          "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
        ],
      },
      {
        heading: "Haftung für Links",
        body: [
          "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
        ],
      },
      {
        heading: "Urheberrecht",
        body: [
          "Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Rechte an den verlinkten Originalinhalten verbleiben bei den jeweiligen Rechteinhabern.",
        ],
      },
    ],
  },
  tr: {
    title: "Impressum",
    contactCta: "İletişim formu",
    sections: [
      {
        heading: "§ 5 DDG uyarınca bilgiler",
        body: [FULL_NAME, STREET, CITY, "Almanya"],
      },
      {
        heading: "İletişim",
        body: [
          `E-posta: ${CONTACT_EMAIL}`,
          "Hızlı sorularınız için lütfen aşağıdaki iletişim formunu kullanın.",
        ],
      },
      {
        heading: "§ 18 Abs. 2 MStV uyarınca içerikten sorumlu",
        body: [FULL_NAME, STREET, CITY],
      },
      {
        heading: "İçerik hakkında not",
        body: [
          "Bu hizmet, kamuya açık Alman haber kaynaklarının haberlerini özetler. Özetler yapay zeka yardımıyla otomatik olarak oluşturulur. İlgili orijinal kaynaklar her haberde bağlantı olarak verilir. Orijinal içeriklerin hakları ilgili yayıncılara aittir.",
        ],
      },
      {
        heading: "İçerik sorumluluğu",
        body: [
          "Hizmet sağlayıcı olarak, § 7 Abs. 1 DDG uyarınca bu sayfalardaki kendi içeriğimizden genel yasalar çerçevesinde sorumluyuz. Ancak §§ 8-10 DDG uyarınca, iletilen veya depolanan üçüncü taraf bilgilerini izlemek veya hukuka aykırı bir faaliyete işaret eden durumları araştırmakla yükümlü değiliz.",
        ],
      },
      {
        heading: "Bağlantı sorumluluğu",
        body: [
          "Sitemiz, içeriği üzerinde etkimiz olmayan üçüncü taraf harici web sitelerine bağlantılar içerir. Bu nedenle bu harici içerikler için herhangi bir sorumluluk üstlenemeyiz. Bağlantı verilen sayfaların içeriğinden her zaman ilgili sağlayıcı veya işletmeci sorumludur.",
        ],
      },
      {
        heading: "Telif hakkı",
        body: [
          "Site işletmecisi tarafından bu sayfalarda oluşturulan içerik ve eserler Alman telif hukukuna tabidir. Bağlantı verilen orijinal içeriklerin hakları ilgili hak sahiplerine aittir.",
        ],
      },
    ],
    bindingNote: "Uyuşmazlık durumunda bu Impressum'un Almanca sürümü hukuken bağlayıcıdır.",
  },
  en: {
    title: "Impressum",
    contactCta: "Contact form",
    sections: [
      {
        heading: "Information pursuant to § 5 DDG",
        body: [FULL_NAME, STREET, CITY, "Germany"],
      },
      {
        heading: "Contact",
        body: [
          `Email: ${CONTACT_EMAIL}`,
          "For quick questions, please use the contact form below.",
        ],
      },
      {
        heading: "Responsible for content pursuant to § 18 (2) MStV",
        body: [FULL_NAME, STREET, CITY],
      },
      {
        heading: "Note on content",
        body: [
          "This service summarizes reports from publicly accessible German news sources. The summaries are generated automatically with the help of artificial intelligence. The respective original sources are linked with each story. Rights to the original content remain with the respective publishers.",
        ],
      },
      {
        heading: "Liability for content",
        body: [
          "As a service provider, we are responsible for our own content on these pages under general law pursuant to § 7 (1) DDG. However, pursuant to §§ 8 to 10 DDG, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.",
        ],
      },
      {
        heading: "Liability for links",
        body: [
          "Our offering contains links to external third-party websites over whose content we have no influence. We therefore cannot assume any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content.",
        ],
      },
      {
        heading: "Copyright",
        body: [
          "The content and works created by the site operator on these pages are subject to German copyright law. Rights to the linked original content remain with the respective rights holders.",
        ],
      },
    ],
    bindingNote: "In case of discrepancies, the German version of this Impressum is legally binding.",
  },
};
