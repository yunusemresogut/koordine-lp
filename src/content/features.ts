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
  /** Tek cümlelik özet (menü açıklaması, kart) */
  summary: string;
  /** Sayfanın <title> değeri (marka eki şablondan gelir) */
  seoTitle: string;
  /** Meta description (150–160 karakter) */
  seoDescription: string;
  /** Lucide ikon adı; components/ui/feature-icon.tsx eşler */
  icon: "map" | "ruler" | "receipt" | "file-text" | "git-pull-request" | "users" | "package" | "messages" | "sparkles";
};

export const features: Feature[] = [
  {
    slug: "saha-ve-harita",
    name: "Saha ve Harita",
    icon: "map",
    summary: "Tüm sahalarınızı harita üzerinde konum, durum ve açılış tarihiyle izleyin.",
    seoTitle: "Harita Tabanlı Saha Takibi",
    seoDescription:
      "Saha ve şantiyelerinizi harita üzerinde konum, durum ve açılış tarihiyle izleyin. Adres ve şehir bilgisi seçtiğiniz konumdan doldurulur.",
  },
  {
    slug: "kesif-ve-is-programi",
    name: "Keşif ve İş Programı",
    icon: "ruler",
    summary: "Poz numaralı keşif kalemleri, malzeme toplamları ve Excel uyumlu iş programı.",
    seoTitle: "Keşif, Metraj ve İş Programı Yönetimi",
    seoDescription:
      "Poz numaralı keşif kalemlerini, malzeme toplamlarını ve iş programını saha bazında yönetin. Excel'den içe aktarın, ilerlemeyi ekipçe takip edin.",
  },
  {
    slug: "hakedis-ve-finans",
    name: "Hakediş ve Finans",
    icon: "receipt",
    summary: "Sözleşme, hakediş ve faturaları birbirine bağlı olarak takip edin.",
    seoTitle: "Hakediş, Sözleşme ve Fatura Takibi",
    seoDescription:
      "Sözleşme, hakediş ve faturaları saha bazında birbirine bağlayın. TRY, USD, EUR, GBP ve CHF tutarlar ayrı toplanır, sözleşme ilerlemesi güncel kalır.",
  },
  {
    slug: "saha-raporlari",
    name: "Saha Raporları",
    icon: "file-text",
    summary: "Günlük saha, İSG, NCR, yapım yöntemi, malzeme sunumu ve kontrol listesi raporları.",
    seoTitle: "Günlük Saha Raporu, İSG ve NCR Raporları",
    seoDescription:
      "Günlük saha raporu, İSG, uygunsuzluk (NCR), yapım yöntemi, malzeme sunumu ve kontrol listesi raporlarını sahada doldurun; A4 belge olarak paylaşın.",
  },
  {
    slug: "talepler-ve-onaylar",
    name: "Talepler ve Onaylar",
    icon: "git-pull-request",
    summary: "Tadilat taleplerini kodla açın, proje onaylarını disiplin bazında takip edin.",
    seoTitle: "Tadilat Talepleri ve Disiplin Onayları",
    seoDescription:
      "Tadilat taleplerini sıralı kodla açın, sorumlu ve öncelik atayın. Mimari, mekanik ve elektrik onaylarını onaylayan kişi ve tarihle kayda alın.",
  },
  {
    slug: "insan-kaynaklari",
    name: "İnsan Kaynakları",
    icon: "users",
    summary: "Personel kartları, belgeler, puantaj, izinler ve duyurular.",
    seoTitle: "Saha Personeli için İnsan Kaynakları Yönetimi",
    seoDescription:
      "Saha ve ofis personelinin kartlarını, belgelerini, puantajını ve izinlerini Koordine'de yönetin. Günlük rapordaki yoklama puantaja işlenir.",
  },
  {
    slug: "envanter-ve-zimmet",
    name: "Envanter ve Zimmet",
    icon: "package",
    summary: "Demirbaş ve ekipmanları kayda alın, kimde olduğunu zimmetle takip edin.",
    seoTitle: "Envanter ve Zimmet Takibi",
    seoDescription:
      "Ekipman, demirbaş ve araçları envantere kaydedin. Personele zimmetleyin, teslimleri ve araç belgelerinin bitiş tarihlerini geçmişiyle takip edin.",
  },
  {
    slug: "ekip-ve-iletisim",
    name: "Ekip ve İletişim",
    icon: "messages",
    summary: "Firma içi sohbet, dosya paylaşımı, bildirimler ve rol bazlı yetkiler.",
    seoTitle: "Ekip İletişimi, Roller ve Yetkiler",
    seoDescription:
      "Firma içi sohbet ve dosya paylaşımı, modül bazında bildirimler. Mühendis, mimar, saha sorumlusu ve muhasebe gibi rollere göre ayarlanan yetkiler.",
  },
  {
    slug: "yapay-zeka-asistani",
    name: "Yapay Zekâ Asistanı",
    icon: "sparkles",
    summary: "Firma verinize soru sorun; önerilen kayıt siz onaylayınca eklenir.",
    seoTitle: "Proje Verisi için Yapay Zekâ Asistanı",
    seoDescription:
      "Sahalar, açılış takvimi, iş planları ve finans kayıtlarınız hakkında doğal dille soru sorun. Asistanın önerdiği kayıt, siz onaylarsanız eklenir.",
  },
];

export const featureBySlug = (slug: string) => features.find((f) => f.slug === slug);
