# Koordine — Tanıtım Sitesi

`https://koordine.com.tr` adresinde yayınlanan kurumsal tanıtım sitesi.
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript. Tüm sayfalar statik üretilir.

- Plan ve bilgi mimarisi: [docs/PLAN.md](docs/PLAN.md)
- Tasarım ve içerik kuralları: [docs/CONVENTIONS.md](docs/CONVENTIONS.md)

## Geliştirme

```bash
npm install
cp .env.example .env.local   # gerekli değerleri doldurun
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Ortam değişkenleri

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Varsayılan `https://koordine.com.tr` (canonical, sitemap, OG) |
| `NEXT_PUBLIC_APP_URL` | Uygulama adresi, varsayılan `https://app.koordine.com.tr` ("Giriş yap") |
| `RESEND_API_KEY` | Demo formunun e-posta göndermesi için. Yoksa form mailto yedeğine düşer |
| `CONTACT_TO` / `CONTACT_FROM` | Formun alıcısı (varsayılan destek@koordine.com.tr) ve göndereni (Resend'de doğrulanmış alan adı) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_YANDEX_VERIFICATION` | Search Console / Yandex Webmaster doğrulama kodları |

## İçerik nerede?

| Ne | Dosya |
| --- | --- |
| Firma bilgileri (unvan, adres, MERSİS, telefon, sosyal medya) | `src/lib/site.ts` |
| Modüller (menü, footer, sitemap) / detaylar | `src/content/features.ts`, `src/content/feature-details.ts` |
| Çözümler / detaylar | `src/content/solutions.ts`, `src/content/solution-details.ts` |
| Ana sayfa metinleri | `src/content/home.ts` |
| SSS | `src/content/faq.ts` |
| Ürün görselleri (HTML/CSS mockup) | `src/components/mockups/` |

Yeni modül/çözüm eklendiğinde menü, footer, sitemap ve statik sayfalar otomatik güncellenir.

## SEO

`sitemap.xml`, `robots.txt` (Vercel preview ortamlarında indekslemeyi kapatır), `manifest.webmanifest`,
sayfa bazlı canonical/OpenGraph/Twitter, dinamik OG görselleri (`src/lib/og.tsx`) ve JSON-LD
(Organization, WebSite, SoftwareApplication, WebPage, BreadcrumbList, FAQPage).
İçerik güncellendiğinde `src/app/sitemap.ts` içindeki `CONTENT_UPDATED` tarihini değiştirin.

## Yayına alma (Vercel)

1. Projeyi Vercel'e bağlayın, ortam değişkenlerini girin.
2. `koordine.com.tr` alan adını ekleyin; `www.koordine.com.tr` → apex yönlendirmesini Vercel'de tanımlayın.
3. Yayından sonra Google Search Console ve Yandex Webmaster'a `https://koordine.com.tr/sitemap.xml` gönderin.
