import type { Locale } from "./locale";

export interface TermsSection {
  heading: string;
  body: string[];
}

export interface TermsCopy {
  title: string;
  updated: string;
  intro: string[];
  sections: TermsSection[];
}

const CONTACT_EMAIL = "emre@punkto.fyi";

export const TERMS_COPY: Record<Locale, TermsCopy> = {
  tr: {
    title: "Kullanım Koşulları",
    updated: "Son güncelleme: 15 Eylül 2026",
    intro: [
      "Bu koşullar, Punkto'yu (www.punkto.fyi) kullanımını düzenler. Hizmeti kullanarak bu koşulları kabul etmiş olursun. Veri sorumlusu ve iletişim bilgileri için Impressum sayfasına bakabilirsin.",
    ],
    sections: [
      {
        heading: "Hizmetin kapsamı",
        body: [
          "Punkto, Almanya'daki en önemli haberleri günlük olarak toplayıp Türkçe, İngilizce ve Almanca özetleyen bir hizmettir. Özetler yapay zeka yardımıyla, seçilen güvenilir haber kaynaklarındaki yayınlar temel alınarak oluşturulur.",
          "Özetler editöryal bir insan kontrolünden geçmez. Bir haber senin için kritikse orijinal kaynağa gitmeni öneririz. Punkto, özetlerin eksiksizliğini veya hatasızlığını garanti etmez.",
        ],
      },
      {
        heading: "Hesap",
        body: [
          "Hizmeti kullanmak için Clerk üzerinden bir hesap oluşturman gerekir. Hesap bilgilerinin doğruluğundan ve hesabının güvenliğinden sen sorumlusun.",
          "Hesabını istediğin zaman silebilirsin; bunun için Impressum sayfasındaki iletişim kanalını kullanman yeterli.",
        ],
      },
      {
        heading: "Ücretlendirme",
        body: [
          "Punkto şu anda tamamen ücretsiz olarak sunulmaktadır. İleride bir ücretli (Pro) plan devreye alınırsa, o plana özgü ek koşullar satın alma öncesinde ayrıca gösterilecektir.",
        ],
      },
      {
        heading: "Kabul edilebilir kullanım",
        body: [
          "Hizmeti yasa dışı amaçlarla, hizmetin altyapısına zarar verecek şekilde veya başka kullanıcıların erişimini engelleyecek şekilde kullanmamayı kabul edersin.",
        ],
      },
      {
        heading: "İçerik ve sorumluluk",
        body: [
          "Özetlerdeki orijinal haber içeriklerinin hakları ilgili yayıncılara aittir; her haberin altında orijinal kaynak bağlantısı yer alır. Punkto, üçüncü taraf kaynakların içeriğinden sorumlu değildir.",
          "Hizmet \"olduğu gibi\" sunulur, kesintisiz veya hatasız çalışacağı garanti edilmez.",
        ],
      },
      {
        heading: "Fesih",
        body: [
          "Kötüye kullanım tespit edilirse hesabını askıya alabilir veya kapatabiliriz. Sen de hesabını istediğin zaman kapatabilirsin.",
        ],
      },
      {
        heading: "Değişiklikler",
        body: [
          "Bu koşullar zaman zaman güncellenebilir. Önemli değişikliklerde bu sayfadaki tarihi güncelleriz.",
        ],
      },
      {
        heading: "Uygulanacak hukuk",
        body: [
          "Bu koşullara Almanya hukuku uygulanır.",
        ],
      },
      {
        heading: "İletişim",
        body: [
          `Sorularınız için: ${CONTACT_EMAIL}. Veri sorumlusu bilgileri için Impressum sayfasına bakınız.`,
        ],
      },
    ],
  },
  de: {
    title: "Nutzungsbedingungen",
    updated: "Letzte Aktualisierung: 15. September 2026",
    intro: [
      "Diese Bedingungen regeln die Nutzung von Punkto (www.punkto.fyi). Durch die Nutzung des Dienstes akzeptierst du diese Bedingungen. Angaben zum Verantwortlichen findest du im Impressum.",
    ],
    sections: [
      {
        heading: "Umfang des Dienstes",
        body: [
          "Punkto sammelt täglich die wichtigsten Nachrichten aus Deutschland und fasst sie auf Türkisch, Englisch und Deutsch zusammen. Die Zusammenfassungen werden mithilfe von künstlicher Intelligenz auf Basis ausgewählter, vertrauenswürdiger Nachrichtenquellen erstellt.",
          "Die Zusammenfassungen durchlaufen keine redaktionelle Kontrolle durch Menschen. Bei wichtigen Themen empfehlen wir, die Originalquelle zu lesen. Punkto übernimmt keine Gewähr für Vollständigkeit oder Richtigkeit der Zusammenfassungen.",
        ],
      },
      {
        heading: "Konto",
        body: [
          "Für die Nutzung ist ein Konto über Clerk erforderlich. Du bist für die Richtigkeit deiner Kontoangaben und die Sicherheit deines Kontos verantwortlich.",
          "Du kannst dein Konto jederzeit löschen lassen; nutze dafür den im Impressum genannten Kontaktweg.",
        ],
      },
      {
        heading: "Preise",
        body: [
          "Punkto wird derzeit vollständig kostenlos angeboten. Sollte künftig ein kostenpflichtiger Pro-Tarif eingeführt werden, werden die dafür geltenden zusätzlichen Bedingungen vor dem Kauf gesondert angezeigt.",
        ],
      },
      {
        heading: "Zulässige Nutzung",
        body: [
          "Du verpflichtest dich, den Dienst nicht für rechtswidrige Zwecke, zur Beeinträchtigung der Infrastruktur oder zur Behinderung anderer Nutzer einzusetzen.",
        ],
      },
      {
        heading: "Inhalte und Haftung",
        body: [
          "Die Rechte an den in den Zusammenfassungen verwendeten Original-Nachrichteninhalten liegen bei den jeweiligen Verlagen; jeder Beitrag verlinkt die Originalquelle. Punkto haftet nicht für Inhalte Dritter.",
          "Der Dienst wird \"wie besehen\" bereitgestellt, ohne Garantie für unterbrechungsfreien oder fehlerfreien Betrieb.",
        ],
      },
      {
        heading: "Kündigung",
        body: [
          "Bei Missbrauch können wir dein Konto sperren oder löschen. Du kannst dein Konto ebenfalls jederzeit kündigen.",
        ],
      },
      {
        heading: "Änderungen",
        body: [
          "Diese Bedingungen können von Zeit zu Zeit aktualisiert werden. Bei wesentlichen Änderungen aktualisieren wir das Datum auf dieser Seite.",
        ],
      },
      {
        heading: "Anwendbares Recht",
        body: [
          "Es gilt deutsches Recht.",
        ],
      },
      {
        heading: "Kontakt",
        body: [
          `Fragen: ${CONTACT_EMAIL}. Angaben zum Verantwortlichen findest du im Impressum.`,
        ],
      },
    ],
  },
  en: {
    title: "Terms of Service",
    updated: "Last updated: September 15, 2026",
    intro: [
      "These terms govern your use of Punkto (www.punkto.fyi). By using the service, you accept these terms. See the Impressum page for data controller and contact details.",
    ],
    sections: [
      {
        heading: "Scope of the service",
        body: [
          "Punkto collects the most important German news each day and summarizes it in Turkish, English, and German. Summaries are generated with the help of artificial intelligence, based on selected, trusted news sources.",
          "Summaries do not go through human editorial review. If a story matters to you, we recommend checking the original source. Punkto does not guarantee the completeness or accuracy of the summaries.",
        ],
      },
      {
        heading: "Account",
        body: [
          "Using the service requires an account via Clerk. You are responsible for the accuracy of your account details and for keeping your account secure.",
          "You can have your account deleted at any time — use the contact channel listed on the Impressum page.",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "Punkto is currently offered entirely free of charge. If a paid Pro plan is introduced in the future, additional terms specific to that plan will be shown separately before purchase.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You agree not to use the service for unlawful purposes, to harm the service's infrastructure, or to interfere with other users' access.",
        ],
      },
      {
        heading: "Content and liability",
        body: [
          "Rights to the original news content used in the summaries belong to the respective publishers; each story links to its original source. Punkto is not responsible for third-party content.",
          "The service is provided \"as is\", without a guarantee of uninterrupted or error-free operation.",
        ],
      },
      {
        heading: "Termination",
        body: [
          "We may suspend or close your account if we detect misuse. You may also close your account at any time.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "These terms may be updated from time to time. We'll update the date on this page when we make meaningful changes.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by German law.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `Questions: ${CONTACT_EMAIL}. See the Impressum page for data controller details.`,
        ],
      },
    ],
  },
};
