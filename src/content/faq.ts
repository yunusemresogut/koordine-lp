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
  /* ---------- Genel ---------- */
  {
    id: "koordine-nedir",
    category: "genel",
    question: "Koordine nedir?",
    answer:
      "Koordine; mühendislik, mimarlık ve taahhüt firmalarının saha, proje ve şantiye işlerini tek platformda yönetmesi için geliştirilmiş web tabanlı bir yazılımdır. Saha ve harita takibi, keşif ve iş programı, hakediş ve finans, saha raporları, talepler ve onaylar, insan kaynakları, envanter ve zimmet, ekip iletişimi ve yapay zekâ asistanı olmak üzere 9 modülden oluşur.",
  },
  {
    id: "kimler-icin",
    category: "genel",
    question: "Koordine hangi firmalar için uygun?",
    answer:
      "Birden fazla saha veya şantiyeyi aynı anda yürüten ekipler için tasarlandı: inşaat ve taahhüt firmaları, mimarlık ofisleri, mühendislik ve MEP ekipleri ile mağaza ve şube yatırımlarını yöneten perakende firmaları. Hazır roller arasında mühendis, mimar, saha sorumlusu, bölge müdürü ve muhasebe gibi sahadaki ve ofisteki görevler yer alır.",
  },
  {
    id: "mobil-kullanim",
    category: "genel",
    question: "Telefon veya tabletten kullanılabilir mi?",
    answer:
      "Koordine web tabanlıdır; kurulum gerektirmez ve güncel bir tarayıcıdan erişilir. Ayrı bir mobil uygulaması (App Store / Google Play) bulunmaz. Saha ekiplerinizin telefon ve tabletle çalışma senaryolarını demo görüşmesinde kendi akışınız üzerinden birlikte değerlendirebiliriz.",
  },
  {
    id: "diller",
    category: "genel",
    question: "Hangi dilleri destekliyor?",
    answer:
      "Arayüz Türkçe ve İngilizce kullanılabilir. Dil, uygulamanın üst menüsünden değiştirilir ve kullanılan cihazda saklanır; aynı firmada farklı dillerde çalışan kullanıcılar bulunabilir.",
  },

  /* ---------- Modüller ---------- */
  {
    id: "rapor-tipleri",
    category: "moduller",
    question: "Hangi saha raporlarını hazırlayabiliriz?",
    answer:
      "6 rapor tipi bulunur: günlük saha raporu, İSG raporu, uygunsuzluk (NCR) raporu, yapım yöntemi (method statement), malzeme sunumu (submittal) ve kontrol listesi. Raporlar saha kaydına bağlanır, fotoğraf eklenebilir ve A4 belge düzeninde paylaşılabilir.",
  },
  {
    id: "para-birimleri",
    category: "moduller",
    question: "Hangi para birimleriyle çalışabiliriz?",
    answer:
      "Sözleşme, hakediş, fatura ve keşif kalemlerinde TRY, USD, EUR, GBP ve CHF kullanılabilir. Her kayıt kendi para birimini taşır. Koordine kur çevrimi yapmaz; farklı birimlerdeki tutarlar birbirine eklenmez, toplamlar her para birimi için ayrı gösterilir.",
  },
  {
    id: "modul-secimi",
    category: "moduller",
    question: "Kullanmadığımız modülleri kapatabilir miyiz?",
    answer:
      "Evet. Firma yöneticisi tadilat talepleri, sözleşmeler, hakedişler, faturalar, ekip sohbeti ve insan kaynakları gibi modülleri ayarlardan açıp kapatabilir. Kapatılan modül kullanıcıların menüsünde görünmez.",
  },
  {
    id: "yapay-zeka-ne-yapar",
    category: "moduller",
    question: "Yapay zekâ asistanı ne yapar?",
    answer:
      "Asistana sahalarınız, açılış takviminiz, iş planlarınız ve finans kayıtlarınız hakkında doğal dille soru sorabilirsiniz. Ayrıca saha, tadilat talebi, iş planı kalemi veya keşif kalemi eklemesini isteyebilirsiniz; asistan önce bir önizleme hazırlar, kayıt yalnızca siz onaylarsanız eklenir.",
  },

  /* ---------- Veri ve güvenlik ---------- */
  {
    id: "yapay-zeka-veri",
    category: "veri-ve-guvenlik",
    question: "Yapay zekâ asistanı verilerimizi nasıl kullanıyor?",
    answer:
      "Asistan, sorularınızı firmanızın Koordine'deki kayıtlarına göre yanıtlar. Kullanıcı yetkileri asistanda da geçerlidir; yetkiniz olmayan bir kaydı asistan üzerinden de ekleyemezsiniz. Kayıt ekleme her zaman önizleme ve onay adımından geçer.\n\nYapay zekâ hata yapabilir; önemli kararlarda verileri kontrol etmenizi öneririz. Firma yöneticisi asistanı ya da asistanla kayıt eklemeyi ayarlardan tamamen kapatabilir. Sorular, yanıtın üretilmesi için yapay zekâ hizmet sağlayıcısına iletilir; ayrıntılar KVKK Aydınlatma Metni'nde yer alır.",
  },
  {
    id: "roller-yetkiler",
    category: "veri-ve-guvenlik",
    question: "Roller ve yetkiler nasıl çalışıyor?",
    answer:
      "Kurucu, yönetici, bölge müdürü, saha sorumlusu, mimar, inşaat, makine ve elektrik mühendisi ile muhasebe gibi hazır roller bulunur; firmanıza özel roller de tanımlayabilirsiniz. Her modül için görüntüleme, ekleme, düzenleme ve silme yetkileri rol ve kullanıcı bazında ayrı ayrı ayarlanır.",
  },
  {
    id: "tek-oturum",
    category: "veri-ve-guvenlik",
    question: "Aynı hesapla birden fazla cihazdan giriş yapılabilir mi?",
    answer:
      "Hayır. Koordine'de her hesap için tek aktif oturum bulunur. Aynı hesapla başka bir cihaz veya tarayıcıdan giriş yapıldığında önceki oturum kapatılır ve kullanıcı bu konuda bilgilendirilir. Böylece paylaşılan hesap kullanımı ve unutulan açık oturumlar sınırlanır.",
  },
  {
    id: "veri-saklama",
    category: "veri-ve-guvenlik",
    question: "Verilerimiz nerede saklanıyor, hangi güvenlik önlemleri var?",
    answer:
      "Platformla tüm iletişim şifreli bağlantı (HTTPS) üzerinden yapılır; erişim rol bazlı yetkilerle ve tek aktif oturum kuralıyla sınırlandırılır. Barındırma konumu, yedekleme, sertifikalar ve hizmet seviyesi taahhütleri hakkında ayrıntılı bilgiyi destek ekibimizden alabilirsiniz.",
  },

  /* ---------- Kurulum ve destek ---------- */
  {
    id: "excel-aktarim",
    category: "kurulum-ve-destek",
    question: "Mevcut Excel dosyalarımızı aktarabilir miyiz?",
    answer:
      "Evet. Keşif kalemleri (poz no, açıklama, miktar, birim, birim fiyat, para birimi) ve iş programı (iş tanımı, başlangıç ve bitiş tarihleri, sorumlu, durum, WBS ve aktivite kodu, öncül işler) Excel'den içe aktarılabilir. Sütunlar dosyanızdaki başlıklara göre eşleştirilir ve hatalı satırlar aktarımdan önce gösterilir. Puantaj ve İK raporları da Excel olarak dışa aktarılabilir. Diğer verilerinizin aktarımını demo görüşmesinde birlikte planlayabiliriz.",
  },
  {
    id: "nasil-baslanir",
    category: "kurulum-ve-destek",
    question: "Koordine'yi kullanmaya nasıl başlarız?",
    answer:
      "Önce kısa bir demo görüşmesi yaparız. Ardından firma hesabınız açılır; kurucu kullanıcı ekip üyelerini ekler, rollerini ve yetkilerini belirler, kullanılacak modülleri seçer. Keşif ve iş programı gibi mevcut verilerinizi Excel'den aktararak başlayabilirsiniz. Kurulum gerektiren bir yazılım yoktur; platform tarayıcıdan çalışır.",
  },
  {
    id: "destek",
    category: "kurulum-ve-destek",
    question: "Destek nasıl alabiliriz?",
    answer:
      "Sorularınız ve destek talepleriniz için destek@koordine.com.tr adresine yazabilirsiniz. Başlangıç sürecinde rol yapısı, modül seçimi ve veri aktarımında ekibinizle birlikte ilerliyoruz.",
  },

  /* ---------- Fiyatlandırma ---------- */
  {
    id: "fiyat",
    category: "fiyatlandirma",
    question: "Koordine'nin fiyatı nedir?",
    answer:
      "Fiyatlandırma; firmanızın kullanıcı sayısına ve kullanmak istediğiniz modüllere göre teklif olarak hazırlanır. Sitede sabit bir fiyat listesi yayımlamıyoruz. Teklif için iletişim formundan ya da destek@koordine.com.tr adresinden bize ulaşabilirsiniz.",
  },
  {
    id: "demo",
    category: "fiyatlandirma",
    question: "Satın almadan önce ürünü görebilir miyiz?",
    answer:
      "Evet. Demo görüşmesinde Koordine'yi sizin proje ve saha akışınıza yakın bir senaryo üzerinden gösteriyor, sorularınızı yanıtlıyoruz. Demo talebini iletişim sayfasındaki formdan iletebilirsiniz.",
  },
  {
    id: "teklif-icerigi",
    category: "fiyatlandirma",
    question: "Teklif hazırlamak için hangi bilgilere ihtiyacınız var?",
    answer:
      "Yaklaşık kullanıcı sayısı, ilgilendiğiniz modüller, yönettiğiniz saha veya proje sayısı ve aktarmak istediğiniz mevcut veriler teklifin kapsamını belirlemeye yeterlidir. Bu bilgileri demo formunda paylaşırsanız görüşmeye hazırlıklı geliriz.",
  },
];

/** Ana sayfa vb. için kısa seçki (4–5 soru) */
const FEATURED_IDS = ["koordine-nedir", "excel-aktarim", "yapay-zeka-veri", "mobil-kullanim", "fiyat"];

export const featuredFaq: FaqItem[] = FEATURED_IDS.map((id) => faq.find((q) => q.id === id)).filter(
  (q): q is FaqItem => Boolean(q)
);

export const faqByCategory = (id: FaqCategoryId) => faq.filter((q) => q.category === id);
