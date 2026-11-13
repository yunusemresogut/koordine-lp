/**
 * Çözüm (sektör) sayfalarının detaylı içeriği. Kısa kayıtlar (ad, özet, SEO) solutions.ts'dedir.
 *
 * Kural: Her cümle uygulamada gerçekten bulunan bir yeteneğe dayanır
 * (maps-analytics: i18n mesajları, report-types, roles, permissions). Uydurma müşteri,
 * yorum ya da yüzde yoktur. Rol adları uygulamadaki hazır rollerle aynıdır.
 */

import type { FeatureSlug } from "./features";
import { solutions, type Solution, type SolutionSlug } from "./solutions";

/** Uygulamadaki hazır roller (shell.roles) + firmanın tanımladığı özel rol */
export type AppRole =
  | "Kurucu"
  | "Makine Mühendisi"
  | "Elektrik Mühendisi"
  | "Mimar"
  | "İnşaat Mühendisi"
  | "Yönetici"
  | "Bölge Müdürü"
  | "Saha Sorumlusu"
  | "Muhasebe"
  | "Özel rol";

/** Uygulamadaki rapor tipleri (6 adet) */
export type ReportKind =
  | "Günlük şantiye raporu"
  | "İSG raporu"
  | "NCR"
  | "Yapım yöntemi"
  | "Malzeme sunumu"
  | "Kontrol listesi";

export type SolutionDetail = {
  slug: SolutionSlug;
  hero: {
    /** Sayfanın tek h1'i; seoTitle'dan farklı, insan diliyle */
    title: string;
    lede: string;
  };
  /** PageHero yanındaki özet kutusu: gerçek ürün verileri */
  sheet: {
    /** Sahalar için tipik kayıt türleri / durumlar */
    scope: string;
    reports: ReportKind[];
    roles: AppRole[];
  };
  /** "Sahadaki durum": sektörün tipik operasyon sorunları (3–4) */
  realities: { title: string; body: string }[];
  /** "Koordine ile": sorunların hangi modülle nasıl karşılandığı (3–4) */
  approach: { feature: FeatureSlug; title: string; body: string }[];
  /** Tipik iş akışı (4–6 adım) */
  workflow: { step: string; detail: string; feature: FeatureSlug; record: string }[];
  /** "Kim ne görür" */
  roles: { role: AppRole; label?: string; sees: string; does: string }[];
  /** İlgili modüller (3–5) */
  modules: FeatureSlug[];
  /** 3–4 soru */
  faqs: { question: string; answer: string }[];
  cta: { title: string; lede: string };
};

export const solutionDetails: Record<SolutionSlug, SolutionDetail> = {
  /* ------------------------------------------------------------------ İnşaat ve taahhüt */
  "insaat-ve-taahhut": {
    slug: "insaat-ve-taahhut",
    hero: {
      title: "Her şantiyeden her gün aynı formatta rapor alın.",
      lede:
        "Birden fazla şantiye yürüten taahhüt firmaları için. Şantiye şefi günlük raporu sahada doldurur, merkez aynı gün görür. İş programı, puantaj, sözleşme ve hakediş de aynı şantiyenin altında tutulur.",
    },
    sheet: {
      scope: "Proje, ihale, şantiye, hakediş ve fatura",
      reports: ["Günlük şantiye raporu", "İSG raporu", "NCR", "Kontrol listesi"],
      roles: ["Kurucu", "Yönetici", "İnşaat Mühendisi", "Saha Sorumlusu", "Muhasebe"],
    },
    realities: [
      {
        title: "Günlük raporlar her şantiyeden farklı biçimde gelir.",
        body:
          "Bir şantiye fotoğraf gönderir, diğeri akşam Excel yollar, bir diğeri hiç rapor vermez. Eksik raporu çoğu zaman bir sorun çıkınca fark edersiniz.",
      },
      {
        title: "Puantaj ayrı bir tabloda tutulur.",
        body:
          "Yoklama günlük rapora bir kez, ay sonunda puantaj tablosuna bir kez daha yazılır. Taşeron ekiplerinin kişi sayısı çoğu zaman hiçbir yere kaydedilmez.",
      },
      {
        title: "Sözleşme, hakediş ve faturalar genelde ayrı dosyalarda tutulur.",
        body:
          "Bir sözleşmenin ne kadarının hakedişe ve faturaya dönüştüğünü görmek için birkaç ayrı dosyayı karşılaştırmanız gerekir.",
      },
      {
        title: "İş programı sahadaki ilerlemeyle güncellenmez.",
        body:
          "Primavera ya da Excel'de hazırlanan program ihale dosyasında kalır. Neyin plan gerisinde olduğu haftalık toplantıda konuşulur.",
      },
    ],
    approach: [
      {
        feature: "saha-raporlari",
        title: "Günlük rapor her şantiyede aynı formda.",
        body:
          "Şantiye şefi personeli, yapılan işleri, gelen malzemeyi ve fotoğrafları girer; rapor A4 olarak alınır. Panoda hangi şantiyenin hangi gün rapor girmediği görünür.",
      },
      {
        feature: "insan-kaynaklari",
        title: "Yoklama puantaja aktarılır.",
        body:
          "Günlük rapordaki isimli yoklama, kaydederken puantaja işlenebilir. İsim girilmeyen taşeron ekipleri için meslek ve kişi sayısı ayrıca yazılır.",
      },
      {
        feature: "hakedis-ve-finans",
        title: "Sözleşme, hakediş ve fatura birbirine bağlı.",
        body:
          "Hakediş dönemi sözleşmeye, fatura hakedişe bağlanır. Sözleşmenin ilerlemesini ve ödenen tutarı aynı ekranda görürsünüz.",
      },
      {
        feature: "kesif-ve-is-programi",
        title: "İş programını Excel ya da P6'dan aktarın.",
        body:
          "Excel şablonu ya da Primavera P6 .xer dosyası içe aktarılır, program Gantt görünümünde izlenir. Günlük raporda o güne denk gelen kalemler programdan getirilebilir.",
      },
    ],
    workflow: [
      { step: "İhale", detail: "Saha haritaya “İhale” durumuyla eklenir.", feature: "saha-ve-harita", record: "DURUM: İHALE" },
      { step: "Sözleşme", detail: "Sahaya bağlı sözleşme açılır, taraf ve tutar girilir.", feature: "hakedis-ve-finans", record: "SZ-0012" },
      { step: "Keşif ve iş programı", detail: "Poz no'lu keşif ve iş programı Excel ya da P6'dan aktarılır.", feature: "kesif-ve-is-programi", record: "15.150.1005" },
      { step: "Günlük rapor", detail: "Şantiye şefi raporu her gün girer, yoklama puantaja işlenir.", feature: "saha-raporlari", record: "GÜNLÜK RAPOR" },
      { step: "Hakediş", detail: "Dönem tarihleriyle hakediş hazırlanır ve onaylanır.", feature: "hakedis-ve-finans", record: "DÖNEM 03" },
      { step: "Fatura", detail: "Hakedişe bağlı fatura kesilir, ödeme izlenir.", feature: "hakedis-ve-finans", record: "KDV %20" },
    ],
    roles: [
      {
        role: "Kurucu",
        sees: "Tüm şantiyeler, finans ve insan kaynakları.",
        does: "Kullanıcıları, rol yetkilerini ve bölgeleri belirler.",
      },
      {
        role: "Yönetici",
        sees: "Şantiye portföyü, iş programı, sözleşme ve hakedişler.",
        does: "Sözleşme ve hakediş açar, proje onaylarını verir.",
      },
      {
        role: "İnşaat Mühendisi",
        sees: "Sahalar, keşif, iş programı, projeler ve talepler.",
        does: "Keşif ve iş programını günceller, NCR ve kontrol listesi doldurur.",
      },
      {
        role: "Saha Sorumlusu",
        label: "Saha Sorumlusu / şantiye şefi",
        sees: "Saha kayıtları (düzenleme) ve projeler (görüntüleme).",
        does: "Saha bilgilerini günceller, tadilat ve iş taleplerini açar.",
      },
      {
        role: "Muhasebe",
        sees: "Sahalar (görüntüleme), hakedişler ve faturalar.",
        does: "Hakediş ödemelerini ve faturaları işler.",
      },
    ],
    modules: ["saha-raporlari", "hakedis-ve-finans", "kesif-ve-is-programi", "insan-kaynaklari", "envanter-ve-zimmet"],
    faqs: [
      {
        question: "Primavera P6'da hazırladığımız iş programını kullanabilir miyiz?",
        answer:
          "Evet. Programı Primavera P6 .xer dosyasından ya da Excel şablonundan içe aktarabilirsiniz. Tarihler, sorumlular ve öncül görevler aktarılır; program tablo ve Gantt görünümünde izlenir.",
      },
      {
        question: "Günlük rapordaki yoklama puantaja nasıl geçer?",
        answer:
          "Raporu kaydederken “yoklamayı puantaja işle” seçeneği açıksa çalıştı, yarım gün ve gelmedi bilgileri puantaja yazılır. O gün izinli olan personelin kaydı değişmez.",
      },
      {
        question: "Farklı para birimindeki sözleşmeler nasıl görünür?",
        answer:
          "Sözleşme, hakediş ve fatura TRY, USD, EUR, GBP ve CHF ile kaydedilebilir. Kur çevrimi yapılmaz, toplamlar para birimine göre ayrı gösterilir.",
      },
    ],
    cta: {
      title: "Şantiyelerinizin günlük akışını birlikte kuralım.",
      lede:
        "İş programınızı ve keşif dosyanızı getirin. 30 dakikalık görüşmede Koordine'yi kendi şantiyeniz üzerinden gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Mimarlık ofisleri */
  "mimarlik-ofisleri": {
    slug: "mimarlik-ofisleri",
    hero: {
      title: "Uygulamadaki projelerinizi sahada takip edin.",
      lede:
        "Uygulama aşamasına geçen mimarlık ofisleri için. Malzeme sunumu, yapım yöntemi, uygulama denetimi ve teslim öncesi kontroller projenin altında, revizyon ve onay durumuyla tutulur.",
    },
    sheet: {
      scope: "Mağaza, ofis, kafe, konut ve otel",
      reports: ["Malzeme sunumu", "Yapım yöntemi", "Kontrol listesi", "NCR"],
      roles: ["Mimar", "Yönetici", "Saha Sorumlusu", "Özel rol"],
    },
    realities: [
      {
        title: "Malzeme onayları e-postalara dağılır.",
        body:
          "Numune, yorum ve revize katalog ayrı e-postalarla gelir. Hangi ürünün hangi revizyonla onaylandığını bulmak için eski yazışmalara dönmeniz gerekir.",
      },
      {
        title: "Denetim notları telefonda ve defterde kalır.",
        body:
          "Saha ziyaretinde görülen kot hatası ya da projeye aykırı imalat telefondaki bir fotoğrafta durur. Düzeltilip düzeltilmediği bir sonraki ziyarette anlaşılır.",
      },
      {
        title: "Teslim öncesi eksikler son haftaya kalır.",
        body:
          "Eksik listesi, as-built projeler ve garanti belgeleri teslim gününe yakın toplanır. Neyin eksik olduğunu tek bir listede göremezsiniz.",
      },
    ],
    approach: [
      {
        feature: "saha-raporlari",
        title: "Malzeme sunumu onay durumuyla kaydedilir.",
        body:
          "Önerilen ürünü şartname değeriyle satır satır karşılaştırırsınız. İşveren ya da müşavir görüşü A, B, C veya D durumuyla forma işlenir, belge revizyon numarasıyla saklanır.",
      },
      {
        feature: "saha-raporlari",
        title: "Denetim kontrol listesi ve NCR ile yapılır.",
        body:
          "Sıva, şap, yalıtım, asma tavan gibi hazır mimari maddelerden liste oluşturursunuz. Uygun olmayan imalat için NCR açılır ve kapanışı aynı belgede doğrulanır. Teslim öncesi kontroller de aynı yöntemle yapılır.",
      },
      {
        feature: "talepler-ve-onaylar",
        title: "Mimari onay her saha için ayrı izlenir.",
        body:
          "Mimari, mekanik ve elektrik onayları ayrı tutulur. Mimar kendi disiplininin onayını verir; bekleyen sahalar açılış tarihine göre sıralanır.",
      },
    ],
    workflow: [
      { step: "Uygulama projesi", detail: "Saha açılır, onaylı projeler ve detaylar dosyalara yüklenir.", feature: "saha-ve-harita", record: "A-201" },
      { step: "Malzeme sunumu", detail: "Ürün şartnameyle karşılaştırılır ve işverene sunulur.", feature: "saha-raporlari", record: "MS-ARC-012" },
      { step: "Yapım yöntemi", detail: "İmalatın adımları ve kabul kriterleri onaya sunulur.", feature: "saha-raporlari", record: "YY-ARC-003" },
      { step: "Uygulama denetimi", detail: "Kontrol listesi sahada işaretlenir, aykırılıklar NCR olur.", feature: "saha-raporlari", record: "NCR-2026-007" },
      { step: "Mimari onay", detail: "Mimar kendi disiplin onayını verir.", feature: "talepler-ve-onaylar", record: "ONAY: MİMARİ" },
      { step: "Teslim öncesi kontrol", detail: "Eksik listesi, as-built ve kılavuzlar kontrol edilir.", feature: "saha-raporlari", record: "TESLİM ÖNCESİ" },
    ],
    roles: [
      {
        role: "Mimar",
        sees: "Sahalar, projeler, onay kuyruğu ve tadilat talepleri.",
        does: "Malzeme sunumunu değerlendirir, uygulamayı denetler, mimari onayı verir.",
      },
      {
        role: "Yönetici",
        label: "Yönetici / proje lideri",
        sees: "Tüm projeler, disiplin onayları, sözleşme ve hakedişler.",
        does: "Projeyi açar ve kapatır, bütün disiplinlerin onayını verebilir.",
      },
      {
        role: "Saha Sorumlusu",
        sees: "Saha kayıtları (düzenleme) ve projeler (görüntüleme).",
        does: "Saha bilgilerini günceller, sahadan gelen talepleri açar.",
      },
      {
        role: "Özel rol",
        label: "Özel rol (ör. iç mimar, kontrol mühendisi)",
        sees: "Firmanın bu rol için açtığı modüller.",
        does: "Yetki ayarlarında tanımlanan işlemleri yapar.",
      },
    ],
    modules: ["saha-raporlari", "talepler-ve-onaylar", "kesif-ve-is-programi", "ekip-ve-iletisim"],
    faqs: [
      {
        question: "Malzeme sunum formunda onay durumları nasıl tutuluyor?",
        answer:
          "İşveren ya da müşavir görüşü dört durumdan biriyle işlenir: Onaylandı (A), Notlu onay (B), Revize edip yeniden sunun (C) ve Reddedildi (D). Doküman no ve revizyon belgenin üstünde görünür.",
      },
      {
        question: "Kontrol listesi maddelerini kendimiz yazabilir miyiz?",
        answer:
          "Evet. Hazır madde kütüphanesinden seçebilir ya da kendi maddelerinizi yazabilirsiniz. Her madde uygun, uygun değil ya da kapsam dışı olarak işaretlenir.",
      },
      {
        question: "Belgeleri işverene nasıl göndeririz?",
        answer:
          "Malzeme sunumu, yapım yöntemi, kontrol listesi ve NCR PDF olarak alınır. Belgeyi kendi kanalınızdan iletirsiniz, gelen görüşü forma işlersiniz.",
      },
    ],
    cta: {
      title: "Onay ve denetim düzeninizi birlikte kuralım.",
      lede:
        "Uygulama aşamasındaki bir projenizi seçin, görüşmede malzeme sunumu ve denetim akışını bu proje üzerinden gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Mühendislik ve MEP */
  "muhendislik-ve-mep": {
    slug: "muhendislik-ve-mep",
    hero: {
      title: "Yapım yöntemi, NCR ve test kayıtlarınız sahada hazır olsun.",
      lede:
        "Mekanik, elektrik ve inşaat mühendisliği ekipleri için. Raporlar sahada form olarak doldurulur ve A4 belge olarak alınır. Personel sertifikaları ve disiplin onayları da aynı platformda izlenir.",
    },
    sheet: {
      scope: "Mekanik, elektrik, inşaat, peyzaj ve altyapı",
      reports: ["Yapım yöntemi", "NCR", "İSG raporu", "Kontrol listesi", "Malzeme sunumu"],
      roles: ["Makine Mühendisi", "Elektrik Mühendisi", "İnşaat Mühendisi", "Yönetici"],
    },
    realities: [
      {
        title: "Yapım yöntemi her projede baştan yazılır.",
        body:
          "Word dosyaları projeden projeye kopyalanır. Onaya giden sürümle sahada uygulanan sürüm her zaman aynı olmaz.",
      },
      {
        title: "Açılan NCR'lerin kapanışı takip edilmez.",
        body:
          "Düzeltici faaliyet konuşulur ama doğrulama kaydı tutulmaz. Hangi NCR'nin hâlâ açık olduğunu bir listede göremezsiniz.",
      },
      {
        title: "Test kayıtları kâğıtta kalır.",
        body:
          "Basınç testi, izolasyon ve topraklama ölçümleri sahada forma yazılır, teslim dosyası hazırlanırken yeniden derlenir.",
      },
      {
        title: "Sertifika bitiş tarihleri gözden kaçar.",
        body:
          "Yüksekte çalışma, MYK ve operatör belgeleri ayrı bir tabloda izlenir. Süresi geçen belge çoğu zaman denetimde fark edilir.",
      },
    ],
    approach: [
      {
        feature: "saha-raporlari",
        title: "Yapım yöntemi hazır bir şablonla yazılır.",
        body:
          "Kapsam, sorumluluklar, ekipman, uygulama adımları, riskler ve test planı için hazır bölümler vardır. Belge onay durumu ve revizyon numarasıyla A4 olarak alınır.",
      },
      {
        feature: "saha-raporlari",
        title: "NCR kapanana kadar izlenir.",
        body:
          "Kategori, önem derecesi, kök neden ve düzeltici faaliyet kaydedilir. Durum açık, düzeltme sürüyor, doğrulama bekliyor ve kapandı olarak ilerler.",
      },
      {
        feature: "saha-raporlari",
        title: "Test kontrol listeleri hazır maddelerle hazırlanır.",
        body:
          "Mekanik ve elektrik kütüphanesinden basınç testi, izolasyon direnci, topraklama ve kaçak akım gibi maddeleri seçersiniz. Liste sahada işaretlenir, fotoğraflarıyla PDF olarak alınır.",
      },
      {
        feature: "insan-kaynaklari",
        title: "Sertifikalar bitiş tarihiyle izlenir.",
        body:
          "Belgeler personel kartında tutulur. Süresi geçmiş ve 30 gün içinde bitecek belgeler ayrı listelenir.",
      },
    ],
    workflow: [
      { step: "Keşif", detail: "Poz no'lu kalemler Excel'den aktarılır.", feature: "kesif-ve-is-programi", record: "15.250.1011" },
      { step: "Yapım yöntemi", detail: "Adımlar, riskler ve kabul kriterleri onaya sunulur.", feature: "saha-raporlari", record: "YY-MEC-003" },
      { step: "İmalat", detail: "Günlük rapor ve İSG denetimi sahada tutulur.", feature: "saha-raporlari", record: "İSG-2026-014" },
      { step: "Test ve kontrol", detail: "Basınç, izolasyon ve topraklama testleri listede işaretlenir.", feature: "saha-raporlari", record: "KL-2026-021" },
      { step: "NCR kapanışı", detail: "Açık uygunsuzluklar doğrulanıp kapatılır.", feature: "saha-raporlari", record: "DURUM: KAPANDI" },
      { step: "Disiplin onayı", detail: "Mekanik ve elektrik onayını ilgili mühendis verir.", feature: "talepler-ve-onaylar", record: "ONAY: MEKANİK" },
    ],
    roles: [
      {
        role: "Makine Mühendisi",
        sees: "Sahalar, keşif, projeler, onay kuyruğu ve talepler.",
        does: "Mekanik yapım yöntemi ve testleri yürütür, mekanik onayı verir.",
      },
      {
        role: "Elektrik Mühendisi",
        sees: "Sahalar, keşif, projeler, onay kuyruğu ve talepler.",
        does: "Elektrik testlerini ve kontrol listelerini yürütür, elektrik onayını verir.",
      },
      {
        role: "İnşaat Mühendisi",
        sees: "Sahalar, projeler, keşif, iş programı ve talepler.",
        does: "Kaba yapı kontrollerini ve NCR kayıtlarını yürütür.",
      },
      {
        role: "Yönetici",
        sees: "Tüm disiplinlerin onay durumu, sözleşme ve hakedişler.",
        does: "Bütün disiplinlerin onayını verebilir, projeyi açar ve kapatır.",
      },
    ],
    modules: ["saha-raporlari", "insan-kaynaklari", "kesif-ve-is-programi", "talepler-ve-onaylar", "envanter-ve-zimmet"],
    faqs: [
      {
        question: "Hangi rapor tipleri var?",
        answer:
          "Altı rapor tipi var: günlük şantiye raporu, İSG raporu, NCR, yapım yöntemi, malzeme sunum formu ve kontrol listesi. Hepsi sahada doldurulur ve A4 belge olarak alınır.",
      },
      {
        question: "Mekanik ve elektrik onayları ayrı mı veriliyor?",
        answer:
          "Evet. Makine mühendisi mekanik, elektrik mühendisi elektrik onayını verir. Yönetici ve Bölge Müdürü bütün disiplinleri onaylayabilir.",
      },
      {
        question: "Ölçüm cihazlarını ve ekipmanı takip edebilir miyiz?",
        answer:
          "Evet. Cihaz ve ekipmanlar demirbaş no ve seri no ile envantere kaydedilir, personele zimmetlenir. Bakım durumu ve zimmet geçmişi tutulur.",
      },
    ],
    cta: {
      title: "Kalite kayıtlarınızı sahada tutmaya başlayın.",
      lede:
        "Yapım yöntemi, NCR ve test listelerinizi bir projeniz üzerinden birlikte kuralım.",
    },
  },

  /* ------------------------------------------------------------------ Perakende yatırımları */
  "perakende-yatirimlari": {
    slug: "perakende-yatirimlari",
    hero: {
      title: "Farklı şehirlerdeki mağaza açılışlarını tek takvimde yönetin.",
      lede:
        "Zincir mağaza, ofis ve AVM projeleri yürüten ekipler için. Her lokasyon haritada, açılışa kalan gün panoda görünür. Bölge müdürü kendi bölgesini, merkez tüm portföyü izler.",
    },
    sheet: {
      scope: "Mağaza, AVM, cadde, ofis ve kafe",
      reports: ["Günlük şantiye raporu", "Kontrol listesi", "Malzeme sunumu"],
      roles: ["Yönetici", "Bölge Müdürü", "Saha Sorumlusu", "Mimar", "Muhasebe"],
    },
    realities: [
      {
        title: "Aynı ay içinde birkaç şehirde açılış olur.",
        body:
          "Her açılışın ayrı yüklenicisi ve teslim tarihi vardır. Geciken mağaza, Excel'deki açılış listesi güncellenene kadar görünmez.",
      },
      {
        title: "Açılıştan sonra tadilat talepleri gelir.",
        body:
          "Bakım ve tadilat istekleri telefonla ya da mesajla iletilir. İşi kimin üstlendiği ve kapanıp kapanmadığı takip edilemez.",
      },
      {
        title: "Merkez ve bölgeler ayrı listeler tutar.",
        body:
          "Bölge müdürü kendi şehirlerini, merkez bütün portföyü görmek ister. Herkes kendi listesini tuttuğu için bilgiler birbirini tutmaz.",
      },
    ],
    approach: [
      {
        feature: "saha-ve-harita",
        title: "Her mağaza haritada, açılış tarihiyle.",
        body:
          "Mağazayı haritadan eklersiniz, şehir ve adres konumdan doldurulur. Saha türü, brüt m², yüklenici ve şantiye şefi aynı kayıtta tutulur.",
      },
      {
        feature: "saha-ve-harita",
        title: "Panoda geciken açılışlar ayrı görünür.",
        body:
          "Önümüzdeki 30 gündeki açılışlar ve tarihi geçtiği hâlde açılmamış mağazalar ayrı listelenir. Harita ve pano bölge filtresiyle tek bölgeye daraltılabilir.",
      },
      {
        feature: "talepler-ve-onaylar",
        title: "Tadilat talepleri kodla açılır.",
        body:
          "Her talep TT-0042 gibi bir kod alır, saha, öncelik ve atanan kişiyle izlenir. Durumu açık, devam ediyor, çözüldü ya da kapalı olarak güncellenir.",
      },
    ],
    workflow: [
      { step: "Lokasyon", detail: "Mağaza haritaya eklenir, AVM ya da cadde türü seçilir.", feature: "saha-ve-harita", record: "DURUM: PROJE" },
      { step: "Proje onayları", detail: "Mimari, mekanik ve elektrik onayları ayrı verilir.", feature: "talepler-ve-onaylar", record: "ONAY: MİMARİ" },
      { step: "İhale ve sözleşme", detail: "Yüklenici seçilir, sahaya bağlı sözleşme açılır.", feature: "hakedis-ve-finans", record: "SZ-0012" },
      { step: "Şantiye", detail: "İş programı ve keşif yüklenir, günlük rapor başlar.", feature: "kesif-ve-is-programi", record: "DURUM: ŞANTİYE" },
      { step: "Açılış", detail: "Açılış öncesi kontrol listesi kapanır, mağaza açılır.", feature: "saha-raporlari", record: "14.11.2026" },
      { step: "Tadilat talepleri", detail: "Mağazadan gelen talepler kodla açılır ve atanır.", feature: "talepler-ve-onaylar", record: "TT-0042" },
    ],
    roles: [
      {
        role: "Yönetici",
        label: "Yönetici / yatırım müdürü",
        sees: "Tüm lokasyonlar, açılış takvimi, onaylar, sözleşme ve hakedişler.",
        does: "Projeyi açar ve kapatır, bütün disiplin onaylarını verebilir.",
      },
      {
        role: "Bölge Müdürü",
        sees: "Kendi bölgesindeki mağazalar ve açılışlar.",
        does: "Bölgesindeki açılışları ve talepleri izler, onay verebilir.",
      },
      {
        role: "Saha Sorumlusu",
        label: "Saha Sorumlusu / mağaza sorumlusu",
        sees: "Mağaza kayıtları (düzenleme) ve projeler (görüntüleme).",
        does: "Mağaza bilgilerini günceller, tadilat taleplerini açar.",
      },
      {
        role: "Mimar",
        sees: "Mağaza projeleri, onay kuyruğu ve talepler.",
        does: "Mimari onayı verir, malzeme sunumunu ve uygulamayı denetler.",
      },
      {
        role: "Muhasebe",
        sees: "Mağazalar (görüntüleme), hakedişler ve faturalar.",
        does: "Yüklenici hakedişlerini ve faturaları işler.",
      },
    ],
    modules: ["saha-ve-harita", "talepler-ve-onaylar", "hakedis-ve-finans", "kesif-ve-is-programi", "yapay-zeka-asistani"],
    faqs: [
      {
        question: "Açılış tarihi yaklaşan ya da geçen mağazaları nasıl görürüz?",
        answer:
          "Panodaki açılış takvimi henüz açılmamış mağazaları kalan güne göre sıralar ve 7 gün, 30 gün ve geciken olarak gruplar. Geciken mağazaların kaç gün geciktiği de yazılır.",
      },
      {
        question: "Bölge müdürleri yalnızca kendi bölgelerini görebilir mi?",
        answer:
          "Bölgeler şehir gruplarıyla tanımlanır, harita ve pano bölge filtresiyle daraltılır. Kullanıcının hangi modülleri görüp düzenleyebileceğini rol yetkilerinden ayarlarsınız.",
      },
      {
        question: "Mağaza portföyümüz hakkında soru sorabilir miyiz?",
        answer:
          "Evet. Yapay zekâ asistanına “önümüzdeki 30 günde açılacak mağazalar hangileri?” gibi sorular sorabilirsiniz, firmanızın verisiyle cevap verir. Talep açtırmak isterseniz önce önizleme gösterilir, onayınızla kaydedilir.",
      },
    ],
    cta: {
      title: "Açılış takviminizi haritada birlikte kuralım.",
      lede:
        "Mağaza listenizi getirin. Görüşmede lokasyonlarınızı haritada, açılışlarınızı takvimde gösterelim.",
    },
  },
};

export type SolutionWithDetail = Solution & { detail: SolutionDetail };

export const solutionsWithDetails: SolutionWithDetail[] = solutions.map((s) => ({ ...s, detail: solutionDetails[s.slug] }));

export const solutionDetailBySlug = (slug: string): SolutionWithDetail | undefined =>
  solutionsWithDetails.find((s) => s.slug === slug);
