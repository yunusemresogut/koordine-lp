# Güvenlik notları

## 13.11.2026: Bağımlılık açıkları giderildi

`npm audit --omit=dev` her iki projede de **0 açık** gösteriyor.

### Tanıtım sitesi (koordine-lp)

- `next` ve `eslint-config-next` paketleri 16.2.9 sürümünden 16.4.6 sürümüne yükseltildi.
  - Kritik açıklar kapandı: `next/og` ImageResponse ve Image Optimization'da (AVIF/SVG) uzaktan kod çalıştırma.
  - Diğer açıklar kapandı: SSRF, DoS, önbellek zehirlenmesi.
  - Next.js'in alt bağımlılıkları olan `postcss` ve `sharp` güncellendi.

### Uygulama (maps-analytics)

- `next` ve `eslint-config-next` paketleri 16.4.6 sürümüne yükseltildi.
- `npm audit fix` uygulandı (`undici`, `source-map-js`, `baseline-browser-mapping`).
- `@vercel/blob` kaldırıldı. Kodda kullanılmıyordu ve `zod` açığını getiriyordu.
- `xlsx` paketi 0.18.5 sürümünden 0.20.3 sürümüne geçirildi. npm'deki sürüm artık güncellenmiyor; yeni sürüm SheetJS'in resmi CDN'inden kuruluyor (`https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz`).
  - Kapanan açıklar: prototype pollution ve ReDoS.
  - Excel içe aktarma çıktısı eski sürümle birebir aynı (karşılaştırılarak doğrulandı).
- `maplibre-gl` 5.24 sürümünden 6.18 sürümüne, `react-map-gl` de 8.1.3 sürümüne yükseltildi. Kapanan açık: kritik XSS (DOM.sanitize).
  - maplibre 6, worker dosyasını kendi JS dosyasının yanında arar. Next.js paketlediği için dosya bulunamaz (404) ve harita boş görünür.
  - Çözüm: `scripts/copy-maplibre-worker.mjs` betiği worker dosyasını `public/maplibre/` klasörüne kopyalar. Betik `postinstall` ve `prebuild` adımlarında kendiliğinden çalışır.
  - Haritalar bu adresi `<Map workerUrl={MAPLIBRE_WORKER_URL}>` ile kullanır (`src/lib/maplibre-worker.ts`).

## Açık kalanlar (yalnızca geliştirme araçları, canlı siteyi etkilemez)

- `eslint-config-next` → `typescript-eslint` → `minimatch` zincirinde orta seviye bir DoS açığı var.
- `npm audit fix --force` bu açık için `eslint-config-next` paketini 15.x sürümüne **düşürmeyi** öneriyor. Bu öneri uygulanmamalı.
- Açık, `eslint-config-next` paketinin bir sonraki sürümüyle kapanacak.

## Not: uygulamadaki mevcut lint bulguları

`maps-analytics` projesinde `npx eslint src` 17 hata ve 5 uyarı veriyor (`set-state-in-effect`, `no-explicit-any` vb.).

- Bunlar yükseltmeden önce de vardı.
- Vercel derlemesini engellemiyorlar, çünkü `next build` lint çalıştırmıyor.
- Ayrı bir temizlik işi olarak ele alınabilir.
