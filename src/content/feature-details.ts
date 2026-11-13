/**
 * Modül (özellik) sayfalarının detaylı içeriği. Kısa kayıtlar (ad, kod, özet, SEO) features.ts'dedir.
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
      steps: { label: string; code?: string; tone?: FlowTone; color?: string; body: string }[];
    }
  | {
      type: "mapping";
      title: string;
      /** Kaynak dosya etiketi, ör. "Keşif · .xlsx" */
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
  | { type: "codes"; title: string; codes: { code: string; label: string; note?: string }[] }
  | { type: "list"; title: string; items: { term: string; body: string }[] }
  | {
      type: "chain";
      title: string;
      nodes: { code: string; label: string; fields: string[]; states: string[]; link?: string }[];
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
  /** Hero yanındaki pafta antet kutusu: yalnızca ürün gerçekleri */
  sheet: { label: string; value: string }[];
  /** "Ne yapar": 6 numaralı spesifikasyon */
  capabilities: { title: string; body: string; terms: string[] }[];
  /** Ekran varyantları (sekmeli derin anlatım) */
  screens: {
    title: string;
    lede: string;
    tabs: { key: VisualKey; code: string; label: string; summary: string; points: string[] }[];
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
  /* ------------------------------------------------------------------ SAH */
  "saha-ve-harita": {
    slug: "saha-ve-harita",
    hero: {
      title: "Bütün sahalarınız tek haritada, aşamasıyla ve açılış tarihiyle.",
      lede:
        "Her saha haritada bir pin: rengi aşamasını, kartı açılışa kalan günü gösterir. Konumu seçtiğinizde il, ilçe ve adres konumdan dolar; keşif, iş programı, sözleşme ve raporlar bu saha kaydının altında toplanır.",
      secondary: { label: "Saha durumlarını görün", href: "#durumlar" },
    },
    visual: {
      key: "map",
      caption: "Saha haritası · durum renkli pinler, saha listesi ve seçili sahanın kartı",
    },
    sheet: [
      { label: "Ekranlar", value: "Harita · Sahalar · Projeler · Pano" },
      { label: "Durumlar", value: "Proje · İhale · Şantiye · Açılış · Hakediş · Fatura" },
      { label: "Saha türü", value: "Mağaza · Ofis · Kafe · Konut · Otel · Endüstriyel · AVM · Cadde · Outdoor" },
      { label: "Bildirim", value: "Yaklaşan açılış · Geciken açılış · Sözleşme gerekli" },
    ],
    capabilities: [
      {
        title: "Harita ve saha listesi aynı ekranda",
        body:
          "Sahalar durum renkli pinlerle haritada, yanda aranabilir saha listesinde durur. Bölgeler şehir gruplarından oluşur; haritada bölgeleri tek tek açıp kapatırsınız. Son harita konumu ve bölge seçimi isterseniz bir sonraki açılışta hatırlanır.",
        terms: ["Sahalar", "Bölgeler", "Tümünü Aç / Kapat", "Son harita konumunu hatırla"],
      },
      {
        title: "Konumdan il, ilçe ve adres",
        body:
          "Haritaya tıklayın ya da adres, AVM veya yer arayın; il, ilçe, semt ve adres konumdan doldurulur, bina ve kat gibi detayları siz eklersiniz. Kayıtlı şehir pinle uyuşmuyorsa uyarı çıkar ve tek adımda düzeltilir.",
        terms: ["İl / ilçe", "Semt / bölge", "Şehri konumdan düzelt", "Sürükleyerek taşıyın"],
      },
      {
        title: "Saha kartı",
        body:
          "Saha adı, türü ve durumu; açılış ve kabul tarihi; yüklenici firma ve şantiye şefi; brüt m², kat sayısı ve telefon. Saha türlerini firma ayarlarından ekler, yeniden adlandırırsınız (ör. Depo).",
        terms: ["Saha Türü", "Açılış Tarihi", "Kabul Tarihi", "Yüklenici Firma", "Şantiye Şefi", "Brüt m²"],
      },
      {
        title: "Açılış takvimi ve gecikme",
        body:
          "Açılışına 7 gün ya da daha az kalan saha “Yakında açılıyor” olarak kırmızıya döner; tarihi geçip açılmayan saha kaç gün geçtiğiyle görünür. Panodaki açılış takvimi geciken, 7 gün içinde ve 30 gün içinde açılacak sahaları ayırır.",
        terms: ["Bugün açılıyor", "3 gün kaldı", "12 gün geçti", "Açılış gecikmesi"],
      },
      {
        title: "Sahanın dosyaları, notları ve geçmişi",
        body:
          "Ekip notları ve dosyalar sahanın altında tutulur. Yalnızca sizin gördüğünüz bir özel not alanı vardır. Kayıt geçmişi sahayı kimin oluşturduğunu ve en son kimin düzenlediğini gösterir.",
        terms: ["Dosyalar", "Notlar", "Özel not · yalnızca siz", "Kayıt Geçmişi"],
      },
      {
        title: "Pano: portföyün bugünkü hali",
        body:
          "Aktif proje, 30 gün içinde açılış, geciken açılış, şantiye ilerlemesi, açık talep ve açılan saha göstergeleri. Açılış eğrisi, açılış tarihi gelmiş sahalarla gerçekten açılanları ay ay karşılaştırır. Pano bölgeye göre filtrelenir.",
        terms: ["Aktif proje", "30 gün içinde açılış", "Geciken açılış", "Açılış eğrisi"],
      },
    ],
    screens: {
      title: "Haritadan açılış takvimine.",
      lede: "Aynı saha kaydı iki farklı soruya cevap verir: saha nerede ve hangi aşamada; açılışına ne kadar kaldı.",
      tabs: [
        {
          key: "map-focus",
          code: "HRT",
          label: "Saha kartı",
          summary: "Pin rengi sahanın aşamasıdır; seçili sahanın kartı açılışa kalan günü, şantiye şefini ve iş planı ilerlemesini gösterir.",
          points: [
            "Saha listesi ada, şehre, duruma, açılış tarihine ve onay sayısına göre sıralanır.",
            "Arama saha adı, şehir ve yükleniciye bakar.",
            "Yeni saha eklerken haritaya tıklar, pini sürükleyerek ince ayar yaparsınız.",
            "Bildirimdeki “Haritada aç” sizi doğrudan ilgili sahaya götürür.",
          ],
        },
        {
          key: "opening-calendar",
          code: "TKV",
          label: "Açılış takvimi",
          summary: "Henüz açılmamış sahalar açılışa kalan güne göre sıralanır; geciken sahalar gecikme günüyle en üstte.",
          points: [
            "Gruplar: Geciken, 7 gün içinde, 30 gün içinde.",
            "Yaklaşan açılış bildirimi için eşik firma ayarlarında 1–90 gün arasında seçilir.",
            "Açılış tarihi geçip açılmayan saha için “Açılış gecikmesi” bildirimi üretilir.",
            "Açılış eğrisi planlanan ve gerçekleşen açılışları birikimli olarak gösterir.",
          ],
        },
      ],
    },
    special: {
      id: "durumlar",
      eyebrow: "Saha durumu",
      title: "Bir sahanın ömrü: projeden faturaya.",
      lede:
        "Durum, sahanın hangi işlerin içinde olduğunu belirler. Pano, bildirimler ve diğer modüller bu alana bakar; bu yüzden durum tek yerde, saha kartında değişir.",
      blocks: [
        {
          type: "flow",
          title: "Durum sırası ve pin rengi",
          note: "“Yakında açılıyor” seçilen bir durum değildir: açılışa 7 gün ya da daha az kaldığında harita bunu kendiliğinden gösterir.",
          steps: [
            { label: "Proje", color: PIN.proje, body: "Tasarım ve hazırlık. Mimari, mekanik ve elektrik onayları bu aşamada izlenir." },
            { label: "İhale", color: PIN.ihale, body: "Sözleşmesi olmayan sahada uyarı çıkar ve “Sözleşme gerekli” bildirimi üretilir." },
            { label: "Şantiye", color: PIN.santiye, body: "Günlük rapor kapsamı ve şantiye ilerlemesi bu aşamadaki sahalar için hesaplanır." },
            { label: "Açılış", color: PIN.acilis, body: "Saha açıldı. Panodaki “Açılan saha” göstergesine girer." },
            { label: "Hakediş", color: PIN.hakedis, body: "Hakediş dönemleri sözleşme üzerinden yürür." },
            { label: "Fatura", color: PIN.fatura, body: "Faturalar kesilir, ödeme izlenir; sözleşme ilerlemesi güncellenir." },
          ],
        },
        {
          type: "list",
          title: "Saha detayında neler var",
          items: [
            { term: "Keşif", body: "Poz numaralı kalemler, malzeme durumu ve keşif toplamı." },
            { term: "İş planı", body: "Tablo ve Gantt görünümü, öncül görevler." },
            { term: "Sözleşmeler", body: "Sahaya bağlı sözleşmeler; buradan yeni sözleşme açılır." },
            { term: "Dosyalar", body: "Projeler, fotoğraflar ve belgeler; önizleme ve indirme." },
            { term: "Notlar", body: "Ekip notları ve yalnızca sizin gördüğünüz özel not." },
            { term: "Kayıt Geçmişi", body: "Oluşturan ve son düzenleyen kişi." },
          ],
        },
      ],
    },
    connections: [
      { feature: "kesif-ve-is-programi", dir: "out", what: "Keşif ve iş programı sahanın altında tutulur.", record: "Saha → Keşif" },
      { feature: "hakedis-ve-finans", dir: "out", what: "Sözleşme sahaya bağlanır; ihaledeki sahada sözleşme aranır.", record: "İhale → SZ" },
      { feature: "saha-raporlari", dir: "out", what: "Raporlar şantiye seçilerek yazılır; panoda rapor kapsamı çıkar.", record: "Şantiye → Rapor" },
      { feature: "talepler-ve-onaylar", dir: "out", what: "Tadilat talebi ve disiplin onayları sahanın üzerindedir.", record: "Saha → TT" },
      { feature: "insan-kaynaklari", dir: "out", what: "Personelin görev yeri bir sahadır; yoklama bu listeden gelir.", record: "Görev yeri" },
      { feature: "envanter-ve-zimmet", dir: "out", what: "Zimmette eşyanın kullanılacağı şantiye seçilir.", record: "Zimmet → Şantiye" },
      { feature: "yapay-zeka-asistani", dir: "in", what: "Asistan saha sorularını cevaplar, önizlemeyle yeni saha ekler.", record: "Yeni saha" },
    ],
    solutions: [
      { slug: "perakende-yatirimlari", why: "Mağaza portföyü bölge bölge haritada; açılış takvimi ve geciken açılışlar tek bakışta." },
      { slug: "insaat-ve-taahhut", why: "Birden fazla şantiyenin aşaması, ilerlemesi ve rapor kapsamı aynı panoda." },
      { slug: "mimarlik-ofisleri", why: "Uygulamaya geçen projelerin konumu, disiplin onayları ve dosyaları saha kartında." },
    ],
    faqs: [
      {
        question: "Adresi bilmeden saha ekleyebilir miyiz?",
        answer:
          "Saha kaydı için haritada bir konum gerekir. Haritaya tıkladığınızda il, ilçe, semt ve adres o noktadan doldurulur; isterseniz bina, kat ya da birim no gibi detayları eklersiniz. Adres araması sonuç vermezse pini haritadan elle yerleştirebilirsiniz.",
      },
      {
        question: "Saha türlerini kendi işimize göre değiştirebilir miyiz?",
        answer:
          "Evet. Mağaza, ofis, kafe, konut, otel, endüstriyel, AVM, cadde ve outdoor varsayılan türlerdir. Firma ayarlarından yeni tür ekler (ör. Depo), adlarını değiştirirsiniz. Sahalarda kullanılan bir tür, o sahaların türü değiştirilmeden silinemez.",
      },
      {
        question: "Açılış uyarısı kaç gün önce gelir?",
        answer:
          "Haritada açılışına 7 gün ya da daha az kalan saha “Yakında açılıyor” olarak işaretlenir. “Yaklaşan açılış” bildiriminin kaç gün önce gideceğini firma ayarlarında 1 ile 90 gün arasında siz belirlersiniz. Tarihi geçip açılmayan sahalar için ayrıca “Geciken açılış” bildirimi vardır.",
      },
    ],
    cta: {
      title: "Saha listenizi haritada birlikte kuralım.",
      lede: "Mevcut saha ya da mağaza listenizi getirin; görüşmede konumlarınızı, aşamalarınızı ve açılış takviminizi Koordine üzerinde gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ KSF */
  "kesif-ve-is-programi": {
    slug: "kesif-ve-is-programi",
    hero: {
      title: "Keşiften iş programına, her kalem poz numarasıyla.",
      lede:
        "Keşif kalemlerini poz no, miktar, birim ve birim fiyatla sahanın altına girin ya da Excel'den aktarın. İş programını Excel şablonundan veya Primavera P6 .xer dosyasından alın; Gantt'ta izleyin, günlük rapora aktarın.",
      secondary: { label: "İçe aktarımı görün", href: "#ice-aktarim" },
    },
    visual: {
      key: "estimate-gantt",
      caption: "Saha detayı · keşif kalemleri ve iş programı (Gantt) yan yana",
    },
    sheet: [
      { label: "Keşif", value: "Poz no · Kalem adı · Miktar · Birim · Birim fiyat · Para birimi" },
      { label: "Malzeme", value: "Bekleniyor · Geldi · Gitti" },
      { label: "İş planı", value: "Aktivite kodu · WBS · Öncül görevler · Tablo / Gantt" },
      { label: "İçe aktarım", value: "Excel (.xlsx) · Primavera P6 (.xer)" },
    ],
    capabilities: [
      {
        title: "Poz numaralı keşif kalemi",
        body:
          "Her kalem poz no, kalem adı, miktar, birim, birim fiyat ve para birimiyle tutulur; tutar kuruşa yuvarlanır. Keşif tablosu poz no, kalem, birim ya da duruma göre aranır; tüm keşif toplamı para birimi başına ayrı gösterilir.",
        terms: ["15.150.1005", "Miktar", "Birim fiyat", "Tüm keşif toplamı"],
      },
      {
        title: "Seçilenlerden yüzdelik kalem",
        body:
          "Genel gider ya da nakliye gibi kalemleri, seçtiğiniz kalemlerin toplamının yüzdesi olarak ekleyin. Birim “%” olur; tutar taban toplamın girdiğiniz yüzdesidir. Kur çevrimi yapılmadığından yalnızca aynı para birimindeki kalemlerden eklenir.",
        terms: ["Seçilenlerden % kalem ekle", "Birim fiyat (taban)", "(100 + 100) × %10 = 20"],
      },
      {
        title: "Malzemenin sahaya ulaşması",
        body:
          "Her keşif kaleminin malzeme durumu Bekleniyor, Geldi ya da Gitti olarak işaretlenir. Pano, keşif listesindeki kalemlerin sahaya ulaşma oranını ve en çok malzeme bekleyen sahaları gösterir.",
        terms: ["Bekleniyor", "Geldi", "Gitti", "En çok malzeme bekleyen sahalar"],
      },
      {
        title: "İş programı kalemi",
        body:
          "İş tanımı, aktivite kodu, WBS, başlangıç ve bitiş tarihi, sorumlu kişi ya da ekip, durum ve tamamlanma yüzdesi. Öncül görev seçtiğinizde iş, seçilen görevler bittikten sonra başlar.",
        terms: ["A1010", "WBS 1.2.3", "Yapılacak", "Devam ediyor", "Tamamlandı"],
      },
      {
        title: "Gantt ve görev bağımlılıkları",
        body:
          "İş planı tablo ya da Gantt olarak görüntülenir. Bağımlılıklar ilişki tipi ve gecikme saatiyle tutulur. Tarihi olmayan kalemler çizelgede gösterilmez ve kaç kalemin dışarıda kaldığı yazılır.",
        terms: ["Tablo", "Gantt", "FS · SS · FF · SF", "Gecikme (saat)"],
      },
      {
        title: "İş planı eğrisi",
        body:
          "Panoda, açılmamış sahalardaki iş planının planlanan birikimli ilerlemesi S eğrisi olarak çizilir; kalemler süreleriyle ağırlıklandırılır. Bugün planlanan ile gerçekleşen arasındaki sapma puan olarak görünür.",
        terms: ["S eğrisi", "Bugün planlanan", "Gerçekleşen (bugün)", "Sapma"],
      },
    ],
    screens: {
      title: "Keşif tablosu ve iş programı.",
      lede: "İkisi de sahanın detayında, aynı yetki yapısıyla durur. Biri ne kadar ve ne tutarda, diğeri ne zaman ve kimin işi sorusunu cevaplar.",
      tabs: [
        {
          key: "estimate",
          code: "KSF",
          label: "Keşif",
          summary: "Poz numaralı kalemler; miktar, birim fiyat, tutar ve malzeme durumu.",
          points: [
            "Kalemler tek tek eklenir ya da Excel'den toplu aktarılır.",
            "Birden fazla kalem seçilip silinebilir; seçilenlerden yüzdelik kalem eklenir.",
            "Para birimi kalem başına seçilir; toplamlar birim başına ayrıdır.",
            "Keşif tutarı, Kurucu panelindeki bütçe takibinde saha bütçesiyle karşılaştırılır.",
          ],
        },
        {
          key: "gantt",
          code: "İP",
          label: "İş programı",
          summary: "Haftalara yayılmış iş kalemleri, ilerleme yüzdeleri ve bugün çizgisi.",
          points: [
            "Arama iş kalemi, aktivite kodu ve sorumluya bakar.",
            "Tamamlanma yüzdesi kalem bazında girilir.",
            "Günlük raporda “İş planından getir” o güne denk gelen kalemleri rapora ekler.",
            "Asistandan iş planına kalem eklemesini isteyebilirsiniz; önce önizleme gelir.",
          ],
        },
      ],
    },
    special: {
      id: "ice-aktarim",
      eyebrow: "İçe aktarım",
      title: "Excel ve P6 dosyanız, sütun sütun eşleşir.",
      lede:
        "Sütun başlıkları birebir aynı olmak zorunda değildir; Koordine başlıkları tanır ve eşleştirir. Dosyayı seçtikten sonra okunan satırları ve hataları görür, ardından içe aktarırsınız.",
      blocks: [
        {
          type: "mapping",
          title: "Keşif",
          source: "kesif_sablonu.xlsx",
          rows: [
            { from: "Poz No", to: "Poz no", note: "İsteğe bağlı" },
            { from: "Açıklama / Kalem Adı", to: "Kalem adı", note: "Zorunlu" },
            { from: "Miktar", to: "Miktar", note: "Zorunlu" },
            { from: "Birim", to: "Birim" },
            { from: "Birim Fiyat", to: "Birim fiyat", note: "Zorunlu" },
            { from: "Para Birimi", to: "Para birimi", note: "Boşsa firmanın varsayılanı; TL, ₺, $, €, £ tanınır" },
            { from: "Durum", to: "Malzeme durumu", note: "bekleniyor · geldi · gitti" },
          ],
        },
        {
          type: "mapping",
          title: "İş planı",
          source: "is_plani_sablonu.xlsx",
          rows: [
            { from: "Açıklama / İş", to: "İş tanımı", note: "Zorunlu" },
            { from: "Başlangıç Tarihi", to: "Başlangıç" },
            { from: "Bitiş Tarihi", to: "Bitiş" },
            { from: "Sorumlu", to: "Sorumlu", note: "Boşsa “Belirtilmemiş”" },
            { from: "Durum", to: "Durum", note: "yapilacak · devam_ediyor · tamamlandi" },
            { from: "Aktivite kodu · WBS · Öncül", to: "Aktivite kodu · WBS · Öncül görevler", note: "Dosyada varsa" },
          ],
        },
        {
          type: "mapping",
          title: "Primavera P6",
          source: "proje.xer",
          rows: [
            { from: "TASK", to: "İş kalemleri", note: "Ad, aktivite kodu, gerçekleşen ya da hedef tarihler, tamamlanma yüzdesi" },
            { from: "TASKPRED", to: "Öncül görevler", note: "FS, SS, FF, SF ilişkisi ve gecikme saati" },
            { from: "WBS", to: "WBS kodu" },
          ],
        },
        {
          type: "flow",
          title: "Aktarım adımları",
          steps: [
            { label: "Şablon", code: "01", tone: "muted", body: "İsterseniz Excel şablonunu indirin; kendi dosyanız da olur." },
            { label: "Dosya", code: "02", tone: "muted", body: "Keşif için .xlsx, iş planı için .xlsx ya da .xer seçin." },
            { label: "Önizleme", code: "03", tone: "brand", body: "Okunan kalem sayısı ve hatalı satırlar listelenir." },
            { label: "İçe aktar", code: "04", tone: "ok", body: "Mevcut kalemler dosyadakilerle değiştirilir; bu açıkça uyarılır." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Keşif ve iş planı bir sahanın detayında açılır.", record: "Saha" },
      { feature: "saha-raporlari", dir: "out", what: "“İş planından getir” rapor gününe denk gelen kalemleri ekler.", record: "İP → GSR" },
      { feature: "hakedis-ve-finans", dir: "out", what: "Keşif tutarı saha bütçesiyle karşılaştırılır (bütçe takibi).", record: "Keşif → Bütçe" },
      { feature: "yapay-zeka-asistani", dir: "in", what: "Asistan keşfe ve iş planına önizlemeyle kalem ekler.", record: "En fazla 100 kalem" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Poz no'lu keşif ve P6'dan gelen iş programı aynı şantiye kaydında; ilerleme günlük rapora akar." },
      { slug: "muhendislik-ve-mep", why: "Mekanik ve elektrik kalemleri keşifte, devreye alma işleri iş programında sorumlusuyla." },
      { slug: "perakende-yatirimlari", why: "Mağaza tadilatlarının keşfi ve malzeme durumu; hangi mağazanın malzeme beklediği panoda." },
    ],
    faqs: [
      {
        question: "Excel dosyamızdaki sütun adları şablonla aynı olmak zorunda mı?",
        answer:
          "Hayır. Koordine başlıkları tanıyarak eşleştirir; örneğin keşifte “Açıklama” ya da “Kalem Adı” sütunu kalem adı olarak okunur. Keşif için kalem adı, miktar ve birim fiyat sütunları gereklidir; poz no, birim, para birimi ve durum isteğe bağlıdır.",
      },
      {
        question: "İçe aktarım mevcut keşfin üzerine mi yazar?",
        answer:
          "Evet. Excel'den içe aktarım, sahadaki mevcut keşif ya da iş planı kalemlerini dosyadakilerle değiştirir ve bunu aktarımdan önce açıkça uyarır. Var olan listeye tek tek ekleme yapmak için “Kalem ekle” ya da “İş ekle” kullanılır.",
      },
      {
        question: "P6'daki ilişki tipleri ve gecikmeler korunuyor mu?",
        answer:
          ".xer dosyasındaki öncül ilişkileri FS, SS, FF ve SF tipleriyle, gecikme süresi saat olarak aktarılır. Aktivite kodu, WBS ve tamamlanma yüzdesi de gelir; gerçekleşen tarih varsa o, yoksa hedef tarih kullanılır.",
      },
      {
        question: "Genel gider gibi yüzdelik kalemleri nasıl ekleriz?",
        answer:
          "Keşifte ilgili kalemleri seçip “Seçilenlerden % kalem ekle”yi kullanırsınız. Yeni kalemin birimi “%” olur, tutarı seçilen kalemlerin toplamının girdiğiniz yüzdesidir; örneğin 100 + 100 tutarındaki iki kalemin %10'u 20'dir.",
      },
    ],
    cta: {
      title: "Keşif dosyanızı ve iş programınızı getirin.",
      lede: "Görüşmede kendi Excel ya da P6 dosyanızı birlikte içe aktaralım; keşfin, Gantt'ın ve günlük rapora akışın nasıl göründüğünü gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ HKD */
  "hakedis-ve-finans": {
    slug: "hakedis-ve-finans",
    hero: {
      title: "Sözleşmeden faturaya, her tutar hangi sahaya ait belli.",
      lede:
        "Sözleşme sahaya, hakediş sözleşmeye, fatura hakedişe bağlanır. Ödenen faturalar sözleşme ilerlemesini kendiliğinden günceller; TRY, USD, EUR, GBP ve CHF tutarlar birbirine karışmadan ayrı toplanır.",
      secondary: { label: "Kayıt zincirini görün", href: "#zincir" },
    },
    visual: {
      key: "payments",
      caption: "Hakedişler · sözleşme ilerleme özeti, dönemler ve para birimi başına toplamlar",
    },
    sheet: [
      { label: "Kayıtlar", value: "Sözleşme · Hakediş · Fatura" },
      { label: "Kod", value: "SZ-0001 · önek firma ayarlarından" },
      { label: "KDV", value: "%0 · %1 · %10 · %20 · özel oran" },
      { label: "Para birimi", value: "TRY · USD · EUR · GBP · CHF" },
    ],
    capabilities: [
      {
        title: "Sözleşme",
        body:
          "Sıralı kod, başlık, taraf, saha, tutar ve para birimi, başlangıç ve bitiş tarihi. Ekler en fazla 50 MB'tır. Sözleşme feshedildiğinde kayıt silinmez, durumu Fesih olur.",
        terms: ["SZ-0012", "Taslak", "Aktif", "Süresi doldu", "İptal", "Fesih", "Tamamlandı"],
      },
      {
        title: "Hakediş dönemi",
        body:
          "Her hakediş bir sözleşmeye bağlıdır ve dönem başlangıcı ile bitişini taşır. Hakediş ekranı sözleşmenin toplam hakedişini ve ödenen tutarını birlikte gösterir.",
        terms: ["Dönem başlangıcı", "Dönem bitişi", "Gönderildi", "Onaylandı", "Ödendi"],
      },
      {
        title: "Fatura",
        body:
          "Fatura no, bağlı olduğu hakediş ve KDV hariç tutar girilir; KDV oranı seçilir, KDV ve toplam kendiliğinden hesaplanır. Varsayılan KDV oranı firma ayarlarından gelir.",
        terms: ["Fatura no", "Tutar (KDV hariç)", "KDV oranı", "Kesildi", "Ödendi"],
      },
      {
        title: "Sözleşme ilerlemesi kendiliğinden",
        body:
          "İlerleme, sözleşmeye bağlı hakedişlerin ödenmiş faturalarının KDV dahil toplamının sözleşme tutarına oranıdır. Kimse ayrıca yüzde girmez; fatura “Ödendi” olduğunda ilerleme değişir.",
        terms: ["Sözleşme ilerlemesi", "Toplam hakediş", "Ödenen"],
      },
      {
        title: "Kur çevrimi yok, karışıklık da yok",
        body:
          "Her kayıt kendi para birimini taşır. Sözleşmeden farklı birimde kesilen fatura kaydedilir ama sözleşme ilerlemesine sayılmaz; form bunu kayıttan önce söyler. Listelerde toplamlar para birimi başına ayrı satırdır.",
        terms: ["Toplam (TRY)", "Toplam (EUR)", "₺ · $ · € · £ · CHF"],
      },
      {
        title: "Uyarılar ve bildirimler",
        body:
          "İhale aşamasındaki sahada sözleşme yoksa saha üzerinde uyarı çıkar. Bitişi yaklaşan sözleşme (eşik 1–180 gün), onay bekleyen hakediş ve ödenmemiş fatura için bildirim üretilir.",
        terms: ["Sözleşme gerekli", "Sözleşme bitiyor", "Onay bekleyen hakediş", "Ödenmemiş fatura"],
      },
    ],
    screens: {
      title: "Hakedişler, sözleşmeler, faturalar.",
      lede: "Üç liste, aynı arama ve sıralama düzeniyle. Her satır bağlı olduğu kayda tek tıkla açılır.",
      tabs: [
        {
          key: "payments",
          code: "HKD",
          label: "Hakedişler",
          summary: "Sözleşmeye bağlı dönemler; üstte sözleşme ilerlemesi ve ödenen tutar.",
          points: [
            "Arama hakediş ve sözleşme adına bakar; durum filtresiyle daraltılır.",
            "Gönderilen hakediş, onaylanana kadar “Onay bekleyen hakediş” bildirimi üretir.",
            "Hakedişe ek dosya eklenir, ekler önizlenir ve indirilir.",
          ],
        },
        {
          key: "contracts",
          code: "SZ",
          label: "Sözleşmeler",
          summary: "Kod, taraf, saha, bitiş tarihi, tutar ve durum.",
          points: [
            "Kod sırası önekle birlikte otomatik verilir (SZ-0001); önek değiştirilebilir.",
            "Saha detayından o sahaya ait sözleşmeler görülür ve yeni sözleşme açılır.",
            "Feshedilen ya da iptal edilen sözleşme geçerli sözleşme sayılmaz.",
          ],
        },
        {
          key: "invoices",
          code: "FTR",
          label: "Faturalar",
          summary: "Fatura no, saha, KDV ve tutar; para birimi başına toplam.",
          points: [
            "Fatura bir hakedişe bağlanır; fatura no ve sıfırdan büyük tutar zorunludur.",
            "KDV oranı %0, %1, %10, %20 ya da özel bir oran olabilir.",
            "Kesilmiş ama ödenmemiş fatura “Ödenmemiş fatura” bildirimi üretir.",
          ],
        },
      ],
    },
    special: {
      id: "zincir",
      eyebrow: "Kayıt zinciri",
      title: "Dört kayıt, tek zincir.",
      lede: "Her halka bir öncekine bağlıdır. Zinciri kuran bağlantı olduğu için hiçbir tutar sahasız ya da sözleşmesiz kalmaz.",
      blocks: [
        {
          type: "chain",
          title: "Saha → Sözleşme → Hakediş → Fatura",
          nodes: [
            {
              code: "SAH",
              label: "Saha",
              fields: ["Durum", "Bütçe", "Yüklenici"],
              states: ["İhale", "Şantiye", "Hakediş", "Fatura"],
              link: "Sahaya bağlanır",
            },
            {
              code: "SZ-0012",
              label: "Sözleşme",
              fields: ["Taraf", "Tutar · para birimi", "Başlangıç · bitiş", "Ekler"],
              states: ["Taslak", "Aktif", "Süresi doldu", "İptal", "Fesih", "Tamamlandı"],
              link: "Sözleşmeye bağlanır",
            },
            {
              code: "DÖNEM",
              label: "Hakediş",
              fields: ["Dönem başlangıcı", "Dönem bitişi", "Tutar", "Ekler"],
              states: ["Taslak", "Gönderildi", "Onaylandı", "Ödendi"],
              link: "Hakedişe bağlanır",
            },
            {
              code: "KDV",
              label: "Fatura",
              fields: ["Fatura no", "Tutar (KDV hariç)", "KDV oranı", "Toplam"],
              states: ["Taslak", "Kesildi", "Ödendi", "İptal"],
            },
          ],
        },
        {
          type: "list",
          title: "Kurallar",
          items: [
            { term: "İlerleme", body: "Ödenmiş faturaların KDV dahil toplamı ÷ sözleşme tutarı. Yalnızca sözleşmeyle aynı para birimindeki faturalar sayılır." },
            { term: "Firma profili", body: "Hakediş kullanmak için firma profilinde vergi no, yetkili, telefon ve adres dolu olmalıdır." },
            { term: "Varsayılanlar", body: "Varsayılan para birimi ve fatura KDV oranı firma ayarlarından önerilir; kayıtta değiştirilebilir." },
            { term: "Bütçe takibi", body: "Kurucu panelinde saha bütçesi keşif tutarıyla karşılaştırılır; aşım ve %90'ı geçen şantiyeler ayrıca listelenir." },
            { term: "Yetki", body: "Muhasebe rolü varsayılan olarak hakediş ve faturaları yönetir, sözleşmeleri görmez. Bu varsayılan değiştirilebilir." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Sözleşme bir sahaya bağlanır; ihaledeki sahada sözleşme aranır.", record: "Saha → SZ" },
      { feature: "kesif-ve-is-programi", dir: "in", what: "Keşif tutarı saha bütçesine karşı izlenir.", record: "Keşif → Bütçe" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Sözleşme bitişi, onay bekleyen hakediş ve ödenmemiş fatura bildirimi.", record: "Bildirim" },
      { feature: "yapay-zeka-asistani", dir: "out", what: "Asistan hakediş ve fatura durumunu sorulduğunda yorumlar.", record: "Soru-cevap" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Taşeron sözleşmeleri, hakediş dönemleri ve faturalar şantiye bazında, bağlı kayıtlar olarak." },
      { slug: "perakende-yatirimlari", why: "Her mağazanın sözleşmesi ve ödeme durumu; farklı para birimindeki tutarlar ayrı." },
    ],
    faqs: [
      {
        question: "Sözleşme ilerlemesi neye göre hesaplanıyor?",
        answer:
          "Sözleşmeye bağlı hakedişlerin, durumu “Ödendi” olan faturalarının KDV dahil toplamı sözleşme tutarına bölünür. Ayrıca yüzde girmeniz gerekmez; bir fatura ödendi olarak işaretlendiğinde ilerleme kendiliğinden değişir.",
      },
      {
        question: "Sözleşme EUR, fatura TRY kesilirse ne olur?",
        answer:
          "Fatura kaydedilir, ancak kur çevrimi yapılmadığı için sözleşme ilerlemesine sayılmaz. Fatura formu bu durumu kayıttan önce uyarı olarak gösterir. Listelerdeki toplamlar her para birimi için ayrı satırda kalır.",
      },
      {
        question: "Feshedilen sözleşmenin kayıtları silinir mi?",
        answer:
          "Hayır. “Feshet” sözleşmenin durumunu Fesih yapar; sözleşme, ekleri ve bağlı hakedişler yerinde kalır. Feshedilmiş ya da iptal edilmiş sözleşme geçerli sayılmadığı için, ihale aşamasındaki sahada sözleşme uyarısı yeniden görünür.",
      },
      {
        question: "Hakediş modülünü kullanmaya başlamak için ne gerekir?",
        answer:
          "Firma profilinde vergi numarası, yetkili kişi, telefon ve adresin dolu olması gerekir; eksikse uygulama sizi profile yönlendirir. Ardından sözleşmeleri açar, hakediş dönemlerini ve faturaları bunlara bağlarsınız.",
      },
    ],
    cta: {
      title: "Hakediş tablonuzu bağlı kayıtlara çevirelim.",
      lede: "Bir sözleşmenizi ve son hakedişlerinizi getirin; görüşmede sözleşmeden faturaya zinciri ve sözleşme ilerlemesini kendi verinizle gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ RPR */
  "saha-raporlari": {
    slug: "saha-raporlari",
    hero: {
      title: "Altı rapor tipi, her biri aynı düzende bir A4 belge.",
      lede:
        "Günlük şantiye raporundan malzeme sunumuna kadar her rapor bir şantiyeye bağlı formdur. Ekip sahada doldurur, açıklamalı fotoğraf ekler; önizleme PDF çıktısıyla aynıdır. Geçmiş raporlar şantiye, şehir ve hazırlayana göre aranır.",
      secondary: { label: "Rapor tiplerini görün", href: "#ekranlar" },
    },
    visual: {
      key: "report-daily",
      caption: "Raporlar · Günlük Şantiye Raporu A4 önizlemesi",
    },
    sheet: [
      { label: "Tipler", value: "GSR · İSG · NCR · YY · MS · KL" },
      { label: "Çıktı", value: "A4 önizleme · PDF olarak al" },
      { label: "Fotoğraf", value: "JPG · PNG · WEBP, açıklamalı" },
      { label: "Disiplin", value: "İnşaat · Mimari · Mekanik · Elektrik · Peyzaj · Diğer" },
    ],
    capabilities: [
      {
        title: "Günlük şantiye raporu",
        body:
          "Saha, tarih, hava durumu ve sıcaklık, yüklenici ve şantiye şefi. Günün özeti: bugün yapılan işler, gelen malzeme ve ekipman, sorunlar ve gecikmeler, iş güvenliği, yarın planlanan işler.",
        terms: ["Hava durumu", "Sıcaklık (°C)", "Bugün yapılan işler", "Yarın planlanan işler"],
      },
      {
        title: "İsimli yoklama ve ekip sayıları",
        body:
          "Sahaya bağlı personel listeden eklenir: Çalıştı, Yarım gün ya da Gelmedi; normal saat ve fazla mesai. Günlük 11 saati aşan giriş uyarılır. İsim girilmeyen taşeron ekipleri için meslek ve kişi sayısı ayrı yazılır.",
        terms: ["Çalıştı", "Yarım gün", "Gelmedi", "Ekip / meslek", "İş Kanunu md. 63"],
      },
      {
        title: "Yoklama puantaja işlenir",
        body:
          "Kaydederken “yoklamayı puantaja işle” açıksa çalışma bilgisi puantaja yazılır; o gün izinli olan personelin kaydı değişmez ve hangi kişilerin atlandığı söylenir.",
        terms: ["Puantaja 12 kişi işlendi", "İzinli olduğu için işlenmeyen"],
      },
      {
        title: "İş planından getir",
        body:
          "Rapor gününe denk gelen ve devam eden iş programı kalemleri tek tıkla “Bugün yapılan işler” alanına eklenir; sonra düzenlenir.",
        terms: ["İş planından getir", "Devam eden iş kalemleri"],
      },
      {
        title: "Doküman no, revizyon, imza alanları",
        body:
          "İSG, NCR, yapım yöntemi, malzeme sunumu ve kontrol listesinde doküman no ve revizyon tutulur; hazırlayan, kontrol eden ve onaylayan alanları belgeye basılır. Taslak belgede “TASLAK” ibaresi görünür.",
        terms: ["Doküman no", "Rev.", "Hazırlayan", "Kontrol eden", "Onaylayan"],
      },
      {
        title: "Geçmiş raporlar",
        body:
          "Kaydedilen raporlar rapor tarihi, şantiye, hazırlayan, fotoğraf sayısı ve son değişiklikle listelenir; türe ve şantiyeye göre süzülür. Raporu yazan kişi ile Kurucu, Yönetici ve Bölge Müdürü düzenleyip silebilir.",
        terms: ["Rapor tarihi", "Şantiye", "Hazırlayan", "Tüm rapor türleri"],
      },
    ],
    screens: {
      title: "Altı belge, altı farklı iş.",
      lede: "Her tip kendi alanlarıyla gelir; ortak olan antet, bilgi ızgarası, fotoğraflar ve imza alanlarıdır. Örnek doküman numaraları formdaki öneriden alınmıştır.",
      tabs: [
        {
          key: "report-daily",
          code: "GSR",
          label: "Günlük şantiye raporu",
          summary: "Şantiye şefinin yöneticilere günlük özeti. Doküman no taşımaz; tarih ve şantiyeyle tanınır.",
          points: [
            "Sahadaki personel: isimli yoklama ve ekip sayıları, toplam kişi.",
            "Günün özeti: yapılan işler, gelen malzeme, sorunlar ve gecikmeler.",
            "İş güvenliği notu ve yarın planlanan işler.",
            "Açıklamalı fotoğraflar raporun sonuna, imza alanlarıyla birlikte.",
          ],
        },
        {
          key: "report-hse",
          code: "İSG",
          label: "İSG raporu",
          summary: "Günlük, haftalık, aylık ya da olay sonrası saha denetimi. Örnek no: İSG-2026-014.",
          points: [
            "Göstergeler: çalışan sayısı, adam-saat, iş kazası, ramak kala, kayıp iş günü, eğitim saati.",
            "13 maddelik saha kontrol listesi: KKD, yüksekte çalışma, iskele, geçici elektrik, kazı…",
            "Olay kayıtları: iş kazası, ramak kala, tehlikeli durum, tehlikeli davranış.",
            "Uygunsuzluk, risk seviyesi, düzeltici faaliyet, sorumlu ve termin.",
          ],
        },
        {
          key: "report-ncr",
          code: "NCR",
          label: "Uygunsuzluk (NCR)",
          summary: "Malzeme, işçilik ya da projeye aykırı imalatın kaydı ve kapanışı. Örnek no: NCR-2026-007.",
          points: [
            "Kategori: malzeme, işçilik, tasarım, dokümantasyon, İSG / çevre; önem: minör, majör, kritik.",
            "İlgili proje, şartname ya da çizim referansı ve olması gereken hüküm.",
            "Karar: yeniden yapım, onarım, olduğu gibi kabul, ret / söküm ve değişim.",
            "Durum: Açık, Düzeltme sürüyor, Doğrulama bekliyor, Kapandı.",
          ],
        },
        {
          key: "report-method",
          code: "YY",
          label: "Yapım yöntemi",
          summary: "Bir imalatın nasıl yapılacağını anlatan onay dokümanı (method statement). Örnek no: YY-ARC-003.",
          points: [
            "Amaç ve kapsam, referans dokümanlar (proje, şartname, üretici talimatı, TS EN).",
            "Sorumluluklar, ekipman ve makineler, malzemeler.",
            "Uygulama adımları ve her adımın kontrol / kabul kriteri.",
            "Riskler ve önlemler; muayene ve test planı, çevre, acil durum.",
          ],
        },
        {
          key: "report-material",
          code: "MS",
          label: "Malzeme sunumu",
          summary: "Malzemenin işveren ya da müşavir onayına sunulması (submittal). Örnek no: MS-ARC-012.",
          points: [
            "Ürün, üretici, marka / model, tedarikçi, menşei, miktar ve teslim süresi.",
            "Şartname değeri ile önerilen ürün: Uygun, Eşdeğer, Sapma var.",
            "Ekler: teknik föy, SDS, test raporu, sertifika, numune, garanti, montaj talimatı.",
            "Görüş: Onaylandı (A), Notlu onay (B), Revize edip yeniden sunun (C), Reddedildi (D).",
          ],
        },
        {
          key: "report-checklist",
          code: "KL",
          label: "Kontrol listesi",
          summary: "Hazır maddelerden seçin ya da kendi maddenizi yazın. Örnek no: KL-2026-021.",
          points: [
            "Aşama: imalat öncesi, imalat sırası, teslim öncesi, periyodik.",
            "Her madde Uygun, Uygun değil ya da Kapsam dışı; boş kalanlar topluca işaretlenir.",
            "Özet satırı: uygun, uygun değil, kapsam dışı ve işaretlenmemiş madde sayısı.",
            "Fotoğraflar, genel not ve sonuç.",
          ],
        },
      ],
    },
    special: {
      id: "kapsam",
      eyebrow: "Rapordan sonra",
      title: "Rapor kaydedildiğinde iş bitmez, başka kayıtlara akar.",
      lede:
        "Günlük rapor yalnızca bir belge değildir: yoklaması puantaja, varlığı ise panodaki rapor kapsamına yansır. Hangi şantiyenin hangi gün rapor girmediğini aramanız gerekmez.",
      blocks: [
        {
          type: "coverage",
          title: "Günlük rapor kapsamı",
          caption:
            "Panoda, şantiye aşamasındaki sahalarda son günlerin hangilerinde rapor girildiği. En az raporlanan şantiye üstte.",
        },
        {
          type: "flow",
          title: "Yoklamadan puantaja",
          steps: [
            { label: "Yoklama", code: "GSR", tone: "brand", body: "Şantiye şefi sahadaki personeli Çalıştı, Yarım gün ya da Gelmedi olarak işaretler." },
            { label: "Kaydet", code: "→", tone: "muted", body: "“Yoklamayı puantaja işle” açıksa kayıt sırasında puantaja yazılır." },
            { label: "Puantaj", code: "X · Y · D", tone: "ok", body: "İzinli günler korunur; elle girilen kayıtlar değişmez." },
            { label: "Raporlardan aktar", code: "İK", tone: "muted", body: "İK, ay içindeki raporlardaki yoklamayı puantajın boş günlerine topluca aktarabilir." },
          ],
        },
        {
          type: "codes",
          title: "Kontrol listesi madde kütüphanesi",
          codes: [
            { code: "GEN", label: "Genel / saha hazırlığı", note: "Saha çevirmesi, onaylı projeler, aplikasyon" },
            { code: "İNŞ", label: "İnşaat / kaba yapı", note: "Kalıp, donatı, beton numunesi, kür" },
            { code: "MİM", label: "Mimari / ince işler", note: "Sıva, şap, ıslak hacim, asma tavan" },
            { code: "MEK", label: "Mekanik", note: "Basınç testi, kanallar, sprinkler, balanslama" },
            { code: "ELK", label: "Elektrik", note: "İzolasyon, topraklama, kaçak akım, acil aydınlatma" },
            { code: "PEY", label: "Peyzaj / altyapı", note: "Drenaj, rögar, kaplama kotları" },
            { code: "İSG", label: "İSG", note: "KKD, kenar koruma, iskele etiketi" },
            { code: "TES", label: "Teslim ve kapanış", note: "Punch list, as-built, kılavuzlar, anahtarlar" },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Rapor bir şantiye seçilerek yazılır; adres ve yüklenici saha kartından gelir.", record: "Şantiye" },
      { feature: "kesif-ve-is-programi", dir: "in", what: "“İş planından getir” günün iş kalemlerini rapora ekler.", record: "İP → GSR" },
      { feature: "insan-kaynaklari", dir: "out", what: "İsimli yoklama puantaja işlenir; izinli günler korunur.", record: "Yoklama → Puantaj" },
      { feature: "saha-ve-harita", dir: "out", what: "Panodaki günlük rapor kapsamı raporlardan hesaplanır.", record: "Rapor kapsamı" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Her şantiyeden aynı formatta günlük rapor; yoklama puantaja, kapsam panoya." },
      { slug: "mimarlik-ofisleri", why: "Malzeme sunumu A–D onay koduyla, uygulama denetimi kontrol listesi ve NCR ile." },
      { slug: "muhendislik-ve-mep", why: "Yapım yöntemi, test ve devreye alma kontrolleri, İSG denetimi ve NCR kapanışı." },
    ],
    faqs: [
      {
        question: "Bir raporu kimler düzenleyip silebilir?",
        answer:
          "Raporu yazan kişi ile Kurucu, Yönetici ve Bölge Müdürü rolündeki kullanıcılar. Rapor silindiğinde fotoğrafları da silinir; uygulama bunu silmeden önce sorar.",
      },
      {
        question: "Yoklamadaki isimleri herkes görebilir mi?",
        answer:
          "Hayır. Rapordaki isimli yoklamayı görmek ve değiştirmek için puantaj görüntüleme yetkisi gerekir. Yetkisi olmayan kullanıcı raporda kaç kişilik yoklama olduğunu görür, isimleri görmez.",
      },
      {
        question: "Fotoğraflar rapora nasıl eklenir?",
        answer:
          "JPG, PNG ya da WEBP fotoğrafları seçer ya da forma sürüklersiniz; her fotoğrafa açıklama yazılabilir. Fotoğraflar yüklenirken boyutları küçültülür ve belgenin sonunda açıklamalarıyla yer alır.",
      },
      {
        question: "Günlük raporda neden doküman numarası yok?",
        answer:
          "Günlük şantiye raporu tarih ve şantiyeyle tanınan bir gün özetidir. Onaya giden ya da revizyon alan belgeler, yani İSG, NCR, yapım yöntemi, malzeme sunumu ve kontrol listesi, doküman no ve revizyon alanı taşır.",
      },
    ],
    cta: {
      title: "Rapor şablonlarınızı birlikte gözden geçirelim.",
      lede: "Bugün kullandığınız günlük rapor ya da submittal formunu getirin; görüşmede aynı içeriğin Koordine'de nasıl bir A4 belgeye dönüştüğünü gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ TLP */
  "talepler-ve-onaylar": {
    slug: "talepler-ve-onaylar",
    hero: {
      title: "Sahadan gelen her talep kodlu, sahibi ve önceliği belli.",
      lede:
        "Tadilat ve bakım talepleri TT-0042 gibi sıralı bir kodla açılır; saha, atanan kişi ve öncelikle izlenir. Projelerde mimari, mekanik ve elektrik onayı, ilgili disiplinin yetkilisi tarafından sahanın üzerinde verilir.",
      secondary: { label: "Disiplin onaylarını görün", href: "#onaylar" },
    },
    visual: {
      key: "tickets-both",
      caption: "Tadilat talepleri panosu ve proje onayları",
    },
    sheet: [
      { label: "Kod", value: "TT-0001 · önek firma ayarlarından" },
      { label: "Durum", value: "Açık · Devam ediyor · Çözüldü · Kapalı" },
      { label: "Öncelik", value: "Düşük · Orta · Yüksek" },
      { label: "Onaylar", value: "Mimari · Mekanik · Elektrik" },
    ],
    capabilities: [
      {
        title: "Kodlu tadilat talebi",
        body:
          "Başlık, saha, atanan kişi, öncelik, açıklama ve durum. Kod sıralı verilir (TT-0001); öneki firma ayarlarından kendi düzeninize göre değiştirirsiniz. Oluşturan kişi ve oluşturulma zamanı talepte görünür.",
        terms: ["TT-0042", "Atanan", "Öncelik", "Oluşturan"],
      },
      {
        title: "Ekler",
        body: "Talebe fotoğraf ve dosya eklenir; her dosya en fazla 50 MB'tır. Ekler talep içinde önizlenir ve indirilir.",
        terms: ["Ekler", "Önizle", "İndir", "En fazla 50 MB"],
      },
      {
        title: "Arama ve süzme",
        body:
          "Talepler kod, saha, başlık ya da atanan kişiye göre aranır; durum ve öncelikle süzülür. Tablodaki arama, filtre ve sıralama siz başka sayfaya geçip döndüğünüzde korunur.",
        terms: ["Tüm durumlar", "Tüm öncelikler", "Tablo hafızası"],
      },
      {
        title: "Atanan ve öncelik bildirimi",
        body:
          "Size atanmış açık ya da devam eden talepler ve açık durumdaki yüksek öncelikli talepler bildirim üretir. Kullanıcı bu bildirimleri kapatabilir; firma isterse zorunlu kılar.",
        terms: ["Size atanan talep", "Yüksek öncelikli talep"],
      },
      {
        title: "Taleplerin yaşı ve eğilimi",
        body:
          "Panoda açık ve devam eden talepler açıldığından bu yana geçen güne göre gruplanır; ortalama gün, size atananlar ve son 12 haftada açılan ile çözülen talepler gösterilir.",
        terms: ["0–7 gün", "8–30 gün", "30+ gün", "Net değişim"],
      },
      {
        title: "Disiplin onayları",
        body:
          "Her sahanın mimari, mekanik ve elektrik onayı ayrı ayrı verilir; onaylayan kişi ve zamanı kayda geçer. Eksik onaylı sahalar “Onay Bekleyenler” listesinde, açılışı en yakın olan üstte durur.",
        terms: ["Mimari", "Mekanik", "Elektrik", "Onaylayan", "Onay Bekleyenler"],
      },
    ],
    screens: {
      title: "Talep panosu ve proje onayları.",
      lede: "Talepler işin kimde olduğunu, onaylar sahanın hangi disiplinden geçtiğini gösterir. İkisi de aynı saha kaydına bağlıdır.",
      tabs: [
        {
          key: "tickets-board",
          code: "TT",
          label: "Tadilat talepleri",
          summary: "Durum sütunlarında kodlu kartlar; öncelik, saha ve atanan kişiyle.",
          points: [
            "Yeni talep talepler sayfasından ya da sohbetten, asistanla açılır.",
            "Öncelik Düşük, Orta ya da Yüksek; yüksek öncelikli açık talepler bildirim üretir.",
            "Talep detayında açıklama, ekler, oluşturan ve oluşturulma tarihi.",
          ],
        },
        {
          key: "approvals",
          code: "ONY",
          label: "Proje onayları",
          summary: "Açılmamış sahalarda henüz verilmemiş mimari, mekanik ve elektrik onayları.",
          points: [
            "Her disiplin bir anahtar: açıldığında onaylayanın adı ve zamanı damgalanır.",
            "“Tüm disiplin onayları tamamlandı” olduğunda saha listeden düşer.",
            "Saha listesi onay sayısına göre de sıralanabilir.",
          ],
        },
      ],
    },
    special: {
      id: "onaylar",
      eyebrow: "Kim neyi onaylar",
      title: "Onay, işi bilen disiplinden gelir.",
      lede:
        "Disiplin onayı bir rol işidir: mimar mimari onayı, makine mühendisi mekanik onayı verir. Yönetim rolleri gerektiğinde her üçünü de verebilir. Onay vermek için ayrıca onaylar modülünde düzenleme yetkisi gerekir.",
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
            { label: "Yönetici · Bölge Müdürü", cells: ["yes", "yes", "yes"] },
            { label: "Kurucu", cells: ["yes", "yes", "yes"] },
            { label: "Özel rol", note: "Firmanın tanımladığı roller", cells: ["no", "no", "no"] },
          ],
          note: "“Onay Bekleyenler” listesini Kurucu, Yönetici ve Bölge Müdürü görür.",
        },
        {
          type: "flow",
          title: "Tadilat talebinin durumu",
          note: "Durumu, talebi düzenleme yetkisi olan kullanıcı değiştirir; panodaki eğilim çözülme tarihi olarak son güncellemeyi alır.",
          steps: [
            { label: "Açık", tone: "brand", body: "Talep açıldı, kodunu aldı; atanan kişiye bildirim gider." },
            { label: "Devam ediyor", tone: "warn", body: "Sahada iş sürüyor; talep yaşı panoda saymaya devam eder." },
            { label: "Çözüldü", tone: "ok", body: "İş tamamlandı; 12 haftalık eğilimde çözülen olarak sayılır." },
            { label: "Kapalı", tone: "muted", body: "Talep kapatıldı ve açık talepler listesinden çıktı." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Talep ve disiplin onayları bir sahaya aittir.", record: "Saha → TT" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Atanan ve yüksek öncelikli talep bildirimi; onay yetkisi rolden gelir.", record: "Bildirim · Rol" },
      { feature: "yapay-zeka-asistani", dir: "in", what: "Asistan sohbetten tadilat talebi açar; önce önizleme gelir.", record: "Yeni talep" },
    ],
    solutions: [
      { slug: "perakende-yatirimlari", why: "Mağazalardan gelen tadilat talepleri kodlu; öncelik ve atanan kişiyle bölge genelinde izlenir." },
      { slug: "mimarlik-ofisleri", why: "Mimari onay sahanın üzerinde; onaylayan kişi ve zaman kayıtlı." },
      { slug: "muhendislik-ve-mep", why: "Mekanik ve elektrik onayları ayrı; her biri kendi disiplin mühendisinden." },
    ],
    faqs: [
      {
        question: "Disiplin onayını kim verebilir?",
        answer:
          "Mimari onayı Mimar, mekanik onayı Makine Mühendisi, elektrik onayı Elektrik Mühendisi verir. Kurucu, Yönetici ve Bölge Müdürü üç disiplinin onayını da verebilir. Firmanın tanımladığı özel roller disiplin onayı veremez.",
      },
      {
        question: "Onaylayan kişi ve tarih kayıtta kalıyor mu?",
        answer:
          "Evet. Bir disiplin onaylandığında onaylayanın adı ve onay zamanı sahanın kaydına yazılır ve onay anahtarının yanında görünür. Onay geri alınırsa bu bilgi kaldırılır.",
      },
      {
        question: "Talebe fotoğraf ve belge ekleyebilir miyiz?",
        answer:
          "Evet. Talep oluştururken ya da sonradan dosya eklenir; her dosya en fazla 50 MB olabilir. Ekler talep içinde önizlenir, indirilir ve gerektiğinde kaldırılır.",
      },
      {
        question: "Yüksek öncelikli bir talep açıldığında kim haberdar olur?",
        answer:
          "Talep atandığında atanan kişiye “Size atanan talep” bildirimi gider. Açık durumdaki yüksek öncelikli talepler ayrıca “Yüksek öncelikli talep” bildirimiyle görünür. Kullanıcılar bu bildirimleri ayarlardan yönetir; firma zorunlu kılabilir.",
      },
    ],
    cta: {
      title: "Talep ve onay düzeninizi birlikte kuralım.",
      lede: "Bugün tadilat taleplerini nasıl topladığınızı ve kimin neyi onayladığını anlatın; görüşmede aynı düzeni kodlu talepler ve disiplin onaylarıyla gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ İK */
  "insan-kaynaklari": {
    slug: "insan-kaynaklari",
    hero: {
      title: "Saha ekibinin puantajı, izni ve belgeleri aynı kartta.",
      lede:
        "Ofis, maaşlı, yevmiyeli ve taşeron personelini tek listede tutun. Günlük rapordaki yoklama puantaja işlenir, izin yönetici ve İK onayından geçip puantaja yazılır, sertifikanın süresi yaklaşınca bildirim gider.",
      secondary: { label: "İzin ve puantaj akışı", href: "#izin-akisi" },
    },
    visual: {
      key: "hr-both",
      caption: "Puantaj cetveli ve süresi yaklaşan personel belgeleri",
    },
    sheet: [
      { label: "Ekranlar", value: "Personel · Belgeler · Puantaj · İzinler · Talep kutusu · Duyurular · İK raporları" },
      { label: "Çalışma tipi", value: "Ofis · Maaşlı · Günlük (yevmiyeli) · Taşeron" },
      { label: "Puantaj kodu", value: "X · Y · İ · M · R · Ü · D · H · RT" },
      { label: "Excel", value: "Puantaj ve İK raporu dışa aktarım" },
    ],
    capabilities: [
      {
        title: "Personel kartı",
        body:
          "Sicil no, çalışma tipi, taşeron firma, departman, unvan, görev yeri (saha), işe giriş ve çıkış, izin onaylayan yönetici. Kart bir uygulama kullanıcısına bağlanırsa kişi kendi kartını, belgelerini ve puantajını görür.",
        terms: ["Sicil no", "Görev yeri", "Taşeron firma", "İzin onaylayan yönetici"],
      },
      {
        title: "Özlük bilgileri ayrı kilitte",
        body:
          "T.C. kimlik no, doğum tarihi, adres ve acil durum kişisi gibi hassas bilgiler ayrı bir bölümde tutulur; yalnızca özlük yetkisi olanlar ve personelin kendisi görür. KVKK aydınlatma tebliğ tarihi kartta saklanır.",
        terms: ["Özlük bilgileri", "Hassas kişisel veri", "KVKK aydınlatma tebliği"],
      },
      {
        title: "Belgeler ve sertifikalar",
        body:
          "İSG eğitimi, sağlık muayenesi, MYK, yüksekte çalışma, operatör belgesi, sürücü belgesi / SRC / psikoteknik, ilk yardım, acil durum ekibi. Personelin yüklediği belge İK onaylayana kadar “onay bekliyor” görünür.",
        terms: ["Geçerli", "Yakında bitiyor", "Süresi geçti", "Süresiz", "Onay bekliyor"],
      },
      {
        title: "Aylık puantaj",
        body:
          "Hızlı girişle hücre hücre işaretleme, boş günleri doldurma, raporlardan aktarma ve fazla mesai. Günlük 11 saati ve yıllık 270 saati aşan çalışma işaretlenir. Ay kapatıldığında puantaj kilitlenir.",
        terms: ["Boş günleri doldur", "Raporlardan aktar", "Ayı kapat", "FM"],
      },
      {
        title: "İzinler",
        body:
          "Yıllık, mazeret, rapor ve ücretsiz izin. Yıllık izin hakkı hizmet süresinden hesaplanır; Pazar ve sabit resmî tatiller izinden düşülmez. Talep yöneticiye, sonra İK'ya gider; onaylanan izin puantaja yazılır.",
        terms: ["Hak edilen", "Kullanılan", "Onay bekleyen", "Kalan", "İzin takvimi"],
      },
      {
        title: "Talep kutusu ve duyurular",
        body:
          "Avans, belge, malzeme / ekipman ve eğitim talepleri İK'ya iletilir. Duyurular hedef kitle, yayın ve kalkış zamanıyla yayınlanır; istenirse “Okudum, anladım” onayı alınır ve okumayanlar listelenir.",
        terms: ["Avans", "Belge", "Sabitlendi", "Okudum, anladım"],
      },
    ],
    screens: {
      title: "Puantaj ve belge takibi.",
      lede: "Puantaj ayın her gününü kişi kişi gösterir; belge listesi tüm personelin sertifikalarını bitiş tarihine göre sıralar.",
      tabs: [
        {
          key: "timesheet",
          code: "PNT",
          label: "Puantaj",
          summary: "Aylık devam cetveli: çalışılan günler, izin, rapor ve fazla mesai.",
          points: [
            "Boş günleri doldur: Pazar “Hafta tatili”, diğer günler günlük çalışma saatiyle “Çalıştı”.",
            "Hücreye tıklayınca ayrıntı penceresi: normal saat, fazla mesai, çalıştığı saha, not.",
            "Puantaj Excel olarak alınır: çalışılan gün, saat, fazla mesai, izin, rapor, devamsızlık.",
            "Kapatılan aya puantaj yazılamaz; kilidi yalnızca “puantaj sil” yetkisi olan açar.",
          ],
        },
        {
          key: "certificates",
          code: "BLG",
          label: "Belgeler",
          summary: "Tüm personelin İSG, sağlık, MYK ve diğer belgeleri; süresi geçen ve 30 gün içinde biten.",
          points: [
            "Süzme: geçerlilik, belge türü, onay durumu; ayrılanlar isteğe bağlı dahil.",
            "Belge süresi uyarısı için eşik firma ayarlarında 1–180 gün.",
            "Sağlık raporu dosyasını yalnızca özlük yetkilisi ve personelin kendisi açar.",
            "İK raporlarında belge uyumu türe göre özetlenir.",
          ],
        },
      ],
    },
    special: {
      id: "izin-akisi",
      eyebrow: "İzin ve puantaj",
      title: "İzin talebinden puantaj hücresine.",
      lede:
        "İzin onaylandığında günler puantaja kendiliğinden yazılır; o günlerdeki mevcut kayıtlar izinle değiştirilir. Uygulama, İş Kanunu'ndaki temel sınırları giriş sırasında hatırlatır.",
      blocks: [
        {
          type: "flow",
          title: "İzin talebinin yolu",
          note: "Personelin izin onaylayan yöneticisi yoksa talep doğrudan İK onayına gider.",
          steps: [
            { label: "Talep", tone: "muted", body: "Tür ve tarihler seçilir; düşülecek gün ve kalan hak hesaplanır, çakışan izin uyarılır." },
            { label: "Yönetici onayında", tone: "warn", body: "Kartta tanımlı yönetici onaylar ya da gerekçeyle reddeder." },
            { label: "İK onayında", tone: "warn", body: "İK son kararı verir; ret gerekçesi zorunludur." },
            { label: "Onaylandı", tone: "ok", body: "Günler puantaja izin koduyla yazılır; personele sonuç bildirimi gider." },
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
        {
          type: "list",
          title: "Giriş sırasında hatırlatılan sınırlar",
          items: [
            { term: "md. 63", body: "Günlük çalışma, fazla mesai dahil 11 saati aşamaz." },
            { term: "md. 41", body: "Yıllık fazla mesai 270 saati aşınca kart ve puantaj uyarır." },
            { term: "md. 53", body: "Yıllık izin hakkı hizmet süresinden hesaplanır; 18 yaş altı ve 50 yaş üstü için en az 20 gün." },
            { term: "Ek md. 2", body: "Evlenme 3 gün, eşin doğumu 5 gün, yakının ölümü 3 gün ücretli mazeret izni." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-raporlari", dir: "in", what: "Günlük rapordaki isimli yoklama puantaja işlenir.", record: "Yoklama → Puantaj" },
      { feature: "saha-ve-harita", dir: "in", what: "Personelin görev yeri bir sahadır; puantaj özeti sahaya göre.", record: "Görev yeri" },
      { feature: "envanter-ve-zimmet", dir: "in", what: "Personel kartında kişiye zimmetli ekipman ve araçlar görünür.", record: "Zimmetler" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Belge süresi, izin onayı, duyuru ve talep bildirimleri.", record: "Bildirim" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Taşeron dahil saha personelinin puantajı günlük rapordan beslenir." },
      { slug: "muhendislik-ve-mep", why: "Yüksekte çalışma, operatör ve İSG belgelerinin bitişi personel bazında izlenir." },
    ],
    faqs: [
      {
        question: "Taşeron personelinin izni de takip edilir mi?",
        answer:
          "Taşeron personeli için de izin kaydı açılabilir; ancak yıllık izin alt işverenin yükümlülüğünde olduğundan bu kayıt yalnızca puantaj ve takip içindir. Uygulama bunu izin formunda ayrıca belirtir.",
      },
      {
        question: "Kapatılan aya sonradan değişiklik yapılabilir mi?",
        answer:
          "Kapatılan aya puantaj yazılamaz, değiştirilemez; o aya düşen izinler onaylanamaz ya da iptal edilemez. Ayın kilidini yalnızca puantaj silme yetkisi olan kullanıcı açabilir; kimin hangi tarihte kapattığı ekranda yazar.",
      },
      {
        question: "Personel kendi puantajını ve belgelerini görebilir mi?",
        answer:
          "Personel kartı bir uygulama kullanıcısına bağlanırsa kişi kendi kartını, belgelerini ve “Puantajım” ekranını görür. Kendi belgesini yükleyebilir; belge İK onaylayana kadar onay bekliyor olarak görünür.",
      },
      {
        question: "Cumartesi çalışan firmalarda izin günü nasıl hesaplanır?",
        answer:
          "Firma ayarlarındaki “Cumartesi iş günü” seçeneği açıksa Cumartesi izinden düşülür ve izin onaylanınca puantaja izin olarak yazılır. Kapalıysa beş günlük çalışma esas alınır ve Cumartesi izin gününe sayılmaz.",
      },
    ],
    cta: {
      title: "Puantaj ve izin düzeninizi birlikte kuralım.",
      lede: "Bugünkü puantaj tablonuzu ve izin onay sürecinizi anlatın; görüşmede yoklamadan puantaja, izinden bordro öncesi özete akışı gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ ENV */
  "envanter-ve-zimmet": {
    slug: "envanter-ve-zimmet",
    hero: {
      title: "Kırıcı kimde, aracın muayenesi ne zaman: tek listede.",
      lede:
        "Ekipman, araç, el aleti ve elektroniği demirbaş numarasıyla kaydedin. Kime zimmetlendiğini, hangi şantiyede kullanıldığını, ne zaman geri geleceğini ve hangi durumda teslim alındığını geçmişiyle saklayın.",
      secondary: { label: "Zimmet döngüsünü görün", href: "#zimmet" },
    },
    visual: {
      key: "inventory",
      caption: "Envanter · demirbaş no, kategori, durum, zimmetli kişi ve teslim uyarıları",
    },
    sheet: [
      { label: "Kategori", value: "Ekipman · Araç · El aleti · Elektronik · İş güvenliği · Diğer" },
      { label: "Durum", value: "Boşta · Zimmette · Bakımda · Hurda" },
      { label: "Teslimde", value: "Sağlam · Hasarlı · Kayıp" },
      { label: "Araç belgesi", value: "Trafik sigortası · Kasko · Muayene" },
    ],
    capabilities: [
      {
        title: "Envanter kartı",
        body:
          "Demirbaş no, ad, kategori, marka / model, seri no, alış tarihi ve not. Araçlarda plaka, kilometre ve üç belgenin bitiş tarihi ayrıca tutulur.",
        terms: ["DMR-0012", "Marka / model", "Seri no", "Plaka", "Kilometre"],
      },
      {
        title: "Zimmetle",
        body:
          "Kişiyi listeden seçin ya da uygulamada hesabı olmayan kişinin adını yazın (ör. taşeron ustası). Kullanılacağı şantiye, zimmet tarihi, planlanan teslim ve not girilir.",
        terms: ["Listede yok (adını yaz)", "Kullanılacağı şantiye", "Planlanan teslim"],
      },
      {
        title: "Teslim al",
        body:
          "Teslim tarihi ve eşyanın durumu girilir: Sağlam, Hasarlı ya da Kayıp. İsterseniz eşyayı aynı adımda bakıma alırsınız. Kayıp eşya envanterden düşmez; gerekirse “Hurdaya ayrıldı” yapılır.",
        terms: ["Sağlam", "Hasarlı", "Kayıp", "Eşyayı bakıma al"],
      },
      {
        title: "Zimmet geçmişi",
        body:
          "Her eşyanın kime, ne zaman zimmetlendiği, kimin zimmetlediği, kimin teslim aldığı ve teslimdeki durumu notlarıyla birlikte saklanır.",
        terms: ["Zimmetleyen", "Teslim alan", "Teslim notu"],
      },
      {
        title: "Gecikme ve belge uyarıları",
        body:
          "Planlanan teslimi geçen zimmet “Teslim gecikti” olarak işaretlenir. Trafik sigortası, kasko ya da muayenenin bitişi yaklaşan araç için araç sorumlularına ve aracın zimmetli olduğu kişiye bildirim gider.",
        terms: ["Teslim gecikti · 3 gün geçti", "Muayene · 18 gün kaldı", "Araç belgesi bitiyor"],
      },
      {
        title: "Herkes kendi zimmetini görür",
        body:
          "“Zimmetimdekiler” ekranında her kullanıcı üzerine zimmetli eşyayı görür. Personel kartında kişiye zimmetli ekipman listelenir; panoda envanterin kullanım oranı yer alır.",
        terms: ["Zimmetimdekiler", "Zimmetler", "Kullanım oranı"],
      },
    ],
    screens: {
      title: "Envanter listesi ve zimmet geçmişi.",
      lede: "Liste bugünü, geçmiş penceresi eşyanın bütün hikâyesini gösterir.",
      tabs: [
        {
          key: "inventory",
          code: "ENV",
          label: "Envanter",
          summary: "Demirbaş, kategori, durum, zimmetli kişi ve kullanıldığı şantiye.",
          points: [
            "Arama ad, demirbaş no, seri no ve kişiye bakar.",
            "Kategori ve duruma göre süzülür; zimmetli kişiye göre sıralanır.",
            "Satırdan doğrudan “Zimmetle” ya da “Teslim al”.",
            "Bakımdaki eşya zimmetlenemez; zimmetli eşya önce teslim alınır.",
          ],
        },
        {
          key: "assignment-history",
          code: "GÇM",
          label: "Zimmet geçmişi",
          summary: "Bir eşyanın tüm zimmetleri: kişi, şantiye, tarihler, teslimdeki durum.",
          points: [
            "Her satırda zimmetleyen ve teslim alan kişi.",
            "Zimmet notu ve teslim notu ayrı tutulur.",
            "Eşya silinirse zimmet geçmişi de silinir; uygulama bunu önceden sorar.",
          ],
        },
      ],
    },
    special: {
      id: "zimmet",
      eyebrow: "Zimmet döngüsü",
      title: "Eşyanın dört hâli.",
      lede:
        "Durum, eşyanın kimde ya da nerede olduğunu söyler. Zimmet ve teslim adımları durumu kendiliğinden değiştirir; elle tutulan ayrı bir liste gerekmez.",
      blocks: [
        {
          type: "flow",
          title: "Durumlar",
          steps: [
            { label: "Boşta", tone: "ok", body: "Depoda ya da kullanıma hazır; zimmetlenebilir." },
            { label: "Zimmette", tone: "brand", body: "Bir kişide, isteğe bağlı bir şantiyede; planlanan teslim tarihiyle." },
            { label: "Bakımda", tone: "warn", body: "Teslimde bakıma alındı ya da düzenlemeyle bakıma çekildi; zimmetlenemez." },
            { label: "Hurda", tone: "muted", body: "Hurdaya ayrıldı; kullanım oranına sayılmaz, geçmişi kalır." },
          ],
          note: "Teslim alınan sağlam eşya yeniden Boşta olur; hasarlı eşya aynı adımda bakıma alınabilir.",
        },
        {
          type: "list",
          title: "Araç belgeleri",
          items: [
            { term: "Trafik sigortası", body: "Bitiş tarihi araç kartında; yaklaşınca bildirim." },
            { term: "Kasko", body: "Bitiş tarihi araç kartında; yaklaşınca bildirim." },
            { term: "Muayene", body: "Bitiş tarihi araç kartında; listede kalan gün olarak görünür." },
            { term: "Eşik", body: "Araç belgesi uyarısının kaç gün önce gideceği firma ayarlarında 1–180 gün arası seçilir." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Zimmet verilirken eşyanın kullanılacağı şantiye seçilir.", record: "Şantiye" },
      { feature: "insan-kaynaklari", dir: "out", what: "Personel kartında kişiye zimmetli ekipman ve araçlar listelenir.", record: "Zimmetler" },
      { feature: "ekip-ve-iletisim", dir: "out", what: "Araç belgesi bildirimi; envanter yetkisi rolden gelir.", record: "Bildirim" },
    ],
    solutions: [
      { slug: "insaat-ve-taahhut", why: "Şantiyeler arasında dolaşan kırıcı, iskele ve araçların kimde olduğu tek listede." },
      { slug: "muhendislik-ve-mep", why: "Ölçüm cihazları ve el aletleri teknisyene zimmetli; teslim durumu ve bakım kaydı." },
    ],
    faqs: [
      {
        question: "Uygulamada hesabı olmayan birine zimmet verebilir miyiz?",
        answer:
          "Evet. Zimmet formunda kişiyi listeden seçmek yerine “Listede yok (adını yaz)” seçeneğiyle ad soyad yazabilirsiniz. Taşeron ustası gibi hesabı olmayan kişilere verilen ekipman da aynı geçmişte izlenir.",
      },
      {
        question: "Hasarlı ya da kayıp dönen ekipmana ne olur?",
        answer:
          "Teslim alırken durumu Hasarlı ya da Kayıp olarak seçersiniz; hasarlı eşyayı aynı adımda bakıma alabilirsiniz. Kayıp eşya envanterde kalır; gerekirse düzenleyerek “Hurdaya ayrıldı” yapılır. Durum zimmet geçmişinde saklanır.",
      },
      {
        question: "Araç belgesi uyarısı kime gider?",
        answer:
          "Trafik sigortası, kasko ya da muayenesi biten veya bitmek üzere olan araç için araç sorumlularına ve aracın zimmetli olduğu kişiye bildirim gider. Uyarının kaç gün önce gideceğini firma ayarlarında belirlersiniz.",
      },
    ],
    cta: {
      title: "Demirbaş listenizi birlikte kayda alalım.",
      lede: "Elinizdeki ekipman ve araç listesini getirin; görüşmede zimmet, teslim ve araç belgesi takibinin kendi verinizle nasıl göründüğünü gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ EKP */
  "ekip-ve-iletisim": {
    slug: "ekip-ve-iletisim",
    hero: {
      title: "Herkes aynı sistemde, herkes yalnızca kendi işini görür.",
      lede:
        "Firma içi birebir sohbet ve dosya paylaşımı, modül modül bildirimler, rol bazlı yetkiler ve hesap başına tek aktif oturum. Hangi modülü kimin görüp düzenleyeceğine siz karar verirsiniz.",
      secondary: { label: "Bildirim kurallarını görün", href: "#bildirimler" },
    },
    visual: {
      key: "chat",
      caption: "Ekip · birebir sohbet, paylaşılan PDF rapor ve yeni bildirim",
    },
    sheet: [
      { label: "Roller", value: "9 hazır rol + özel roller" },
      { label: "Yetki", value: "Görüntüle · Ekle · Düzenle · Sil, modül modül" },
      { label: "Bildirim", value: "17 tür · uygulama içi ve masaüstü" },
      { label: "Oturum", value: "Hesap başına tek aktif oturum" },
    ],
    capabilities: [
      {
        title: "Birebir sohbet",
        body:
          "Ekip listesinde kişinin rolü, son mesaj ve okunmamış sayısı görünür. Mesajda “Görüldü” ve “Gönderildi” bilgisi vardır; mesaj ya da tüm sohbet iki taraf için de kalıcı olarak silinebilir.",
        terms: ["Görüldü", "Gönderildi", "En fazla 4000 karakter", "Sohbeti sil"],
      },
      {
        title: "Dosya paylaşımı ve saklama süresi",
        body:
          "Sohbette en fazla 10 MB dosya ve görsel paylaşılır. Firma dosya paylaşımını kapatabilir ve mesaj saklama süresini belirler; süreyi dolduran mesaj ve dosyalar kalıcı olarak silinir.",
        terms: ["En fazla 10 MB", "Dosya paylaşımı", "Mesaj saklama süresi"],
      },
      {
        title: "Hazır ve özel roller",
        body:
          "Kurucu, Yönetici, Bölge Müdürü, Mimar, İnşaat, Makine ve Elektrik Mühendisi, Saha Sorumlusu ve Muhasebe. Rol adlarını değiştirir, Usta ya da Tedarik gibi özel roller eklersiniz; özel rol bir hazır rolün yetkileriyle başlar.",
        terms: ["Yerleşik roller", "Özel roller", "Görünen ad", "Başlangıç yetkileri"],
      },
      {
        title: "Modül modül yetki",
        body:
          "15 bölümün her biri için görüntüleme, ekleme, düzenleme ve silme ayrı ayrı açılır. Hazır şablonlar: tam yetki, varsayılan, sadece görüntüleme. Kullanıcıya özel yetki rol şablonunun önüne geçer.",
        terms: ["Tam Yetki", "Varsayılan CRUD", "Sadece görüntüleme", "Rol varsayılanını uygula"],
      },
      {
        title: "Bildirimler",
        body:
          "17 bildirim türü, sekiz modülde. Her kullanıcı modül bazında bildirimleri açıp kapatır; firma bazılarını zorunlu kılar ya da tamamen kapatır. Tarayıcı izin verirse masaüstü bildirimi de gösterilir.",
        terms: ["Masaüstü bildirimleri", "Firma tarafından zorunlu", "Tümünü okundu işaretle", "Haritada aç"],
      },
      {
        title: "Tek oturum ve kullanıcı yönetimi",
        body:
          "Aynı hesapla başka bir yerden giriş yapıldığında önceki oturum sonlanır ve kullanıcıya nedeni söylenir. Kurucu kullanıcı ekler, kısıtlar ve aktivite loglarında kimin ne yaptığını görür.",
        terms: ["Tek aktif oturum", "Kısıtla", "Aktivite Logları"],
      },
    ],
    screens: {
      title: "Sohbet ve yetki matrisi.",
      lede: "Biri ekibin konuşma yeri, diğeri kimin neyi görebileceğinin tek kaynağı.",
      tabs: [
        {
          key: "chat",
          code: "MSJ",
          label: "Ekip sohbeti",
          summary: "Solda ekip listesi, sağda konuşma; PDF rapor ve fotoğraf paylaşımı.",
          points: [
            "Kişi kartında rol, organizasyon ve son mesaj zamanı.",
            "Okunmamış mesajlar menüde ve “Yeni mesaj” bildirimiyle görünür.",
            "Ekip sohbeti modülü firma ayarlarından tamamen kapatılabilir.",
          ],
        },
        {
          key: "permission-matrix",
          code: "YTK",
          label: "Yetki matrisi",
          summary: "Bir rolün modül bazındaki görüntüle, ekle, düzenle, sil yetkileri.",
          points: [
            "Rol matrisi, o role atanan yeni kullanıcılar için şablondur.",
            "Kaydederken isterseniz bu roldeki mevcut kullanıcıların yetkileri de eşitlenir.",
            "Özlük bilgileri personel listesinden ayrı bir yetkiyle korunur.",
            "Kapatılan modül tüm kullanıcılar için menüden kalkar; kayıtlar silinmez.",
          ],
        },
      ],
    },
    special: {
      id: "bildirimler",
      eyebrow: "Bildirim kuralları",
      title: "Kim, neyi, ne zaman öğrenir.",
      lede:
        "Bildirimler kayıtlardan üretilir; kimse elle hatırlatma yazmaz. Firma hangi türlerin üretileceğini ve hangilerinin zorunlu olduğunu, eşik gerektirenlerde kaç gün önceden uyarılacağını belirler.",
      blocks: [
        {
          type: "list",
          title: "Sahalar, talepler ve finans",
          items: [
            { term: "Sahalar ve açılışlar", body: "Yaklaşan açılış (1–90 gün) · Geciken açılış · İhaledeki sahada sözleşme gerekli" },
            { term: "Sözleşmeler", body: "Bitmek üzere olan aktif sözleşme (1–180 gün)" },
            { term: "Tadilat talepleri", body: "Size atanan talepler · Açık yüksek öncelikli talepler" },
            { term: "Hakediş ve fatura", body: "Onay bekleyen hakediş · Kesilmiş ama ödenmemiş fatura" },
          ],
        },
        {
          type: "list",
          title: "Ekip, insan kaynakları ve envanter",
          items: [
            { term: "Ekip mesajları", body: "Okunmamış mesajlar" },
            { term: "İnsan kaynakları", body: "Belge süresi (1–180 gün) · Onay bekleyen belge · Onay bekleyen izin · İzin sonucu · Yeni duyuru · Bekleyen personel talebi · Talep sonucu" },
            { term: "Envanter ve araçlar", body: "Sigortası, kaskosu ya da muayenesi yaklaşan veya geçen araç (1–180 gün)" },
            { term: "Masaüstü", body: "Uygulama arka plandayken bildirimler işletim sistemi bildirimi olarak da gösterilir." },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Açılış ve sözleşme uyarıları; bildirimden haritada aç.", record: "Bildirim" },
      { feature: "hakedis-ve-finans", dir: "in", what: "Hakediş onayı, ödenmemiş fatura, sözleşme bitişi.", record: "Bildirim" },
      { feature: "insan-kaynaklari", dir: "in", what: "Belge, izin, duyuru ve talep bildirimleri.", record: "Bildirim" },
      { feature: "talepler-ve-onaylar", dir: "out", what: "Disiplin onayı rolden, onay yetkisi matristen gelir.", record: "Rol · Yetki" },
      { feature: "yapay-zeka-asistani", dir: "out", what: "Asistan kullanıcının yetkisinin dışına çıkamaz.", record: "Yetki" },
    ],
    solutions: [
      { slug: "mimarlik-ofisleri", why: "Ofisteki unvanlar özel rollerle karşılanır; işveren belgeleri sohbette PDF olarak paylaşılır." },
      { slug: "insaat-ve-taahhut", why: "Muhasebe finansı, saha sorumlusu sahayı görür; şantiye şefiyle yazışma kayıtlı." },
      { slug: "perakende-yatirimlari", why: "Bölge müdürleri, mağaza sorumluları ve merkez aynı bildirim kurallarıyla." },
    ],
    faqs: [
      {
        question: "Mesajlar ne kadar süre saklanıyor?",
        answer:
          "Saklama süresini firma belirler. Bu süreyi dolduran mesajlar ve dosyalar kalıcı olarak silinir; süre kısaltılırsa eski mesajlar hemen gizlenir. Sohbet ekranı kullanıcıya mesajların kaç gün sonra silineceğini gösterir.",
      },
      {
        question: "Bir kullanıcının yetkisini rolünden farklı ayarlayabilir miyiz?",
        answer:
          "Evet. Rol matrisi varsayılan şablondur; kullanıcı yetkileri sekmesinde tek bir kullanıcı için modül modül farklı yetki kaydedebilirsiniz. Bu kayıt rol şablonunun önüne geçer; “Rol varsayılanını uygula” ile şablona geri dönülür.",
      },
      {
        question: "Kullanıcılar bildirimleri kapatabilir mi?",
        answer:
          "Her kullanıcı bildirimleri modül bazında açıp kapatabilir. Firma bir bildirim türünü zorunlu kıldıysa kullanıcı onu kapatamaz; firma tarafından kapatılan türler ise hiç üretilmez.",
      },
    ],
    cta: {
      title: "Rol ve yetki yapınızı birlikte çıkaralım.",
      lede: "Ekibinizdeki görevleri anlatın; görüşmede bunları Koordine rollerine, modül yetkilerine ve bildirim kurallarına nasıl çevireceğimizi gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ AI */
  "yapay-zeka-asistani": {
    slug: "yapay-zeka-asistani",
    hero: {
      title: "Kendi verinize sorun; önerdiği kaydı siz onaylayın.",
      lede:
        "Koordine Asistan sahalarınız, açılış takviminiz, iş planlarınız ve finans kayıtlarınız üzerinden cevap verir. Saha, tadilat talebi, iş planı ya da keşif kalemi eklemesini isteyin; önce önizleme gelir, siz onaylamadan kayıt oluşmaz.",
      secondary: { label: "Neler ekleyebildiğini görün", href: "#eylemler" },
    },
    visual: {
      key: "assistant-full",
      caption: "Koordine Asistan · soru, firma verisine dayalı cevap ve onay bekleyen kayıt önizlemesi",
    },
    sheet: [
      { label: "Kaynak", value: "Sahalar · Açılışlar · İş planı · Keşif · Sözleşme · Hakediş · Fatura · Talepler" },
      { label: "Ekler", value: "Saha · Tadilat talebi · İş planı kalemi · Keşif kalemi" },
      { label: "Kural", value: "Önizleme → Onayla ve ekle" },
      { label: "Ayar", value: "Firma genelinde açılır / kapanır" },
    ],
    capabilities: [
      {
        title: "Doğal dilde soru",
        body:
          "“Önümüzdeki 30 günde açılacak sahalar hangileri?”, “Hakediş ve fatura durumunu yorumla” gibi sorular. Asistan genel bir sohbet botu değildir; cevabı firmanızın Koordine'deki kayıtlarına bakarak verir.",
        terms: ["Genel durumu özetle", "Açılış tarihi geçmiş sahalar var mı?", "Riskli projeleri listele"],
      },
      {
        title: "Önce önizleme",
        body:
          "Kayıt isteğinde asistan bir önizleme kartı hazırlar: alanlar, kalemler ve uyarılar. “Onayla ve ekle” demeden hiçbir şey yazılmaz; vazgeçerseniz “İptal edildi; hiçbir kayıt eklenmedi.”",
        terms: ["Önizleme hazırlanıyor…", "Onayla ve ekle", "İptal edildi"],
      },
      {
        title: "Eksiği açıkça söyler",
        body:
          "Eksik ya da belirsiz bilgi önizlemede uyarı olarak görünür: saha adı birden fazla sahayla eşleşiyorsa hangisi olduğunu sorar; adres haritada bulunamazsa konumu şehir merkezine koyacağını ve sonradan düzeltebileceğinizi söyler.",
        terms: ["Şehir eksik.", "Birden fazla sahayla eşleşiyor", "Eksikleri sohbette düzeltin"],
      },
      {
        title: "Yetkinizin dışına çıkmaz",
        body:
          "Saha ekleme yetkiniz yoksa asistan da saha ekleyemez; tadilat talepleri modülü kapalıysa talep açamaz. Kayıtlar sizin adınıza, sizin yetkinizle oluşur.",
        terms: ["Saha ekleme yetkiniz yok.", "Modül firma ayarlarından kapatılmış."],
      },
      {
        title: "Toplu kalem",
        body:
          "Bir sahanın iş planına ya da keşfine tek seferde en fazla 100 kalem ekletebilirsiniz. Para birimi TL, ₺, $, €, £ gibi yazımlardan tanınır; birim fiyatı verilmeyen kalemler 0 tutarla eklenir ve bu önizlemede yazar.",
        terms: ["En fazla 100 kalem", "Poz no", "Birim fiyat", "Tutar"],
      },
      {
        title: "Firma ve kullanıcı ayarları",
        body:
          "Kurucu asistanı ya da yalnızca asistanla kayıt eklemeyi firma genelinde kapatabilir. Kullanıcı asistanı gizleyebilir; isterse sohbet geçmişi bu cihazda son 40 mesajla saklanır.",
        terms: ["Asistanı etkinleştir", "Asistanla kayıt ekleme", "Sohbet geçmişini sakla"],
      },
    ],
    screens: {
      title: "Cevap ve önizleme.",
      lede: "İki ayrı iş: biri bilgi verir, diğeri kayıt önerir. İkincisi her zaman sizin onayınızdan geçer.",
      tabs: [
        {
          key: "assistant-answer",
          code: "SOR",
          label: "Soru ve cevap",
          summary: "Firma verisine dayanan cevap; altta yapay zekâ uyarısı.",
          points: [
            "Hazır öneriler: genel durum, yaklaşan ve geciken açılışlar, finans yorumu, riskli projeler.",
            "Yanıt yazılırken durdurulabilir; yeni sohbet tek tıkla başlar.",
            "Her sohbette: “Yapay zekâ hata yapabilir; önemli kararlarda verileri kontrol edin.”",
          ],
        },
        {
          key: "assistant-preview",
          code: "ONY",
          label: "Kayıt önizlemesi",
          summary: "Eklenecek kayıt alan alan; eksikler uyarı olarak, onay düğmesi en altta.",
          points: [
            "Kalem listelerinde ilk satırlar ve “… ve 12 kalem daha” özeti.",
            "Önizlemedeki hatayı sohbette düzeltirsiniz; yeni önizleme hazırlanır.",
            "Onaydan sonra sonuç tek satırla bildirilir: “Levent Ofis Katı keşfine 8 kalem eklendi”.",
          ],
        },
      ],
    },
    special: {
      id: "eylemler",
      eyebrow: "Kayıt ekleme",
      title: "Asistanın ekleyebildiği dört kayıt.",
      lede:
        "Asistan yalnızca bu dört kaydı önerebilir; başka bir işlem istenirse desteklenmediğini söyler. Önizlemede gördüğünüz alanlar, onaylarsanız yazılacak alanların tamamıdır.",
      blocks: [
        {
          type: "mapping",
          title: "Yeni saha",
          source: "Saha ekleme yetkisi",
          rows: [
            { from: "Ad · Konum · Adres", to: "Saha kartı", note: "Adres bulunamazsa konum şehir merkezine konur" },
            { from: "Durum · Açılış · Saha türü", to: "Saha kartı", note: "Tanınmayan tür varsayılanla kaydedilir, uyarılır" },
            { from: "Brüt m² · Kat · Bütçe", to: "Saha kartı", note: "Bütçe para birimi tanınır" },
            { from: "Yüklenici · Şantiye şefi · Telefon", to: "Saha kartı" },
          ],
        },
        {
          type: "mapping",
          title: "Yeni tadilat talebi",
          source: "Tadilat talebi ekleme yetkisi",
          rows: [
            { from: "Başlık", to: "Talep", note: "Zorunlu" },
            { from: "Saha", to: "Talep", note: "Ada göre eşleşir; belirsizse sorar" },
            { from: "Öncelik", to: "Talep", note: "Düşük · Orta · Yüksek" },
            { from: "Açıklama", to: "Talep" },
          ],
        },
        {
          type: "mapping",
          title: "İş planına kalem",
          source: "İş planı ekleme yetkisi",
          rows: [
            { from: "İş", to: "İş tanımı", note: "Zorunlu" },
            { from: "Başlangıç · Bitiş", to: "Tarihler", note: "Bitiş başlangıçtan önce olamaz" },
            { from: "Sorumlu", to: "Sorumlu" },
            { from: "Durum", to: "Yapılacak · Devam ediyor · Tamamlandı" },
          ],
        },
        {
          type: "mapping",
          title: "Keşfe kalem",
          source: "Keşif ekleme yetkisi",
          rows: [
            { from: "Poz no", to: "Poz no" },
            { from: "Malzeme", to: "Kalem adı", note: "Zorunlu" },
            { from: "Miktar", to: "Miktar", note: "Zorunlu" },
            { from: "Birim fiyat", to: "Birim fiyat · Tutar", note: "Negatif olamaz; yoksa 0" },
          ],
        },
      ],
    },
    connections: [
      { feature: "saha-ve-harita", dir: "in", what: "Sahalar ve açılış takvimi cevapların temelidir; yeni saha eklenir.", record: "Oku · Ekle" },
      { feature: "kesif-ve-is-programi", dir: "in", what: "İş planı ve keşif okunur; önizlemeyle kalem eklenir.", record: "Oku · Ekle" },
      { feature: "hakedis-ve-finans", dir: "in", what: "Sözleşme, hakediş ve fatura durumu yorumlanır.", record: "Oku" },
      { feature: "talepler-ve-onaylar", dir: "in", what: "Talepler okunur; sohbetten yeni tadilat talebi açılır.", record: "Oku · Ekle" },
      { feature: "ekip-ve-iletisim", dir: "in", what: "Kullanıcının rol yetkileri asistanda da geçerlidir.", record: "Yetki" },
    ],
    solutions: [
      { slug: "perakende-yatirimlari", why: "Mağaza portföyüne açılış ve gecikme soruları; sohbetten tadilat talebi." },
      { slug: "insaat-ve-taahhut", why: "Hakediş ve fatura durumunun özeti; iş planına toplu kalem." },
    ],
    faqs: [
      {
        question: "Asistan personel ve puantaj bilgilerini görüyor mu?",
        answer:
          "Hayır. Asistanın cevap verdiği kapsam sahalar ve açılış takvimi, iş planları, keşif kalemleri, sözleşme, hakediş ve fatura kayıtları ile tadilat talepleridir. Personel, özlük, puantaj ve izin kayıtları bu kapsamda değildir.",
      },
      {
        question: "Asistan yanlış sahayı seçerse ne olur?",
        answer:
          "Yazdığınız ad birden fazla sahayla eşleşiyorsa asistan eşleşenleri sayar ve hangisi olduğunu sorar; hiç eşleşmiyorsa bunu söyler. Önizlemede saha adı açıkça yazar; yanlışsa onaylamaz, sohbette düzeltirsiniz.",
      },
      {
        question: "Asistanı yalnızca soru sormak için açık tutabilir miyiz?",
        answer:
          "Evet. Firma ayarlarında “Asistanı etkinleştir” ve “Asistanla kayıt ekleme” ayrı seçeneklerdir. İkincisini kapatırsanız asistan soruları cevaplar ama kayıt önermez.",
      },
    ],
    cta: {
      title: "Asistanı kendi portföyünüzle deneyin.",
      lede: "Görüşmede sahalarınıza benzer bir veri üzerinde soru soralım, bir talep ve birkaç keşif kalemini önizleme ve onay adımıyla birlikte ekleyelim.",
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
export const featureGroups: { id: string; code: string; name: string; summary: string; slugs: FeatureSlug[] }[] = [
  {
    id: "saha-ve-proje",
    code: "A",
    name: "Saha ve proje",
    summary: "Sahanın nerede ve hangi aşamada olduğu, ne kadar iş ve malzeme içerdiği, kimden ne beklendiği.",
    slugs: ["saha-ve-harita", "kesif-ve-is-programi", "talepler-ve-onaylar"],
  },
  {
    id: "finans",
    code: "B",
    name: "Finans",
    summary: "Sözleşmeden faturaya bağlı kayıtlar; para birimi başına ayrı toplamlar.",
    slugs: ["hakedis-ve-finans"],
  },
  {
    id: "kalite-ve-raporlama",
    code: "C",
    name: "Kalite ve raporlama",
    summary: "Sahadan gelen günlük rapor, denetim, uygunsuzluk ve onaya sunulan belgeler.",
    slugs: ["saha-raporlari"],
  },
  {
    id: "ekip-ve-kaynak",
    code: "D",
    name: "Ekip ve kaynak",
    summary: "Personel, puantaj ve belgeler; ekipmanın kimde olduğu; kimin neyi görebileceği.",
    slugs: ["insan-kaynaklari", "envanter-ve-zimmet", "ekip-ve-iletisim"],
  },
  {
    id: "asistan",
    code: "E",
    name: "Asistan",
    summary: "Bütün bu kayıtların üzerinde çalışan, onaysız kayıt eklemeyen yapay zekâ katmanı.",
    slugs: ["yapay-zeka-asistani"],
  },
];
