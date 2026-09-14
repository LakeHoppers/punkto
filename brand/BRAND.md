# Punkto — Marka Varlıkları

Bu klasör Punkto'nun üretim marka varlıklarını içerir. Logo, ikonlar ve kullanım kuralları.
Geniş marka dokümanı (ton, editöryal kurallar, sosyal medya) ayrı tutulur, burası sadece uygulama.

---

## Dosyalar

```
brand/
├── punkto-mark.svg          İşaret, tek renk, currentColor
├── punkto-wordmark.svg      Dondurulmuş "Punkto" outline (Geist SemiBold)
├── punkto-lockup.svg        Dondurulmuş işaret + "unkto" outline
├── Logo.tsx                 React bileşeni (mark / wordmark / lockup)
├── BRAND.md                 bu dosya
└── icons/
    ├── favicon.svg          kırmızı zemin, kağıt işaret
    ├── favicon-16.png
    ├── favicon-32.png
    ├── favicon-48.png
    ├── icon-192.png         PWA
    ├── icon-512.png         PWA
    ├── apple-touch-icon.png 180px, köşe yuvarlaması YOK (iOS kendi maskesini uygular)
    ├── icon-512-ink.png     antrasit zemin varyantı
    └── icon-512-paper.png   kağıt zemin, kırmızı işaret
```

**Not (2026-09-14):** PNG ikon varyantları (favicon-*.png, icon-192/512.png,
apple-touch-icon.png, icon-512-ink/paper.png) henüz üretilmedi — sadece SVG
kaynaklar mevcut. Bir rasterization adımı (örn. `sharp` veya `resvg` ile) gerekiyor.

---

## İşaret

P harfinin karnı tam bir daire. Almanca `Punkt` yani nokta, harfin içine gömülü.
Tek başına ikon, wordmark içinde ise P harfinin yerine geçer.

Geometri (viewBox `0 0 45 65`):

| Eleman | Değer |
|---|---|
| Gövde | `x=0 y=1 w=13 h=64` |
| Kâse | `cx=27 cy=17 r=17` |

Kâsenin üst kenarı gövdeden 1 birim yukarıda. Bu optik düzeltmedir, hata değil.
Yuvarlak formlar düz kenarlarla aynı hizada olduğunda göze daha kısa görünür.

---

## Renkler

| Rol | Hex | Kullanım |
|---|---|---|
| Mürekkep kırmızısı | `#9E3527` | favicon zemini, marka işareti |
| Kağıt | `#FAF7F1` | kırmızı üzerine işaret |
| Mürekkep | `#1E1C19` | koyu zemin varyantı |

Dark mode'da marka kırmızısı `#C8574A` olur. Koyu zeminde koyu kırmızı okunmaz.
Tam token seti `globals.css` içindedir.

---

## Kullanım kuralları

**Yapılacaklar**

- Logo tek renk kullanılır. `currentColor` üzerinden parent'ın rengini alır
- İşaretin etrafında en az gövde genişliği kadar boşluk bırakılır
- Wordmark'ta harf aralığı `-0.035em`, ağırlık 600
- Küçük alanlarda (mobil header, 24px altı) sadece işaret kullanılır

**Yapılmayacaklar**

- Yazının sonuna nokta konmaz. `Punkto.` biçimi başka bir markanın tescilli logosudur
- Gradient, gölge, kontur, 3B efekt uygulanmaz
- İşaret döndürülmez, eğilmez, orantısız ölçeklenmez
- Kâse ile gövde farklı renkte olmaz
- Logo fotoğraf üzerine doğrudan konmaz, önce düz bir zemin gerekir
- `®` sembolü tescil tamamlanana kadar kullanılmaz

---

## Tipografi

| Rol | Font |
|---|---|
| Başlık, haber başlığı | Newsreader (500) |
| Gövde, arayüz | sans (`--font-sans`, Geist) |
| Wordmark | dondurulmuş outline — **Geist SemiBold (600)**, harf aralığı `-0.035em` |

Wordmark artık sabittir: "Punkto" ve lockup'taki "unkto" Geist SemiBold'dan
outline'a (vektör path) çevrilip `brand/Logo.tsx` içine gömülüdür. `--font-sans`
değişse bile logo değişmez, font hiç yüklenmese bile logo doğru görünür.

Dosyalar: `brand/punkto-wordmark.svg` (tek başına yazı), `brand/punkto-lockup.svg`
(işaret + "unkto"). İkisi de `scripts/build-wordmark.mjs` ile üretildi.

Wordmark'ı değiştirmek (font, ağırlık, tracking) isteyen bu script'i güncelleyip
yeniden çalıştırmalı — SVG çıktıları veya `Logo.tsx` içindeki path verileri elle
düzenlenmez. Script'in çalışması için ilgili fontun `.ttf`/`.otf` dosyası yerel
olarak gerekir (repoya commit edilmez): `npm run build:wordmark`.

---

## HTML kurulumu

```html
<link rel="icon" href="/icons/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/icons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

`site.webmanifest`:

```json
{
  "name": "Punkto",
  "short_name": "Punkto",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#9E3527",
  "background_color": "#FAF7F1",
  "display": "standalone"
}
```

---

## Kırmızı nerede kullanılır

Marka kırmızısı kimlik rengidir, vurgu rengi değildir. İkisi karışırsa marka dağılır.

| Kullanılır | Kullanılmaz |
|---|---|
| Favicon, app icon, sosyal avatar | Kategori etiketleri |
| E-posta başlığındaki işaret | Haber numaraları |
| Aktif kategori filtresi | AI etiketleri |
| Ekran başına tek birincil CTA | Tarih ve kaynak linkleri |
| Focus ring | Ayırıcı çizgiler |
| Descriptor ayırıcı noktası | Hover zeminleri |
| `theme_color` | Hata mesajları (`--destructive`) |

---

## Descriptor

| Dil | Metin |
|---|---|
| TR | Almanya'nın günlük haber özeti |
| DE | Die täglichen Nachrichten aus Deutschland |
| EN | Germany's daily news briefing |

Tagline (pazarlama): `Haberler, özetle.` / `Nachrichten, auf den Punkt.` / `News, to the point.`
