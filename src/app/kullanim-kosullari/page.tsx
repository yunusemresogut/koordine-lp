import Link from "next/link";
import { LegalEntity } from "@/components/legal/legal-entity";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Kullanım Koşulları";
const description =
  "Koordine platformunun ve internet sitesinin kullanım koşulları: hesaplar, yetkiler, müşteri verileri, yapay zekâ asistanı ve sorumluluğun sınırları.";

export const metadata = pageMetadata({ title, description, path: "/kullanim-kosullari", defaultOgImage: true });

export default function TermsPage() {
  const appHost = site.appUrl.replace(/^https?:\/\//, "");
  const city = site.company.city;

  const sections: LegalSection[] = [
    {
      id: "taraflar",
      title: "Taraflar ve kapsam",
      content: (
        <>
          <p>
            Bu Kullanım Koşulları; <LegalEntity /> (&quot;Koordine&quot;) tarafından {appHost} adresinden sunulan saha, proje
            ve şantiye yönetimi platformunun (&quot;Platform&quot;) ve {site.url.replace(/^https?:\/\//, "")} internet
            sitesinin kullanımına ilişkin kuralları belirler.
          </p>
          <p>
            Platformu kullanan firma ile Koordine arasında ayrıca bir hizmet sözleşmesi veya teklif mutabakatı bulunabilir.
            Bu koşullar ile söz konusu sözleşme arasında farklılık olması hâlinde sözleşme hükümleri uygulanır.
          </p>
        </>
      ),
    },
    {
      id: "tanimlar",
      title: "Tanımlar",
      content: (
        <ul>
          <li>
            <strong>Müşteri:</strong> Platformu kendi işi için kullanan ve firma hesabı açılan tüzel veya gerçek kişi.
          </li>
          <li>
            <strong>Kurucu kullanıcı:</strong> Firma hesabını açan, kullanıcıları ekleyen, rolleri ve yetkileri belirleyen
            Müşteri yetkilisi.
          </li>
          <li>
            <strong>Kullanıcı:</strong> Müşteri tarafından Platform&apos;a erişim tanımlanan kişi.
          </li>
          <li>
            <strong>Müşteri içeriği:</strong> Müşteri ve kullanıcıların Platform&apos;a girdiği her türlü kayıt, belge,
            fotoğraf, dosya ve mesaj.
          </li>
        </ul>
      ),
    },
    {
      id: "hesaplar",
      title: "Hesaplar, roller ve erişim",
      content: (
        <ul>
          <li>
            Kullanıcı hesaplarının oluşturulması, rollerin atanması ve modül bazındaki görüntüleme, ekleme, düzenleme ve silme
            yetkilerinin belirlenmesi Müşteri&apos;nin sorumluluğundadır.
          </li>
          <li>Her hesap tek bir kişiye aittir; hesap bilgileri başkalarıyla paylaşılamaz.</li>
          <li>
            Platform&apos;da her hesap için tek aktif oturum bulunur. Aynı hesapla başka bir cihaz veya tarayıcıdan giriş
            yapıldığında önceki oturum kapatılır.
          </li>
          <li>
            Kullanıcılar şifrelerinin gizliliğinden sorumludur. Yetkisiz kullanım şüphesi hâlinde firma yöneticisine ve{" "}
            <a href={`mailto:${site.email.support}`}>{site.email.support}</a> adresine derhâl bilgi verilmelidir.
          </li>
        </ul>
      ),
    },
    {
      id: "kurallar",
      title: "Kullanım kuralları",
      content: (
        <>
          <p>Platform&apos;u kullanırken aşağıdakileri yapmamayı kabul edersiniz:</p>
          <ul>
            <li>Hukuka, üçüncü kişilerin haklarına veya kişisel verilerin korunması mevzuatına aykırı içerik yüklemek,</li>
            <li>Yetkiniz olmayan verilere erişmeye, güvenlik önlemlerini aşmaya veya test etmeye çalışmak,</li>
            <li>Platform&apos;un işleyişini aksatacak otomatik istekler göndermek, zararlı yazılım yüklemek,</li>
            <li>Platform&apos;u tersine mühendislikle çözümlemek, kopyalamak veya üçüncü kişilere yeniden satmak.</li>
          </ul>
          <p>
            Bu kurallara aykırılık hâlinde Koordine, ilgili hesabın erişimini Müşteri&apos;yi bilgilendirerek geçici olarak
            kısıtlayabilir.
          </p>
        </>
      ),
    },
    {
      id: "musteri-icerigi",
      title: "Müşteri içeriği ve kişisel veriler",
      content: (
        <>
          <p>
            Müşteri içeriği Müşteri&apos;ye aittir. Koordine, müşteri içeriğini yalnızca Platform hizmetini sunmak,
            desteklemek ve güvenliğini sağlamak için gereken ölçüde işler.
          </p>
          <p>
            Müşteri içeriğindeki kişisel veriler bakımından Müşteri veri sorumlusu, Koordine veri işleyendir. Müşteri;
            çalışanlarını ve diğer ilgili kişileri aydınlatmak, gerekli hâllerde açık rıza almak ve Platform&apos;a yüklediği
            verilerin hukuka uygunluğunu sağlamakla yükümlüdür. Ayrıntılar için{" "}
            <Link href="/kvkk">KVKK Aydınlatma Metni</Link> ve <Link href="/gizlilik">Gizlilik Politikası</Link>&apos;na bakınız.
          </p>
        </>
      ),
    },
    {
      id: "yapay-zeka",
      title: "Yapay zekâ asistanı",
      content: (
        <ul>
          <li>Asistanın yanıtları bilgi ve öneri niteliğindedir; hatalı veya eksik olabilir.</li>
          <li>
            Asistanın önerdiği kayıtlar yalnızca kullanıcı önizlemeyi onayladığında eklenir. Onaylanan kaydın doğruluğundan
            onaylayan kullanıcı ve Müşteri sorumludur.
          </li>
          <li>Önemli teknik, finansal ve hukuki kararlarda verilerin ayrıca kontrol edilmesi gerekir.</li>
          <li>Müşteri, asistanı veya asistanla kayıt eklemeyi firma ayarlarından kapatabilir.</li>
        </ul>
      ),
    },
    {
      id: "ucretler",
      title: "Ücretler",
      content: (
        <p>
          Platform ücretleri; kullanıcı sayısı ve kullanılan modüllere göre Müşteri&apos;ye özel olarak hazırlanan teklif veya
          sözleşmede belirlenir. Ödeme koşulları ve süreleri bu belgelerde yer alır.
        </p>
      ),
    },
    {
      id: "hizmet",
      title: "Hizmetin sürekliliği ve değişiklikler",
      content: (
        <>
          <p>
            Koordine, Platform&apos;un kesintisiz ve hatasız çalışması için makul çabayı gösterir. Bakım, güncelleme veya
            altyapı sağlayıcılarından kaynaklanan durumlarda hizmet geçici olarak kesintiye uğrayabilir. Hizmet seviyesine
            ilişkin özel taahhütler yalnızca Müşteri ile yapılan sözleşmede yer alması hâlinde geçerlidir.
          </p>
          <p>
            Koordine, Platform&apos;un özelliklerini geliştirebilir veya değiştirebilir. Müşteri&apos;nin kullandığı temel
            işlevleri önemli ölçüde etkileyen değişiklikler makul bir süre önceden duyurulur.
          </p>
        </>
      ),
    },
    {
      id: "fikri-mulkiyet",
      title: "Fikri mülkiyet",
      content: (
        <p>
          Platform&apos;un yazılımı, arayüzü, tasarımı, &quot;Koordine&quot; adı ve logosu Koordine&apos;ye aittir. Bu koşullar,
          Müşteri&apos;ye Platform&apos;u sözleşme süresince kendi iç işleri için kullanma hakkı verir; başka bir hak
          devretmez.
        </p>
      ),
    },
    {
      id: "sorumluluk",
      title: "Sorumluluğun sınırlandırılması",
      content: (
        <p>
          Koordine, Platform&apos;a girilen verilerin doğruluğundan, Müşteri&apos;nin Platform&apos;daki bilgilere dayanarak
          aldığı kararlardan ve dolaylı zararlardan (kâr kaybı, veri kaybı, iş kesintisi gibi) sorumlu tutulamaz. Kasıt ve
          ağır ihmal hâlleri ile emredici mevzuat hükümleri saklıdır. Sorumluluğun üst sınırı Müşteri ile yapılan sözleşmede
          belirlenir.
        </p>
      ),
    },
    {
      id: "sona-erme",
      title: "Sona erme ve verilerin iadesi",
      content: (
        <p>
          Taraflar sözleşmede belirlenen koşullarla ilişkiyi sona erdirebilir. Sona ermeden önce Müşteri, verilerini
          Platform&apos;un dışa aktarma imkânlarıyla alabilir veya bu konuda destek ekibinden yardım isteyebilir. Sözleşmenin
          sona ermesinden sonra müşteri içeriği, sözleşmede ve mevzuatta belirlenen süreler sonunda silinir veya anonim hâle
          getirilir.
        </p>
      ),
    },
    {
      id: "hukuk",
      title: "Uygulanacak hukuk ve yetki",
      content: (
        <p>
          Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda, tüketici işlemlerine ilişkin emredici hükümler
          saklı kalmak kaydıyla, {city ? `${city} mahkemeleri ve icra daireleri` : "Koordine'nin merkezinin bulunduğu yer mahkemeleri ve icra daireleri"}{" "}
          yetkilidir.
        </p>
      ),
    },
    {
      id: "degisiklikler",
      title: "Koşullarda değişiklik ve iletişim",
      content: (
        <p>
          Koordine bu koşulları güncelleyebilir; güncel metin bu sayfada son güncelleme tarihiyle yayımlanır. Önemli
          değişiklikler Müşteri&apos;ye ayrıca bildirilir. Sorularınız için{" "}
          <a href={`mailto:${site.email.support}`}>{site.email.support}</a> adresine yazabilirsiniz.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title={title}
      lede="Koordine platformunu ve internet sitesini kullanırken geçerli olan kuralları, tarafların sorumluluklarını ve haklarını açıklar."
      path="/kullanim-kosullari"
      crumb="Kullanım Koşulları"
      code="YS-04"
      description={description}
      sections={sections}
    />
  );
}
