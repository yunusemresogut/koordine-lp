/**
 * Ana sayfa hero arka plan sahnesi ayarları.
 *
 * Sahne: ızgara zemin üzerinde eş yükselti eğrileriyle çizilmiş bir arazi (topografik pafta),
 * üzerinde sahaları temsil eden işaretler ve merkezle sahalar arasındaki ince bağlantılar.
 * Yavaşça arazinin üzerinden geçen bir tarama çizgisi ve fareye hafifçe tepki veren kamera.
 *
 * Kaldırmak için: `enabled: false` yapın ya da hero.tsx içindeki <HeroScene /> satırını silin.
 * Tamamen temizlemek için bu klasörü silip `npm uninstall three @types/three` çalıştırın.
 */
export const heroSceneConfig = {
  enabled: true,

  /** Renkler (globals.css belirteçleriyle aynı) */
  colors: {
    contour: "#7f88a0", // ink-400
    contourMajor: "#3d4866", // ink-600
    accent: "#005ffd", // brand-600
    accentSoft: "#8eb5ff", // brand-300
    paper: "#f6f7f9",
  },

  terrain: {
    /** Arazi boyutu (dünya birimi) ve çözünürlüğü */
    width: 64,
    depth: 56,
    segments: 240,
    /** Yükselti genliği ve gürültü ölçeği */
    height: 2.6,
    noiseScale: 0.05,
    seed: 7,
    /** Eş yükselti eğrisi aralığı; her `majorEvery` eğriden biri koyu çizilir */
    contourInterval: 0.2,
    majorEvery: 5,
    /** Eğri opaklığı (0-1). Metnin okunurluğu için düşük tutun. */
    opacity: 0.5,
  },

  /** Sahalar: arazi üzerindeki konum (x, z). İlki merkezdir. */
  sites: [
    [12, 1],
    [8, -3],
    [20, -6],
    [25, 4],
    [16, 9],
    [7, 8],
  ] as [number, number][],

  motion: {
    /** Tarama çizgisinin bir turu (saniye); 0 kapatır */
    scanPeriod: 14,
    /** Bağlantı çizgilerindeki noktaların bir turu (saniye) */
    pulsePeriod: 6,
    /** Kameranın yavaş salınımı (radyan) */
    drift: 0.05,
    /** Fare etkisi (0 kapatır) */
    pointer: 0.6,
  },

  camera: {
    fov: 30,
    position: [0, 6.5, 34] as [number, number, number],
    target: [5, -1.6, -8] as [number, number, number],
  },

  /** Bu genişliğin altında sahne yüklenmez (mobilde metnin arkasına düşer, pil ve veri harcar) */
  minWidth: 1024,

  /** Cihaz piksel oranı üst sınırı (performans) */
  maxDpr: 1.75,
};

export type HeroSceneConfig = typeof heroSceneConfig;
