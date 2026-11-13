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
  /** Pafta kodu (antet kutusu, OG görseli) */
  code: string;
  hero: {
    /** Sayfanın tek h1'i; seoTitle'dan farklı, insan diliyle */
    title: string;
    lede: string;
  };
  /** PageHero yanındaki antet kutusu: gerçek ürün verileri */
  sheet: {
    /** Sahalar için tipik kayıt türleri / durumlar */
    scope: string;
    reports: ReportKind[];
    roles: AppRole[];
  };
  /** "Sahadaki gerçek": sektörün tipik operasyon sorunları */
  realities: { title: string; body: string }[];
  /** "Koordine ile": her sorunun hangi modülle nasıl karşılandığı */
  approach: { feature: FeatureSlug; title: string; body: string; detail: string }[];
  /** Tipik iş akışı (4–6 adım) */
  workflow: { step: string; detail: string; feature: FeatureSlug; record: string }[];
  /** "Kim ne görür" */
  roles: { role: AppRole; label?: string; sees: string; does: string }[];
  /** İlgili modüller (3–5) */
  modules: FeatureSlug[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; lede: string };
};

export const solutionDetails: Record<SolutionSlug, SolutionDetail> = {
  /* ------------------------------------------------------------------ İnşaat ve taahhüt */
  "insaat-ve-taahhut": {
    slug: "insaat-ve-taahhut",
    code: "INS",
    hero: {
      title: "Her şantiyeden, her gün, aynı formatta haber alın.",
      lede:
        "Aynı anda birkaç şantiye yürüten taahhüt firmaları için: iş programı, günlük şantiye raporu, puantaj, sözleşme ve hakediş aynı saha kaydına bağlı. Şantiye şefi sahada doldurur, merkez aynı gün görür.",
    },
    sheet: {
      scope: "Proje · İhale · Şantiye · Hakediş · Fatura",
      reports: ["Günlük şantiye raporu", "İSG raporu", "NCR", "Kontrol listesi"],
      roles: ["Kurucu", "Yönetici", "İnşaat Mühendisi", "Saha Sorumlusu", "Muhasebe"],
    },
    realities: [
      {
        title: "Günlük raporlar farklı kanallardan, farklı biçimlerde gelir.",
        body:
          "Bir şantiye mesajla fotoğraf atar, diğeri akşam Excel gönderir, üçüncüsü hiç göndermez. Hangi şantiyenin hangi gün rapor vermediğini ancak bir sorun çıktığında fark edersiniz.",
      },
      {
        title: "Puantaj, rapordan ayrı bir defterde tutulur.",
        body:
          "Sahadaki yoklama bir kez günlük raporda, bir kez de ay sonu puantaj tablosunda yazılır. Taşeron ekiplerinin kişi sayısı çoğu zaman hiçbir yerde kayda geçmez.",
      },
      {
        title: "Sözleşme, hakediş ve fatura ayrı dosyalarda yaşar.",
        body:
          "Taşeron sözleşmesi bir klasörde, hakediş dönemleri bir tabloda, faturalar muhasebede. Bir sözleşmenin ne kadarının hakedişe ve faturaya döndüğünü görmek için üç kaynağı birleştirmek gerekir.",
      },
      {
        title: "İş programı ile sahadaki ilerleme birbirinden kopar.",
        body:
          "Primavera ya da Excel'de hazırlanan iş programı ihale dosyasında kalır; şantiyede neyin plan gerisinde olduğu haftalık toplantıda sözlü olarak konuşulur.",
      },
    ],
    approach: [
      {
        feature: "saha-raporlari",
        title: "Günlük şantiye raporu tek formatta, şantiye bazında.",
        body:
          "Şantiye şefi personeli, yapılan işleri, gelen malzemeyi, sorunları, iş güvenliğini ve fotoğrafları aynı formda girer; rapor A4 belge olarak çıkar. Panodaki rapor kapsamı tablosu hangi şantiyenin hangi gün rapor girmediğini gösterir.",
        detail: "Rapor kapsamı · A4 PDF",
      },
      {
        feature: "insan-kaynaklari",
        title: "Yoklama, kaydederken puantaja işlenir.",
        body:
          "Günlük rapordaki isimli yoklama, kaydederken puantaja aktarılabilir; izinli personel atlanır. İsim girilmeyen taşeron ekipleri için meslek ve kişi sayısı ayrıca yazılır.",
        detail: "Yoklama → puantaj",
      },
      {
        feature: "hakedis-ve-finans",
        title: "Sözleşme, hakediş ve fatura birbirine bağlı.",
        body:
          "Her sözleşme bir sahaya, her hakediş dönemi bir sözleşmeye, her fatura bir hakedişe bağlanır. Sözleşme ilerlemesi ve ödenen tutar aynı ekranda görünür; TRY, USD, EUR, GBP ve CHF desteklenir.",
        detail: "SZ-0012 → Hakediş → Fatura",
      },
      {
        feature: "kesif-ve-is-programi",
        title: "İş programı sahaya bağlı, rapora akar.",
        body:
          "İş programını Excel şablonundan ya da Primavera P6 .xer dosyasından içe aktarın; öncül görevler ve Gantt görünümü korunur. Günlük raporda “İş planından getir” ile o güne denk gelen kalemler rapora eklenir.",
        detail: "Excel · P6 .xer · Gantt",
      },
    ],
    workflow: [
      { step: "İhale", detail: "Saha haritaya eklenir, durum “İhale”. Sözleşme yoksa uyarı verilir.", feature: "saha-ve-harita", record: "DURUM: İHALE" },
      { step: "Sözleşme", detail: "Sahaya bağlı sözleşme açılır, taraf ve tutar girilir.", feature: "hakedis-ve-finans", record: "SZ-0012" },
      { step: "Keşif ve iş programı", detail: "Poz no'lu keşif ve iş programı Excel ya da P6'dan aktarılır.", feature: "kesif-ve-is-programi", record: "15.150.1005" },
      { step: "Günlük rapor", detail: "Şantiye şefi her gün raporu girer, yoklama puantaja işlenir.", feature: "saha-raporlari", record: "GÜNLÜK · A4" },
      { step: "Hakediş", detail: "Dönem başlangıç ve bitişiyle hakediş hazırlanır, onaylanır.", feature: "hakedis-ve-finans", record: "DÖNEM 03" },
      { step: "Fatura", detail: "Hakedişe bağlı fatura KDV oranıyla kesilir, ödeme izlenir.", feature: "hakedis-ve-finans", record: "KDV %20" },
    ],
    roles: [
      {
        role: "Kurucu",
        sees: "Tüm şantiyeler, finans ve insan kaynakları.",
        does: "Kullanıcıları ve rol yetkilerini belirler, bölgeleri tanımlar.",
      },
      {
        role: "Yönetici",
        sees: "Şantiye portföyü, iş programı eğrisi, sözleşme ve hakedişler.",
        does: "Sözleşme ve hakediş açar, proje onaylarını verir, gecikmeleri izler.",
      },
      {
        role: "İnşaat Mühendisi",
        sees: "Sahalar, keşif ve iş programı, projeler ve talepler.",
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
          "Evet. İş programını Excel şablonundan ya da Primavera P6 .xer dosyasından içe aktarabilirsiniz. Başlangıç ve bitiş tarihleri, sorumlu ve öncül görevler aktarılır; program tablo ve Gantt görünümünde izlenir.",
      },
      {
        question: "Günlük şantiye raporundaki yoklama puantaja nasıl geçer?",
        answer:
          "Raporda isimli yoklama tutulur. Kaydederken “yoklamayı puantaja işle” seçeneği açıksa çalışan, yarım gün ve gelmedi bilgileri puantaja yazılır; o gün izinli olan personelin kaydı değiştirilmez.",
      },
      {
        question: "Taşeron personelini ve ekiplerini ayrı takip edebilir miyiz?",
        answer:
          "Personel kartında çalışma türü olarak taşeron personeli seçilebilir. İsim girilmeyen taşeron ekipleri için günlük raporda meslek ve kişi sayısı ayrı satırlarda yazılır.",
      },
      {
        question: "Farklı para birimindeki sözleşmeler nasıl görünür?",
        answer:
          "Sözleşme, hakediş ve fatura TRY, USD, EUR, GBP ve CHF ile kaydedilebilir. Kur çevrimi yapılmaz; toplamlar para birimi bazında ayrı gösterilir.",
      },
    ],
    cta: {
      title: "Şantiyelerinizin günlük akışını birlikte kuralım.",
      lede:
        "Mevcut iş programınızı ve keşif dosyanızı getirin; 30 dakikalık görüşmede kendi şantiyeniz üzerinden günlük rapordan hakedişe akışı gösterelim.",
    },
  },

  /* ------------------------------------------------------------------ Mimarlık ofisleri */
  "mimarlik-ofisleri": {
    slug: "mimarlik-ofisleri",
    code: "MIM",
    hero: {
      title: "Çizimden sahaya geçen her kararın izini sürün.",
      lede:
        "Uygulama aşamasına geçen mimarlık ofisleri için: malzeme sunumu, yapım yöntemi, uygulama denetimi ve teslim öncesi kontroller aynı projenin altında, revizyon ve onay durumuyla birlikte.",
    },
    sheet: {
      scope: "Mağaza · Ofis · Kafe · Konut · Otel",
      reports: ["Malzeme sunumu", "Yapım yöntemi", "Kontrol listesi", "NCR"],
      roles: ["Mimar", "Yönetici", "Saha Sorumlusu", "Özel rol"],
    },
    realities: [
      {
        title: "Malzeme onayları e-posta zincirlerinde kaybolur.",
        body:
          "Yüklenici numune gönderir, işveren yorum yazar, ürün değişir, yeni katalog gelir. Hangi seramiğin hangi revizyonla onaylandığını bulmak için eski yazışmaları taramak gerekir.",
      },
      {
        title: "Uygulama denetimi notları defterde kalır.",
        body:
          "Saha ziyaretinde tespit edilen derz farkı, kot hatası ya da projeye aykırı imalat fotoğrafla telefonda, notla defterde durur. Düzeltilip düzeltilmediği bir sonraki ziyarete kadar belirsizdir.",
      },
      {
        title: "Revizyonlar ve şartname karşılaştırması elle yapılır.",
        body:
          "Önerilen ürünün şartname değerlerini karşılayıp karşılamadığı her sunumda yeniden tablolanır. Eşdeğer ürün gerekçesi ve ekli belgeler dağınık kalır.",
      },
      {
        title: "Teslim öncesi eksik listesi son haftaya sıkışır.",
        body:
          "Punch list, as-built projeler, kullanım kılavuzları ve garanti belgeleri teslim gününe yakın toplanmaya çalışılır; neyin eksik olduğu tek bir listede görünmez.",
      },
    ],
    approach: [
      {
        feature: "saha-raporlari",
        title: "Malzeme sunum formu, onay koduyla birlikte.",
        body:
          "Ürünü, üreticiyi ve kullanım yerini girin; şartname değerini önerilen ürünle satır satır karşılaştırın (uygun, eşdeğer, sapma var). Teknik föy, test raporu ve sertifika ekleri işaretlenir; işveren ya da müşavir görüşü A, B, C, D durumlarıyla kayda geçer.",
        detail: "MS-ARC-012 · Rev.",
      },
      {
        feature: "saha-raporlari",
        title: "Uygulama denetimi kontrol listesi ve NCR ile.",
        body:
          "Sıva, şap, ıslak hacim yalıtımı, asma tavan, alçıpan, boya gibi hazır mimari maddelerden kontrol listesi oluşturun. Uygun olmayan imalat için NCR açın; kök neden, düzeltici faaliyet, sorumlu firma ve kapanış doğrulaması aynı belgede.",
        detail: "Kontrol listesi · NCR",
      },
      {
        feature: "talepler-ve-onaylar",
        title: "Mimari onay sahanın üzerinde durur.",
        body:
          "Her sahanın mimari, mekanik ve elektrik onayı ayrı izlenir. Mimar kendi disiplininin onayını verir; onay bekleyen sahalar açılış tarihine göre sıralanır.",
        detail: "Mimari · Mekanik · Elektrik",
      },
      {
        feature: "ekip-ve-iletisim",
        title: "Dosyalar ve notlar proje kaydında.",
        body:
          "Uygulama projeleri, detay çizimleri ve fotoğraflar sahanın dosyalarına yüklenir; ekip notları ve yalnızca sizin göreceğiniz özel notlar aynı sayfadadır. Ofis içi yazışma firma sohbetinde dosyayla birlikte yürür.",
        detail: "Dosya · not · sohbet",
      },
    ],
    workflow: [
      { step: "Uygulama projesi", detail: "Saha açılır, onaylı projeler ve detaylar dosyalara yüklenir.", feature: "saha-ve-harita", record: "A-201" },
      { step: "Malzeme sunumu", detail: "Ürün şartnameyle karşılaştırılır, ekleriyle işverene sunulur.", feature: "saha-raporlari", record: "MS-ARC-012" },
      { step: "Yapım yöntemi", detail: "İmalatın adımları, riskleri ve kabul kriterleri onaya sunulur.", feature: "saha-raporlari", record: "YY-ARC-003" },
      { step: "Uygulama denetimi", detail: "Kontrol listesi sahada işaretlenir, aykırılıklar NCR olur.", feature: "saha-raporlari", record: "NCR-2026-007" },
      { step: "Mimari onay", detail: "Mimar kendi disiplin onayını verir, durum panoda görünür.", feature: "talepler-ve-onaylar", record: "ONAY: MİMARİ" },
      { step: "Teslim öncesi kontrol", detail: "Punch list, as-built ve kılavuzlar teslim listesinde kapanır.", feature: "saha-raporlari", record: "TESLİM ÖNCESİ" },
    ],
    roles: [
      {
        role: "Mimar",
        sees: "Sahalar, projeler, onay kuyruğu ve tadilat talepleri.",
        does: "Malzeme sunumunu değerlendirir, uygulama denetimi yapar, mimari onayı verir.",
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
        sees: "Firmanın bu rol için belirlediği modüller.",
        does: "Yetki matrisinde tanımlanan işlemleri yapar.",
      },
    ],
    modules: ["saha-raporlari", "talepler-ve-onaylar", "kesif-ve-is-programi", "ekip-ve-iletisim"],
    faqs: [
      {
        question: "Malzeme sunum formunda onay durumları nasıl tutuluyor?",
        answer:
          "Form taslak ya da onaya sunuldu olarak başlar; işveren veya müşavir görüşü Onaylandı (A), Notlu onay (B), Revize edip yeniden sunun (C) ve Reddedildi (D) olarak işlenir. Doküman no ve revizyon alanı belgenin üstünde görünür.",
      },
      {
        question: "Kontrol listesi maddelerini kendimiz yazabilir miyiz?",
        answer:
          "Evet. Hazır maddeler kütüphanesinden genel, kaba yapı, mimari, mekanik, elektrik, peyzaj, İSG ve teslim gruplarındaki maddeleri seçebilir ya da kendi maddelerinizi yazabilirsiniz. Her madde uygun, uygun değil ya da kapsam dışı olarak işaretlenir.",
      },
      {
        question: "İşverene gönderilecek belgeyi nasıl paylaşırız?",
        answer:
          "Malzeme sunumu, yapım yöntemi, kontrol listesi ve NCR A4 belge olarak hazırlanır ve PDF olarak alınır. Belgeyi işverene ya da müşavire kendi kanalınızdan iletirsiniz; görüşü forma işlenir.",
      },
      {
        question: "Ofisimizdeki unvanlar uygulamadaki rollerle aynı değil. Ne yapabiliriz?",
        answer:
          "Hazır rollerin adlarını firmanıza göre değiştirebilir, ayrıca özel rol tanımlayabilirsiniz. Her rolün hangi modülde görüntüleme, ekleme, düzenleme ve silme yetkisi olacağını yetki matrisinden belirlersiniz.",
      },
    ],
    cta: {
      title: "Malzeme onayından teslime, projelerinizi tek yerde izleyin.",
      lede:
        "Uygulama aşamasındaki bir projeniz üzerinden malzeme sunumu, denetim ve onay düzenini birlikte kuralım.",
    },
  },

  /* ------------------------------------------------------------------ Mühendislik ve MEP */
  "muhendislik-ve-mep": {
    slug: "muhendislik-ve-mep",
    code: "MEP",
    hero: {
      title: "Yöntem onayından test kaydına, kalite dosyanız sahada oluşsun.",
      lede:
        "Mekanik, elektrik ve inşaat mühendisliği ekipleri için: yapım yöntemi, NCR, İSG ve test kontrol listeleri aynı şemadan A4 belgeye dönüşür. Personelin sertifikaları ve disiplin onayları aynı platformda.",
    },
    sheet: {
      scope: "Mekanik · Elektrik · İnşaat · Peyzaj / altyapı",
      reports: ["Yapım yöntemi", "NCR", "İSG raporu", "Kontrol listesi", "Malzeme sunumu"],
      roles: ["Makine Mühendisi", "Elektrik Mühendisi", "İnşaat Mühendisi", "Yönetici"],
    },
    realities: [
      {
        title: "Yapım yöntemi her projede sıfırdan yazılır.",
        body:
          "Kapsam, sorumluluklar, ekipman, iş adımları, riskler ve muayene planı Word dosyalarında dağınık durur. Onaya sunulan sürüm ile sahada uygulanan sürüm her zaman aynı değildir.",
      },
      {
        title: "Uygunsuzluklar kapanmadan unutulur.",
        body:
          "NCR açılır, düzeltici faaliyet söylenir ama doğrulama ve kapanış kaydı tutulmaz. Hangi NCR'nin açık, hangisinin doğrulama beklediği bir listede görünmez.",
      },
      {
        title: "Test ve devreye alma kayıtları kâğıtta kalır.",
        body:
          "Basınç testi, izolasyon direnci, topraklama ölçümü, kaçak akım rölesi testi ve balanslama sahada formlara yazılır; teslim dosyası hazırlanırken yeniden derlenir.",
      },
      {
        title: "Sertifikası biten personel sahada çalışmaya devam eder.",
        body:
          "Yüksekte çalışma eğitimi, MYK belgesi, operatör belgesi ve sağlık muayenesinin bitiş tarihleri ayrı bir tabloda izlenir; süresi geçen belge çoğu zaman denetimde fark edilir.",
      },
    ],
    approach: [
      {
        feature: "saha-raporlari",
        title: "Yapım yöntemi, bölümleri hazır bir şablonla.",
        body:
          "Kapsam ve referanslar, sorumluluklar, ekipman ve malzemeler, numaralı uygulama adımları ve her adımın kabul kriteri, riskler ve önlemler, muayene ve test planı. Onay durumu ve revizyonla birlikte A4 belge.",
        detail: "YY-MEC-003 · Rev.",
      },
      {
        feature: "saha-raporlari",
        title: "NCR açılır, atanır, doğrulanarak kapanır.",
        body:
          "Kategori (malzeme, işçilik, tasarım, dokümantasyon), önem derecesi (minör, majör, kritik), kök neden, karar ve düzeltici / önleyici faaliyet. Durum açık, düzeltme sürüyor, doğrulama bekliyor ve kapandı olarak ilerler.",
        detail: "NCR-2026-007",
      },
      {
        feature: "saha-raporlari",
        title: "Test kontrol listeleri hazır maddelerle.",
        body:
          "Mekanik ve elektrik kütüphanesinden maddeleri seçin: temiz su basınç testi, sprinkler hattı testi, hava debisi ölçümü, izolasyon direnci, topraklama, kaçak akım, acil aydınlatma, yangın algılama. Sahada işaretleyin, fotoğrafla birlikte PDF alın.",
        detail: "Mekanik · Elektrik",
      },
      {
        feature: "insan-kaynaklari",
        title: "Sertifikalar bitiş tarihiyle izlenir.",
        body:
          "İSG eğitimi, sağlık muayenesi, MYK, yüksekte çalışma, operatör ve ilk yardım belgeleri personel kartında durur. Belge listesi süresi geçmiş ve 30 gün içinde bitecek belgeleri ayrı gösterir.",
        detail: "Geçerli · bitiyor · geçti",
      },
    ],
    workflow: [
      { step: "Keşif", detail: "Poz no'lu kalemler Excel'den aktarılır, malzeme durumu izlenir.", feature: "kesif-ve-is-programi", record: "15.250.1011" },
      { step: "Yapım yöntemi", detail: "Adımlar, riskler ve kabul kriterleri onaya sunulur.", feature: "saha-raporlari", record: "YY-MEC-003" },
      { step: "İmalat", detail: "Günlük rapor ve İSG denetimi sahada tutulur.", feature: "saha-raporlari", record: "İSG-2026-014" },
      { step: "Test ve kontrol", detail: "Basınç, izolasyon, topraklama testleri listede işaretlenir.", feature: "saha-raporlari", record: "KL-2026-021" },
      { step: "NCR kapanışı", detail: "Açık uygunsuzluklar doğrulanıp kapatılır.", feature: "saha-raporlari", record: "DURUM: KAPANDI" },
      { step: "Disiplin onayı", detail: "Mekanik ve elektrik onayı ilgili mühendis tarafından verilir.", feature: "talepler-ve-onaylar", record: "ONAY: MEK / ELK" },
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
      {
        role: "Özel rol",
        label: "Özel rol (ör. İSG uzmanı, kalite kontrol)",
        sees: "Firmanın bu rol için açtığı modüller.",
        does: "İSG denetimi, NCR doğrulama gibi tanımlanan işleri yapar.",
      },
    ],
    modules: ["saha-raporlari", "insan-kaynaklari", "kesif-ve-is-programi", "talepler-ve-onaylar", "envanter-ve-zimmet"],
    faqs: [
      {
        question: "Hangi rapor tipleri var?",
        answer:
          "Altı rapor tipi bulunur: günlük şantiye raporu, İSG raporu, kalite ve uygunsuzluk raporu (NCR), yapım yöntemi, malzeme sunum formu ve kontrol listesi. Hepsi sahada form olarak doldurulur ve A4 belge olarak alınır.",
      },
      {
        question: "Mekanik ve elektrik onayları ayrı mı veriliyor?",
        answer:
          "Evet. Her sahanın mimari, mekanik ve elektrik onayı ayrı tutulur. Makine mühendisi mekanik, elektrik mühendisi elektrik onayını verir; Yönetici ve Bölge Müdürü bütün disiplinleri onaylayabilir.",
      },
      {
        question: "Personelin sertifika bitiş tarihlerini nasıl görürüz?",
        answer:
          "Belgeler personel kartından bitiş tarihiyle eklenir. Belge listesinde geçerlilik filtresi bulunur; süresi geçmiş ve 30 gün içinde bitecek belgeler ayrıca sayılır.",
      },
      {
        question: "Ölçüm cihazlarını ve ekipmanı takip edebilir miyiz?",
        answer:
          "Ekipman, araç, el aleti ve elektronik cihazlar demirbaş no ve seri no ile envantere kaydedilir, personele zimmetlenir. Bakımda ya da hurdaya ayrıldı durumları ve zimmet geçmişi tutulur.",
      },
    ],
    cta: {
      title: "Kalite kayıtlarınızı sahada, belgeye hazır tutun.",
      lede:
        "Yapım yöntemi, NCR ve test kontrol listelerinizi bir projeniz üzerinden birlikte kuralım; şablonların sizin disiplinlerinize nasıl uyduğunu görün.",
    },
  },

  /* ------------------------------------------------------------------ Perakende yatırımları */
  "perakende-yatirimlari": {
    slug: "perakende-yatirimlari",
    code: "PRK",
    hero: {
      title: "Farklı şehirlerdeki mağaza açılışlarını tek takvimde yönetin.",
      lede:
        "Zincir mağaza, ofis ve AVM projeleri yürüten yatırım ve yapı ekipleri için: her lokasyon haritada, açılışa kalan gün panoda, tadilat talepleri kodlu kayıtlarla. Bölge müdürü haritayı kendi bölgesine süzer, merkez portföyün tamamını görür.",
    },
    sheet: {
      scope: "Mağaza · AVM · Cadde · Ofis · Kafe",
      reports: ["Günlük şantiye raporu", "Kontrol listesi", "Malzeme sunumu"],
      roles: ["Yönetici", "Bölge Müdürü", "Saha Sorumlusu", "Mimar", "Muhasebe"],
    },
    realities: [
      {
        title: "Aynı ay içinde farklı şehirlerde birkaç açılış yürür.",
        body:
          "Her açılışın kendi yüklenicisi, şantiye şefi ve teslim tarihi vardır. Hangi mağazanın gecikme riskinde olduğu, Excel'deki açılış listesi güncellenene kadar görünmez.",
      },
      {
        title: "AVM ve cadde lokasyonları farklı takip ister.",
        body:
          "AVM projelerinde kat, birim ve AVM yönetimi çalışma koşulları; cadde mağazalarında adres ve ruhsat. Lokasyon bilgisi farklı kişilerin tablolarında farklı yazılır.",
      },
      {
        title: "Açılıştan sonra tadilat talepleri başlar.",
        body:
          "Açılan mağazadan gelen bakım ve tadilat istekleri telefonla ya da mesajla iletilir; kimin üstlendiği, önceliği ve kapanıp kapanmadığı izlenemez.",
      },
      {
        title: "Bölge müdürleri resmin yalnızca bir kısmını görür.",
        body:
          "Her bölge kendi listesini tutar; merkez portföyün tamamını, bölge müdürü ise yalnızca kendi şehirlerini hızlıca görmek ister. İkisi aynı veriden beslenmez.",
      },
    ],
    approach: [
      {
        feature: "saha-ve-harita",
        title: "Her lokasyon haritada, açılış tarihiyle.",
        body:
          "Mağazayı konumundan ekleyin; şehir ve adres konumdan doldurulur, şehir uyuşmazlığı uyarılır. Saha türü (mağaza, AVM, cadde, ofis, kafe), brüt m², kat sayısı, yüklenici ve şantiye şefi aynı kayıtta.",
        detail: "Konum · tür · m²",
      },
      {
        feature: "saha-ve-harita",
        title: "Açılış takvimi ve gecikme uyarısı.",
        body:
          "Panoda 30 gün içindeki açılışlar, en yakın açılış ve tarihi geçmiş ama açılmamış sahalar ayrı görünür. Açılış eğrisi, planlanan ve gerçekleşen açılışları ay ay karşılaştırır.",
        detail: "7 gün · 30 gün · geciken",
      },
      {
        feature: "talepler-ve-onaylar",
        title: "Tadilat talepleri kodlu kayıtlarla.",
        body:
          "Her talep TT-0042 gibi otomatik kodla açılır; saha, öncelik ve atanan kişiyle birlikte izlenir. Durum açık, devam ediyor, çözüldü ve kapalı olarak ilerler; son 12 haftada açılan ve çözülen talepler grafikte.",
        detail: "TT-0042",
      },
      {
        feature: "saha-ve-harita",
        title: "Bölgeler şehir gruplarıyla tanımlanır.",
        body:
          "Kurucu bölgeleri ve hangi şehirleri kapsadığını belirler. Harita ve pano bölge filtresiyle daraltılır; bölge müdürü kendi bölgesine odaklanırken merkez portföyün tamamını görür.",
        detail: "Bölge filtresi",
      },
    ],
    workflow: [
      { step: "Lokasyon", detail: "Mağaza haritaya eklenir, AVM ya da cadde türü seçilir.", feature: "saha-ve-harita", record: "DURUM: PROJE" },
      { step: "Proje onayları", detail: "Mimari, mekanik ve elektrik onayları ayrı ayrı verilir.", feature: "talepler-ve-onaylar", record: "3 DİSİPLİN" },
      { step: "İhale ve sözleşme", detail: "Yüklenici seçilir, sahaya bağlı sözleşme açılır.", feature: "hakedis-ve-finans", record: "SZ-0012" },
      { step: "Şantiye", detail: "İş programı ve keşif yüklenir, günlük rapor başlar.", feature: "kesif-ve-is-programi", record: "DURUM: ŞANTİYE" },
      { step: "Açılış", detail: "Açılış öncesi kontrol listesi kapanır, mağaza açılır.", feature: "saha-raporlari", record: "14.11.2026" },
      { step: "Tadilat talepleri", detail: "Açılan mağazadan gelen talepler kodla açılır, atanır.", feature: "talepler-ve-onaylar", record: "TT-0042" },
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
        sees: "Bölge filtresiyle kendi şehirlerindeki mağazalar ve açılışlar.",
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
          "Panodaki açılış takvimi henüz açılmamış sahaları açılışa kalan güne göre sıralar; 7 gün içinde, 30 gün içinde ve geciken olarak gruplar. Tarihi geçen sahalar gecikme gün sayısıyla gösterilir.",
      },
      {
        question: "Bölge müdürleri yalnızca kendi bölgelerini görebilir mi?",
        answer:
          "Bölgeler şehir gruplarıyla tanımlanır; harita ve pano bölge filtresiyle daraltılır ve filtre hatırlanabilir. Kullanıcının hangi modülleri görüp düzenleyebileceği rol bazlı yetki matrisinden ayarlanır.",
      },
      {
        question: "Tadilat talebi kodlarını kendi formatımıza göre ayarlayabilir miyiz?",
        answer:
          "Talepler varsayılan olarak TT-0001 biçiminde sıralı kod alır; ön ek firma ayarlarından değiştirilebilir. Sözleşmeler de aynı şekilde SZ ön ekiyle kodlanır.",
      },
      {
        question: "Mağaza portföyümüz hakkında soru sorabilir miyiz?",
        answer:
          "Yapay zekâ asistanına “önümüzdeki 30 günde açılacak sahalar hangileri?” gibi sorular sorabilirsiniz. Asistan firma verinize göre cevap verir; tadilat talebi açmasını isterseniz önce önizleme gösterir, onaylarsanız kayıt eklenir.",
      },
    ],
    cta: {
      title: "Açılış takviminizi haritada birlikte kuralım.",
      lede:
        "Mevcut mağaza listenizi getirin; görüşmede lokasyonlarınızı haritada, açılışlarınızı takvimde ve taleplerinizi kodlu kayıtlarla gösterelim.",
    },
  },
};

export type SolutionWithDetail = Solution & { detail: SolutionDetail };

export const solutionsWithDetails: SolutionWithDetail[] = solutions.map((s) => ({ ...s, detail: solutionDetails[s.slug] }));

export const solutionDetailBySlug = (slug: string): SolutionWithDetail | undefined =>
  solutionsWithDetails.find((s) => s.slug === slug);
