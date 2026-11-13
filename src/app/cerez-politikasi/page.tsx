import Link from "next/link";
import { LegalEntity } from "@/components/legal/legal-entity";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Çerez Politikası";
const description =
  "Koordine internet sitesi reklam veya takip çerezi kullanmaz; yalnızca zorunlu teknikler ve çerezsiz, anonim Vercel Analytics ölçümü kullanılır.";

export const metadata = pageMetadata({ title, description, path: "/cerez-politikasi", defaultOgImage: true });

export default function CookiePolicyPage() {
  const host = site.url.replace(/^https?:\/\//, "");
  const appHost = site.appUrl.replace(/^https?:\/\//, "");

  const sections: LegalSection[] = [
    {
      id: "cerez-nedir",
      title: "Çerez ve benzeri teknolojiler nedir?",
      content: (
        <p>
          Çerezler, ziyaret ettiğiniz internet sitesinin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Tarayıcının yerel
          depolama alanı (localStorage, sessionStorage) gibi teknolojiler de benzer amaçlarla kullanılır. Bu politikada
          hepsini birlikte &quot;çerezler&quot; olarak anıyoruz.
        </p>
      ),
    },
    {
      id: "ozet",
      title: "Kısaca",
      content: (
        <ul>
          <li>
            {host} <strong>reklam, pazarlama veya üçüncü taraf takip çerezi kullanmaz.</strong>
          </li>
          <li>
            Site trafiğini ölçmek için <strong>Vercel Web Analytics</strong> kullanılır. Bu araç çerez kullanmaz, sizi
            siteler arasında izlemez ve yalnızca toplu, anonim istatistik üretir.
          </li>
          <li>
            Platformda ({appHost}) yalnızca oturumunuzu sürdürmek ve arayüz tercihlerinizi hatırlamak için tarayıcı depolama
            alanı kullanılır.
          </li>
        </ul>
      ),
    },
    {
      id: "site",
      title: "İnternet sitesinde kullanılanlar",
      content: (
        <>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Teknoloji</th>
                  <th scope="col">Tür</th>
                  <th scope="col">Amaç</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel Web Analytics</td>
                  <td>Ölçüm (çerezsiz)</td>
                  <td>
                    Görüntülenen sayfa, yönlendiren adres, ülke, tarayıcı ve cihaz türü gibi bilgilerle toplu ziyaret
                    istatistiği. Ziyaretçiler çerezle değil, istek bilgilerinden üretilen ve kişiyi tanımlamayan bir özet
                    değerle ayırt edilir.
                  </td>
                  <td>Özet değer 24 saat sonra geçersiz olur</td>
                </tr>
                <tr>
                  <td>Barındırma altyapısı kayıtları</td>
                  <td>Zorunlu (çerez değil)</td>
                  <td>Sitenin sunulması, güvenliği ve hataların tespiti için tutulan sunucu kayıtları (IP adresi, istek zamanı).</td>
                  <td>Altyapı sağlayıcısının kayıt saklama süresi boyunca</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            İletişim formuna yazdığınız bilgiler tarayıcınızda saklanmaz; yalnızca &quot;Gönder&quot; dediğinizde
            sunucumuza iletilir.
          </p>
        </>
      ),
    },
    {
      id: "platform",
      title: "Platformda kullanılanlar",
      content: (
        <>
          <p>Platforma giriş yaptığınızda, hizmetin çalışması için tarayıcınızın depolama alanında şu bilgiler tutulur:</p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">Bilgi</th>
                  <th scope="col">Tür</th>
                  <th scope="col">Amaç</th>
                  <th scope="col">Süre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Oturum bilgisi</td>
                  <td>Zorunlu (localStorage)</td>
                  <td>Giriş yaptığınızı hatırlamak ve isteklerinizi kimliğinizle doğrulamak</td>
                  <td>Çıkış yapana veya oturum sonlanana kadar</td>
                </tr>
                <tr>
                  <td>Oturum sonlandırma işareti</td>
                  <td>Zorunlu (sessionStorage)</td>
                  <td>Hesabınıza başka bir yerden giriş yapıldığında, giriş ekranında sizi bilgilendirmek</td>
                  <td>Sekme kapanana kadar</td>
                </tr>
                <tr>
                  <td>Arayüz tercihleri</td>
                  <td>İşlevsel (localStorage)</td>
                  <td>Tema, dil, harita görünümü, menü ve tablo düzeni gibi tercihlerinizi bu cihazda hatırlamak</td>
                  <td>Siz silene kadar</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Bu bilgiler reklam veya profil oluşturma amacıyla kullanılmaz ve üçüncü taraflarla paylaşılmaz.</p>
        </>
      ),
    },
    {
      id: "onay",
      title: "Onay",
      content: (
        <p>
          Site ve platformda yalnızca hizmetin sunulması için zorunlu olan teknikler ile çerezsiz, anonim ölçüm
          kullanıldığından çerez onay penceresi gösterilmez. Açık rıza gerektiren bir çerez kullanmaya başlarsak, bu
          politikayı güncelleyecek ve çerezi yerleştirmeden önce onayınızı alacağız.
        </p>
      ),
    },
    {
      id: "yonetim",
      title: "Tercihlerinizi nasıl yönetirsiniz?",
      content: (
        <>
          <p>
            Tarayıcınızın ayarlarından çerezleri ve site verilerini görüntüleyebilir, silebilir veya engelleyebilirsiniz.
            Platform için kullanılan depolama alanını silerseniz oturumunuz kapanır ve arayüz tercihleriniz varsayılana döner.
          </p>
          <p>
            Reklam engelleyiciler veya tarayıcı gizlilik ayarları anonim ölçümü de engelleyebilir; bu durum sitenin
            kullanımını etkilemez.
          </p>
        </>
      ),
    },
    {
      id: "iletisim",
      title: "Değişiklikler ve iletişim",
      content: (
        <p>
          Bu politika <LegalEntity /> tarafından gerektiğinde güncellenebilir. Kişisel verilerinize ilişkin ayrıntılar için{" "}
          <Link href="/kvkk">KVKK Aydınlatma Metni</Link>&apos;ni inceleyebilir, sorularınızı{" "}
          <a href={`mailto:${site.email.support}`}>{site.email.support}</a> adresine iletebilirsiniz.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      title={title}
      lede="Sitemiz reklam veya takip çerezi kullanmaz. Hangi teknikleri, hangi amaçla kullandığımızı aşağıda tablo hâlinde bulabilirsiniz."
      path="/cerez-politikasi"
      crumb="Çerez Politikası"
      code="YS-03"
      description={description}
      sections={sections}
    />
  );
}
