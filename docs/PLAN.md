# Koordine Tanıtım Sitesi Planı

Alan adı: `https://koordine.com.tr` (ana domain). Uygulama ayrı bir alt alan adında çalışır
(varsayılan `https://app.koordine.com.tr`, `NEXT_PUBLIC_APP_URL` ile değiştirilebilir).
Destek: `destek@koordine.com.tr`.

## 1. Konumlandırma

Koordine; mühendislik, mimarlık ve taahhüt firmalarının saha, proje ve şantiye operasyonlarını
tek yerde yöneten bir platformdur. Site, ürünün **gerçekten var olan** modüllerini anlatır:

| Modül | Uygulamadaki karşılığı |
| --- | --- |
| Saha ve harita | Harita tabanlı saha listesi, konum/adres doğrulama, açılış takvimi |
| Keşif ve iş programı | Poz no'lu keşif kalemleri, malzeme toplamları, Excel iş planı |
| Hakediş ve finans | Sözleşme, hakediş, fatura; 5 para birimi (TRY, USD, EUR, GBP, CHF) |
| Saha raporları | Günlük saha raporu, İSG, NCR, yapım yöntemi, malzeme sunumu, kontrol listesi → A4 belge |
| Talepler ve onaylar | Tadilat talepleri (TT-0001), proje disiplin onayları (mimari/mekanik/elektrik), bildirimler |
| İnsan kaynakları | Personel, sertifikalar, puantaj, izinler, talepler, duyurular |
| Envanter ve zimmet | Demirbaş, zimmet atamaları |
| Ekip ve iletişim | Firma içi sohbet, dosya paylaşımı, rol bazlı yetkiler, tek oturum |
| Yapay zekâ asistanı | Firma verisine göre cevap, onaylı kayıt ekleme |

Kural: Uydurma müşteri logosu, sahte yorum, sahte istatistik **yok**. Sayılar yalnızca ürün
gerçeklerinden gelir (6 rapor tipi, 5 para birimi, 2 dil vb.).

## 2. Görsel dil "Teknik pafta"

Mühendislik/mimarlık çizim paftasından türetilen, sakin ve kurumsal bir dil.

- **Renk:** Lacivert mürekkep `#040C26`, marka mavisi `#005FFD`, kâğıt `#F6F7F9`, kıl çizgi `#DCE0E7`.
  Mavi yalnızca vurgu ve birincil aksiyonda; geniş gradyan, neon, mor yok.
- **Tipografi:** IBM Plex Sans (başlık + gövde), IBM Plex Mono (etiketler, kodlar, koordinatlar).
- **Motifler:** İnce ızgara çizgileri, köşe kesim işaretleri,
  ölçü çizgisi detayları, pafta antet kutusu. Süs için değil, yapıyı göstermek için.
- **Ürün görselleri:** HTML/CSS ile çizilmiş gerçekçi arayüz parçaları (harita, hakediş tablosu,
  A4 rapor, iş programı). Gerçek ekran görüntüleri geldiğinde değiştirilebilir.
- **Kaçınılanlar:** Cam efekti, bulanık renk lekeleri, emoji, "devrim yaratın" tipi metin,
  her şeyin üç kartlık ızgara olması, ikon-kutusu-başlık-paragraf tekrarı.

## 3. Bilgi mimarisi

```
/                               Ana sayfa
/ozellikler                     Modüllere genel bakış
/ozellikler/[modul]             9 modül sayfası
/cozumler/[sektor]              İnşaat-taahhüt, mimarlık ofisleri, mühendislik/MEP, perakende yatırımları
/hakkimizda
/sss                            FAQPage şeması
/iletisim                       Demo talep formu + iletişim
/kvkk  /gizlilik  /cerez-politikasi  /kullanim-kosullari
```

## 4. SEO

- Her sayfada `generateMetadata` ile benzersiz title/description, canonical, OpenGraph, Twitter.
- `sitemap.ts` (içerik kayıtlarından otomatik), `robots.ts`, `manifest.ts`, ikonlar.
- Dinamik OG görselleri (`next/og`): kök + modül + çözüm sayfaları.
- JSON-LD: Organization, WebSite, SoftwareApplication, BreadcrumbList, FAQPage.
- `lang="tr"`, `tr_TR`, semantik başlık hiyerarşisi (sayfa başına tek h1).
- Statik üretim (SSG), `next/image`, `next/font` → iyi Core Web Vitals.

## 5. Teknik

- Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.
- İletişim formu: `/api/contact` Route Handler → Resend (`RESEND_API_KEY` varsa), yoksa
  kullanıcıya `mailto:` yedeği gösterilir. Honeypot + basit hız sınırı.
- Vercel Analytics.

## 6. Geliştirme adımları

1. Temel: iskelet, tasarım belirteçleri, layout, header/footer, UI bileşenleri, SEO altyapısı, içerik kayıtları.
2. Paralel: (A) ana sayfa + ürün görselleri, (C) kurumsal/yasal/iletişim sayfaları + form API,
   (D) çözüm sayfaları.
3. (B) modül sayfaları A'nın ürün görsellerini yeniden kullanır.
4. QA: build, lint, erişilebilirlik, SEO denetimi, mobil/masaüstü ekran görüntüleri.

## 7. Açık konular (firma tarafından doldurulacak)

- Ticari unvan, adres, MERSİS/vergi no (yasal metinler ve Organization şeması için) → `src/lib/site.ts`.
- Telefon numarası, sosyal medya hesapları.
- Gerçek ekran görüntüleri / müşteri referansları (izinli olanlar).
- Uygulamanın kalıcı adresi (`app.koordine.com.tr` varsayıldı).
