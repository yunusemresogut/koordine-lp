/**
 * Sektör / kullanım senaryosu kaydı. Navigasyon, footer ve sitemap buradan beslenir.
 * Sayfa içi detaylı içerik: src/content/solution-details.ts
 */

export type SolutionSlug =
  | "insaat-ve-taahhut"
  | "mimarlik-ofisleri"
  | "muhendislik-ve-mep"
  | "perakende-yatirimlari";

export type Solution = {
  slug: SolutionSlug;
  name: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
};

export const solutions: Solution[] = [
  {
    slug: "insaat-ve-taahhut",
    name: "İnşaat ve Taahhüt Firmaları",
    summary: "Birden fazla şantiyeyi, hakedişi ve taşeronu aynı anda yöneten ekipler için.",
    seoTitle: "İnşaat ve Taahhüt Firmaları için Şantiye Yönetimi",
    seoDescription:
      "Çok şantiyeli taahhüt firmaları için saha takibi, günlük saha raporu, hakediş, sözleşme ve puantaj. Koordine ile şantiye yönetimini tek platformda toplayın.",
  },
  {
    slug: "mimarlik-ofisleri",
    name: "Mimarlık Ofisleri",
    summary: "Tasarımdan uygulamaya geçen projelerde saha, malzeme onayı ve iş takibi.",
    seoTitle: "Mimarlık Ofisleri için Proje ve Uygulama Takibi",
    seoDescription:
      "Mimarlık ofisleri için malzeme sunumu, uygulama denetimi, kontrol listeleri ve iş programı. Tasarımdan sahaya geçen projeleri Koordine ile izleyin.",
  },
  {
    slug: "muhendislik-ve-mep",
    name: "Mühendislik ve MEP",
    summary: "Mekanik ve elektrik ekipleri için yapım yöntemi, NCR ve kalite kayıtları.",
    seoTitle: "Mühendislik ve MEP Ekipleri için Saha Yönetimi",
    seoDescription:
      "Mekanik, elektrik ve inşaat mühendisliği ekipleri için yapım yöntemi, NCR, İSG ve kontrol listesi raporları; keşif ve sertifika takibi tek platformda.",
  },
  {
    slug: "perakende-yatirimlari",
    name: "Perakende ve Mağaza Yatırımları",
    summary: "Yeni mağaza açılışları ve tadilatları için harita, takvim ve talep yönetimi.",
    seoTitle: "Mağaza Açılış ve Tadilat Projeleri Yönetimi",
    seoDescription:
      "Zincir mağaza, ofis ve AVM projelerinde açılış takvimi, tadilat talepleri, keşif ve hakedişleri harita üzerinden yönetin. Bölge bazlı görünürlük elde edin.",
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
