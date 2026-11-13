import type { SiteStatus } from "./primitives";

/**
 * Ürün görsellerinde kullanılan örnek veri. Gerçek müşteri verisi değildir;
 * alan adları ve durumlar uygulamadaki (maps-analytics) karşılıklarıyla aynıdır.
 * Referans "bugün": 11.11.2026.
 */

export type MockSite = {
  id: string;
  name: string;
  district: string;
  city: string;
  type: string;
  status: SiteStatus;
  opening: string;
  /** Harita SVG koordinatı (viewBox 800×520) */
  x: number;
  y: number;
  progress?: number;
  /** Açılışa kalan süre notu (bugün: 11.11.2026) */
  countdown?: string;
};

export const mockSites: MockSite[] = [
  { id: "kdk", name: "Kadıköy Bahariye Mağaza", district: "Kadıköy", city: "İstanbul", type: "Mağaza", status: "yakinda_aciliyor", opening: "14.11.2026", x: 506, y: 382, progress: 86, countdown: "3 gün kaldı" },
  { id: "lvt", name: "Levent Ofis Katı", district: "Beşiktaş", city: "İstanbul", type: "Ofis", status: "santiye", opening: "02.12.2026", x: 408, y: 214, progress: 54, countdown: "21 gün kaldı" },
  { id: "ats", name: "Ataşehir AVM Mağaza", district: "Ataşehir", city: "İstanbul", type: "AVM", status: "ihale", opening: "15.01.2027", x: 604, y: 334 },
  { id: "bkr", name: "Bakırköy Cadde Mağaza", district: "Bakırköy", city: "İstanbul", type: "Cadde", status: "acilis", opening: "20.10.2026", x: 196, y: 398 },
  { id: "usk", name: "Üsküdar Sahil Kafe", district: "Üsküdar", city: "İstanbul", type: "Kafe", status: "hakedis", opening: "28.09.2026", x: 516, y: 318 },
  { id: "mcd", name: "Mecidiyeköy Ofis", district: "Şişli", city: "İstanbul", type: "Ofis", status: "proje", opening: "03.03.2027", x: 362, y: 266 },
  { id: "umr", name: "Ümraniye Lojistik Depo", district: "Ümraniye", city: "İstanbul", type: "Endüstriyel", status: "fatura", opening: "12.08.2026", x: 622, y: 232 },
  { id: "mlt", name: "Maltepe Sahil Mağaza", district: "Maltepe", city: "İstanbul", type: "Mağaza", status: "santiye", opening: "09.12.2026", x: 676, y: 414, progress: 38, countdown: "28 gün kaldı" },
  { id: "bsk", name: "Başakşehir Konut Satış Ofisi", district: "Başakşehir", city: "İstanbul", type: "Konut", status: "proje", opening: "22.04.2027", x: 128, y: 196 },
];

export const mockPeople = {
  siteChief: "Emre Aydın",
  architect: "Selin Kara",
  mechanical: "Burak Yıldız",
  electrical: "Okan Demir",
  civil: "Mert Çelik",
  regional: "Deniz Arslan",
  accounting: "Ayşe Koç",
  hse: "Hakan Şahin",
  manager: "Zeynep Öztürk",
};
