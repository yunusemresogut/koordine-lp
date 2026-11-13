/**
 * Sık sorulan sorular. /sss sayfası ve FAQPage şeması buradan beslenir;
 * ana sayfa `featuredFaq` ile kısa bir seçki gösterebilir.
 *
 * Kurallar: Cevaplar düz metindir (JSON-LD'ye aynen yazılır), paragraflar "\n\n" ile ayrılır.
 * Yalnızca uygulamada doğrulanmış yetenekler yazılır. Barındırma yeri, sertifika, SLA,
 * fiyat gibi netleşmemiş konularda kesin ifade kullanılmaz.
 */

export type FaqCategoryId = "genel" | "moduller" | "veri-ve-guvenlik" | "kurulum-ve-destek" | "fiyatlandirma";

export type FaqCategory = { id: FaqCategoryId; label: string };

export type FaqItem = {
  /** Sayfa içi bağlantı için kalıcı kimlik (#id) */
  id: string;
  category: FaqCategoryId;
  question: string;
  answer: string;
};

export const faqCategories: FaqCategory[] = [
  { id: "genel", label: "Genel" },
  { id: "moduller", label: "Modüller" },
  { id: "veri-ve-guvenlik", label: "Veri ve güvenlik" },
  { id: "kurulum-ve-destek", label: "Kurulum ve destek" },
  { id: "fiyatlandirma", label: "Fiyatlandırma" },
];

export const faq: FaqItem[] = [
  /* Genel */
  {
    id: "koordine-nedir",
    category: "genel",
    question: "Koordine nedir?",
    answer:
      "Koordine, mühendislik, mimarlık ve taahhüt firmalarının saha, proje ve şantiye işlerini yönetmesi için geliştirilmiş web tabanlı bir yazılımdır. Saha ve harita, keşif ve iş programı, hakediş ve finans, saha raporları, talepler ve onaylar, insan kaynakları, envanter, ekip iletişimi ve yapay zekâ asistanı olmak üzere 9 modülden oluşur.",
  },
  {
    id: "kimler-icin",
    category: "genel",
    question: "Koordine hangi firmalar için uygun?",
    answer:
      "Aynı anda birden fazla saha ya da şantiye yürüten ekipler için tasarlandı. İnşaat ve taahhüt firmaları, mimarlık ofisleri, mühendislik ve MEP ekipleri ile mağaza yatırımı yapan perakende firmaları kullanabilir. Mühendis, mimar, saha sorumlusu, bölge müdürü ve muhasebe için hazır roller vardır.",
  },
  {
    id: "mobil-kullanim",
    category: "genel",
    question: "Telefon veya tabletten kullanılabilir mi?",
    answer:
      "Koordine web tabanlıdır, kurulum gerektirmez ve güncel bir tarayıcıdan açılır. Ayrı bir mobil uygulaması (App Store, Google Play) yoktur. Saha ekibinizin telefon ve tabletle nasıl çalışacağını demo görüşmesinde birlikte değerlendirebiliriz.",
  },
  {
    id: "diller",
    category: "genel",
    question: "Hangi dilleri destekliyor?",
    answer:
      "Arayüz Türkçe ve İngilizce kullanılabilir. Dil üst menüden değiştirilir ve cihazda saklanır, yani aynı firmada farklı dillerde çalışan kullanıcılar olabilir.",
  },

  /* Modüller */
  {
    id: "rapor-tipleri",
    category: "moduller",
    question: "Hangi saha raporlarını hazırlayabiliriz?",
    answer:
      "6 rapor tipi var: günlük saha raporu, İSG raporu, uygunsuzluk (NCR), yapım yöntemi (method statement), malzeme sunumu (submittal) ve kontrol listesi. Raporlara fotoğraf eklenebilir ve A4 belge olarak paylaşılabilir.",
  },
  {
    id: "para-birimleri",
    category: "moduller",
    question: "Hangi para birimleriyle çalışabiliriz?",
    answer:
      "Sözleşme, hakediş, fatura ve keşif kalemlerinde TRY, USD, EUR, GBP ve CHF kullanılabilir. Koordine kur çevrimi yapmaz. Bu yüzden farklı para birimlerindeki tutarlar toplanmaz, her para biriminin toplamı ayrı gösterilir.",
  },
  {
    id: "modul-secimi",
    category: "moduller",
    question: "Kullanmadığımız modülleri kapatabilir miyiz?",
    answer:
      "Evet. Firma yöneticisi tadilat talepleri, sözleşmeler, hakedişler, faturalar, ekip sohbeti ve insan kaynakları gibi modülleri ayarlardan kapatabilir. Kapatılan modül menüde görünmez.",
  },
  {
    id: "yapay-zeka-ne-yapar",
    category: "moduller",
    question: "Yapay zekâ asistanı ne yapar?",
    answer:
      "Asistana sahalarınız, açılış takviminiz, iş planlarınız ve finans kayıtlarınız hakkında soru sorabilirsiniz. Saha, tadilat talebi, iş planı kalemi ya da keşif kalemi eklemesini de isteyebilirsiniz. Asistan önce önizleme hazırlar, kayıt yalnızca siz onaylarsanız eklenir.",
  },

  /* Veri ve güvenlik */
  {
    id: "yapay-zeka-veri",
    category: "veri-ve-guvenlik",
    question: "Yapay zekâ asistanı verilerimizi nasıl kullanıyor?",
    answer:
      "Asistan sorularınızı firmanızın Koordine'deki kayıtlarına göre cevaplar. Kullanıcı yetkileri asistanda da geçerlidir, yani yetkiniz olmayan bir kaydı asistanla da ekleyemezsiniz.\n\nYapay zekâ hata yapabilir, önemli kararlarda verileri kontrol etmenizi öneririz. Firma yöneticisi asistanı ya da asistanla kayıt eklemeyi ayarlardan kapatabilir. Sorular, cevabın üretilmesi için yapay zekâ hizmet sağlayıcısına iletilir. Ayrıntılar KVKK Aydınlatma Metni'nde yer alır.",
  },
  {
    id: "roller-yetkiler",
    category: "veri-ve-guvenlik",
    question: "Roller ve yetkiler nasıl çalışıyor?",
    answer:
      "Kurucu, yönetici, bölge müdürü, saha sorumlusu, mimar, inşaat, makine ve elektrik mühendisi ile muhasebe için hazır roller vardır. Firmanıza özel rol de tanımlayabilirsiniz. Her modülde görüntüleme, ekleme, düzenleme ve silme yetkisi rol ve kullanıcı bazında ayrı ayarlanır.",
  },
  {
    id: "tek-oturum",
    category: "veri-ve-guvenlik",
    question: "Aynı hesapla birden fazla cihazdan giriş yapılabilir mi?",
    answer:
      "Hayır. Her hesap için tek aktif oturum vardır. Aynı hesapla başka bir cihazdan giriş yapılırsa önceki oturum kapanır ve kullanıcıya bilgi verilir. Böylece hesap paylaşımı ve açık unutulan oturumlar sınırlanır.",
  },
  {
    id: "veri-saklama",
    category: "veri-ve-guvenlik",
    question: "Verilerimiz nerede saklanıyor, hangi güvenlik önlemleri var?",
    answer:
      "Platformla tüm iletişim şifreli bağlantı (HTTPS) üzerinden yapılır. Erişim rol bazlı yetkilerle ve tek aktif oturum kuralıyla sınırlanır. Barındırma konumu, yedekleme, sertifikalar ve hizmet seviyesi hakkında ayrıntılı bilgiyi destek ekibimizden alabilirsiniz.",
  },

  /* Kurulum ve destek */
  {
    id: "excel-aktarim",
    category: "kurulum-ve-destek",
    question: "Mevcut Excel dosyalarımızı aktarabilir miyiz?",
    answer:
      "Evet. Keşif kalemleri (poz no, açıklama, miktar, birim, birim fiyat, para birimi) ve iş programı Excel'den içe aktarılabilir. Sütunlar dosyanızdaki başlıklara göre eşleştirilir, hatalı satırlar aktarımdan önce gösterilir. Diğer verilerin aktarımını demo görüşmesinde birlikte planlayabiliriz.",
  },
  {
    id: "nasil-baslanir",
    category: "kurulum-ve-destek",
    question: "Koordine'yi kullanmaya nasıl başlarız?",
    answer:
      "Önce kısa bir demo görüşmesi yaparız. Ardından firma hesabınız açılır. Kurucu kullanıcı ekibi ekler, rolleri belirler ve kullanılacak modülleri seçer. Keşif ve iş programı gibi verilerinizi Excel'den aktararak başlayabilirsiniz.",
  },
  {
    id: "destek",
    category: "kurulum-ve-destek",
    question: "Destek nasıl alabiliriz?",
    answer:
      "Sorularınız ve destek talepleriniz için destek@koordine.com.tr adresine yazabilirsiniz. Başlangıçta rol yapısı, modül seçimi ve veri aktarımında ekibinizle birlikte ilerliyoruz.",
  },

  /* Fiyatlandırma */
  {
    id: "fiyat",
    category: "fiyatlandirma",
    question: "Koordine'nin fiyatı nedir?",
    answer:
      "Fiyat, kullanıcı sayınıza ve kullanmak istediğiniz modüllere göre teklif olarak hazırlanır. Sitede sabit bir fiyat listesi yayımlamıyoruz. Teklif için iletişim formundan ya da destek@koordine.com.tr adresinden bize ulaşabilirsiniz.",
  },
  {
    id: "demo",
    category: "fiyatlandirma",
    question: "Satın almadan önce ürünü görebilir miyiz?",
    answer:
      "Evet. Demo görüşmesinde Koordine'yi sizin işinize benzer bir örnek üzerinden gösteriyor ve sorularınızı cevaplıyoruz. Talebinizi iletişim sayfasındaki formdan iletebilirsiniz.",
  },
  {
    id: "teklif-icerigi",
    category: "fiyatlandirma",
    question: "Teklif hazırlamak için hangi bilgilere ihtiyacınız var?",
    answer:
      "Yaklaşık kullanıcı sayısı, ilgilendiğiniz modüller, saha ya da proje sayınız ve aktarmak istediğiniz veriler yeterlidir. Bunları demo formunda paylaşırsanız görüşmeye hazırlıklı geliriz.",
  },
];

/** Ana sayfa vb. için kısa seçki (4–5 soru) */
const FEATURED_IDS = ["koordine-nedir", "excel-aktarim", "yapay-zeka-veri", "mobil-kullanim", "fiyat"];

export const featuredFaq: FaqItem[] = FEATURED_IDS.map((id) => faq.find((q) => q.id === id)).filter(
  (q): q is FaqItem => Boolean(q)
);

export const faqByCategory = (id: FaqCategoryId) => faq.filter((q) => q.category === id);
