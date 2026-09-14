# Punkto — Marka Varlıkları

Bu klasör Punkto'nun üretim marka varlıklarını içerir. Logo, ikonlar ve kullanım kuralları.
Geniş marka dokümanı (ton, editöryal kurallar, sosyal medya) ayrı tutulur, burası sadece uygulama.

---

## Dosyalar

```
brand/
├── punkto-mark.svg          İşaret, tek renk, currentColor
├── punkto-wordmark.svg      Tam wordmark, outline, font bağımsız
├── Logo.tsx                 React bileşeni (wordmark / mark)
├── BRAND.md                 bu dosya
├── wordmark-preview-light.png   (henüz üretilmedi)
├── wordmark-preview-dark.png    (henüz üretilmedi)
└── icons/
    ├── favicon.svg          kırmızı zemin, kağıt işaret
    ├── favicon-16.png       (henüz üretilmedi)
    ├── favicon-32.png       (henüz üretilmedi)
    ├── favicon-48.png       (henüz üretilmedi)
    ├── icon-192.png         PWA (henüz üretilmedi)
    ├── icon-512.png         PWA (henüz üretilmedi)
    ├── apple-touch-icon.png 180px, köşe yuvarlaması YOK (henüz üretilmedi)
    ├── icon-512-ink.png     antrasit zemin varyantı (henüz üretilmedi)
    └── icon-512-paper.png   kağıt zemin, kırmızı işaret (henüz üretilmedi)
```

**Not (2026-09-14):** PNG/rasterize edilmiş varyantlar ve önizleme görselleri
henüz üretilmedi — sadece SVG kaynaklar mevcut. Bir rasterization adımı
(örn. `sharp` ile) gerekiyor.

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
| Gövde, arayüz, wordmark | sans (`--font-sans`) |

Wordmark **dondurulmuştur**. Instrument Sans SemiBold (600), letter-spacing `-0.035em`,
P harfi markanın kendi işaretiyle değiştirilmiş halde outline'a çevrildi. Artık font
değişkenlerine bağlı değil, `--font-sans` değişse bile logo değişmez.

Wordmark'taki P, fontun kendi P'sinden türetildi: gövde kalınlığı (130/1000 em) ve cap
height (720) fontla birebir aynı, kâse daireye çevrildi. Bu yüzden harflerle aynı ağırlıkta
duruyor.

**İkondaki P ile wordmark'taki P birebir aynı değil.** İkon versiyonu daha kalın gövdeli,
çünkü 16 pikselde ayakta kalması gerekiyor. Wordmark versiyonu daha ince, çünkü yanındaki
harflerle uyumlu olmak zorunda. Bu bilinçli bir optik farktır, hata değil.

Wordmark'ı değiştirmek gerekirse SVG elle düzenlenmez, üretim script'i yeniden çalıştırılır.

**Not (2026-09-14):** `scripts/build-wordmark.mjs` bu repoda mevcut ama Geist
SemiBold kullanıyor ve mark'ı ayrı bir "lockup" olarak (P harfini değiştirmek yerine
yanına ekleyerek) kompoze ediyor — yani bu dosyadaki (Instrument Sans, P'nin
kendisinin mark'a dönüştüğü) tam yaklaşımı birebir yeniden üretmiyor. Bu SVG'ler
elle entegre edildi. Script'i bu yeni yaklaşıma göre güncellemek ayrı bir iş.

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

Tagline (pazarlama): `Haberler, kısa ve öz.` / `Nachrichten, auf den Punkt.` / `News, to the point.`
