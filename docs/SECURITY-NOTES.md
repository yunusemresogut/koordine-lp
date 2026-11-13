# Güvenlik notları

## Bağımlılık uyarıları (`npm audit`, 13.11.2026), açık

Kaynak: `npm audit`. three.js'ten değil, mevcut Next.js sürümünden ve araç zincirinden geliyor.
**Önerilen çözüm:** `next` ve `eslint-config-next` paketlerini 16.4.6'ya (ya da o anki en yeni 16.x sürümüne) yükseltmek.
Ardından `npm audit`, `npm run lint`, `npm run build` ve ekran kontrolleri yapılmalı.

### next 16.2.9 (kritik)

Bu siteyi doğrudan ilgilendirenler:

| Önem | Konu | Bu sitede | Düzelen sürüm |
| --- | --- | --- | --- |
| Kritik | `next/og` ImageResponse içinde uzaktan kod çalıştırma ([GHSA-vcvr-r3jv-pc5j](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j)) | OG görselleri `next/og` ile üretiliyor; hepsi build sırasında statik üretildiği için risk düşük ama kapsamda | 16.3.6 |
| Kritik | Image Optimization API, AVIF ile uzaktan kod çalıştırma ([GHSA-2xp9-vwfh-vxw4](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4)) | `next/image` kullanılıyor, `next.config.ts` içinde `avif` formatı açık | 16.3.3 |
| Kritik | Image Optimization API, SVG ile uzaktan kod çalıştırma ([GHSA-2464-fhr4-w9xw](https://github.com/advisories/GHSA-2464-fhr4-w9xw)) | `next/image` kullanılıyor | 16.4.0 sonrası |
| Yüksek | Image Optimization'da SSRF ([GHSA-cjq9-62q9-8jv4](https://github.com/advisories/GHSA-cjq9-62q9-8jv4)) | `next/image` kullanılıyor | 16.3.8 |
| Orta | Image Optimization API'de SVG ile DoS ([GHSA-q8wf-6r8g-63ch](https://github.com/advisories/GHSA-q8wf-6r8g-63ch)) | `next/image` kullanılıyor | 16.2.11 |
| Orta | SSG/ISR önbellek zehirlenmesi ([GHSA-4jqv-mc3x-m676](https://github.com/advisories/GHSA-4jqv-mc3x-m676), [GHSA-mcj8-r9mp-w47p](https://github.com/advisories/GHSA-mcj8-r9mp-w47p)) | Sayfalar SSG; Vercel'de barındırıldığında etkisi sınırlı | 16.3.8 |
| Orta | Metadata görsel rotalarında `dynamicParams` atlatma ([GHSA-f87g-xv8r-7p7x](https://github.com/advisories/GHSA-f87g-xv8r-7p7x)) | `[slug]/opengraph-image` rotaları var | 16.3.8 |

Bu sitede kullanılmayan özellikleri etkileyenler:
- Server Actions (DoS, SSRF, payload).
- Middleware/Proxy.
- `use cache`.
- rewrites.
- Windows sunucu.
- Dev sunucusu MCP uç noktası.

Bunlar sürüm yükseltmesiyle birlikte kapanır.

### postcss ≤ 8.5.22 (yüksek) ve sharp ≤ 0.35.5-rc.1 (yüksek)

Next.js'in alt bağımlılıkları; `next` 16.4.6'ya yükseltilince düzelir.
- **postcss:** sourceMappingURL üzerinden dosya okuma. Yalnızca derleme zamanı.
- **sharp:** libvips, libheif ve librsvg açıkları; görsel optimizasyonunda kullanılıyor.

### eslint-config-next / typescript-eslint / minimatch (orta)

Yalnızca geliştirme araçları, canlı siteyi etkilemez (minimatch'te DoS).
`npm audit fix --force` önerisi `eslint-config-next`'i 15.x'e **düşürüyor**; uygulanmamalı.
Next.js yükseltmesiyle birlikte `eslint-config-next`'i de aynı 16.x sürümüne çekmek yeterli.
