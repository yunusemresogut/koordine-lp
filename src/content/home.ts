/**
 * Ana sayfa metinleri ve verileri. İddialar uygulamadaki (maps-analytics) özelliklere dayanır.
 * Sayılar yalnızca ürün gerçekleridir: 9 modül, 6 rapor tipi, 5 para birimi, 2 dil.
 */
import type { FeatureSlug } from "./features";
import type { SolutionSlug } from "./solutions";

export const homeSeo = {
  title: "Koordine | Saha, Proje ve Şantiye Yönetimi Platformu",
  description:
    "Mühendislik, mimarlık ve taahhüt firmaları için saha ve şantiye yönetimi: harita, keşif, iş programı, hakediş, saha raporları ve puantaj tek platformda.",
};

export const hero = {
  eyebrow: "Saha, proje ve şantiye yönetimi",
  title: "Sahadan hakedişe, her proje tek kayıt üzerinde.",
  lede: "Koordine; mühendislik, mimarlık ve taahhüt firmalarının sahalarını, keşif ve iş programlarını, saha raporlarını, hakedişlerini ve ekibini aynı platformda toplar. Haritadaki pinden A4 rapora, sözleşmeden faturaya her bilgi ait olduğu sahaya bağlı kalır.",
  facts: [
    { k: "Modül", v: "09", note: "Sahadan finansa" },
    { k: "Rapor tipi", v: "06", note: "A4 belge çıktısı" },
    { k: "Para birimi", v: "05", note: "TRY · USD · EUR · GBP · CHF" },
    { k: "Arayüz dili", v: "TR / EN", note: "Türkçe ve İngilizce" },
  ],
};

/** Bağlam bölümü: bugün bilgi nerede, Koordine'de nerede */
export const contextRows: { topic: string; before: string; after: string; code: string }[] = [
  {
    topic: "Günlük saha raporu",
    before: "WhatsApp grubuna atılan fotoğraflar, e-postayla gelen Word dosyası.",
    after: "Sahada doldurulan form, firmanızın antetli A4 belgesi; yoklama puantaja işlenir.",
    code: "RPR",
  },
  {
    topic: "Keşif ve metraj",
    before: "Her revizyonda yeniden adlandırılan Excel dosyaları.",
    after: "Poz numaralı keşif kalemleri, Excel'den içe aktarım, malzeme durumu (bekleniyor, geldi, gitti).",
    code: "KSF",
  },
  {
    topic: "Hakediş ve fatura",
    before: "Saha ve muhasebede birbirinden habersiz iki ayrı tablo.",
    after: "Sözleşme, hakediş ve fatura birbirine bağlı kayıtlar; sözleşme ilerlemesi kendiliğinden görünür.",
    code: "HKD",
  },
  {
    topic: "Açılış takvimi",
    before: "Kimsenin güncellemediği bir Gantt çıktısı, duvarda.",
    after: "Haritada durum renkli pinler, yaklaşan ve geciken açılışlar için bildirim.",
    code: "SAH",
  },
  {
    topic: "Ekipman ve araçlar",
    before: "Kırıcının kimde olduğu telefonla sorulur.",
    after: "Demirbaş numarası, zimmetli kişi, kullanıldığı şantiye ve teslim geçmişi.",
    code: "ENV",
  },
  {
    topic: "Personel belgeleri",
    before: "Bitiş tarihleri bir klasörde, fark edildiğinde süre çoktan geçmiş.",
    after: "Sertifika ve muayene bitişleri izlenir; süresi yaklaşan belge için bildirim gider.",
    code: "İK",
  },
];

/** Platform dizini — her modül için kısa kapsam satırı (features.ts özetlerine ek) */
export const moduleScope: Record<FeatureSlug, string> = {
  "saha-ve-harita": "Harita · saha listesi · açılış takvimi · konumdan adres",
  "kesif-ve-is-programi": "Poz no · metraj · Excel / P6 içe aktarım · Gantt",
  "hakedis-ve-finans": "Sözleşme · hakediş · fatura · 5 para birimi",
  "saha-raporlari": "Günlük · İSG · NCR · yapım yöntemi · malzeme sunumu · kontrol listesi",
  "talepler-ve-onaylar": "TT kodlu talepler · öncelik · disiplin onayları",
  "insan-kaynaklari": "Personel · belgeler · puantaj · izin · duyuru",
  "envanter-ve-zimmet": "Demirbaş · zimmet · teslim · araç belgeleri",
  "ekip-ve-iletisim": "Sohbet · dosya · bildirim · rol bazlı yetki",
  "yapay-zeka-asistani": "Soru-cevap · önizlemeli kayıt ekleme",
};

/** Saha raporları sekmeleri */
export const reportTabs: { type: "daily" | "hse" | "ncr" | "method" | "material" | "checklist"; label: string; code: string; summary: string; contents: string[] }[] = [
  {
    type: "daily",
    label: "Günlük saha raporu",
    code: "GSR",
    summary: "Şantiye şefinin yöneticilere günlük özeti: personel, yapılan işler, sorunlar, iş güvenliği ve fotoğraflar.",
    contents: [
      "Saha, tarih, hava durumu ve sıcaklık",
      "Ekip sayıları ve isimli yoklama; kaydederken puantaja işlenir",
      "Bugün yapılan işler; iş planındaki o güne denk gelen kalemler rapora alınabilir",
      "Gelen malzeme, sorunlar ve gecikmeler",
      "İş güvenliği notları ve yarın planlanan işler",
      "Açıklamalı fotoğraflar, imza alanları",
    ],
  },
  {
    type: "hse",
    label: "İSG raporu",
    code: "İSG",
    summary: "Saha iş sağlığı ve güvenliği denetimi: kontrol listesi, kaza ve ramak kala kayıtları, düzeltici faaliyetler.",
    contents: [
      "Günlük, haftalık, aylık ya da olay sonrası denetim",
      "Göstergeler: çalışan, adam-saat, iş kazası, ramak kala, kayıp gün",
      "13 maddelik saha kontrol listesi (KKD, yüksekte çalışma, iskele…)",
      "Uygunsuzluk, risk seviyesi, sorumlu ve termin",
      "Eğitimler, toolbox toplantıları ve değerlendirme",
    ],
  },
  {
    type: "ncr",
    label: "Uygunsuzluk (NCR)",
    code: "NCR",
    summary: "Malzeme, işçilik ya da projeye aykırı imalatın kaydı ve kapanış doğrulaması.",
    contents: [
      "Kategori ve önem derecesi: minör, majör, kritik",
      "İlgili proje, şartname ya da çizim referansı",
      "Kök neden ve karar: yeniden yapım, onarım, olduğu gibi kabul, ret",
      "Düzeltici ve önleyici faaliyet",
      "Doğrulama notu ve kapanış tarihi",
    ],
  },
  {
    type: "method",
    label: "Yapım yöntemi",
    code: "YY",
    summary: "Bir imalatın nasıl yapılacağını anlatan onay dokümanı (method statement).",
    contents: [
      "Amaç, kapsam ve referans dokümanlar",
      "Sorumluluklar, ekipman ve malzemeler",
      "Uygulama adımları ve kabul kriterleri",
      "Riskler ve alınacak önlemler",
      "Muayene ve test planı, çevre ve acil durum",
    ],
  },
  {
    type: "material",
    label: "Malzeme sunumu",
    code: "MS",
    summary: "Kullanılacak malzemenin işveren ya da müşavir onayına sunulması (submittal).",
    contents: [
      "Ürün, üretici, marka/model, tedarikçi ve menşei",
      "Şartname değeri ile önerilen ürünün karşılaştırması",
      "Ekli dokümanlar: teknik föy, SDS, test raporu, sertifika",
      "Onay kodları: A onaylı, B notlu onay, C revize, D ret",
    ],
  },
  {
    type: "checklist",
    label: "Kontrol listesi",
    code: "KL",
    summary: "Hazır maddelerden seçin ya da kendi maddelerinizi yazın; sahada işaretleyip PDF olarak paylaşın.",
    contents: [
      "İnşaat, mimari, mekanik, elektrik, peyzaj ve İSG için hazır maddeler",
      "Kontrol aşaması: imalat öncesi, sırası, teslim öncesi, periyodik",
      "Uygun, uygun değil, kapsam dışı işaretleme",
      "Fotoğraflar, genel not ve sonuç",
    ],
  },
];

/** Rol varsayılanları (uygulamadaki builtInMatrixForRole). G: görüntüle, E: ekle, D: düzenle, S: sil */
export const permissionColumns = [
  "Harita ve sahalar",
  "Projeler",
  "Disiplin onayları",
  "Tadilat talepleri",
  "Sözleşmeler",
  "Hakediş",
  "Faturalar",
  "İK ve envanter",
] as const;

export const permissionRows: { role: string; note?: string; cells: string[] }[] = [
  { role: "Kurucu", note: "Firma hesabını açan kişi", cells: ["GEDS", "GEDS", "GEDS", "GEDS", "GEDS", "GEDS", "GEDS", "GEDS"] },
  { role: "Yönetici · Bölge Müdürü", cells: ["GED", "GED", "GED", "GED", "GED", "GED", "", ""] },
  { role: "Mimar · Makine, Elektrik, İnşaat Mühendisi", note: "Onayı kendi disiplininde", cells: ["GED", "GED", "GD", "GED", "", "", "", ""] },
  { role: "Saha Sorumlusu", cells: ["GD", "G", "", "GED", "", "", "", ""] },
  { role: "Muhasebe", cells: ["G", "", "", "", "", "GED", "GED", ""] },
];

export const securityFacts: { title: string; body: string }[] = [
  {
    title: "Tek aktif oturum",
    body: "Aynı hesapla başka bir cihazdan giriş yapıldığında önceki oturum kendiliğinden kapanır.",
  },
  {
    title: "Modül modül yetki",
    body: "Her kullanıcı için görüntüleme, ekleme, düzenleme ve silme ayrı ayrı açılıp kapatılır.",
  },
  {
    title: "Hassas bilgiye ayrı kilit",
    body: "Personelin özlük bilgileri, personel listesinden ayrı bir yetkiyle korunur.",
  },
  {
    title: "Firmanıza göre roller",
    body: "Hazır rollerin adlarını değiştirebilir, ihtiyacınıza göre özel rol tanımlayabilirsiniz.",
  },
];

export const assistantPoints: { title: string; body: string }[] = [
  {
    title: "Cevap kendi kayıtlarınızdan gelir",
    body: "Sahalar, açılış takvimi, iş planları ve finans kayıtlarınız hakkında doğal dille sorun. Genel bir sohbet botu değil; firmanızın verisine bakar.",
  },
  {
    title: "Önce önizleme, sonra kayıt",
    body: "Saha, tadilat talebi, iş planı ya da keşif kalemi eklemesini isteyebilirsiniz. Asistan önce önizleme gösterir; siz onaylamadan hiçbir kayıt oluşmaz.",
  },
  {
    title: "Yetkinizin dışına çıkmaz",
    body: "Ekleme yetkiniz olmayan bir modülde asistan da kayıt ekleyemez. Eksik ya da belirsiz bilgiyi önizlemede uyarı olarak gösterir.",
  },
  {
    title: "Sınırını açıkça söyler",
    body: "Her sohbette görünen not: yapay zekâ hata yapabilir; önemli kararlarda verileri kontrol edin.",
  },
];

/** Kimler için — çözümlerle eşleşen modül kodları */
export const solutionModules: Record<SolutionSlug, string[]> = {
  "insaat-ve-taahhut": ["SAH", "RPR", "HKD", "İK"],
  "mimarlik-ofisleri": ["RPR", "KSF", "TLP"],
  "muhendislik-ve-mep": ["RPR", "KSF", "İK"],
  "perakende-yatirimlari": ["SAH", "TLP", "HKD"],
};

export const onboardingSteps: { title: string; body: string }[] = [
  {
    title: "Demo görüşmesi",
    body: "Ekibinizin bugünkü akışını dinler, Koordine'yi kendi proje tipleriniz ve rapor düzeniniz üzerinden gösteririz.",
  },
  {
    title: "Kurulum ve veri aktarımı",
    body: "Firma hesabı, bölgeler ve roller kurulur. Keşif kalemleri ve iş planları Excel şablonlarıyla, iş planı ayrıca Primavera P6 (.xer) dosyasından içe aktarılır.",
  },
  {
    title: "Ekip daveti",
    body: "Kullanıcıları rolleriyle eklersiniz. Herkes yalnızca yetkili olduğu modülleri görür.",
  },
];

export const homeFaq: { question: string; answer: string }[] = [
  {
    question: "Koordine hangi firmalar için uygun?",
    answer:
      "Birden fazla saha ya da şantiyeyi aynı anda yürüten mühendislik, mimarlık ve taahhüt firmaları için tasarlandı. Mağaza açılışı ve tadilat projeleri yöneten perakende yatırım ekipleri de aynı yapıyı kullanır.",
  },
  {
    question: "Mevcut Excel dosyalarımızı kullanabilir miyiz?",
    answer:
      "Evet. Keşif kalemleri (poz no, açıklama, miktar, birim, birim fiyat, para birimi) ve iş planları Excel şablonuyla içe aktarılır. İş planı için Primavera P6 .xer dosyası da desteklenir.",
  },
  {
    question: "Kim hangi bilgiyi görür?",
    answer:
      "Her rolün varsayılan yetkileri vardır; kurucu bunları kullanıcı ve modül bazında değiştirebilir. Örneğin muhasebe hakediş ve faturaları yönetir, saha sorumlusu talepleri açar ama sözleşmeleri görmez.",
  },
  {
    question: "Hangi dil ve para birimleri destekleniyor?",
    answer:
      "Arayüz Türkçe ve İngilizcedir. Tutarlar TRY, USD, EUR, GBP ve CHF ile girilebilir; kur çevrimi yapılmadığı için farklı para birimlerindeki toplamlar ayrı gösterilir.",
  },
  {
    question: "Yapay zekâ asistanı verilerimizi kendi başına değiştirir mi?",
    answer:
      "Hayır. Asistan kayıt eklemeden önce önizleme gösterir; kayıt yalnızca siz onayladığınızda ve yetkiniz varsa oluşur.",
  },
];
