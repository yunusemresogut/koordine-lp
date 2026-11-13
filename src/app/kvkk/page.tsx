import Link from "next/link";
import { LegalEntity, LegalEntityDetails } from "@/components/legal/legal-entity";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "KVKK Aydınlatma Metni";
const description =
  "6698 sayılı KVKK kapsamında Koordine internet sitesi ziyaretçileri, demo talebinde bulunanlar ve platform kullanıcıları için kişisel veri aydınlatma metni.";

export const metadata = pageMetadata({ title, description, path: "/kvkk", defaultOgImage: true });

export default function KvkkPage() {
  const kep = site.company.kepAddress;

  const sections: LegalSection[] = [
    {
      id: "veri-sorumlusu",
      title: "Veri sorumlusu",
      content: (
        <>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel verileriniz, veri sorumlusu
            sıfatıyla <strong><LegalEntity /></strong> (&quot;Koordine&quot;) tarafından aşağıda açıklanan kapsamda işlenir.
          </p>
          <LegalEntityDetails />
        </>
      ),
    },
    {
      id: "kapsam",
      title: "Bu metin kimleri kapsar?",
      content: (
        <>
          <p>Bu aydınlatma metni üç kişi grubuna yöneliktir:</p>
          <ul>
            <li>
              <strong>Site ziyaretçileri:</strong> {site.url.replace(/^https?:\/\//, "")} adresini ziyaret eden kişiler.
            </li>
            <li>
              <strong>Demo ve iletişim talebinde bulunanlar:</strong> İletişim formunu dolduran veya bize e-posta gönderen
              kişiler.
            </li>
            <li>
              <strong>Platform kullanıcıları:</strong> Koordine platformunu kullanan müşteri firmaların yetkilileri ve
              çalışanları.
            </li>
          </ul>
          <p>
            Müşteri firmaların platforma kendi işleri için girdiği kişisel veriler (örneğin personel kartları, puantaj, izin
            ve sertifika kayıtları, saha raporlarındaki bilgiler) bakımından <strong>veri sorumlusu ilgili müşteri firmadır</strong>;
            Koordine bu verileri müşteri firmanın talimatları doğrultusunda <strong>veri işleyen</strong> sıfatıyla işler.
            Bu verilere ilişkin aydınlatma yükümlülüğü ve başvurular için öncelikle çalıştığınız firmaya başvurmanız
            gerekir.
          </p>
        </>
      ),
    },
    {
      id: "veri-kategorileri",
      title: "İşlenen kişisel veri kategorileri",
      content: (
        <>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Kişi grubu</th>
                  <th scope="col">Veri kategorisi</th>
                  <th scope="col">Örnek</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={2}>Site ziyaretçisi</td>
                  <td>İşlem güvenliği</td>
                  <td>IP adresi, tarayıcı ve cihaz bilgisi, erişim zamanı (sunucu kayıtları)</td>
                </tr>
                <tr>
                  <td>Anonim kullanım ölçümü</td>
                  <td>Görüntülenen sayfa, yönlendiren adres, ülke, cihaz ve tarayıcı türü (toplu ve çerezsiz)</td>
                </tr>
                <tr>
                  <td rowSpan={4}>Demo / iletişim talebi</td>
                  <td>Kimlik</td>
                  <td>Ad soyad</td>
                </tr>
                <tr>
                  <td>İletişim</td>
                  <td>İş e-posta adresi, telefon numarası</td>
                </tr>
                <tr>
                  <td>Mesleki bilgi</td>
                  <td>Firma adı, firma tipi, ekip büyüklüğü, ilgilenilen modüller</td>
                </tr>
                <tr>
                  <td>Talep içeriği ve işlem güvenliği</td>
                  <td>Mesajınız, yazışmalar, form gönderimindeki IP adresi</td>
                </tr>
                <tr>
                  <td rowSpan={4}>Platform kullanıcısı</td>
                  <td>Kimlik ve iletişim</td>
                  <td>Ad soyad, e-posta adresi, profil fotoğrafı (yüklenirse)</td>
                </tr>
                <tr>
                  <td>Mesleki bilgi</td>
                  <td>Firma, rol ve yetkiler</td>
                </tr>
                <tr>
                  <td>İşlem güvenliği</td>
                  <td>Oturum bilgileri, giriş zamanları, IP adresi, platformdaki işlem kayıtları</td>
                </tr>
                <tr>
                  <td>Kullanıcı içeriği</td>
                  <td>Oluşturulan kayıtlar, raporlar, fotoğraflar, dosyalar, sohbet mesajları, yapay zekâ asistanına yazılan sorular</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Koordine, bu metinde sayılan amaçlar için özel nitelikli kişisel veri talep etmez. Müşteri firmaların platforma
            özel nitelikli kişisel veri (örneğin sağlık bilgisi içeren bir belge) yüklemesi hâlinde, bu verilerin işlenmesine
            ilişkin şartların sağlanması veri sorumlusu olarak müşteri firmanın sorumluluğundadır.
          </p>
        </>
      ),
    },
    {
      id: "amaclar",
      title: "İşleme amaçları",
      content: (
        <>
          <h3>Site ziyaretçileri</h3>
          <ul>
            <li>Sitenin güvenli ve kesintisiz çalışmasının sağlanması, kötüye kullanımın önlenmesi,</li>
            <li>Sitenin hangi sayfalarının ilgi gördüğünün toplu olarak ölçülmesi ve içeriğin iyileştirilmesi.</li>
          </ul>
          <h3>Demo ve iletişim talebinde bulunanlar</h3>
          <ul>
            <li>Demo, teklif ve bilgi taleplerinin alınması, değerlendirilmesi ve yanıtlanması,</li>
            <li>Görüşmenin planlanması ve firmanızın ihtiyacına uygun teklifin hazırlanması,</li>
            <li>Formun otomatik ve kötü niyetli gönderimlere karşı korunması.</li>
          </ul>
          <h3>Platform kullanıcıları</h3>
          <ul>
            <li>Hesabın oluşturulması, kimlik doğrulama ve oturum yönetimi (her hesap için tek aktif oturum dahil),</li>
            <li>Rol ve yetkilere göre erişimin sağlanması, platform hizmetlerinin sunulması,</li>
            <li>Bildirimlerin iletilmesi, destek taleplerinin yanıtlanması,</li>
            <li>Bilgi güvenliğinin sağlanması, işlem kayıtlarının tutulması, hataların tespiti ve giderilmesi,</li>
            <li>Yapay zekâ asistanı müşteri firma tarafından etkinleştirildiyse, kullanıcının sorusuna yanıt üretilmesi,</li>
            <li>Sözleşmeden ve mevzuattan doğan yükümlülüklerin yerine getirilmesi.</li>
          </ul>
        </>
      ),
    },
    {
      id: "hukuki-sebepler",
      title: "Hukuki sebepler",
      content: (
        <>
          <p>Kişisel verileriniz KVKK&apos;nın 5. maddesinin 2. fıkrasında yer alan şu hukuki sebeplere dayanılarak işlenir:</p>
          <ul>
            <li>
              <strong>(c) Sözleşmenin kurulması veya ifası:</strong> Demo ve teklif taleplerinin yanıtlanması, platform
              hizmetinin sunulması, hesap ve oturum yönetimi.
            </li>
            <li>
              <strong>(ç) Hukuki yükümlülüğün yerine getirilmesi:</strong> İlgili mevzuattan doğan kayıt tutma, bilgi verme
              ve saklama yükümlülükleri.
            </li>
            <li>
              <strong>(e) Bir hakkın tesisi, kullanılması veya korunması:</strong> Olası uyuşmazlıklarda delil olarak
              kullanılabilecek kayıtların saklanması.
            </li>
            <li>
              <strong>(f) Meşru menfaat:</strong> Site ve platform güvenliğinin sağlanması, kötüye kullanımın önlenmesi,
              sitenin toplu ve anonim olarak ölçülmesi, hizmetin iyileştirilmesi.
            </li>
          </ul>
          <p>
            Bu hukuki sebeplerin bulunmadığı bir işleme faaliyeti söz konusu olursa, işlemeden önce açık rızanız ayrıca
            alınır. İletişim formundaki onay kutusu, bu aydınlatma metnini okuduğunuzu teyit eder; açık rıza beyanı
            niteliğinde değildir.
          </p>
        </>
      ),
    },
    {
      id: "aktarim",
      title: "Kişisel verilerin aktarılması",
      content: (
        <>
          <p>Kişisel verileriniz, yukarıdaki amaçlarla sınırlı ve ölçülü olarak şu alıcı gruplarına aktarılabilir:</p>
          <ul>
            <li>
              <strong>Hizmet sağlayıcılar:</strong> Sitenin ve platformun barındırıldığı altyapı ve veri tabanı hizmeti
              sağlayıcıları, e-posta gönderim hizmeti sağlayıcıları, anonim site ölçümü hizmeti sağlayıcısı ve müşteri firma
              tarafından etkinleştirilmişse yapay zekâ asistanı için yapay zekâ hizmet sağlayıcısı.
            </li>
            <li>
              <strong>Danışmanlar:</strong> Hukuki, mali ve teknik danışmanlarımız (gizlilik yükümlülüğü altında).
            </li>
            <li>
              <strong>Yetkili kamu kurum ve kuruluşları:</strong> Mevzuatın gerektirdiği hâllerde ve talep edilmesi
              durumunda.
            </li>
          </ul>
          <p>
            Kullandığımız hizmet sağlayıcıların bir kısmının sunucuları yurt dışında bulunabilir. Bu durumda kişisel
            verileriniz, KVKK&apos;nın 9. maddesinde öngörülen şartlara uygun olarak; yeterlilik kararı bulunan hâllerde bu
            karara dayanılarak, bulunmayan hâllerde Kurul tarafından ilan edilen standart sözleşme gibi uygun güvencelerden
            biri sağlanarak ya da Kanun&apos;da sayılan istisnai hâllerden birine dayanılarak yurt dışına aktarılır.
          </p>
        </>
      ),
    },
    {
      id: "toplama-yontemi",
      title: "Toplama yöntemi",
      content: (
        <p>
          Kişisel verileriniz; internet sitesindeki iletişim formu, e-posta yazışmaları, platform arayüzünde doldurduğunuz
          alanlar, müşteri firma yöneticisinin sizin için oluşturduğu kullanıcı hesabı ile site ve platform altyapısının
          otomatik olarak tuttuğu teknik kayıtlar aracılığıyla, tamamen veya kısmen otomatik yollarla elektronik ortamda
          toplanır.
        </p>
      ),
    },
    {
      id: "saklama",
      title: "Saklama süresi",
      content: (
        <p>
          Kişisel verileriniz, işleme amacının gerektirdiği süre ve ilgili mevzuatta öngörülen saklama süreleri boyunca
          saklanır. Demo ve iletişim talepleri, talep sonuçlandıktan ve ticari ilişki kurulmadıysa makul bir süre geçtikten
          sonra silinir. Platform verileri, müşteri firma ile yapılan sözleşme süresince ve sözleşmede belirlenen süre
          boyunca saklanır. Süresi dolan veriler silinir, yok edilir veya anonim hâle getirilir.
        </p>
      ),
    },
    {
      id: "haklar",
      title: "KVKK 11. madde kapsamındaki haklarınız",
      content: (
        <>
          <p>Veri sahibi olarak, veri sorumlusuna başvurarak:</p>
          <ol>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
            <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
            <li>KVKK&apos;nın 7. maddesindeki şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
            <li>
              Düzeltme, silme ve yok etme işlemlerinin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,
            </li>
            <li>
              İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun
              ortaya çıkmasına itiraz etme,
            </li>
            <li>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
          </ol>
          <p>haklarına sahipsiniz.</p>
        </>
      ),
    },
    {
      id: "basvuru",
      title: "Başvuru yolu",
      content: (
        <>
          <p>
            Haklarınıza ilişkin taleplerinizi, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ&apos;e uygun
            olarak; kimliğinizi tespit etmeye yarayan bilgilerle birlikte aşağıdaki yollardan biriyle iletebilirsiniz:
          </p>
          <ul>
            <li>
              Daha önce bize bildirdiğiniz ve sistemimizde kayıtlı e-posta adresinizden{" "}
              <a href={`mailto:${site.email.support}?subject=${encodeURIComponent("KVKK başvurusu")}`}>{site.email.support}</a>{" "}
              adresine, konu satırına &quot;KVKK başvurusu&quot; yazarak,
            </li>
            {kep && (
              <li>
                Kayıtlı elektronik posta (KEP) adresinizden <a href={`mailto:${kep}`}>{kep}</a> adresine,
              </li>
            )}
            {site.company.address && (
              <li>
                Islak imzalı dilekçe ile {site.company.address}
                {site.company.city && `, ${site.company.city}`} adresine şahsen veya noter aracılığıyla.
              </li>
            )}
          </ul>
          <p>
            Başvurunuz, niteliğine göre en kısa sürede ve en geç <strong>30 gün</strong> içinde ücretsiz olarak
            sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından
            belirlenen tarifedeki ücret alınabilir. Başvurunuzun reddedilmesi, verilen cevabı yetersiz bulmanız veya süresinde
            cevap verilmemesi hâllerinde Kişisel Verileri Koruma Kurulu&apos;na şikâyette bulunabilirsiniz.
          </p>
          <p>
            Çerez ve benzeri teknolojiler hakkında bilgi için <Link href="/cerez-politikasi">Çerez Politikası</Link>&apos;nı,
            genel uygulamalarımız için <Link href="/gizlilik">Gizlilik Politikası</Link>&apos;nı inceleyebilirsiniz.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPage
      title={title}
      lede="Kişisel verilerinizi hangi amaçlarla, hangi hukuki sebeplere dayanarak işlediğimizi ve KVKK kapsamındaki haklarınızı bu metinde açıklıyoruz."
      path="/kvkk"
      crumb="KVKK"
      description={description}
      sections={sections}
    />
  );
}
