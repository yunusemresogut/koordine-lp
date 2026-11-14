/**
 * Modül (özellik) sayfalarının detaylı içeriği. Kısa kayıtlar (ad, özet, SEO) features.ts'dedir.
 *
 * Kural: Her cümle uygulamada (maps-analytics) gerçekten bulunan bir yeteneğe dayanır:
 * i18n mesajları (site, finance, reports, report-types, hr, inventory, team, assistant, settings,
 * admin, system), lib (currency, module-finance, material-totals, excel-*, opening-dates, roles,
 * site-reports, single-session). Alan ve durum adları uygulamadaki etiketlerle aynıdır.
 * Uydurma müşteri, yorum, yüzde ya da sayı yoktur.
 */

import { features, type Feature, type FeatureSlug } from "./features";
import type { SolutionSlug } from "./solutions";

/** Sayfalardaki ürün görselleri; components/features/feature-visual.tsx eşler */
export type VisualKey =
  | "map"
  | "map-focus"
  | "opening-calendar"
  | "estimate"
  | "gantt"
  | "estimate-gantt"
  | "payments"
  | "contracts"
  | "invoices"
  | "report-daily"
  | "report-hse"
  | "report-ncr"
  | "report-method"
  | "report-material"
  | "report-checklist"
  | "tickets-both"
  | "tickets-board"
  | "approvals"
  | "hr-both"
  | "timesheet"
  | "certificates"
  | "inventory"
  | "assignment-history"
  | "chat"
  | "permission-matrix"
  | "assistant-full"
  | "assistant-answer"
  | "assistant-preview";

/** Durum tonu (akış şemalarında küçük işaret rengi) */
export type FlowTone = "brand" | "ok" | "warn" | "risk" | "muted" | "ink";

/** Modüle özgü derin anlatım bölümünün yapı taşları */
export type SpecialBlock =
  | {
      type: "flow";
      title: string;
      /** Akışın altındaki kısa not */
      note?: string;
      steps: { label: string; tone?: FlowTone; color?: string; body: string }[];
    }
  | {
      type: "mapping";
      title: string;
      /** Kaynak dosya etiketi, ör. "kesif_sablonu.xlsx" */
      source: string;
      rows: { from: string; to: string; note?: string }[];
    }
  | {
      type: "matrix";
      title: string;
      caption: string;
      cols: string[];
      rows: { label: string; note?: string; cells: ("yes" | "no" | string)[] }[];
      note?: string;
    }
  /** Uygulamadaki gerçek kodlar (ör. puantaj kodları); süs kısaltması değil */
  | { type: "codes"; title: string; codes: { code: string; label: string; note?: string }[] }
  | { type: "list"; title: string; items: { term: string; body: string }[] }
  | {
      type: "chain";
      title: string;
      nodes: { label: string; fields: string[]; states: string[]; link?: string }[];
    }
  | { type: "coverage"; title: string; caption: string };

export type FeatureDetail = {
  slug: FeatureSlug;
  hero: {
    /** Sayfanın tek h1'i; seoTitle'dan farklı, insan diliyle */
    title: string;
    lede: string;
    /** İkinci aksiyon (sayfa içi bölüm) */
    secondary: { label: string; href: string };
  };
  /** Hero altındaki büyük ürün görseli */
  visual: { key: VisualKey; caption: string };
  /** Hero yanındaki özet kutusu: yalnızca ürün gerçekleri */
  sheet: { label: string; value: string }[];
  /** "Ne yapar": 4-5 madde */
  capabilities: { title: string; body: string; terms: string[] }[];
  /** Ekran varyantları (sekmeli) */
  screens: {
    title: string;
    lede: string;
    tabs: { key: VisualKey; label: string; summary: string; points: string[] }[];
  };
  /** Modüle özgü bölüm (akış, eşleme, matris…) */
  special: { id: string; eyebrow: string; title: string; lede: string; blocks: SpecialBlock[] };
  /** Diğer modüllerle bağlantı: "in" bu modüle gelen veri, "out" bu modülden giden */
  connections: { feature: FeatureSlug; dir: "in" | "out"; what: string; record: string }[];
  /** Hangi çözümler için önemli */
  solutions: { slug: SolutionSlug; why: string }[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; lede: string };
};

/** Saha durumlarının harita pin renkleri (mockups/primitives SITE_STATUS ile aynı) */
const PIN = {
  proje: "#3f9a9b",
  ihale: "#4f7fd9",
  santiye: "#c08a2e",
  yakinda: "#cf5a54",
  acilis: "#2f9a72",
  hakedis: "#cd7440",
  fatura: "#5a6480",
};

export const featureDetails: Record<FeatureSlug, FeatureDetail> = {
  /* ------------------------------------------------------------------ Saha ve harita */
  "saha-ve-harita": {
    slug: "saha-ve-harita",
    hero: {
      title: "Sahalarınızı harita üzerinde aşamasıyla ve açılış tarihiyle takip edin.",
      lede:
        "Her saha haritada bir pin olarak görünür. Pinin rengi sahanın aşamasını, saha kartı açılışa kalan günü gösterir. Konumu seçtiğinizde il, ilçe ve adres otomatik doldurulur.",
      secondary: { label: "Saha durumlarını görün", href: "#durumlar" },
    },
    visual: {
      key: "map",
      caption: "Saha haritası, saha listesi ve seçili sahanın kartı",
    },
    sheet: [
      { label: "Ekranlar", value: "Harita, sahalar, projeler ve pano" },
      { label: "Durumlar", value: "Proje, ihale, şantiye, açılış, hakediş, fatura" },
      { label: "Saha türü", value: "Mağaza, ofis, konut, otel, AVM ve kendi eklediğiniz türler" },
    ],
    capabilities: [
      {
        title: "Harita ve saha listesi aynı ekranda",
        body:
          "Sahalar haritada durum renkli pinlerle, yanda aranabilir bir listede görünür. Bölgeleri haritada tek tek açıp kapatabilirsiniz; son harita konumu isterseniz hatırlanır.",
        terms: ["Sahalar", "Bölgeler", "Son harita konumunu hatırla"],
      },
      {
        title: "Adres konumdan doldurulur",
        body:
          "Haritaya tıklayın ya da adres, AVM veya yer arayın. İl, ilçe, semt ve adres seçilen noktadan gelir; bina ve kat gibi detayları siz eklersiniz. Kayıtlı şehir pinle uyuşmazsa uyarı çıkar.",
        terms: ["İl / ilçe", "Semt / bölge", "Şehri konumdan düzelt"],
      },
      {
        title: "Saha kartı",
        body:
          "Saha türü ve durumu, açılış ve kabul tarihi, yüklenici firma, şantiye şefi, brüt m² ve kat sayısı. Saha türlerini firma ayarlarından ekleyip yeniden adlandırabilirsiniz.",
        terms: ["Saha Türü", "Açılış Tarihi", "Yüklenici Firma", "Brüt m²"],
      },
      {
        title: "Açılış takvimi ve gecikmeler",
        body:
          "Açılışına 7 gün ya da daha az kalan saha haritada kırmızı görünür. Tarihi geçtiği halde açılmamış sahalar kaç gün geciktiğiyle listelenir.",
        terms: ["Bugün açılıyor", "3 gün kaldı", "12 gün geçti"],
      },
      {
        title: "Pano",
        body:
          "Aktif projeler, 30 gün içindeki açılışlar, geciken açılışlar ve açık talepler panoda görünür. Açılış eğrisi planlanan ve gerçekleşen açılışları ay ay karşılaştırır. Pano bölgeye göre filtrelenir.",
        terms: ["Aktif proje", "Geciken açılış", "Açılış eğrisi"],
      },
    ],
    screens: {
      title: "Harita ve açılış takvimi.",
      lede: "Harita sahanın nerede ve hangi aşamada olduğunu, takvim açılışına ne kadar kaldığını gösterir.",
      tabs: [
        {
          key: "map-focus",
          label: "Saha kartı",
          summary: "Seçili sahanın kartında açılışa kalan gün, şantiye şefi ve iş planı ilerlemesi yer alır.",
          points: [
            "Saha listesi ada, şehre, duruma ve açılış tarihine göre sıralanır.",
            "Yeni saha eklerken haritaya tıklar, pini sürükleyerek konumu düzeltirsiniz.",
            "Bildirimdeki “Haritada aç” bağlantısı ilgili sahayı açar.",
          ],
        },
        {
          key: "opening-calendar",
          label: "Açılış takvimi",
          summary: "Henüz açılmamış sahalar açılışa kalan güne göre sıralanır, gecikenler en üstte durur.",
          points: [
            "Sahalar üç grupta toplanır: geciken, 7 gün içinde ve 30 gün içinde.",
            "Yaklaşan açılış bildiriminin kaç gün önce gideceğini firma ayarlarında 1 ile 90 gün arasında seçersiniz.",
            "Tarihi geçip açılmayan saha için “Açılış gecikmesi” bildirimi gelir.",
          ],
        },
      ],
    },
    special: {
      id: "durumlar",
      eyebrow: "Saha durumu",
      title: "Saha durumları ve pin renkleri.",
      lede: "Sahanın durumu saha kartında değiştirilir. Pano, bildirimler ve diğer modüller bu durumu kullanır.",
      blocks: [
        {
          type: "flow",
          title: "Durum sırası",
          note: "“Yakında açılıyor” elle seçilmez. Açılışa 7 gün ya da daha az kaldığında harita sahayı bu renkte gösterir.",
          steps: [
            { label: "Proje", color: PIN.proje, body: "Tasarım ve hazırlık. Mimari, mekanik ve elektrik onayları bu aşamada izlenir." },
            { label: "İhale", color: PIN.ihale, body: "Sözleşmesi olmayan sahada uyarı ve “Sözleşme gerekli” bildirimi çıkar." },
            { label: "Şantiye", color: PIN.santiye, body: "Günlük rapor kapsamı ve şantiye ilerlemesi bu sahalar için hesaplanır." },
            { label: "Açılış", color: PIN.acilis, body: "Saha açıldı ve panodaki açılan saha sayısına eklendi." },
            { label: "Hakediş", color: PIN.hakedis, body: "Hakediş dönemleri sözleşme üzerinden takip edilir." },
            { label: "Fatura", color: PIN.fatura, body: "Faturalar kesilir ve ödemesi izlenir." },
          ],
        },
        {
          type: "list",
          title: "Saha detayında neler var",
          items: [
            { term: "Keşif", body: "Poz numaralı kalemler, malzeme durumu ve keşif toplamı." },
            { term: "İş planı", body: "Tablo ve Gantt görünümü, öncül görevler." },
            { term: "Sözleşmeler", body: "Sahaya bağlı sözleşmeler; yeni sözleşme buradan da açılır." },
            { term: "Dosya ve notlar", body: "Proje dosyaları, fotoğraflar, ekip notları ve yalnızca sizin gördüğünüz özel not." },
          ],
        },
      ],
    },
    connections: [
      { feature: "kesif-ve-is-programi", dir: "out", what: "Keşif ve iş programı sahanın detayında tutulur.", record: "Saha → Keşif" },
      { feature: "hakedis-ve-finans", dir: "out", what: "Sözleşme sahaya bağlanır. İhaledeki sahada sözleşme yoksa uyarı çıkar.", record: "Saha → Sözleşme" },
      { feature: "saha-raporlari", dir: "out", what: "Raporlar şantiye seçilerek yazılır; panoda rapor kapsamı görünür.", record: "Şantiye → Rapor" },
      { feature: "talepler-ve-onaylar", dir: "out", what: "Tadilat talepleri ve disiplin onayları sahaya bağlıdır.", record: "Saha → Talep" },
      { feature: "insan-kaynaklari", dir: "out", what: "Personelin görev yeri bir sahadır.", record: "Görev yeri" },
      { feature: "envanter-ve-zimmet", dir: "out", what: "Zimmet verilirken eşyanın kullanılacağı şantiye seçilir.", record: "Zimmet → Şantiye" },
      { feature: "yapay-zeka-asistani", dir: "in", what: "Asistan saha sorularını cevaplar, önizlemeyle yeni saha ekler.", record: "Yeni saha" },
    ],
    solutions: [
      { slug: "perakende-yatirimlari", why: "Mağaza portföyünü bölge bölge haritada, açılış takvimini ve gecikmeleri panoda görürsünüz." },
      { slug: "insaat-ve-taahhut", why: "Birden fazla şantiyenin aşaması, ilerlemesi ve rapor kapsamı aynı panoda." },
      { slug: "mimarlik-ofisleri", why: "Uygulamaya geçen projelerin konumu, disiplin onayları ve dosyaları saha kartında." },
    ],
    faqs: [
      {
        question: "Adresi bilmeden saha ekleyebilir miyiz?",
        answer:
          "Saha kaydı için haritada bir konum yeterlidir. Haritaya tıkladığınızda il, ilçe, semt ve adres o noktadan doldurulur. Adres araması sonuç vermezse pini haritaya elle yerleştirebilirsiniz.",
      },
      {
        question: "Saha türlerini kendi işimize göre değiştirebilir miyiz?",
        answer:
          "Evet. Mağaza, ofis, kafe, konut, otel, endüstriyel, AVM, cadde ve outdoor varsayılan türlerdir. Firma ayarlarından yeni tür ekleyebilir (ör. Depo) ve adlarını değiştirebilirsiniz.",
      },
      {
        question: "Açılış uyarısı kaç gün önce gelir?",
        answer:
          "Haritada açılışına 7 gün ya da daha az kalan saha “Yakında açılıyor” olarak işaretlenir. “Yaklaşan açılış” bildiriminin kaç gün önce gideceğini firma ayarlarında 1 ile 90 gün arasında siz belirlersiniz.",
      },
    ],
    cta: {
      title: "Saha listenizi haritada birlikte kuralım.",
      lede: "Mevcut saha ya da mağaza listenizi getirin, görüşmede konumlarınızı ve açılış takviminizi Koordine üzerinde gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Keşif ve iş programı */
  "kesif-ve-is-programi": {
    slug: "kesif-ve-is-programi",
    hero: {
      title: "Keşif ve iş programını poz numarasıyla, sahanın altında tutun.",
      lede:
        "Keşif kalemlerini poz no, miktar ve birim fiyatla girin ya da Excel'den aktarın. İş programını Excel şablonundan veya Primavera P6 .xer dosyasından alıp Gantt'ta takip edin.",
      secondary: { label: "İçe aktarımı görün", href: "#ice-aktarim" },
    },
    visual: {
      key: "estimate-gantt",
      caption: "Saha detayında keşif kalemleri ve iş programı",
    },
    sheet: [
      { label: "Keşif", value: "Poz no, miktar, birim, birim fiyat, para birimi" },
      { label: "Malzeme", value: "Tedarik bekleniyor, depoda, sahada, depoya iade" },
      { label: "İçe aktarım", value: "Excel (.xlsx) ve Primavera P6 (.xer)" },
    ],
    capabilities: [
      {
        title: "Poz numaralı keşif kalemi",
        body:
          "Her kalem poz no, kalem adı, miktar, birim, birim fiyat ve para birimiyle tutulur. Keşif tablosunda poz no, kalem ya da duruma göre arama yapılır; toplam her para birimi için ayrı gösterilir.",
        terms: ["15.150.1005", "Miktar", "Birim fiyat", "Tüm keşif toplamı"],
      },
      {
        title: "Yüzdelik kalem",
        body:
          "Genel gider ya da nakliye gibi kalemleri, seçtiğiniz kalemlerin toplamının yüzdesi olarak ekleyebilirsiniz. Örneğin 100 ve 100 tutarındaki iki kalemin %10'u 20 olarak eklenir.",
        terms: ["Seçilenlerden % kalem ekle", "Birim fiyat (taban)"],
      },
      {
        title: "Malzeme durumu",
        body:
          "Her keşif kaleminde malzemenin nerede olduğu işaretlenir: tedarik bekleniyor, depoda, sahaya teslim edildi ya da fazlası depoya geri getirildi. Pano, kalemlerin ne kadarının sahaya ulaştığını, keşif tutarının para birimine göre dağılımını ve en çok malzeme bekleyen sahaları gösterir.",
        terms: ["Tedarik bekleniyor", "Depoda", "Sahaya teslim edildi", "Depoya geri getirildi"],
      },
      {
        title: "İş programı ve Gantt",
        body:
          "İş tanımı, aktivite kodu, WBS, tarihler, sorumlu, durum ve tamamlanma yüzdesi. İş planı tablo ya da Gantt olarak görüntülenir; öncül görevler ilişki tipi ve gecikme süresiyle tutulur.",
        terms: ["A1010", "WBS 1.2.3", "Tablo", "Gantt"],
      },
      {
        title: "İş planı eğrisi",
        body:
          "Panoda açılmamış sahaların planlanan birikimli ilerlemesi S eğrisi olarak çizilir. Bugün için planlanan ile gerçekleşen arasındaki fark puan olarak görünür.",
        terms: ["S eğrisi", "Bugün planlanan", "Sapma"],
      },
    ],
    screens: {
      title: "Keşif tablosu ve iş programı.",
      lede: "İkisi de sahanın detayında durur. Keşif işin miktarını ve tutarını, iş programı zamanını ve sorumlusunu gösterir.",
      tabs: [
        {
          key: "estimate",
          label: "Keşif",
          summary: "Poz numaralı kalemler; miktar, birim fiyat, tutar ve malzeme durumu.",
          points: [
            "Kalemler tek tek eklenir ya da Excel'den toplu aktarılır.",
            "Para birimi kalem başına seçilir, toplamlar birim başına ayrı tutulur.",
            "Keşif tutarı, bütçe takibinde saha bütçesiyle karşılaştırılır.",
          ],
        },
        {
          key: "gantt",
          label: "İş programı",
          summary: "Haftalara yayılmış iş kalemleri, ilerleme yüzdeleri ve bugün çizgisi.",
          points: [
            "Arama iş kalemine, aktivite koduna ve sorumluya göre yapılır.",
            "Günlük raporda “İş planından getir” o güne denk gelen kalemleri rapora ekler.",
            "Asistandan iş planına kalem eklemesini isteyebilirsiniz; önce önizleme gelir.",
          ],
        },
      ],
    },
    special: {
      id: "ice-aktarim",
      eyebrow: "İçe aktarım",
      title: "Excel ve P6 dosyalarınızı içe aktarın.",
      lede:
        "Sütun başlıklarının şablonla birebir aynı olması gerekmez, Koordine başlıkları tanır. Aktarmadan önce okunan satırları ve hataları görürsünüz.",
      blocks: [
        {
          type: "mapping",
          title: "Keşif",
          source: "kesif_sablonu.xlsx",
          rows: [
            { from: "Poz No", to: "Poz no", note: "İsteğe bağlı" },
            { from: "Açıklama / Kalem Adı", to: "Kalem adı", note: "Zorunlu" },
            { from: "Miktar", to: "Miktar", note: "Zorunlu" },
            { from: "Birim Fiyat", to: "Birim fiyat", note: "Zorunlu" },
            { from: "Para Birimi", to: "Para birimi", note: "Boşsa firmanın varsayılanı kullanılır" },
          ],
        },
        {
          type: "mapping",
          title: "Primavera P6",
          source: "proje.xer",
          rows: [
            { from: "TASK", to: "İş kalemleri", note: "Ad, aktivite kodu, tarihler ve tamamlanma yüzdesi" },
            { from: "TASKPRED", to: "Öncül görevler", note: "FS, SS, FF, SF ilişkisi ve gecikme süresi" },
            { from: "WBS", to: "WBS kodu" },
          ],
        },
        {
          type: "flow",
          title: "Aktarım adımları",
          steps: [
            { label: "Şablon", tone: "muted", body: "İsterseniz Excel şablonunu indirin; kendi dosyanızı da kullanabilirsiniz." },
            { label: "Dosya", tone: "muted", body: "Keşif için .xlsx, iş planı için .xlsx ya da .xer seçin." },
            { label: "Önizleme", tone: "brand", body: "Okunan kalem sayısı ve hatalı satırlar listelenir." },
            { label: "İçe aktar", tone: "ok", body: "Mevcut kalemler dosyadakilerle değiştirilir. Uygulama bunu önceden sorar." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Keşif ve iş planı bir sahanın detayında açılır.", record: "Saha" },
      { feature: "saha-raporlari", dir: "out", what: "“İş planından getir” rapor gününe denk gelen kalemleri ekler.", record: "İş planı → Rapor" },
      { feature: "hakedis-ve-finans", dir: "out", what: "Keşif tutarı saha bütçesiyle karşılaştırılır.", record: "Keşif → Bütçe" },
      { feature: "yapay-zeka-asistani", dir: "in", what: "Asistan keşfe ve iş planına önizlemeyle kalem ekler.", record: "En fazla 100 kalem" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Poz numaralı keşif ve P6'dan gelen iş programı aynı şantiyede; ilerleme günlük rapora aktarılır." },
      { slug: "muhendislik-ve-mep", why: "Mekanik ve elektrik kalemleri keşifte, devreye alma işleri iş programında sorumlusuyla." },
      { slug: "perakende-yatirimlari", why: "Mağaza tadilatlarının keşfi ve malzeme durumu; hangi mağazanın malzeme beklediği panoda." },
    ],
    faqs: [
      {
        question: "Excel dosyamızdaki sütun adları şablonla aynı olmak zorunda mı?",
        answer:
          "Hayır. Koordine başlıkları tanıyarak eşleştirir; örneğin “Açıklama” ya da “Kalem Adı” sütunu kalem adı olarak okunur. Keşif için kalem adı, miktar ve birim fiyat sütunları yeterlidir.",
      },
      {
        question: "İçe aktarım mevcut keşfin üzerine mi yazar?",
        answer:
          "Evet. Excel'den içe aktarım sahadaki mevcut kalemleri dosyadakilerle değiştirir ve bunu önceden sorar. Var olan listeye ekleme yapmak için “Kalem ekle” ya da “İş ekle” kullanılır.",
      },
      {
        question: "P6'daki ilişki tipleri ve gecikmeler korunuyor mu?",
        answer:
          "Evet. .xer dosyasındaki öncül ilişkileri FS, SS, FF ve SF tipleriyle, gecikme süresiyle birlikte aktarılır. Aktivite kodu, WBS ve tamamlanma yüzdesi de gelir.",
      },
    ],
    cta: {
      title: "Keşif dosyanızı ve iş programınızı getirin.",
      lede: "Görüşmede kendi Excel ya da P6 dosyanızı birlikte içe aktaralım ve Gantt görünümünü gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Hakediş ve finans */
  "hakedis-ve-finans": {
    slug: "hakedis-ve-finans",
    hero: {
      title: "Sözleşme, hakediş ve faturaları sahaya bağlı tutun.",
      lede:
        "Hakedişi metrajla hazırlayın; kesintileri, KDV'yi ve tevkifatı Koordine hesaplasın. Onaylanan hakedişten faturaya geçin, fatura belgesini PDF ya da e-Fatura XML olarak ekleyin.",
      secondary: { label: "Kayıtların bağlantısını görün", href: "#zincir" },
    },
    visual: {
      key: "payments",
      caption: "Hakediş listesi, sözleşme ilerlemesi ve para birimine göre toplamlar",
    },
    sheet: [
      { label: "Kayıtlar", value: "Sözleşme, hakediş, fatura" },
      { label: "Kesintiler", value: "Teminat, damga vergisi, stopaj, avans, SGK, ceza" },
      { label: "KDV", value: "Kalem bazında oran, tevkifat 2/10 ile 10/10 arası" },
      { label: "Para birimi", value: "TRY, USD, EUR, GBP, CHF" },
    ],
    capabilities: [
      {
        title: "Sözleşme",
        body:
          "Sıralı kod, başlık, taraf, saha, tutar, para birimi ve tarihler. Sözleşme feshedildiğinde kayıt silinmez, durumu Fesih olur.",
        terms: ["SZ-0012", "Aktif", "Süresi doldu", "Fesih"],
      },
      {
        title: "Metrajlı hakediş",
        body:
          "Her kalemde poz no, birim fiyat, sözleşme miktarı, önceki ve bu dönem miktarı tutulur. Yeni hakediş açtığınızda önceki hakedişin kalemleri ve miktarları gelir, siz bu dönem yapılanı girersiniz. Kalemleri sahanın keşfinden de aktarabilirsiniz.",
        terms: ["Önceki", "Bu dönem", "Kümülatif", "Keşiften aktar"],
      },
      {
        title: "Kesintiler ve net ödenecek",
        body:
          "Teminat, damga vergisi ve stopaj oranla; avans mahsubu, SGK ve ceza kesintisi tutarla girilir. Fiyat farkı, KDV ve KDV tevkifatı eklendiğinde net ödenecek tutar hesaplanır.",
        terms: ["Teminat %5", "Damga vergisi ‰9,48", "Tevkifat 4/10", "Net ödenecek"],
      },
      {
        title: "Onay ve hakediş raporu",
        body:
          "Hakediş taslaktan onaya gönderilir, onaylanır ve ödendi olarak kapanır. Onaylanan hakedişin miktar ve tutarları değiştirilemez. Hakediş raporu imza alanlarıyla A4 olarak yazdırılır.",
        terms: ["Onaya gönder", "Onaylandı", "Ödendi", "Yazdır"],
      },
      {
        title: "Kalemli fatura",
        body:
          "Gelen ve giden faturaları kalem kalem girersiniz; her kalemin kendi KDV oranı ve iskontosu olabilir. KDV oranlara göre ayrı gösterilir, tevkifat düşülerek ödenecek tutar bulunur. Vadesi geçen fatura listede işaretlenir.",
        terms: ["Gelen", "Giden", "KDV %10", "KDV %20", "Vade"],
      },
      {
        title: "Fatura belgesi ve e-Fatura",
        body:
          "PDF ya da fotoğrafı sürüklediğinizde belge formun yanında açılır. e-Fatura XML dosyası eklerseniz fatura no, ETTN, firma, vergi no ve kalemler forma aktarılır.",
        terms: ["PDF önizleme", "e-Fatura XML", "ETTN"],
      },
    ],
    screens: {
      title: "Hakedişler, sözleşmeler ve faturalar.",
      lede: "Üç liste aynı arama ve sıralama düzenini kullanır. Her satırdan bağlı olduğu kayda geçebilirsiniz.",
      tabs: [
        {
          key: "payments",
          label: "Hakedişler",
          summary: "Hakediş no, sözleşme ve yüklenici, dönem, tutar, net ödenecek ve sözleşme ilerlemesi.",
          points: [
            "Üstte taslak, onay bekleyen ve ödeme bekleyen hakedişlerin sayısı ve net tutarı görünür.",
            "Onay bekleyen hakediş, onaylayabilecek kişilerin menüsünde sayıyla görünür ve bildirim gelir.",
            "Onaylanan hakedişin faturası hakediş ekranından açılır; yüklenici, tutar, KDV ve tevkifat dolu gelir.",
          ],
        },
        {
          key: "contracts",
          label: "Sözleşmeler",
          summary: "Kod, taraf, saha, bitiş tarihi, tutar ve durum.",
          points: [
            "Kod sırayla verilir (SZ-0001); öneki firma ayarlarından değiştirebilirsiniz.",
            "Bitişi yaklaşan sözleşme için bildirim gelir; eşik 1 ile 180 gün arasında seçilir.",
            "Feshedilen ya da iptal edilen sözleşme geçerli sözleşme sayılmaz.",
          ],
        },
        {
          key: "invoices",
          label: "Faturalar",
          summary: "Fatura no ve firma, tarih, vade, toplam ve net ödenecek; gelen ve giden ayrı süzülür.",
          points: [
            "Üstte ödenecek, tahsil edilecek ve vadesi geçen toplamlar görünür.",
            "Aynı firmadan aynı numaralı fatura girilirse uyarı çıkar.",
            "Fatura bir hakedişe bağlanabilir; malzeme alımı gibi hakedişsiz faturalar da girilir.",
          ],
        },
      ],
    },
    special: {
      id: "zincir",
      eyebrow: "Kayıtlar",
      title: "Kayıtlar birbirine nasıl bağlanır.",
      lede: "Her kayıt bir öncekine bağlıdır. Böylece her tutarın hangi sahaya ve sözleşmeye ait olduğu bellidir.",
      blocks: [
        {
          type: "chain",
          title: "Saha, sözleşme, hakediş, fatura",
          nodes: [
            {
              label: "Saha",
              fields: ["Durum", "Bütçe", "Yüklenici"],
              states: ["İhale", "Şantiye", "Hakediş", "Fatura"],
              link: "Sahaya bağlanır",
            },
            {
              label: "Sözleşme",
              fields: ["Taraf", "Tutar ve para birimi", "Başlangıç ve bitiş", "Ekler"],
              states: ["Taslak", "Aktif", "Süresi doldu", "İptal", "Fesih", "Tamamlandı"],
              link: "Sözleşmeye bağlanır",
            },
            {
              label: "Hakediş",
              fields: ["Hakediş no ve dönem", "Metraj kalemleri", "Kesintiler", "Net ödenecek"],
              states: ["Taslak", "Onay bekliyor", "Onaylandı", "Ödendi"],
              link: "Hakedişe bağlanır",
            },
            {
              label: "Fatura",
              fields: ["Fatura no ve ETTN", "Kalemler ve KDV", "Tevkifat", "Vade"],
              states: ["Taslak", "Ödeme bekliyor", "Ödendi", "İptal"],
            },
          ],
        },
        {
          type: "list",
          title: "Bilmeniz gerekenler",
          items: [
            { term: "Varsayılanlar", body: "Para birimi ve KDV oranı firma ayarlarından önerilir, kayıtta değiştirilebilir." },
            { term: "Sözleşme ilerlemesi", body: "Ödenmiş faturaların KDV dahil toplamının sözleşme tutarına oranıdır; ayrıca yüzde girmeniz gerekmez." },
            { term: "Para birimi", body: "Kur çevrimi yapılmaz. Farklı para birimindeki tutarlar toplanmaz, her biri ayrı satırda gösterilir." },
            { term: "Bütçe takibi", body: "Saha bütçesi keşif tutarıyla karşılaştırılır; bütçeyi aşan şantiyeler ayrıca listelenir." },
            { term: "Yetki", body: "Muhasebe rolü varsayılan olarak hakediş ve faturaları yönetir. Bu ayar değiştirilebilir." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Sözleşme bir sahaya bağlanır. İhaledeki sahada sözleşme yoksa uyarı çıkar.", record: "Saha → Sözleşme" },
      { feature: "kesif-ve-is-programi", dir: "in", what: "Hakediş kalemleri sahanın keşfinden aktarılır; keşif tutarı saha bütçesiyle karşılaştırılır.", record: "Keşif → Hakediş" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Sözleşme bitişi, onay bekleyen hakediş ve ödenmemiş fatura bildirimleri; onay bekleyenler menüde sayıyla.", record: "Bildirim" },
      { feature: "yapay-zeka-asistani", dir: "out", what: "Asistan hakediş ve fatura durumunu sorulduğunda yorumlar.", record: "Soru ve cevap" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Taşeron sözleşmeleri, hakediş dönemleri ve faturalar şantiye bazında birbirine bağlı." },
      { slug: "perakende-yatirimlari", why: "Her mağazanın sözleşmesi ve ödeme durumu; farklı para birimindeki tutarlar ayrı." },
    ],
    faqs: [
      {
        question: "Sözleşme EUR, fatura TRY kesilirse ne olur?",
        answer:
          "Fatura kaydedilir, ancak kur çevrimi yapılmadığı için sözleşme ilerlemesine sayılmaz. Fatura formu bunu kaydetmeden önce uyarı olarak gösterir.",
      },
      {
        question: "Koordine'den e-Fatura kesebilir miyiz?",
        answer:
          "Hayır. Koordine fatura kesmez ve GİB'e göndermez. Entegratörünüzden gelen ya da kestiğiniz faturaları kaydetmek ve ödemesini takip etmek içindir. e-Fatura XML dosyasını eklerseniz bilgiler forma aktarılır.",
      },
      {
        question: "Önceki hakedişlerdeki miktarlar nasıl taşınır?",
        answer:
          "Aynı sözleşmeye yeni hakediş açtığınızda son hakedişin kalemleri gelir. O hakedişteki toplam miktar yeni hakedişte önceki miktar olur, bu dönem miktarı sıfırdan başlar. Oranlı kesintiler de aynen devam eder.",
      },
      {
        question: "Feshedilen sözleşmenin kayıtları silinir mi?",
        answer:
          "Hayır. Sözleşmenin durumu Fesih olur; sözleşme, ekleri ve bağlı hakedişler yerinde kalır. İhale aşamasındaki sahada sözleşme uyarısı yeniden görünür.",
      },
    ],
    cta: {
      title: "Hakediş tablonuzu Koordine'ye taşıyalım.",
      lede: "Bir sözleşmenizi ve son hakedişlerinizi getirin, görüşmede sözleşme ilerlemesini kendi verinizle gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Saha raporları */
  "saha-raporlari": {
    slug: "saha-raporlari",
    hero: {
      title: "Altı rapor tipi, hepsi aynı düzende A4 belge.",
      lede:
        "Günlük şantiye raporundan malzeme sunumuna kadar her rapor bir şantiyeye bağlı bir formdur. Ekip sahada doldurur ve fotoğraf ekler; önizleme PDF çıktısıyla aynıdır.",
      secondary: { label: "Rapor tiplerini görün", href: "#ekranlar" },
    },
    visual: {
      key: "report-daily",
      caption: "Günlük şantiye raporunun A4 önizlemesi",
    },
    sheet: [
      { label: "Tipler", value: "Günlük rapor, İSG, NCR, yapım yöntemi, malzeme sunumu, kontrol listesi" },
      { label: "Çıktı", value: "A4 önizleme ve PDF" },
      { label: "Fotoğraf", value: "JPG, PNG, WEBP; her fotoğrafa açıklama" },
    ],
    capabilities: [
      {
        title: "Günlük şantiye raporu",
        body:
          "Saha, tarih, hava durumu, yüklenici ve şantiye şefi. Gün içinde yapılan işler, gelen malzeme, sorunlar, iş güvenliği notu ve ertesi gün planlanan işler.",
        terms: ["Hava durumu", "Bugün yapılan işler", "Yarın planlanan işler"],
      },
      {
        title: "İsimli yoklama",
        body:
          "Sahadaki personel Çalıştı, Yarım gün ya da Gelmedi olarak işaretlenir. İsterseniz yoklama kayıt sırasında puantaja işlenir; izinli personelin kaydı değişmez.",
        terms: ["Çalıştı", "Yarım gün", "Gelmedi"],
      },
      {
        title: "İş planından getir",
        body: "Rapor gününe denk gelen iş programı kalemleri tek tıkla “Bugün yapılan işler” alanına eklenir, sonra düzenlenebilir.",
        terms: ["İş planından getir"],
      },
      {
        title: "Doküman no ve imza alanları",
        body:
          "Onaya giden raporlarda doküman no ve revizyon tutulur; hazırlayan, kontrol eden ve onaylayan alanları belgeye basılır. Taslak belgede “TASLAK” ibaresi görünür.",
        terms: ["Doküman no", "Rev.", "Hazırlayan", "Onaylayan"],
      },
      {
        title: "Geçmiş raporlar",
        body: "Kaydedilen raporlar tarih, şantiye ve hazırlayan kişiyle listelenir; rapor türüne ve şantiyeye göre filtrelenir.",
        terms: ["Rapor tarihi", "Şantiye", "Hazırlayan"],
      },
    ],
    screens: {
      title: "Altı rapor tipi.",
      lede: "Her tipin kendi alanları vardır. Antet, bilgi alanları, fotoğraflar ve imza bölümü hepsinde aynıdır.",
      tabs: [
        {
          key: "report-daily",
          label: "Günlük şantiye raporu",
          summary: "Şantiye şefinin günlük özeti. Doküman no taşımaz, tarih ve şantiyeyle bulunur.",
          points: [
            "Sahadaki personelin isimli yoklaması ve ekip sayıları.",
            "Yapılan işler, gelen malzeme, sorunlar ve gecikmeler.",
            "Açıklamalı fotoğraflar ve imza alanları.",
          ],
        },
        {
          key: "report-hse",
          label: "İSG raporu",
          summary: "Günlük, haftalık, aylık ya da olay sonrası saha denetimi.",
          points: [
            "Çalışan sayısı, adam-saat, iş kazası, ramak kala ve kayıp iş günü.",
            "KKD, yüksekte çalışma, iskele ve geçici elektrik gibi 13 kontrol maddesi.",
            "Uygunsuzluk, risk seviyesi, düzeltici faaliyet ve termin.",
          ],
        },
        {
          key: "report-ncr",
          label: "Uygunsuzluk (NCR)",
          summary: "Malzeme, işçilik ya da projeye aykırı imalatın kaydı ve kapanışı.",
          points: [
            "Kategori ve önem derecesi: minör, majör, kritik.",
            "Karar: yeniden yapım, onarım, olduğu gibi kabul ya da ret.",
            "Durum: Açık, Düzeltme sürüyor, Doğrulama bekliyor, Kapandı.",
          ],
        },
        {
          key: "report-method",
          label: "Yapım yöntemi",
          summary: "Bir imalatın nasıl yapılacağını anlatan onay dokümanı (method statement).",
          points: [
            "Amaç, kapsam ve referans dokümanlar.",
            "Uygulama adımları ve her adımın kabul kriteri.",
            "Riskler, önlemler ve muayene planı.",
          ],
        },
        {
          key: "report-material",
          label: "Malzeme sunumu",
          summary: "Malzemenin işveren ya da müşavir onayına sunulması (submittal).",
          points: [
            "Ürün, üretici, marka, model, miktar ve teslim süresi.",
            "Şartname değeri ile önerilen ürünün karşılaştırması.",
            "Görüş: Onaylandı (A), Notlu onay (B), Revize edip yeniden sunun (C), Reddedildi (D).",
          ],
        },
        {
          key: "report-checklist",
          label: "Kontrol listesi",
          summary: "Hazır maddelerden seçin ya da kendi maddelerinizi yazın.",
          points: [
            "Aşama: imalat öncesi, imalat sırası, teslim öncesi ya da periyodik.",
            "Her madde Uygun, Uygun değil ya da Kapsam dışı olarak işaretlenir.",
            "Sonda uygun ve uygun olmayan madde sayıları özetlenir.",
          ],
        },
      ],
    },
    special: {
      id: "kapsam",
      eyebrow: "Rapordan sonra",
      title: "Günlük rapor başka ekranlarda da kullanılır.",
      lede: "Yoklama puantaja işlenir. Hangi şantiyenin hangi gün rapor girdiği panoda görünür.",
      blocks: [
        {
          type: "coverage",
          title: "Günlük rapor kapsamı",
          caption: "Panoda şantiye aşamasındaki sahaların son günlerde rapor girip girmediği görünür. En az rapor girilen şantiye üstte durur.",
        },
        {
          type: "flow",
          title: "Yoklamadan puantaja",
          steps: [
            { label: "Yoklama", tone: "brand", body: "Şantiye şefi sahadaki personeli Çalıştı, Yarım gün ya da Gelmedi olarak işaretler." },
            { label: "Kaydet", tone: "muted", body: "“Yoklamayı puantaja işle” açıksa kayıt sırasında puantaja yazılır." },
            { label: "Puantaj", tone: "ok", body: "İzinli günler ve elle girilen kayıtlar değişmez." },
            { label: "Toplu aktarım", tone: "muted", body: "İK, ay içindeki raporlardaki yoklamayı puantajın boş günlerine topluca aktarabilir." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Rapor bir şantiye seçilerek yazılır; adres ve yüklenici saha kartından gelir.", record: "Şantiye" },
      { feature: "kesif-ve-is-programi", dir: "in", what: "“İş planından getir” günün iş kalemlerini rapora ekler.", record: "İş planı → Rapor" },
      { feature: "insan-kaynaklari", dir: "out", what: "İsimli yoklama puantaja işlenir.", record: "Yoklama → Puantaj" },
      { feature: "saha-ve-harita", dir: "out", what: "Panodaki günlük rapor kapsamı raporlardan hesaplanır.", record: "Rapor kapsamı" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Her şantiyeden aynı formatta günlük rapor; yoklama puantaja, rapor kapsamı panoya yansır." },
      { slug: "mimarlik-ofisleri", why: "Malzeme sunumu A, B, C, D onay koduyla; uygulama denetimi kontrol listesi ve NCR ile." },
      { slug: "muhendislik-ve-mep", why: "Yapım yöntemi, test ve devreye alma kontrolleri, İSG denetimi ve NCR kapanışı." },
    ],
    faqs: [
      {
        question: "Bir raporu kimler düzenleyip silebilir?",
        answer:
          "Raporu yazan kişi ile Kurucu, Yönetici ve Bölge Müdürü rolündeki kullanıcılar. Rapor silinirse fotoğrafları da silinir; uygulama bunu önceden sorar.",
      },
      {
        question: "Yoklamadaki isimleri herkes görebilir mi?",
        answer:
          "Hayır. İsimli yoklamayı görmek için puantaj görüntüleme yetkisi gerekir. Yetkisi olmayan kullanıcı yalnızca kişi sayısını görür.",
      },
      {
        question: "Fotoğraflar rapora nasıl eklenir?",
        answer:
          "JPG, PNG ya da WEBP fotoğrafları seçer ya da forma sürüklersiniz ve her birine açıklama yazabilirsiniz. Fotoğraflar belgenin sonunda açıklamalarıyla yer alır.",
      },
    ],
    cta: {
      title: "Rapor şablonlarınızı birlikte gözden geçirelim.",
      lede: "Bugün kullandığınız günlük rapor ya da submittal formunu getirin, aynı içeriğin Koordine'de nasıl göründüğünü gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Talepler ve onaylar */
  "talepler-ve-onaylar": {
    slug: "talepler-ve-onaylar",
    hero: {
      title: "Tadilat taleplerini ve disiplin onaylarını sahaya bağlı takip edin.",
      lede:
        "Tadilat ve bakım talepleri TT-0042 gibi sıralı bir kodla açılır; saha, atanan kişi ve öncelik bellidir. Mimari, mekanik ve elektrik onaylarını ilgili disiplinin yetkilisi verir.",
      secondary: { label: "Disiplin onaylarını görün", href: "#onaylar" },
    },
    visual: {
      key: "tickets-both",
      caption: "Tadilat talepleri panosu ve proje onayları",
    },
    sheet: [
      { label: "Talep kodu", value: "TT-0001 gibi sıralı, öneki değiştirilebilir" },
      { label: "Durum", value: "Açık, devam ediyor, çözüldü, kapalı" },
      { label: "Onaylar", value: "Mimari, mekanik, elektrik" },
    ],
    capabilities: [
      {
        title: "Kodlu tadilat talebi",
        body:
          "Başlık, saha, atanan kişi, öncelik ve açıklama. Talebe fotoğraf ve dosya eklenir (dosya başına en fazla 50 MB); talebi kimin açtığı ve ne zaman açıldığı görünür.",
        terms: ["TT-0042", "Atanan", "Öncelik", "Ekler"],
      },
      {
        title: "Arama ve filtre",
        body:
          "Talepler kod, saha, başlık ya da atanan kişiye göre aranır, durum ve öncelikle filtrelenir. Başka sayfaya geçip döndüğünüzde arama ve sıralama korunur.",
        terms: ["Tüm durumlar", "Tüm öncelikler"],
      },
      {
        title: "Bildirimler",
        body: "Size atanan açık talepler ve açık durumdaki yüksek öncelikli talepler için bildirim gelir.",
        terms: ["Size atanan talep", "Yüksek öncelikli talep"],
      },
      {
        title: "Talep süreleri",
        body:
          "Panoda açık talepler açıldığından bu yana geçen güne göre gruplanır. Son 12 haftada açılan ve çözülen talepler karşılaştırılır.",
        terms: ["0–7 gün", "8–30 gün", "30+ gün"],
      },
      {
        title: "Disiplin onayları",
        body:
          "Her sahanın mimari, mekanik ve elektrik onayı ayrı verilir; onaylayan kişi ve zaman kaydedilir. Onayı eksik sahalar “Onay Bekleyenler” listesinde, açılışı en yakın olan üstte durur.",
        terms: ["Mimari", "Mekanik", "Elektrik", "Onay Bekleyenler"],
      },
    ],
    screens: {
      title: "Talep panosu ve proje onayları.",
      lede: "Talepler işin kimde olduğunu, onaylar sahanın hangi disiplinlerden onay aldığını gösterir.",
      tabs: [
        {
          key: "tickets-board",
          label: "Tadilat talepleri",
          summary: "Durum sütunlarında kodlu kartlar; öncelik, saha ve atanan kişiyle.",
          points: [
            "Yeni talep talepler sayfasından ya da asistanla açılır.",
            "Öncelik Düşük, Orta ya da Yüksek seçilir.",
            "Talep detayında açıklama, ekler, açan kişi ve tarih yer alır.",
          ],
        },
        {
          key: "approvals",
          label: "Proje onayları",
          summary: "Açılmamış sahalarda henüz verilmemiş mimari, mekanik ve elektrik onayları.",
          points: [
            "Her disiplin için bir anahtar vardır; açıldığında onaylayanın adı ve zamanı kaydedilir.",
            "Tüm onayları tamamlanan saha listeden çıkar.",
            "Saha listesi onay sayısına göre de sıralanabilir.",
          ],
        },
      ],
    },
    special: {
      id: "onaylar",
      eyebrow: "Onay yetkisi",
      title: "Hangi rol hangi onayı verir.",
      lede:
        "Mimar mimari onayı, makine mühendisi mekanik onayı, elektrik mühendisi elektrik onayını verir. Yönetim rolleri gerektiğinde üçünü de verebilir.",
      blocks: [
        {
          type: "matrix",
          title: "Disiplin onayı yetkisi",
          caption: "Hangi rol hangi disiplin onayını verebilir",
          cols: ["Mimari", "Mekanik", "Elektrik"],
          rows: [
            { label: "Mimar", cells: ["yes", "no", "no"] },
            { label: "Makine Mühendisi", cells: ["no", "yes", "no"] },
            { label: "Elektrik Mühendisi", cells: ["no", "no", "yes"] },
            { label: "Kurucu, Yönetici, Bölge Müdürü", cells: ["yes", "yes", "yes"] },
            { label: "Özel rol", note: "Firmanın tanımladığı roller", cells: ["no", "no", "no"] },
          ],
          note: "Onay vermek için ayrıca onaylar modülünde düzenleme yetkisi gerekir.",
        },
        {
          type: "flow",
          title: "Tadilat talebinin durumu",
          steps: [
            { label: "Açık", tone: "brand", body: "Talep açıldı ve kodunu aldı; atanan kişiye bildirim gider." },
            { label: "Devam ediyor", tone: "warn", body: "Sahada iş sürüyor." },
            { label: "Çözüldü", tone: "ok", body: "İş tamamlandı ve panoda çözülen talep olarak sayıldı." },
            { label: "Kapalı", tone: "muted", body: "Talep kapatıldı ve açık talepler listesinden çıktı." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Talep ve disiplin onayları bir sahaya aittir.", record: "Saha → Talep" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Atanan ve yüksek öncelikli talep bildirimleri; onay yetkisi rolden gelir.", record: "Bildirim ve rol" },
      { feature: "yapay-zeka-asistani", dir: "in", what: "Asistanla sohbetten tadilat talebi açılabilir; önce önizleme gelir.", record: "Yeni talep" },
    ],
    solutions: [
      { slug: "perakende-yatirimlari", why: "Mağazalardan gelen tadilat talepleri öncelik ve atanan kişiyle bölge genelinde izlenir." },
      { slug: "mimarlik-ofisleri", why: "Mimari onay sahada kayıtlı; onaylayan kişi ve tarih belli." },
      { slug: "muhendislik-ve-mep", why: "Mekanik ve elektrik onayları ayrı, her biri kendi disiplin mühendisinden." },
    ],
    faqs: [
      {
        question: "Disiplin onayını kim verebilir?",
        answer:
          "Mimari onayı Mimar, mekanik onayı Makine Mühendisi, elektrik onayı Elektrik Mühendisi verir. Kurucu, Yönetici ve Bölge Müdürü üçünü de verebilir. Firmanın tanımladığı özel roller disiplin onayı veremez.",
      },
      {
        question: "Onaylayan kişi ve tarih kayıtta kalıyor mu?",
        answer:
          "Evet. Onaylayanın adı ve onay zamanı sahanın kaydına yazılır ve onayın yanında görünür. Onay geri alınırsa bu bilgi kaldırılır.",
      },
      {
        question: "Yüksek öncelikli bir talep açıldığında kim haberdar olur?",
        answer:
          "Atanan kişiye “Size atanan talep” bildirimi gider. Açık durumdaki yüksek öncelikli talepler ayrıca bildirimle görünür. Firma bu bildirimleri zorunlu kılabilir.",
      },
    ],
    cta: {
      title: "Talep ve onay düzeninizi birlikte kuralım.",
      lede: "Tadilat taleplerini bugün nasıl topladığınızı ve kimin neyi onayladığını anlatın, aynı düzeni Koordine'de gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ İnsan kaynakları */
  "insan-kaynaklari": {
    slug: "insan-kaynaklari",
    hero: {
      title: "Saha personelinin puantajını, izinlerini ve belgelerini takip edin.",
      lede:
        "Ofis, maaşlı, yevmiyeli ve taşeron personeli aynı listede tutulur. Günlük rapordaki yoklama puantaja işlenir, onaylanan izin puantaja yazılır, belge süresi yaklaşınca bildirim gelir.",
      secondary: { label: "İzin ve puantaj akışı", href: "#izin-akisi" },
    },
    visual: {
      key: "hr-both",
      caption: "Puantaj cetveli ve süresi yaklaşan personel belgeleri",
    },
    sheet: [
      { label: "Ekranlar", value: "Personel, belgeler, puantaj, izinler, duyurular" },
      { label: "Çalışma tipi", value: "Ofis, maaşlı, yevmiyeli, taşeron" },
      { label: "Excel", value: "Puantaj ve İK raporu dışa aktarılır" },
    ],
    capabilities: [
      {
        title: "Personel kartı",
        body:
          "Sicil no, çalışma tipi, taşeron firma, unvan, görev yeri, işe giriş tarihi ve izin onaylayan yönetici. T.C. kimlik no ve adres gibi özlük bilgilerini yalnızca yetkili kişiler ve personelin kendisi görür.",
        terms: ["Sicil no", "Görev yeri", "Özlük bilgileri"],
      },
      {
        title: "Belgeler ve sertifikalar",
        body:
          "İSG eğitimi, sağlık muayenesi, MYK, yüksekte çalışma, operatör ve sürücü belgeleri. Süresi yaklaşan ya da geçen belgeler ayrı listelenir.",
        terms: ["Geçerli", "Yakında bitiyor", "Süresi geçti"],
      },
      {
        title: "Aylık puantaj",
        body:
          "Hücre hücre işaretleme, boş günleri doldurma, raporlardan aktarma ve fazla mesai. Günlük 11 saati ve yıllık 270 saati aşan çalışma işaretlenir. Kapatılan ay kilitlenir.",
        terms: ["Boş günleri doldur", "Raporlardan aktar", "Ayı kapat"],
      },
      {
        title: "İzinler",
        body:
          "Yıllık, mazeret, rapor ve ücretsiz izin. Yıllık izin hakkı hizmet süresinden hesaplanır. Talep önce yöneticiye, sonra İK'ya gider; onaylanan izin puantaja yazılır.",
        terms: ["Hak edilen", "Kullanılan", "Kalan"],
      },
      {
        title: "Talepler ve duyurular",
        body:
          "Personel avans, belge, malzeme ve eğitim taleplerini İK'ya iletir. Duyurularda isterseniz “Okudum, anladım” onayı alınır ve okumayanlar listelenir.",
        terms: ["Avans", "Belge", "Okudum, anladım"],
      },
    ],
    screens: {
      title: "Puantaj ve belge takibi.",
      lede: "Puantaj ayın her gününü kişi kişi gösterir. Belge listesi tüm personelin sertifikalarını bitiş tarihine göre sıralar.",
      tabs: [
        {
          key: "timesheet",
          label: "Puantaj",
          summary: "Aylık devam cetveli: çalışılan günler, izin, rapor ve fazla mesai.",
          points: [
            "Boş günleri doldururken Pazar hafta tatili, diğer günler çalışma günü olarak işaretlenir.",
            "Hücreye tıklayınca normal saat, fazla mesai, saha ve not girilir.",
            "Puantaj Excel olarak alınır.",
          ],
        },
        {
          key: "certificates",
          label: "Belgeler",
          summary: "Tüm personelin İSG, sağlık, MYK ve diğer belgeleri; süresi geçen ve 30 gün içinde bitenler.",
          points: [
            "Geçerlilik, belge türü ve onay durumuna göre filtrelenir.",
            "Belge süresi uyarısının kaç gün önce geleceği firma ayarlarından seçilir.",
            "Sağlık raporu dosyasını yalnızca yetkili kişi ve personelin kendisi açar.",
          ],
        },
      ],
    },
    special: {
      id: "izin-akisi",
      eyebrow: "İzin ve puantaj",
      title: "İzin talebi nasıl onaylanır.",
      lede: "İzin onaylandığında günler puantaja izin koduyla yazılır. Puantajda kullanılan kodlar aşağıdadır.",
      blocks: [
        {
          type: "flow",
          title: "İzin talebinin adımları",
          note: "Personelin izin onaylayan yöneticisi yoksa talep doğrudan İK'ya gider.",
          steps: [
            { label: "Talep", tone: "muted", body: "Tür ve tarihler seçilir; düşülecek gün ve kalan hak hesaplanır." },
            { label: "Yönetici onayı", tone: "warn", body: "Kartta tanımlı yönetici onaylar ya da gerekçeyle reddeder." },
            { label: "İK onayı", tone: "warn", body: "Son kararı İK verir." },
            { label: "Onaylandı", tone: "ok", body: "Günler puantaja yazılır, personele sonuç bildirimi gider." },
          ],
        },
        {
          type: "codes",
          title: "Puantaj kodları",
          codes: [
            { code: "X", label: "Çalıştı" },
            { code: "Y", label: "Yarım gün" },
            { code: "İ", label: "Yıllık izin" },
            { code: "M", label: "Mazeret izni" },
            { code: "R", label: "Raporlu" },
            { code: "Ü", label: "Ücretsiz izin" },
            { code: "D", label: "Devamsız" },
            { code: "H", label: "Hafta tatili" },
            { code: "RT", label: "Resmi tatil" },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-raporlari", dir: "in", what: "Günlük rapordaki isimli yoklama puantaja işlenir.", record: "Yoklama → Puantaj" },
      { feature: "saha-ve-harita", dir: "in", what: "Personelin görev yeri bir sahadır.", record: "Görev yeri" },
      { feature: "envanter-ve-zimmet", dir: "in", what: "Personel kartında kişiye zimmetli ekipman ve araçlar görünür.", record: "Zimmetler" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Belge süresi, izin onayı, duyuru ve talep bildirimleri.", record: "Bildirim" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Taşeron dahil saha personelinin puantajı günlük rapordaki yoklamadan gelir." },
      { slug: "muhendislik-ve-mep", why: "Yüksekte çalışma, operatör ve İSG belgelerinin bitiş tarihleri personel bazında izlenir." },
    ],
    faqs: [
      {
        question: "Taşeron personelinin izni de takip edilir mi?",
        answer:
          "Evet, taşeron personeli için de izin kaydı açılabilir. Yıllık izin alt işverenin sorumluluğunda olduğu için bu kayıt yalnızca puantaj ve takip içindir.",
      },
      {
        question: "Kapatılan aya sonradan değişiklik yapılabilir mi?",
        answer:
          "Kapatılan ayın puantajı değiştirilemez. Kilidi yalnızca puantaj silme yetkisi olan kullanıcı açabilir; ayı kimin hangi tarihte kapattığı ekranda yazar.",
      },
      {
        question: "Personel kendi puantajını ve belgelerini görebilir mi?",
        answer:
          "Personel kartı bir kullanıcı hesabına bağlanırsa kişi kendi kartını, belgelerini ve puantajını görür. Kendi belgesini yükleyebilir; belge İK onaylayana kadar onay bekliyor olarak görünür.",
      },
    ],
    cta: {
      title: "Puantaj ve izin düzeninizi birlikte kuralım.",
      lede: "Bugünkü puantaj tablonuzu ve izin onay sürecinizi anlatın, görüşmede Koordine'deki karşılığını gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Envanter ve zimmet */
  "envanter-ve-zimmet": {
    slug: "envanter-ve-zimmet",
    hero: {
      title: "Ekipman ve araçların kimde olduğunu bir listede görün.",
      lede:
        "Ekipman, araç, el aleti ve elektroniği demirbaş numarasıyla kaydedin. Kime zimmetlendiği, hangi şantiyede kullanıldığı ve hangi durumda teslim alındığı geçmişiyle saklanır.",
      secondary: { label: "Zimmet durumlarını görün", href: "#zimmet" },
    },
    visual: {
      key: "inventory",
      caption: "Envanter listesi: demirbaş no, durum, zimmetli kişi ve teslim uyarıları",
    },
    sheet: [
      { label: "Kategori", value: "Ekipman, araç, el aleti, elektronik, iş güvenliği" },
      { label: "Durum", value: "Boşta, zimmette, bakımda, hurda" },
      { label: "Araç belgesi", value: "Trafik sigortası, kasko, muayene" },
    ],
    capabilities: [
      {
        title: "Envanter kartı",
        body:
          "Demirbaş no, ad, kategori, marka, model, seri no ve alış tarihi. Araçlarda plaka, kilometre ve sigorta, kasko, muayene bitiş tarihleri ayrıca tutulur.",
        terms: ["DMR-0012", "Seri no", "Plaka", "Kilometre"],
      },
      {
        title: "Zimmet",
        body:
          "Kişiyi listeden seçin ya da uygulamada hesabı olmayan birinin adını yazın (ör. taşeron ustası). Kullanılacağı şantiye ve planlanan teslim tarihi girilir.",
        terms: ["Listede yok (adını yaz)", "Kullanılacağı şantiye", "Planlanan teslim"],
      },
      {
        title: "Teslim",
        body:
          "Teslim tarihi ve eşyanın durumu girilir: Sağlam, Hasarlı ya da Kayıp. Hasarlı eşyayı aynı adımda bakıma alabilirsiniz.",
        terms: ["Sağlam", "Hasarlı", "Kayıp", "Eşyayı bakıma al"],
      },
      {
        title: "Gecikme ve belge uyarıları",
        body:
          "Teslim tarihi geçen zimmet “Teslim gecikti” olarak işaretlenir. Sigortası, kaskosu ya da muayenesi biten araç için araç sorumlularına ve aracı kullanan kişiye bildirim gider.",
        terms: ["Teslim gecikti", "18 gün kaldı"],
      },
      {
        title: "Zimmetimdekiler",
        body: "Her kullanıcı üzerine zimmetli eşyaları kendi ekranında görür. Personel kartında da kişiye zimmetli ekipman listelenir.",
        terms: ["Zimmetimdekiler", "Kullanım oranı"],
      },
    ],
    screens: {
      title: "Envanter listesi ve zimmet geçmişi.",
      lede: "Liste eşyanın bugün nerede olduğunu, zimmet geçmişi daha önce kimlerde kaldığını gösterir.",
      tabs: [
        {
          key: "inventory",
          label: "Envanter",
          summary: "Demirbaş no, kategori, durum, zimmetli kişi ve kullanıldığı şantiye.",
          points: [
            "Arama ada, demirbaş no, seri no ve kişiye göre yapılır.",
            "Satırdan doğrudan zimmetleyebilir ya da teslim alabilirsiniz.",
            "Bakımdaki eşya zimmetlenemez; zimmetli eşya önce teslim alınır.",
          ],
        },
        {
          key: "assignment-history",
          label: "Zimmet geçmişi",
          summary: "Bir eşyanın tüm zimmetleri: kişi, şantiye, tarihler ve teslimdeki durumu.",
          points: [
            "Her satırda zimmetleyen ve teslim alan kişi görünür.",
            "Zimmet notu ve teslim notu ayrı tutulur.",
          ],
        },
      ],
    },
    special: {
      id: "zimmet",
      eyebrow: "Zimmet durumları",
      title: "Bir eşyanın dört durumu.",
      lede: "Zimmet ve teslim adımları eşyanın durumunu değiştirir. Ayrıca bir liste tutmanız gerekmez.",
      blocks: [
        {
          type: "flow",
          title: "Durumlar",
          note: "Sağlam teslim alınan eşya yeniden Boşta olur.",
          steps: [
            { label: "Boşta", tone: "ok", body: "Depoda ya da kullanıma hazır, zimmetlenebilir." },
            { label: "Zimmette", tone: "brand", body: "Bir kişide, isteğe bağlı olarak bir şantiyede ve planlanan teslim tarihiyle." },
            { label: "Bakımda", tone: "warn", body: "Teslimde ya da sonradan bakıma alındı, zimmetlenemez." },
            { label: "Hurda", tone: "muted", body: "Hurdaya ayrıldı; geçmişi saklanır." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Zimmet verilirken eşyanın kullanılacağı şantiye seçilir.", record: "Şantiye" },
      { feature: "insan-kaynaklari", dir: "out", what: "Personel kartında kişiye zimmetli ekipman ve araçlar listelenir.", record: "Zimmetler" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Araç belgesi bildirimleri; envanter yetkisi rolden gelir.", record: "Bildirim" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Şantiyeler arasında dolaşan kırıcı, iskele ve araçların kimde olduğunu görürsünüz." },
      { slug: "muhendislik-ve-mep", why: "Ölçüm cihazları ve el aletleri teknisyene zimmetli; teslim durumu ve bakım kaydıyla." },
    ],
    faqs: [
      {
        question: "Uygulamada hesabı olmayan birine zimmet verebilir miyiz?",
        answer:
          "Evet. Zimmet formunda “Listede yok (adını yaz)” seçeneğiyle ad soyad yazabilirsiniz. Taşeron ustası gibi kişilere verilen ekipman da aynı geçmişte izlenir.",
      },
      {
        question: "Hasarlı ya da kayıp dönen ekipmana ne olur?",
        answer:
          "Teslim alırken durumu Hasarlı ya da Kayıp seçersiniz; hasarlı eşyayı aynı adımda bakıma alabilirsiniz. Kayıp eşya envanterde kalır, gerekirse hurdaya ayrılır.",
      },
      {
        question: "Araç belgesi uyarısı kime gider?",
        answer:
          "Araç sorumlularına ve aracın zimmetli olduğu kişiye gider. Uyarının kaç gün önce gideceğini firma ayarlarında belirlersiniz.",
      },
    ],
    cta: {
      title: "Demirbaş listenizi birlikte kayda alalım.",
      lede: "Elinizdeki ekipman ve araç listesini getirin, görüşmede zimmet ve teslim takibini kendi verinizle gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Ekip ve iletişim */
  "ekip-ve-iletisim": {
    slug: "ekip-ve-iletisim",
    hero: {
      title: "Ekip sohbeti, bildirimler ve rollere göre yetkiler.",
      lede:
        "Firma içinde birebir yazışın ve dosya paylaşın. Hangi modülü kimin görüp düzenleyeceğini rollerle belirleyin. Her hesap aynı anda tek oturumda açık kalır.",
      secondary: { label: "Bildirimleri görün", href: "#bildirimler" },
    },
    visual: {
      key: "chat",
      caption: "Birebir sohbet, paylaşılan PDF rapor ve yeni bildirim",
    },
    sheet: [
      { label: "Roller", value: "9 hazır rol ve özel roller" },
      { label: "Yetki", value: "Görüntüle, ekle, düzenle, sil; modül bazında" },
      { label: "Bildirim", value: "17 tür, uygulama içinde ve masaüstünde" },
    ],
    capabilities: [
      {
        title: "Birebir sohbet",
        body:
          "Ekip listesinde kişinin rolü ve okunmamış mesaj sayısı görünür. Sohbette 10 MB'a kadar dosya ve görsel paylaşılır, mikrofonla 5 dakikaya kadar sesli mesaj gönderilir. Mesajların ne kadar saklanacağını firma belirler.",
        terms: ["Görüldü", "Sesli mesaj", "En fazla 10 MB", "Mesaj saklama süresi"],
      },
      {
        title: "Hazır ve özel roller",
        body:
          "Kurucu, Yönetici, Bölge Müdürü, Mimar, İnşaat, Makine ve Elektrik Mühendisi, Saha Sorumlusu ve Muhasebe. Usta ya da Tedarik gibi kendi rollerinizi de ekleyebilirsiniz.",
        terms: ["Yerleşik roller", "Özel roller"],
      },
      {
        title: "Modül bazında yetki",
        body:
          "15 bölümün her biri için görüntüleme, ekleme, düzenleme ve silme ayrı açılır. Bir kullanıcıya rolünden farklı yetki de verilebilir.",
        terms: ["Tam Yetki", "Sadece görüntüleme", "Rol varsayılanını uygula"],
      },
      {
        title: "Bildirimler",
        body:
          "17 bildirim türü vardır. Her kullanıcı bildirimleri modül bazında açıp kapatır; firma bazılarını zorunlu kılabilir. Onayınızı bekleyen hakediş, izin ve belgeler ile süresi dolmuş belgeler menüde de sayıyla görünür.",
        terms: ["Masaüstü bildirimleri", "Menüde onay bekleyenler"],
      },
      {
        title: "Tek oturum",
        body:
          "Aynı hesapla başka bir yerden giriş yapıldığında önceki oturum kapanır ve kullanıcıya nedeni gösterilir. Kurucu, aktivite kayıtlarında kimin ne yaptığını görür.",
        terms: ["Tek aktif oturum", "Aktivite Logları"],
      },
    ],
    screens: {
      title: "Sohbet ve yetki matrisi.",
      lede: "Sohbet ekibin yazıştığı yer, yetki matrisi kimin neyi görebileceğinin ayarlandığı yerdir.",
      tabs: [
        {
          key: "chat",
          label: "Ekip sohbeti",
          summary: "Solda ekip listesi, sağda konuşma; PDF rapor ve fotoğraf paylaşımı.",
          points: [
            "Okunmamış mesajlar menüde ve bildirimle görünür.",
            "Sesli mesaj sohbette dinlenir; dosya paylaşımı kapalıysa sesli mesaj da kapanır.",
            "Mesaj ya da sohbetin tamamı iki taraf için de silinebilir.",
            "Ekip sohbeti firma ayarlarından kapatılabilir.",
          ],
        },
        {
          key: "permission-matrix",
          label: "Yetki matrisi",
          summary: "Bir rolün her modüldeki görüntüleme, ekleme, düzenleme ve silme yetkileri.",
          points: [
            "Rol matrisi, o role atanan yeni kullanıcılar için başlangıç ayarıdır.",
            "Kaydederken isterseniz bu roldeki mevcut kullanıcılar da güncellenir.",
            "Kapatılan modül menüden kalkar, kayıtları silinmez.",
          ],
        },
      ],
    },
    special: {
      id: "bildirimler",
      eyebrow: "Bildirimler",
      title: "Hangi durumda bildirim gelir.",
      lede:
        "Bildirimler kayıtlardaki tarih ve durumlardan oluşur. Firma hangi türlerin açık ya da zorunlu olacağını ve kaç gün önceden uyarılacağını belirler.",
      blocks: [
        {
          type: "list",
          title: "Bildirim türleri",
          items: [
            { term: "Sahalar", body: "Yaklaşan açılış, geciken açılış, ihaledeki sahada sözleşme eksikliği." },
            { term: "Finans", body: "Bitmek üzere olan sözleşme, onay bekleyen hakediş, ödenmemiş fatura." },
            { term: "Talepler", body: "Size atanan talepler ve yüksek öncelikli açık talepler." },
            { term: "İnsan kaynakları", body: "Belge süresi, izin onayı ve sonucu, yeni duyuru, personel talepleri." },
            { term: "Envanter", body: "Sigortası, kaskosu ya da muayenesi yaklaşan veya geçen araçlar." },
            { term: "Mesajlar", body: "Okunmamış ekip mesajları." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Açılış ve sözleşme uyarıları; bildirimden haritaya geçilir.", record: "Bildirim" },
      { feature: "hakedis-ve-finans", dir: "in", what: "Hakediş onayı, ödenmemiş fatura ve sözleşme bitişi.", record: "Bildirim" },
      { feature: "insan-kaynaklari", dir: "in", what: "Belge, izin, duyuru ve talep bildirimleri.", record: "Bildirim" },
      { feature: "talepler-ve-onaylar", dir: "out", what: "Disiplin onayı rolden, onay yetkisi yetki matrisinden gelir.", record: "Rol ve yetki" },
      { feature: "yapay-zeka-asistani", dir: "out", what: "Asistan kullanıcının yetkisiyle çalışır.", record: "Yetki" },
    ],
    solutions: [
      { slug: "mimarlik-ofisleri", why: "Ofisteki unvanlar özel rollerle karşılanır; belgeler sohbette PDF olarak paylaşılır." },
      { slug: "insaat-ve-taahhut", why: "Muhasebe finansı, saha sorumlusu sahayı görür; şantiye şefiyle yazışmalar kayıtlı." },
      { slug: "perakende-yatirimlari", why: "Bölge müdürleri, mağaza sorumluları ve merkez aynı bildirim ayarlarıyla çalışır." },
    ],
    faqs: [
      {
        question: "Mesajlar ne kadar süre saklanıyor?",
        answer:
          "Saklama süresini firma belirler. Bu süreyi dolduran mesajlar ve dosyalar kalıcı olarak silinir. Sohbet ekranında mesajların kaç gün sonra silineceği yazar.",
      },
      {
        question: "Bir kullanıcının yetkisini rolünden farklı ayarlayabilir miyiz?",
        answer:
          "Evet. Rol matrisi varsayılan ayardır; tek bir kullanıcı için modül bazında farklı yetki kaydedebilirsiniz. “Rol varsayılanını uygula” ile role geri dönülür.",
      },
      {
        question: "Kullanıcılar bildirimleri kapatabilir mi?",
        answer:
          "Evet, modül bazında. Firmanın zorunlu kıldığı bildirimler kapatılamaz; firmanın kapattığı türler hiç gönderilmez.",
      },
    ],
    cta: {
      title: "Rol ve yetki yapınızı birlikte çıkaralım.",
      lede: "Ekibinizdeki görevleri anlatın, görüşmede bunları rollere ve modül yetkilerine nasıl çevireceğimizi gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Yapay zekâ asistanı */
  "yapay-zeka-asistani": {
    slug: "yapay-zeka-asistani",
    hero: {
      title: "Firma verinize soru sorun, önerdiği kaydı siz onaylayın.",
      lede:
        "Koordine'ye Sor asistanı sahalar, açılış takvimi, iş planları ve finans kayıtlarınız üzerinden cevap verir. Saha, tadilat talebi, iş planı ya da keşif kalemi eklemesini isteyebilirsiniz; siz onaylamadan kayıt oluşmaz.",
      secondary: { label: "Neler ekleyebildiğini görün", href: "#eylemler" },
    },
    visual: {
      key: "assistant-full",
      caption: "Soru, firma verisine dayalı cevap ve onay bekleyen kayıt önizlemesi",
    },
    sheet: [
      { label: "Okuduğu veri", value: "Sahalar, açılışlar, iş planı, keşif, sözleşme, hakediş, fatura, talepler" },
      { label: "Ekleyebildiği", value: "Saha, tadilat talebi, iş planı ve keşif kalemi" },
      { label: "Onay", value: "Firma adına yönetici, ayrıca her kullanıcı veri işleme onayı verir" },
    ],
    capabilities: [
      {
        title: "Doğal dilde soru",
        body:
          "“Önümüzdeki 30 günde açılacak sahalar hangileri?” ya da “Hakediş ve fatura durumunu yorumla” gibi sorular sorabilirsiniz. Cevaplar firmanızın Koordine'deki kayıtlarına dayanır.",
        terms: ["Genel durumu özetle", "Riskli projeleri listele"],
      },
      {
        title: "Önce önizleme",
        body:
          "Kayıt istediğinizde asistan eklenecek alanları bir önizleme kartında gösterir. “Onayla ve ekle” demeden hiçbir şey kaydedilmez.",
        terms: ["Onayla ve ekle", "İptal edildi"],
      },
      {
        title: "Eksik bilgide uyarı",
        body:
          "Eksik ya da belirsiz bilgi önizlemede uyarı olarak görünür. Yazdığınız saha adı birden fazla sahayla eşleşirse hangisini kastettiğiniz sorulur.",
        terms: ["Şehir eksik.", "Birden fazla sahayla eşleşiyor"],
      },
      {
        title: "Yetkinizle çalışır",
        body:
          "Asistan sizin yetkinizle kayıt ekler. Saha ekleme yetkiniz yoksa asistanla da saha ekleyemezsiniz; kapalı bir modülde kayıt açılmaz.",
        terms: ["Saha ekleme yetkiniz yok."],
      },
      {
        title: "Veri işleme onayı",
        body:
          "Asistan, yapay zekâ hizmet sağlayıcısına veri gönderdiği için önce firma yöneticisi, ardından her kullanıcı ne gönderildiğini ve verinin yurt dışında işlendiğini okuyup onay verir. Onay Ayarlar sayfasından geri çekilebilir.",
        terms: ["Firma onayı", "Kişisel onay", "Onayı geri çek"],
      },
      {
        title: "Sesle yazma",
        body:
          "Mikrofona basıp konuştuğunuzda söyledikleriniz mesaj kutusuna yazılır, gönderilmeden önce düzeltebilirsiniz. Chrome, Edge ve Safari'de çalışır.",
        terms: ["Sesle yaz", "Türkçe ve İngilizce"],
      },
      {
        title: "Toplu kalem",
        body:
          "Bir sahanın iş planına ya da keşfine tek seferde en fazla 100 kalem ekletebilirsiniz. Birim fiyatı verilmeyen kalemler 0 tutarla eklenir ve bu önizlemede yazar.",
        terms: ["En fazla 100 kalem", "Poz no", "Birim fiyat"],
      },
    ],
    screens: {
      title: "Cevap ve önizleme.",
      lede: "Asistan ya soruya cevap verir ya da kayıt önerir. Kayıt önerisi her zaman sizin onayınızı bekler.",
      tabs: [
        {
          key: "assistant-answer",
          label: "Soru ve cevap",
          summary: "Firma verisine dayanan cevap; altta yapay zekâ uyarısı.",
          points: [
            "Hazır öneriler: genel durum, yaklaşan ve geciken açılışlar, finans yorumu.",
            "Yanıt yazılırken durdurulabilir.",
            "Her sohbette önemli kararlarda verileri kontrol etmeniz hatırlatılır.",
          ],
        },
        {
          key: "assistant-preview",
          label: "Kayıt önizlemesi",
          summary: "Eklenecek kayıt alan alan; eksikler uyarı olarak, onay düğmesi en altta.",
          points: [
            "Uzun kalem listelerinde ilk satırlar ve kalan kalem sayısı gösterilir.",
            "Hata varsa sohbette düzeltirsiniz, yeni önizleme hazırlanır.",
            "Onaydan sonra ne eklendiği tek satırla bildirilir.",
          ],
        },
      ],
    },
    special: {
      id: "eylemler",
      eyebrow: "Kayıt ekleme",
      title: "Asistanın ekleyebildiği dört kayıt.",
      lede: "Asistan yalnızca bu dört kaydı ekleyebilir. Her biri için ilgili modülde ekleme yetkiniz olmalıdır.",
      blocks: [
        {
          type: "list",
          title: "Kayıtlar ve alanları",
          items: [
            { term: "Yeni saha", body: "Ad, konum, durum, açılış tarihi, saha türü, yüklenici. Adres bulunamazsa konum şehir merkezine konur, sonra düzeltebilirsiniz." },
            { term: "Tadilat talebi", body: "Başlık, saha, öncelik ve açıklama. Saha adı belirsizse hangisi olduğu sorulur." },
            { term: "İş planı kalemi", body: "İş tanımı, başlangıç ve bitiş tarihi, sorumlu ve durum." },
            { term: "Keşif kalemi", body: "Poz no, kalem adı, miktar ve birim fiyat." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Sahalar ve açılış takvimi okunur, yeni saha eklenebilir.", record: "Okur ve ekler" },
      { feature: "kesif-ve-is-programi", dir: "in", what: "İş planı ve keşif okunur, önizlemeyle kalem eklenir.", record: "Okur ve ekler" },
      { feature: "hakedis-ve-finans", dir: "in", what: "Sözleşme, hakediş ve fatura durumu yorumlanır.", record: "Okur" },
      { feature: "talepler-ve-onaylar", dir: "in", what: "Talepler okunur, sohbetten yeni tadilat talebi açılabilir.", record: "Okur ve ekler" },
      { feature: "ekip-ve-iletisim", dir: "in", what: "Kullanıcının rol yetkileri asistanda da geçerlidir.", record: "Yetki" },
    ],
    solutions: [
      { slug: "perakende-yatirimlari", why: "Mağaza portföyüyle ilgili açılış ve gecikme soruları; sohbetten tadilat talebi." },
      { slug: "insaat-ve-taahhut", why: "Hakediş ve fatura durumunun özeti; iş planına toplu kalem." },
    ],
    faqs: [
      {
        question: "Asistan personel ve puantaj bilgilerini görüyor mu?",
        answer:
          "Hayır. Asistan sahalar, açılış takvimi, iş planları, keşif, sözleşme, hakediş, fatura ve tadilat talepleri üzerinden çalışır. Personel, özlük, puantaj ve izin kayıtları bu kapsamda değildir.",
      },
      {
        question: "Asistan yanlış sahayı seçerse ne olur?",
        answer:
          "Yazdığınız ad birden fazla sahayla eşleşirse asistan hangisini kastettiğinizi sorar. Önizlemede saha adı açıkça yazar; yanlışsa onaylamaz, sohbette düzeltirsiniz.",
      },
      {
        question: "Asistanı yalnızca soru sormak için açık tutabilir miyiz?",
        answer:
          "Evet. Ayarlar altındaki Asistan sayfasında “Asistanı etkinleştir” ve “Asistanla kayıt ekleme” ayrı seçeneklerdir. İkincisini kapatırsanız asistan yalnızca soruları cevaplar.",
      },
    ],
    cta: {
      title: "Asistanı kendi portföyünüzle deneyin.",
      lede: "Görüşmede sahalarınıza benzer bir veriyle soru soralım, bir talebi önizleme ve onay adımıyla birlikte ekleyelim.",
    },
  },
};

export type FeatureWithDetail = Feature & { detail: FeatureDetail; index: number };

export const featuresWithDetails: FeatureWithDetail[] = features.map((f, index) => ({
  ...f,
  index,
  detail: featureDetails[f.slug],
}));

export const featureDetailBySlug = (slug: string): FeatureWithDetail | undefined =>
  featuresWithDetails.find((f) => f.slug === slug);

/** /ozellikler genel bakışındaki gruplar */
export const featureGroups: { id: string; name: string; summary: string; slugs: FeatureSlug[] }[] = [
  {
    id: "saha-ve-proje",
    name: "Saha ve proje",
    summary: "Sahanın nerede ve hangi aşamada olduğu, ne kadar iş ve malzeme içerdiği, hangi onayları beklediği.",
    slugs: ["saha-ve-harita", "kesif-ve-is-programi", "talepler-ve-onaylar"],
  },
  {
    id: "finans",
    name: "Finans",
    summary: "Birbirine bağlı sözleşme, hakediş ve faturalar; para birimine göre ayrı toplamlar.",
    slugs: ["hakedis-ve-finans"],
  },
  {
    id: "kalite-ve-raporlama",
    name: "Kalite ve raporlama",
    summary: "Günlük saha raporu, İSG denetimi, uygunsuzluk ve onaya sunulan belgeler.",
    slugs: ["saha-raporlari"],
  },
  {
    id: "ekip-ve-kaynak",
    name: "Ekip ve kaynak",
    summary: "Personel, puantaj ve belgeler; ekipmanın kimde olduğu; kimin neyi görebileceği.",
    slugs: ["insan-kaynaklari", "envanter-ve-zimmet", "ekip-ve-iletisim"],
  },
  {
    id: "asistan",
    name: "Asistan",
    summary: "Kayıtlarınızla ilgili soruları cevaplayan, onayınızla kayıt ekleyen yapay zekâ asistanı.",
    slugs: ["yapay-zeka-asistani"],
  },
];
