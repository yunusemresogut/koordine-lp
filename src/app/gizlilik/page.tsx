import Link from "next/link";
import { LegalEntity } from "@/components/legal/legal-entity";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Gizlilik Politikası";
const description =
  "Koordine internet sitesi ve platformunda bilgilerin nasıl toplandığı, kullanıldığı, korunduğu ve paylaşıldığına ilişkin gizlilik politikası.";

export const metadata = pageMetadata({ title, description, path: "/gizlilik", defaultOgImage: true });

export default function PrivacyPage() {
  const host = site.url.replace(/^https?:\/\//, "");
  const appHost = site.appUrl.replace(/^https?:\/\//, "");

  const sections: LegalSection[] = [
    {
      id: "kapsam",
      title: "Kapsam",
      content: (
        <>
          <p>
            Bu politika, <LegalEntity /> tarafından işletilen {host} internet sitesi (&quot;Site&quot;) ile {appHost}{" "}
            adresinden sunulan Koordine platformu (&quot;Platform&quot;) için geçerlidir. Kişisel verilerin işlenmesine
            ilişkin yasal aydınlatma <Link href="/kvkk">KVKK Aydınlatma Metni</Link>&apos;nde yer alır; bu politika aynı
            konuları günlük dille özetler ve tamamlar.
          </p>
        </>
      ),
    },
    {
      id: "toplanan-bilgiler",
      title: "Hangi bilgileri topluyoruz?",
      content: (
        <>
          <h3>Sitede</h3>
          <ul>
            <li>
              <strong>Formla ilettikleriniz:</strong> Demo veya iletişim formunda yazdığınız ad soyad, iş e-postası, firma,
              telefon, firma tipi, ekip büyüklüğü, ilgilendiğiniz modüller ve mesajınız.
            </li>
            <li>
              <strong>Teknik kayıtlar:</strong> Barındırma altyapısının güvenlik ve işletim amacıyla tuttuğu IP adresi,
              tarayıcı bilgisi ve erişim zamanı gibi kayıtlar.
            </li>
            <li>
              <strong>Anonim ölçüm:</strong> Hangi sayfaların görüntülendiğine dair, kişiyi tanımlamayan toplu istatistikler.
              Ayrıntılar <Link href="/cerez-politikasi">Çerez Politikası</Link>&apos;nda.
            </li>
          </ul>
          <h3>Platformda</h3>
          <ul>
            <li>
              <strong>Hesap bilgileri:</strong> Ad soyad, e-posta adresi, rol ve yetkiler, isteğe bağlı profil fotoğrafı.
            </li>
            <li>
              <strong>Müşteri içeriği:</strong> Firmanızın platforma girdiği sahalar, keşif ve iş programı kalemleri,
              sözleşme, hakediş ve fatura kayıtları, saha raporları, fotoğraflar, dosyalar, talepler, insan kaynakları
              kayıtları, envanter ve sohbet mesajları.
            </li>
            <li>
              <strong>Kullanım ve güvenlik kayıtları:</strong> Oturum bilgileri, giriş zamanları ve platformdaki işlem
              kayıtları.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "kullanim",
      title: "Bilgileri nasıl kullanıyoruz?",
      content: (
        <ul>
          <li>Demo ve teklif taleplerinize yanıt vermek, görüşme planlamak,</li>
          <li>Platform hizmetini sunmak, hesabınızı ve oturumunuzu yönetmek,</li>
          <li>Bildirimleri iletmek ve destek taleplerinizi yanıtlamak,</li>
          <li>Site ve platform güvenliğini sağlamak, kötüye kullanımı önlemek, hataları gidermek,</li>
          <li>Sitenin ve ürünün hangi bölümlerinin kullanıldığını toplu olarak anlamak ve iyileştirmek.</li>
        </ul>
      ),
    },
    {
      id: "musteri-verisi",
      title: "Platformdaki müşteri verileri",
      content: (
        <>
          <p>
            Firmanızın platforma girdiği veriler firmanıza aittir. Bu verileri yalnızca platform hizmetini sunmak,
            desteklemek ve güvenliğini sağlamak için işleriz. Müşteri içeriğini satmayız ve reklam amacıyla kullanmayız.
          </p>
          <p>
            Bu veriler içindeki kişisel veriler bakımından müşteri firma veri sorumlusu, Koordine ise veri işleyendir. Hangi
            kullanıcının hangi modülü görebileceği, ekleyebileceği, düzenleyebileceği veya silebileceği müşteri firmanın
            yöneticisi tarafından rol ve kullanıcı bazında belirlenir. Ekip sohbetindeki mesajların ve dosyaların saklama
            süresi de firma ayarlarından belirlenir; süresi dolan mesajlar ve dosyalar kalıcı olarak silinir.
          </p>
        </>
      ),
    },
    {
      id: "yapay-zeka",
      title: "Yapay zekâ asistanı",
      content: (
        <>
          <p>
            Platformdaki yapay zekâ asistanı, kullanıcının sorusunu firmanın Koordine&apos;deki kayıtlarına göre yanıtlar. Bu
            amaçla soru ve yanıt için gereken kayıt bilgileri, yanıtı üretmek üzere yapay zekâ hizmet sağlayıcısına iletilir.
          </p>
          <ul>
            <li>Asistan kayıt eklemeyi önerdiğinde önce bir önizleme gösterir; kayıt yalnızca kullanıcı onaylarsa eklenir.</li>
            <li>Kullanıcının yetkileri asistanda da geçerlidir.</li>
            <li>Firma yöneticisi asistanı veya asistanla kayıt eklemeyi ayarlardan tamamen kapatabilir.</li>
            <li>Yapay zekâ hata yapabilir; önemli kararlarda verilerin kontrol edilmesi gerekir.</li>
          </ul>
        </>
      ),
    },
    {
      id: "guvenlik",
      title: "Güvenlik önlemleri",
      content: (
        <>
          <p>Bilgilerinizi korumak için aldığımız başlıca önlemler:</p>
          <ul>
            <li>Site ve platformla tüm iletişim şifreli bağlantı (HTTPS) üzerinden yapılır.</li>
            <li>Platformda erişim, modül bazında rol ve kullanıcı yetkileriyle sınırlandırılır.</li>
            <li>
              Her hesap için tek aktif oturum bulunur; aynı hesapla başka bir yerden giriş yapıldığında önceki oturum kapatılır.
            </li>
            <li>Firma hesabını kurucu kullanıcı açar; diğer kullanıcı hesapları firma yöneticisi tarafından oluşturulur ve yönetilir.</li>
          </ul>
          <p>
            Hiçbir sistem mutlak güvenlik garantisi veremez. Hesabınızın yetkisiz kullanıldığından şüphelenirseniz firma yöneticinize ve <a href={`mailto:${site.email.support}`}>{site.email.support}</a> adresine bildirin. Barındırma,
            yedekleme ve teknik güvenlik önlemleri hakkında ayrıntılı bilgi için destek ekibimizle iletişime geçebilirsiniz.
          </p>
        </>
      ),
    },
    {
      id: "paylasim",
      title: "Bilgileri kimlerle paylaşıyoruz?",
      content: (
        <>
          <p>
            Bilgilerinizi yalnızca hizmeti sunmak için çalıştığımız hizmet sağlayıcılarla (barındırma ve veri tabanı
            altyapısı, e-posta gönderimi, anonim site ölçümü ve etkinleştirilmişse yapay zekâ hizmeti), danışmanlarımızla ve
            mevzuatın gerektirdiği hâllerde yetkili kamu kurumlarıyla paylaşırız. Bu sağlayıcıların bir kısmının sunucuları
            yurt dışında bulunabilir; yurt dışına aktarım KVKK&apos;nın 9. maddesine uygun olarak yapılır.
          </p>
        </>
      ),
    },
    {
      id: "saklama",
      title: "Saklama ve silme",
      content: (
        <p>
          Bilgileri, toplandıkları amaç için gereken süre ve mevzuatta öngörülen süreler boyunca saklarız. Müşteri sözleşmesi
          sona erdiğinde platform verilerinin iadesi ve silinmesi sözleşmede belirlenen şekilde yapılır. Süresi dolan veriler
          silinir, yok edilir veya anonim hâle getirilir.
        </p>
      ),
    },
    {
      id: "cocuklar",
      title: "Çocukların gizliliği",
      content: (
        <p>
          Site ve platform, firmalara yönelik bir iş yazılımıdır; 18 yaşından küçüklere yönelik değildir ve bilerek
          çocuklara ait kişisel veri toplamayız.
        </p>
      ),
    },
    {
      id: "haklar",
      title: "Haklarınız",
      content: (
        <p>
          KVKK&apos;nın 11. maddesinde sayılan haklarınızı ve başvuru yöntemini{" "}
          <Link href="/kvkk#haklar">KVKK Aydınlatma Metni</Link>&apos;nde bulabilirsiniz. Platformdaki müşteri içeriğine ilişkin
          talepleriniz için öncelikle çalıştığınız firmaya başvurmanız gerekir.
        </p>
      ),
    },
    {
      id: "degisiklikler",
      title: "Değişiklikler ve iletişim",
      content: (
        <p>
          Bu politikayı gerektiğinde güncelleyebiliriz; güncel metin her zaman bu sayfada, son güncelleme tarihiyle birlikte
          yayımlanır. Sorularınız için <a href={`mailto:${site.email.support}`}>{site.email.support}</a> adresine
          yazabilirsiniz.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title={title}
      lede="Sitede ve platformda hangi bilgileri topladığımızı, nasıl kullandığımızı ve nasıl koruduğumuzu sade bir dille anlatıyoruz."
      path="/gizlilik"
      crumb="Gizlilik"
      description={description}
      sections={sections}
    />
  );
}
