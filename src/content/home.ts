/**
 * Ana sayfa metinleri ve verileri. İddialar uygulamadaki (maps-analytics) özelliklere dayanır.
 * Sayılar yalnızca ürün gerçekleridir: 9 modül, 6 rapor tipi, 5 para birimi, 2 dil.
 */
import type { FeatureSlug } from "./features";
import type { SolutionSlug } from "./solutions";

export const homeSeo = {
  title: "Koordine | Saha, Proje ve Şantiye Yönetimi Platformu",
  description:
    "Mühendislik, mimarlık ve taahhüt firmaları için saha ve şantiye yönetimi. Harita, keşif, iş programı, hakediş, saha raporları ve puantaj tek platformda.",
};

export const hero = {
  eyebrow: "Mühendislik, mimarlık ve taahhüt firmaları için",
  title: "Saha, proje ve şantiye takibi için tek platform.",
  lede: "Sahalarınızı, keşif ve iş programlarınızı, günlük raporları, hakedişleri ve personeli Koordine'den takip edersiniz. Şantiyede girilen bilgi ofiste de aynı anda görünür.",
  facts: [
    { k: "Modül", v: "9", note: "Sahadan muhasebeye" },
    { k: "Rapor tipi", v: "6", note: "PDF olarak alınır" },
    { k: "Para birimi", v: "5", note: "TRY, USD, EUR, GBP, CHF" },
    { k: "Arayüz dili", v: "2", note: "Türkçe ve İngilizce" },
  ],
};

/** Bağlam bölümü: bilgi çoğu firmada nerede tutuluyor, Koordine'de nasıl tutuluyor */
export const contextRows: { topic: string; before: string; after: string }[] = [
  {
    topic: "Günlük saha raporu",
    before: "WhatsApp'a atılan fotoğraflar ve e-postayla gelen Word dosyaları.",
    after: "Şantiye şefi formu doldurur, rapor PDF olarak hazır olur. Yoklama puantaja işlenir.",
  },
  {
    topic: "Keşif ve metraj",
    before: "Her revizyonda yeni adla kaydedilen Excel dosyaları.",
    after: "Poz numaralı keşif kalemleri. Mevcut Excel dosyanızı içe aktarabilirsiniz.",
  },
  {
    topic: "Hakediş ve fatura",
    before: "Şantiyede ve muhasebede ayrı ayrı tutulan tablolar.",
    after: "Hakediş sözleşmeye, fatura hakedişe bağlanır. Sözleşmenin ilerlemesi ayrıca hesaplanmaz.",
  },
  {
    topic: "Ekipman ve araçlar",
    before: "Kırıcının hangi şantiyede olduğu telefonla sorulur.",
    after: "Her demirbaşın kimde ve hangi şantiyede olduğu listede görünür.",
  },
];

/** Modül listesi: her modül için kısa kapsam satırı (features.ts özetlerine ek) */
export const moduleScope: Record<FeatureSlug, string> = {
  "saha-ve-harita": "Harita, saha listesi, açılış takvimi",
  "kesif-ve-is-programi": "Poz no, metraj, Excel ve P6 aktarımı, Gantt",
  "hakedis-ve-finans": "Sözleşme, hakediş, fatura, 5 para birimi",
  "saha-raporlari": "Günlük rapor, İSG, NCR, kontrol listesi",
  "talepler-ve-onaylar": "Tadilat talepleri, öncelik, disiplin onayları",
  "insan-kaynaklari": "Personel, belgeler, puantaj, izin",
  "envanter-ve-zimmet": "Demirbaş, zimmet, araç belgeleri",
  "ekip-ve-iletisim": "Sohbet, dosya paylaşımı, bildirimler",
  "yapay-zeka-asistani": "Soru sorma, onaylı kayıt ekleme",
};

/** Saha raporları sekmeleri */
export const reportTabs: { type: "daily" | "hse" | "ncr" | "method" | "material" | "checklist"; label: string; summary: string; contents: string[] }[] = [
  {
    type: "daily",
    label: "Günlük saha raporu",
    summary: "Şantiye şefinin yöneticilere gönderdiği günlük özet.",
    contents: [
      "Hava durumu, ekip sayıları ve isimli yoklama",
      "Yapılan işler, gelen malzeme ve sorunlar",
      "İş güvenliği notları ve ertesi günün planı",
      "Açıklamalı fotoğraflar ve imza alanları",
    ],
  },
  {
    type: "hse",
    label: "İSG raporu",
    summary: "Sahadaki iş sağlığı ve güvenliği denetimi.",
    contents: [
      "Günlük, haftalık, aylık ya da olay sonrası denetim",
      "İş kazası, ramak kala ve kayıp gün sayıları",
      "13 maddelik saha kontrol listesi",
      "Uygunsuzluklar, sorumlu kişi ve termin",
    ],
  },
  {
    type: "ncr",
    label: "Uygunsuzluk (NCR)",
    summary: "Projeye ya da şartnameye aykırı imalatın kaydı.",
    contents: [
      "Minör, majör ya da kritik önem derecesi",
      "Kök neden ve verilen karar",
      "Düzeltici ve önleyici faaliyet",
      "Doğrulama notu ve kapanış tarihi",
    ],
  },
  {
    type: "method",
    label: "Yapım yöntemi",
    summary: "Bir imalatın nasıl yapılacağını anlatan onay dokümanı (method statement).",
    contents: [
      "Kapsam ve referans dokümanlar",
      "Ekipman, malzeme ve uygulama adımları",
      "Riskler ve alınacak önlemler",
      "Muayene ve test planı",
    ],
  },
  {
    type: "material",
    label: "Malzeme sunumu",
    summary: "Malzemenin işveren ya da müşavir onayına sunulması (submittal).",
    contents: [
      "Ürün, üretici, marka ve model",
      "Şartname ile önerilen ürünün karşılaştırması",
      "Teknik föy, test raporu ve sertifika ekleri",
      "A, B, C ve D onay kodları",
    ],
  },
  {
    type: "checklist",
    label: "Kontrol listesi",
    summary: "Hazır maddelerden seçin ya da kendi maddelerinizi yazın.",
    contents: [
      "İnşaat, mimari, mekanik, elektrik, peyzaj ve İSG maddeleri",
      "İmalat öncesi, imalat sırası ve teslim öncesi kontrol",
      "Uygun, uygun değil ya da kapsam dışı işaretleme",
      "Fotoğraflar, not ve PDF çıktısı",
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
  { role: "Yönetici, Bölge Müdürü", cells: ["GED", "GED", "GED", "GED", "GED", "GED", "", ""] },
  { role: "Mimar ve mühendisler", note: "Onayı kendi disiplininde verir", cells: ["GED", "GED", "GD", "GED", "", "", "", ""] },
  { role: "Saha Sorumlusu", cells: ["GD", "G", "", "GED", "", "", "", ""] },
  { role: "Muhasebe", cells: ["G", "", "", "", "", "GED", "GED", ""] },
];

export const securityFacts: { title: string; body: string }[] = [
  {
    title: "Tek aktif oturum",
    body: "Aynı hesapla başka bir cihazdan giriş yapılırsa önceki oturum kapanır.",
  },
  {
    title: "Özlük bilgisine ayrı yetki",
    body: "Personelin özlük bilgilerini görmek için ayrıca yetki gerekir.",
  },
  {
    title: "Kendi rolleriniz",
    body: "Hazır rollerin adını değiştirebilir, firmanıza göre yeni rol tanımlayabilirsiniz.",
  },
];

export const assistantPoints: { title: string; body: string }[] = [
  {
    title: "Firmanızın verisiyle cevap verir",
    body: "Sahalar, açılış takvimi, iş planları ve finans kayıtları hakkında soru sorabilirsiniz.",
  },
  {
    title: "Onaylamadan kayıt oluşmaz",
    body: "Saha, talep, iş planı ya da keşif kalemi eklemesini isteyebilirsiniz. Önce önizleme gelir, siz onaylarsınız.",
  },
  {
    title: "Yetkinizin dışına çıkmaz",
    body: "Ekleme yetkiniz olmayan bir modülde asistan da kayıt ekleyemez.",
  },
  {
    title: "Önemli kararlarda kontrol etmenizi hatırlatır",
    body: "Her sohbette yapay zekânın hata yapabileceğini belirten bir not görünür.",
  },
];

/** Kimler için: her çözümde öne çıkan modüller (düz metin) */
export const solutionModules: Record<SolutionSlug, string> = {
  "insaat-ve-taahhut": "Saha raporları, hakediş, puantaj",
  "mimarlik-ofisleri": "Saha raporları, keşif, talepler",
  "muhendislik-ve-mep": "Saha raporları, keşif, personel belgeleri",
  "perakende-yatirimlari": "Harita, talepler, hakediş",
};

export const onboardingSteps: { title: string; body: string }[] = [
  {
    title: "Demo görüşmesi",
    body: "Nasıl çalıştığınızı dinler, Koordine'yi kendi proje tipleriniz üzerinden gösteririz.",
  },
  {
    title: "Kurulum ve veri aktarımı",
    body: "Firma hesabı, bölgeler ve roller kurulur. Keşif ve iş planlarınız Excel'den, iş planı ayrıca Primavera P6 dosyasından aktarılır.",
  },
  {
    title: "Ekip daveti",
    body: "Kullanıcıları rolleriyle davet edersiniz ve ekip çalışmaya başlar.",
  },
];

export const homeFaq: { question: string; answer: string }[] = [
  {
    question: "Koordine hangi firmalar için uygun?",
    answer:
      "Aynı anda birden fazla saha ya da şantiye yürüten mühendislik, mimarlık ve taahhüt firmaları için. Mağaza açılışı ve tadilat projesi yöneten perakende ekipleri de kullanabilir.",
  },
  {
    question: "Mevcut Excel dosyalarımızı kullanabilir miyiz?",
    answer:
      "Evet. Keşif kalemleri ve iş planları Excel şablonuyla içe aktarılır. İş planı için Primavera P6 .xer dosyası da desteklenir.",
  },
  {
    question: "Kim hangi bilgiyi görür?",
    answer:
      "Her rolün varsayılan yetkileri vardır ve kurucu bunları kullanıcı bazında değiştirebilir. Örneğin muhasebe hakediş ve faturaları yönetir, saha sorumlusu talep açar ama sözleşmeleri görmez.",
  },
  {
    question: "Hangi dil ve para birimleri destekleniyor?",
    answer:
      "Arayüz Türkçe ve İngilizcedir. Tutarlar TRY, USD, EUR, GBP ve CHF ile girilebilir. Kur çevrimi yapılmadığı için her para biriminin toplamı ayrı gösterilir.",
  },
  {
    question: "Yapay zekâ asistanı verilerimizi kendi başına değiştirir mi?",
    answer: "Hayır. Asistan kayıt eklemeden önce önizleme gösterir. Kayıt yalnızca siz onaylarsanız ve yetkiniz varsa oluşur.",
  },
];
