import type { Locale } from "./locale";

export interface PrivacySection {
  heading: string;
  body: string[];
}

export interface PrivacyCopy {
  title: string;
  updated: string;
  intro: string[];
  sections: PrivacySection[];
}

const CONTACT_EMAIL = "emrekucuksahin@gmail.com";

export const PRIVACY_COPY: Record<Locale, PrivacyCopy> = {
  tr: {
    title: "Gizlilik Politikası",
    updated: "Son güncelleme: 14 Eylül 2026",
    intro: [
      "Punkto, Almanya'daki en önemli haberleri günlük olarak toplayıp Türkçe, İngilizce ve Almanca özetleyen bir hizmettir. Bu sayfa, hizmeti kullanırken hangi kişisel verilerin toplandığını, neden toplandığını ve haklarının neler olduğunu açıklar.",
      `Veri sorumlusu: Emre Küçükşahin (şu an ayrı bir şirket üzerinden değil, şahsen işletiliyor). Sorularınız için: ${CONTACT_EMAIL}`,
    ],
    sections: [
      {
        heading: "Hangi verileri topluyoruz",
        body: [
          "Hesap oluştururken: adın ve e-posta adresin (kimlik doğrulama sağlayıcımız Clerk üzerinden).",
          "Tercihlerin: favori haber kategorilerin, e-posta dilin, günlük özetin gönderileceği saat ve zaman dilimi.",
          "Abonelik durumun: Pro plana geçip geçmediğin ve abonelik durumu (kart bilgilerini biz değil, doğrudan Stripe işler ve saklar — bize hiç ulaşmaz).",
        ],
      },
      {
        heading: "Bu verileri neden topluyoruz",
        body: [
          "Sana kişiselleştirilmiş günlük haber özetini e-posta ile göndermek.",
          "Hesabına giriş yapmanı ve tercihlerini kaydetmeni sağlamak.",
          "Pro abonelik ödemesini işlemek (Stripe üzerinden).",
          "Yasal dayanak: hizmeti sana sunmak için gerekli olan sözleşme ilişkisi (GDPR Madde 6/1-b).",
        ],
      },
      {
        heading: "Verilerini kimlerle paylaşıyoruz",
        body: [
          "Clerk — kimlik doğrulama (giriş/kayıt).",
          "Neon — veritabanı, AB içinde (Frankfurt, Almanya) barındırılıyor.",
          "Vercel — uygulama sunucusu, AB içinde (Frankfurt, Almanya) barındırılıyor.",
          "Resend — e-posta gönderimi. Bu servis verileri ABD'de saklıyor; AB-ABD Veri Gizliliği Çerçevesi (Data Privacy Framework) ve Standart Sözleşme Hükümleri (SCC) ile yasal olarak korunuyor.",
          "Google — yalnızca izinle Google Analytics. Veriler ABD’de işlenir. Uluslararası aktarımlar için Google, AB-ABD Veri Gizliliği Çerçevesi’ne ve uygun olduğu durumlarda Standart Sözleşme Hükümleri’ne (SCC) dayanır. Ayrıntılar: https://business.safety.google/adsdatatransfers/ ve https://policies.google.com/technologies/partner-sites",
          "Stripe — ödeme işleme. Kendi kapsamlı GDPR uyumluluk çerçevesi var.",
          "OpenAI — yalnızca haber içeriğini işler (özetleme/çeviri için); adın, e-postan ya da tercihlerin OpenAI'a hiç gönderilmez.",
          "Verilerin hiçbir zaman reklam amacıyla üçüncü taraflara satılmaz.",
        ],
      },
      {
        heading: "Ne kadar süre saklıyoruz",
        body: [
          "Hesabın aktif olduğu sürece verilerini saklarız. Hesabını silmemizi istersen, aşağıdaki iletişim adresinden bize ulaşman yeterli — verilerini makul bir süre içinde sileriz.",
        ],
      },
      {
        heading: "Haklarınız (GDPR)",
        body: [
          "Verilerine erişim isteme, düzeltme, silinmesini isteme, işlemeye itiraz etme ve verilerini taşınabilir formatta alma hakkına sahipsin.",
          `Bu hakları kullanmak için: ${CONTACT_EMAIL}`,
          "Ayrıca, bulunduğun ülkedeki veri koruma otoritesine şikayette bulunma hakkın da var.",
        ],
      },
      {
        heading: "Çerezler",
        body: [
          "Clerk, oturumunu açık tutmak için zorunlu kimlik doğrulama çerezleri kullanır. Google Analytics 4 yalnızca çerez bildirimini kabul ettiğinde yüklenir; reddedersen Google Analytics’e veri gönderilmez. İzninle ziyaretleri ve tamamlanan kayıtları ölçeriz; Google cihaz/tarayıcı bilgileri, sayfa görüntülemeleri ve çerez tanımlayıcılarını işler. Adını, e-postanı veya hesap kimliğini Analytics’e göndermeyiz. Reklam özellikleri kapalıdır. Yasal dayanak açık rızandır (GDPR Madde 6/1-a). Seçimin bu tarayıcıda localStorage ile saklanır; analiz çerezleri en fazla bir yıl saklanır. Sayfa altındaki Çerez ayarları bağlantısından iznini istediğin zaman geri çekebilirsin; bu, önceki işlemenin hukuka uygunluğunu etkilemez.",
        ],
      },
      {
        heading: "Değişiklikler",
        body: [
          "Bu politika zaman zaman güncellenebilir. Önemli değişikliklerde bu sayfadaki tarihi güncelleyeceğiz.",
        ],
      },
    ],
  },
  de: {
    title: "Datenschutzerklärung",
    updated: "Zuletzt aktualisiert: 14. September 2026",
    intro: [
      "Punkto sammelt täglich die wichtigsten Nachrichten aus Deutschland und fasst sie auf Türkisch, Englisch und Deutsch zusammen. Hier erfährst du, welche personenbezogenen Daten wir bei der Nutzung erheben, warum wir sie erheben und welche Rechte du hast.",
      `Verantwortlicher: Emre Küçükşahin (derzeit persönlich betrieben, nicht über ein eingetragenes Unternehmen). Fragen: ${CONTACT_EMAIL}`,
    ],
    sections: [
      { heading: "Welche Daten wir erheben", body: [
        "Bei der Registrierung: deinen Namen und deine E-Mail-Adresse (über unseren Authentifizierungsanbieter Clerk).",
        "Deine Einstellungen: bevorzugte Nachrichtenkategorien, Sprache der täglichen E-Mail, Zustellzeit und Zeitzone.",
        "Deinen Abonnementstatus: ob du den Pro-Tarif nutzt. Deine Kartendaten werden direkt von Stripe verarbeitet und gespeichert — wir erhalten sie nicht.",
      ] },
      { heading: "Warum wir diese Daten erheben", body: [
        "Um dir deinen persönlichen täglichen Nachrichtenüberblick per E-Mail zu schicken.",
        "Damit du dich anmelden und deine Einstellungen speichern kannst.",
        "Um Zahlungen für das Pro-Abonnement über Stripe abzuwickeln.",
        "Rechtsgrundlage ist die Erfüllung des Vertrags zur Bereitstellung unseres Dienstes (Art. 6 Abs. 1 Buchst. b DSGVO).",
      ] },
      { heading: "Mit wem wir deine Daten teilen", body: [
        "Clerk — Authentifizierung (Anmeldung und Registrierung).",
        "Neon — unsere Datenbank, gehostet in der EU (Frankfurt, Deutschland).",
        "Vercel — unsere Anwendungsserver, gehostet in der EU (Frankfurt, Deutschland).",
        "Resend — E-Mail-Versand. Dieser Anbieter speichert Daten in den USA; die Übermittlung ist durch das EU-US Data Privacy Framework und Standardvertragsklauseln (SCC) abgesichert.",
        "Google — Google Analytics, nur mit Einwilligung. Daten werden in den USA verarbeitet. Google stützt internationale Übermittlungen auf das EU-US Data Privacy Framework und gegebenenfalls Standardvertragsklauseln (SCC). Einzelheiten: https://business.safety.google/adsdatatransfers/ und https://policies.google.com/technologies/partner-sites",
        "Stripe — Zahlungsabwicklung mit einem eigenen umfassenden Rahmen zur Einhaltung der DSGVO.",
        "OpenAI — verarbeitet ausschließlich Nachrichteninhalte für Zusammenfassung und Übersetzung. Dein Name, deine E-Mail-Adresse und deine Einstellungen werden niemals an OpenAI gesendet.",
        "Wir verkaufen deine Daten niemals zu Werbezwecken an Dritte.",
      ] },
      { heading: "Wie lange wir Daten speichern", body: [
        "Wir speichern deine Daten, solange dein Konto aktiv ist. Wenn du dein Konto löschen lassen möchtest, kontaktiere uns unter der unten angegebenen Adresse. Wir löschen deine Daten innerhalb einer angemessenen Frist.",
      ] },
      { heading: "Deine Rechte (DSGVO)", body: [
        "Du hast das Recht auf Auskunft, Berichtigung, Löschung und Datenübertragbarkeit sowie das Recht, der Verarbeitung deiner Daten zu widersprechen.",
        `Um diese Rechte auszuüben, kontaktiere uns unter: ${CONTACT_EMAIL}`,
        "Du kannst außerdem bei deiner zuständigen Datenschutzaufsichtsbehörde Beschwerde einlegen.",
      ] },
      { heading: "Cookies", body: [
        "Clerk verwendet notwendige Authentifizierungs-Cookies, damit du angemeldet bleibst. Google Analytics 4 wird erst nach deiner Zustimmung im Cookie-Hinweis geladen; bei Ablehnung werden keine Daten an Google Analytics gesendet. Mit deiner Einwilligung messen wir Besuche und abgeschlossene Registrierungen. Google verarbeitet Geräte-/Browserinformationen, Seitenaufrufe und Cookie-Kennungen. Wir senden keine Namen, E-Mail-Adressen oder Konto-IDs an Analytics. Werbefunktionen sind deaktiviert. Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 Buchst. a DSGVO). Deine Auswahl wird in diesem Browser im localStorage gespeichert; Analyse-Cookies werden höchstens ein Jahr gespeichert. Über Cookie-Einstellungen im Seitenfuß kannst du jederzeit widerrufen. Die Rechtmäßigkeit der vorherigen Verarbeitung bleibt unberührt.",
      ] },
      { heading: "Änderungen", body: [
        "Diese Datenschutzerklärung kann gelegentlich aktualisiert werden. Bei wesentlichen Änderungen aktualisieren wir das Datum auf dieser Seite.",
      ] },
    ],
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: September 14, 2026",
    intro: [
      "Punkto collects the most important German news each day and summarizes it in Turkish, English and German. This page explains what personal data we collect while you use the service, why we collect it, and what rights you have.",
      `Data controller: Emre Küçükşahin (currently operated personally, not through a registered company). Questions: ${CONTACT_EMAIL}`,
    ],
    sections: [
      {
        heading: "What we collect",
        body: [
          "When you create an account: your name and email address (via our authentication provider, Clerk).",
          "Your preferences: favorite news categories, email language, your preferred daily delivery time and time zone.",
          "Your subscription status: whether you're on the Pro plan (your card details are handled and stored directly by Stripe — they never reach us).",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          "To send you your personalized daily digest by email.",
          "To let you sign in and save your preferences.",
          "To process Pro subscription payments (via Stripe).",
          "Legal basis: performance of the contract needed to provide the service (GDPR Art. 6(1)(b)).",
        ],
      },
      {
        heading: "Who we share your data with",
        body: [
          "Clerk — authentication (sign-in/sign-up).",
          "Neon — our database, hosted in the EU (Frankfurt, Germany).",
          "Vercel — our application servers, hosted in the EU (Frankfurt, Germany).",
          "Resend — email delivery. This provider stores data in the US; transfers are covered by the EU-US Data Privacy Framework and Standard Contractual Clauses (SCCs).",
          "Google — Google Analytics, only with consent. Data is processed in the US. Google relies on the EU-US Data Privacy Framework and, where applicable, Standard Contractual Clauses (SCCs) for international transfers. Details: https://business.safety.google/adsdatatransfers/ and https://policies.google.com/technologies/partner-sites",
          "Stripe — payment processing, with its own comprehensive GDPR compliance framework.",
          "OpenAI — processes only news article content (for summarization/translation); your name, email, or preferences are never sent to OpenAI.",
          "We never sell your data to third parties for advertising purposes.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "We keep your data for as long as your account is active. If you'd like your account deleted, contact us at the address below and we'll delete your data within a reasonable timeframe.",
        ],
      },
      {
        heading: "Your rights (GDPR)",
        body: [
          "You have the right to access, correct, or request deletion of your data, to object to processing, and to receive your data in a portable format.",
          `To exercise these rights, contact: ${CONTACT_EMAIL}`,
          "You also have the right to lodge a complaint with your local data protection authority.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "Clerk uses essential authentication cookies to keep you signed in. Google Analytics 4 loads only after you accept the cookie notice; declining sends no data to Google Analytics. With consent, we measure visits and completed registrations. Google processes device/browser information, page views and cookie identifiers. We do not send names, email addresses or account IDs to Analytics. Advertising features are disabled. The legal basis is your consent (GDPR Art. 6(1)(a)). Your choice is stored in this browser’s localStorage; analytics cookies last at most one year. You can withdraw consent at any time via Cookie settings in the footer, without affecting the lawfulness of earlier processing.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "This policy may be updated from time to time. We'll update the date on this page when we make meaningful changes.",
        ],
      },
    ],
  },
};
