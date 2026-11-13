/**
 * Modül kaydı. Navigasyon, footer, sitemap ve /ozellikler sayfaları buradan beslenir.
 * Yalnızca uygulamada gerçekten bulunan yetenekler yazılır.
 * Sayfa içi detaylı içerik: src/content/feature-details.ts
 */

export type FeatureSlug =
  | "saha-ve-harita"
  | "kesif-ve-is-programi"
  | "hakedis-ve-finans"
  | "saha-raporlari"
  | "talepler-ve-onaylar"
  | "insan-kaynaklari"
  | "envanter-ve-zimmet"
  | "ekip-ve-iletisim"
  | "yapay-zeka-asistani";

export type Feature = {
  slug: FeatureSlug;
  /** Kısa modül adı (menü, kart) */
  name: string;
  /** Mono etiket kodu, ör. "SAH" — pafta antedi gibi kullanılır */
  code: string;
  /** Tek cümlelik özet (menü açıklaması, kart) */
  summary: string;
  /** Sayfanın <title> değeri (marka eki şablondan gelir) */
  seoTitle: string;
  /** Meta description (150–160 karakter) */
  seoDescription: string;
  /** Lucide ikon adı — components/ui/feature-icon.tsx eşler */
  icon: "map" | "ruler" | "receipt" | "file-text" | "git-pull-request" | "users" | "package" | "messages" | "sparkles";
};

export const features: Feature[] = [
  {
    slug: "saha-ve-harita",
    name: "Saha ve Harita",
    code: "SAH",
    icon: "map",
    summary: "Tüm sahalarınızı harita üzerinde konum, durum ve açılış tarihiyle izleyin.",
    seoTitle: "Harita Tabanlı Saha Takibi",
    seoDescription:
      "Koordine ile tüm saha ve şantiyelerinizi harita üzerinde konum, durum ve açılış takvimiyle tek ekranda izleyin; adres ve şehir bilgisi konumdan doğrulanır.",
  },
  {
    slug: "kesif-ve-is-programi",
    name: "Keşif ve İş Programı",
    code: "KSF",
    icon: "ruler",
    summary: "Poz numaralı keşif kalemleri, malzeme toplamları ve Excel uyumlu iş programı.",
    seoTitle: "Keşif, Metraj ve İş Programı Yönetimi",
    seoDescription:
      "Poz numaralı keşif kalemlerini, malzeme toplamlarını ve iş programını saha bazında yönetin. Excel'den içe aktarın, ilerlemeyi ekipçe takip edin.",
  },
  {
    slug: "hakedis-ve-finans",
    name: "Hakediş ve Finans",
    code: "HKD",
    icon: "receipt",
    summary: "Sözleşme, hakediş ve faturayı birbirine bağlı kayıtlar olarak izleyin.",
    seoTitle: "Hakediş, Sözleşme ve Fatura Takibi",
    seoDescription:
      "Sözleşmeleri, hakedişleri ve faturaları saha ve proje bazında birbirine bağlayın. TRY, USD, EUR, GBP ve CHF para birimleriyle finansal durumu net görün.",
  },
  {
    slug: "saha-raporlari",
    name: "Saha Raporları",
    code: "RPR",
    icon: "file-text",
    summary: "Günlük saha, İSG, NCR, yapım yöntemi, malzeme sunumu ve kontrol listesi raporları.",
    seoTitle: "Günlük Saha Raporu, İSG ve NCR Raporları",
    seoDescription:
      "Günlük saha raporu, İSG, uygunsuzluk (NCR), yapım yöntemi, malzeme sunumu ve kontrol listesi raporlarını sahada doldurun; A4 belge olarak paylaşın.",
  },
  {
    slug: "talepler-ve-onaylar",
    name: "Talepler ve Onaylar",
    code: "TLP",
    icon: "git-pull-request",
    summary: "Tadilat taleplerini kodlu kayıtlarla açın, disiplin onaylarıyla sonuçlandırın.",
    seoTitle: "Tadilat Talepleri ve Disiplin Onayları",
    seoDescription:
      "Tadilat taleplerini otomatik kodla açın, sorumlu ve öncelik atayın; projeleri mimari, mekanik ve elektrik disiplin onaylarıyla kayıt altına alın.",
  },
  {
    slug: "insan-kaynaklari",
    name: "İnsan Kaynakları",
    code: "İK",
    icon: "users",
    summary: "Personel, sertifika, puantaj, izin ve duyurular saha ekibiyle aynı yerde.",
    seoTitle: "Saha Personeli için İnsan Kaynakları Yönetimi",
    seoDescription:
      "Personel kartları, sertifika takibi, puantaj, izin ve talepler, duyurular. Saha ve ofis ekibinin insan kaynakları süreçlerini Koordine'de yönetin.",
  },
  {
    slug: "envanter-ve-zimmet",
    name: "Envanter ve Zimmet",
    code: "ENV",
    icon: "package",
    summary: "Demirbaş ve ekipmanları kayda alın, kimde olduğunu zimmetle takip edin.",
    seoTitle: "Envanter ve Zimmet Takibi",
    seoDescription:
      "Ekipman, demirbaş ve araçları envantere kaydedin; personele zimmetleyin, iade ve devirleri geçmişiyle birlikte takip edin.",
  },
  {
    slug: "ekip-ve-iletisim",
    name: "Ekip ve İletişim",
    code: "EKP",
    icon: "messages",
    summary: "Firma içi sohbet, dosya paylaşımı, bildirimler ve rol bazlı yetkiler.",
    seoTitle: "Ekip İletişimi, Roller ve Yetkiler",
    seoDescription:
      "Firma içi sohbet ve dosya paylaşımı, anlık bildirimler, mühendis, mimar, saha sorumlusu ve muhasebe gibi rollere göre ayarlanabilir yetkiler.",
  },
  {
    slug: "yapay-zeka-asistani",
    name: "Yapay Zekâ Asistanı",
    code: "AI",
    icon: "sparkles",
    summary: "Firma verinize soru sorun; asistan önerir, siz onaylayınca kayıt eklenir.",
    seoTitle: "Proje Verisi için Yapay Zekâ Asistanı",
    seoDescription:
      "Sahalar, açılış takvimi, iş planları ve finans kayıtlarınız hakkında doğal dille soru sorun. Asistan kayıt önerir; önizlemeyi onaylarsanız eklenir.",
  },
];

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);
