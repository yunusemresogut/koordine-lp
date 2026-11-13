# Geliştirme ve Tasarım Kuralları

Bu belge, siteye katkı veren herkesin (insan veya agent) aynı dili konuşması içindir.
Önce `docs/PLAN.md`'yi okuyun.

## Next.js 16

Bu sürüm eğitim verilerinizdeki Next.js'ten farklı olabilir. Bir API'yi kullanmadan önce
`node_modules/next/dist/docs/` altındaki ilgili belgeyi okuyun.
- Dinamik `params` bir **Promise**'tir: `const { slug } = await params`.
- `generateStaticParams` ile tüm dinamik sayfalar statik üretilir; `dynamicParams = false`.
- Metadata: her sayfa `export const metadata` ya da `generateMetadata` ile `pageMetadata()`
  (`src/lib/seo.ts`) kullanır. Canonical, OG ve Twitter oradan gelir.

## Mevcut altyapı (değiştirmeyin, kullanın)

| Dosya | Ne işe yarar |
| --- | --- |
| `src/lib/site.ts` | Site URL, uygulama URL, destek e-postası, firma bilgileri (`site`, `appLinks`, `absoluteUrl`) |
| `src/lib/seo.ts` | `pageMetadata`, JSON-LD üreticileri (`breadcrumbSchema`, `faqSchema`, `webPageSchema`, `softwareApplicationSchema`) |
| `src/lib/og.tsx` | `renderOg({ eyebrow, title, subtitle })` → segment bazlı `opengraph-image.tsx` için |
| `src/components/seo/json-ld.tsx` | `<JsonLd data={...} />` |
| `src/components/ui/container.tsx` | `<Container size="default|narrow|wide">` |
| `src/components/ui/button.tsx` | `ButtonLink`, `Button`, `TextLink`, `buttonClasses`, `Arrow` |
| `src/components/ui/section-header.tsx` | `SectionHeader` (align `left`/`split`), `Eyebrow` |
| `src/components/ui/feature-icon.tsx` | Modül ikonları |
| `src/components/ui/reveal.tsx` | Görünür olunca belirme (bölüm düzeyinde, ölçülü) |
| `src/components/ui/breadcrumbs.tsx` | Görünür içerik yolu + BreadcrumbList şeması |
| `src/components/sections/page-hero.tsx` | İç sayfa üst bölümü (h1 burada) |
| `src/components/sections/cta-band.tsx` | Sayfa sonu demo çağrısı (her sayfanın sonunda) |
| `src/content/features.ts`, `solutions.ts`, `navigation.ts` | İçerik kayıtları (slug, ad, özet, SEO metinleri) |

Ortak dosyalarda değişiklik gerekiyorsa **kendiniz değiştirmeyin**; raporunuzda önerin.
Kendi alanınıza ait yeni dosyalar oluşturabilirsiniz.

## Görsel dil "Teknik pafta"

- **Renk belirteçleri** (`globals.css` @theme): `ink-50…950` (lacivert mürekkep), `brand-50…950`
  (marka mavisi, 600 = #005FFD), `paper`, `paper-2`, `line`, `line-strong`, `line-dark`, `ok`, `warn`, `risk`.
  Tailwind'in varsayılan `gray/slate/blue/indigo/purple` renklerini **kullanmayın**.
- **Yardımcılar:** `bg-grid`, `bg-grid-dark`, `bg-dots`, `mask-fade-b`, `mask-fade-x`, `crop-marks`, `prose-legal`.
- **Tipografi:** IBM Plex Sans (`font-sans`) ve IBM Plex Mono (`font-mono`).
  Başlıklar `font-semibold tracking-[-0.025em]`, `text-balance`. Mono yalnızca etiket, kod, sayı ve
  koordinat için; küçük, büyük harf, geniş harf aralığı (`tracking-[0.14em]`).
- **Köşeler:** Keskin. `rounded-sm` (4px) üst sınır; kartlarda `rounded-md` (6px). `rounded-2xl/3xl/full` yok
  (yalnızca durum noktaları ve avatarlar `rounded-full` olabilir).
- **Çizgiler:** 1px `border-line`. Gölgeler çok hafif (`shadow-panel`, `shadow-float`).
- **Numara ve kod yok:** Bölümlere, modüllere, maddelere "00/01/02", "S.01", "M-03", "P.02", "R.01" gibi
  numaralar ve "SAH/KSF/HKD/ÇZM-…/Pafta 00" gibi süs kısaltmaları **verilmez**. `Eyebrow` yalnızca kısa bir etiket alır.
  Mockup'lardaki gerçek uygulama verileri (TT-0042, poz no, demirbaş no, tarih, tutar) kalabilir.
- **Ritim:** Bölümler `py-20 sm:py-28`. Bölümler arasında `border-t border-line` ile ayrım. Zemin değişimi:
  `bg-paper` (varsayılan) ↔ `bg-white` ↔ `bg-ink-950` (en fazla 1-2 koyu bölüm/sayfa + CtaBand).

### Kesinlikle kaçınılacaklar (AI-slop işaretleri)

- Mor/pembe gradyanlar, renkli bulanık lekeler, cam (glassmorphism), parıltı/ışıma efektleri.
- Emoji, "✨", "🚀"; "devrim", "geleceğin", "sınırları zorlayın", "güçlendirin", "sorunsuz", "tek tıkla her şey" gibi klişeler.
- Her bölümün ortalanmış başlık + 3'lü ikon kartı olması. İkon-kutusu-başlık-paragraf tekrarı.
- Uydurma müşteri logoları, uydurma yorumlar/kişiler, uydurma sayılar ("%40 verim artışı", "10.000+ kullanıcı").
  Sayı kullanacaksanız ürün gerçeği olsun: 6 rapor tipi, 5 para birimi, 9 modül, 2 dil (TR/EN), 9 hazır rol + özel rol.
- Aşırı animasyon. Hover geçişleri 150–200ms; `Reveal` yalnızca bölüm girişlerinde.

### Ürün görselleri (mockup)

Gerçek ekran görüntüsü yok; arayüz parçaları HTML/CSS ile çizilir. Kurallar:
- Gerçekçi Türkçe veri: saha adları ("Kadıköy Mağaza", "Ankara Kızılay Ofis", "İzmir Alsancak"),
  kodlar (TT-0042, SZ-0012), poz numaraları (15.250.1011 gibi), tarih formatı 14.11.2026, para `₺1.245.800,00`.
- Uygulama arayüzü açık temada: beyaz paneller, `border-line`, küçük metin (12–13px), mono sayılar (`tabular-nums`).
- Dekoratif oldukları için kapsayıcıya `aria-hidden` veya anlamlı tek bir `role="img"` + `aria-label` verin;
  ekran okuyucuya yüzlerce sahte hücre okutmayın.
- Mobilde taşmasın: dar ekranda sadeleşsin ya da ölçeklensin, yatay kaydırma oluşmasın.

## Metin dili

> Kullanıcı geri bildirimi (2026-11): Site "yapay zekâ yazmış gibi" görünmemeli. Aşağıdaki kurallar bağlayıcıdır.

- **Uzun çizgi (—) ve iki tire (--) kullanılmaz.** Yerine nokta, virgül, iki nokta ya da "ve" kullanın;
  gerekirse cümleyi bölün. En dash (–) yalnızca sayı aralığında (09:00–18:00) kalabilir.
- **İnsan gibi yazın.** Bir satış danışmanının ya da proje müdürünün müşteriye anlatacağı gibi; doğal, düz cümleler.
  Kaçının: "X'ten Y'ye, her şey tek yerde" kalıpları, art arda üçlü sıralamalar, her cümlede iki noktalı
  vurgu, "kendiliğinden", "ait olduğu yere bağlı kalır", "tek kayıt", "birbirinden habersiz" gibi
  edebi/betimleyici süsler, kişileştirme ("asistan sınırını açıkça söyler"), "Bugün / Koordine ile" tipi
  abartılı karşıtlıklar, "·" ile dizilmiş anahtar kelime listeleri.
- **Az ve öz.** Her bölüm tek bir şey söylesin. Her detayı sıralamayın; okuyucunun karar vermesine yarayan
  2–4 madde yeterli. Aynı bilgiyi sayfa içinde tekrar etmeyin. Teknik dip notları, alan adı listeleri,
  "şunu yapmaz, bunu yapmaz" açıklamaları gerekmedikçe çıkarın.

- Türkçe, kurumsal ama sade; "siz" hitabı. Kısa cümleler. Sektör terimleri doğru:
  hakediş, keşif, metraj, poz no, iş programı, puantaj, zimmet, İSG, NCR (uygunsuzluk), yapım yöntemi
  (method statement), malzeme sunumu (submittal), taşeron, şantiye şefi.
- İddialar uygulamada gerçekten var olan özelliklere dayanır. Emin değilseniz
  `/Users/yunusemresogut/Documents/maps-analytics/src/i18n/messages/*.ts` dosyalarından doğrulayın.
  Olmayan bir özelliği (mobil uygulama, offline mod, entegrasyon, ISO sertifikası, veri merkezi yeri,
  fiyat) **yazmayın**.

## Erişilebilirlik ve SEO

- Sayfa başına tek `h1` (PageHero içinde). Bölümler `h2`, alt başlıklar `h3`.
- `section` elemanlarına `aria-labelledby`.
- Görsellerde anlamlı `alt`; dekoratiflerde `alt=""`/`aria-hidden`.
- Renk kontrastı AA. Odak halkası global olarak tanımlı; kaldırmayın.
- Dahili bağlantılar `next/link`. Uygulama bağlantıları (`appLinks`) düz `<a>`.
- Görsel varsa `next/image`.

## Doğrulama

- `npx tsc --noEmit` ve `npx eslint <dosyalarınız>` temiz olmalı.
- **`next build` veya `next dev` çalıştırmayın** (paralel çalışan diğer agent'larla çakışır).
  Paylaşılan dev sunucusu: `http://localhost:3000` (çalışıyor, değişiklikleri anında yansıtır).
- Ekran görüntüsü: `node /private/tmp/claude-501/-Users-yunusemresogut-Documents-koordine-lp/c43e3292-7b19-4f2b-ba2f-6a199cfbd262/scratchpad/shot/shot.mjs <url> <çıktı.png> [genişlik=1440] [tamSayfa=1]`
  Çıktıları scratchpad'e yazın. Masaüstü (1440) ve mobil (390) kontrol edin; görüntüyü Read ile açıp bakın.
