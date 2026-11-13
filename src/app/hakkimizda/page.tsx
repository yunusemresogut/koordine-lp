import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow, SectionHeader } from "@/components/ui/section-header";
import { solutions } from "@/content/solutions";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Hakkımızda";
const description =
  "Koordine; mühendislik, mimarlık ve taahhüt ekiplerinin Excel, mesaj grupları ve kâğıt raporlara dağılan saha işini tek kayıtta toplamak için var.";

export const metadata = pageMetadata({ title, description, path: "/hakkimizda" });

/** Dağınık araçlar ve Koordine'deki karşılıkları (yalnızca üründe var olan yetenekler) */
const scattered = [
  {
    tool: "Excel tabloları",
    problem: "Keşif ve iş programı dosyaları kopyalanır; hangi sürümün güncel olduğu, kimin neyi değiştirdiği belirsizleşir.",
    answer: "Poz numaralı keşif ve iş programı saha kaydına bağlı; Excel ve P6 dosyalarından içe aktarılır.",
  },
  {
    tool: "Mesajlaşma grupları",
    problem: "Saha fotoğrafları, kararlar ve talimatlar sohbet akışında kaybolur; aradan aylar geçince bulunamaz.",
    answer: "Günlük saha raporu fotoğrafla sahaya kaydedilir; firma içi sohbet ve dosya paylaşımı aynı platformda.",
  },
  {
    tool: "E-posta zincirleri",
    problem: "Tadilat talepleri ve onaylar farklı gelen kutularına dağılır; bir işin hangi aşamada olduğu sorulmadan öğrenilmez.",
    answer: "Talepler kodlu kayıtlarla açılır, sorumlu atanır, durumu adım adım izlenir.",
  },
  {
    tool: "Kâğıt raporlar",
    problem: "İSG ve uygunsuzluk formları doldurulur, taranır, klasörlenir; geçmişe dönük arama neredeyse imkânsızdır.",
    answer: "6 rapor tipi sahada doldurulur, saha kaydında aranır ve A4 belge olarak paylaşılır.",
  },
];

const principles = [
  {
    title: "Sahada doğan veri, sahada kaydedilir.",
    text: "Bilgi en doğru hâlini oluştuğu anda taşır. Günlük saha raporu, İSG, NCR ve kontrol listeleri; ofise dönüp yeniden yazılmak yerine sahada, fotoğrafıyla birlikte kayda girer.",
    proof: "Günlük saha raporu · İSG · NCR · Kontrol listesi",
  },
  {
    title: "Tek kayıt, çok görünüm.",
    text: "Bir saha; haritada bir nokta, açılış takviminde bir tarih, keşifte bir kalem listesi, hakedişte bir tutardır. Hepsi aynı kayda bağlıdır; bir yerde güncellenen bilgi diğerlerinde de günceldir.",
    proof: "Harita · Takvim · Keşif · Hakediş",
  },
  {
    title: "Onaysız kayıt yok — yapay zekâ dahil.",
    text: "Projeler mimari, mekanik ve elektrik disiplin onaylarından geçer. Yapay zekâ asistanı da bu kurala uyar: kayıt önerir, önizleme gösterir; siz onaylamadan hiçbir şey eklenmez.",
    proof: "Onay akışları · Önizleme ve onay",
  },
  {
    title: "Rol kadar erişim.",
    text: "Muhasebe ile saha sorumlusu aynı ekranı görmek zorunda değildir. Her modülde görüntüleme, ekleme, düzenleme ve silme yetkisi rol ve kullanıcı bazında ayrı ayarlanır; her hesap için tek aktif oturum vardır.",
    proof: "Rol bazlı yetkiler · Tek aktif oturum",
  },
  {
    title: "Sektörün dilinde konuşmak.",
    text: "Poz no, metraj, hakediş, puantaj, yapım yöntemi, malzeme sunumu. Ürün; ekiplerin her gün kullandığı terimlerle kurulur, onları başka bir yazılımın diline çevirmeye zorlamaz.",
    proof: "Türkçe ve İngilizce · 5 para birimi",
  },
];

export default function AboutPage() {
  const c = site.company;
  const companyRows = [
    ["Ticari unvan", c.legalName],
    ["Adres", c.address ? [c.address, c.city].filter(Boolean).join(", ") : ""],
    ["MERSİS no", c.mersis],
    ["Vergi dairesi / no", [c.taxOffice, c.taxNumber].filter(Boolean).join(" / ")],
    ["KEP adresi", c.kepAddress],
    ["Telefon", c.phone],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path: "/hakkimizda" })} />
      <PageHero
        crumbs={[{ name: "Hakkımızda", path: "/hakkimizda" }]}
        eyebrow="Hakkımızda"
        title="Sahada olan, kayıtta da olsun."
        lede="Koordine; mühendislik, mimarlık ve taahhüt firmalarının saha, proje ve şantiye işlerini tek bir kayıt üzerinde toplamak için geliştirildi. Bu sayfa, ürünü neden böyle kurduğumuzu anlatıyor."
      />

      {/* 01 — Sorun */}
      <section aria-labelledby="neden-title" className="border-b border-line">
        <Container size="wide" className="py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              index="01"
              eyebrow="Neden Koordine"
              align="split"
              title={<span id="neden-title">Sahadaki iş, dört farklı araca dağılıyor.</span>}
              lede="Bir şantiyede günün sonunda bilgi; bir Excel dosyasında, bir mesaj grubunda, birkaç e-postada ve klasördeki kâğıtlarda durur. Her araç tek başına işe yarar; sorun, aralarındaki bağın insan hafızasıyla kurulmasıdır."
            />
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-md border border-line bg-white">
            <div
              aria-hidden
              className="hidden grid-cols-12 border-b border-line bg-paper-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 md:grid"
            >
              <div className="col-span-3 px-6 py-3">Araç</div>
              <div className="col-span-5 border-l border-line px-6 py-3">Sahada ne oluyor</div>
              <div className="col-span-4 border-l border-line px-6 py-3">Koordine&apos;de karşılığı</div>
            </div>
            <ul>
              {scattered.map((row, i) => (
                <li key={row.tool} className="grid border-b border-line last:border-b-0 md:grid-cols-12">
                  <div className="flex items-baseline gap-3 px-6 pb-2 pt-6 md:col-span-3 md:py-6">
                    <span className="font-mono text-[0.75rem] tabular-nums text-brand-700">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-semibold text-ink-950">{row.tool}</h3>
                  </div>
                  <p className="px-6 pb-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-600 md:col-span-5 md:border-l md:border-line md:py-6">
                    <span className="sr-only">Sahada ne oluyor: </span>
                    {row.problem}
                  </p>
                  <p className="px-6 pb-6 text-pretty text-[0.9375rem] leading-relaxed text-ink-950 md:col-span-4 md:border-l md:border-line md:bg-paper/60 md:py-6">
                    <span className="mb-1 block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 md:hidden" aria-hidden>
                      Koordine&apos;de
                    </span>
                    <span className="sr-only">Koordine&apos;de karşılığı: </span>
                    {row.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* 02 — İlkeler */}
      <section aria-labelledby="ilkeler-title" className="border-b border-line bg-white">
        <Container size="wide" className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Eyebrow index="02">İlkeler</Eyebrow>
                <h2
                  id="ilkeler-title"
                  className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
                >
                  Ürünü yönlendiren beş madde.
                </h2>
                <p className="mt-5 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                  Yeni bir özellik eklerken ya da bir ekranı sadeleştirirken bu maddelere bakarız. Her birinin üründe somut bir
                  karşılığı var.
                </p>
              </div>
            </div>

            <ol className="border-t border-ink-950 lg:col-span-8">
              {principles.map((p, i) => (
                <li key={p.title} className="grid gap-4 border-b border-line py-9 sm:grid-cols-[6rem_1fr] sm:gap-8">
                  <div className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-500">
                    <span className="text-brand-700">İ-{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden className="ml-2 text-ink-300 sm:ml-0 sm:mt-2 sm:block">
                      / 05
                    </span>
                  </div>
                  <div>
                    <h3 className="text-balance text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-600">{p.text}</p>
                    <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
                      <span className="text-ink-400">Üründe:</span> {p.proof}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* 03 — Kimler için */}
      <section aria-labelledby="kimler-title" className="border-b border-line">
        <Container size="wide" className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="03">Kimler için</Eyebrow>
              <h2
                id="kimler-title"
                className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
              >
                Birden fazla sahayı aynı anda yürüten ekipler.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                Saha ekibi, ofis ve yönetim aynı kayıtlar üzerinde, kendi rolleriyle çalışır. Sektörünüze göre nasıl
                kullanıldığını inceleyin.
              </p>
            </div>
            <ul className="divide-y divide-line border-y border-line lg:col-span-7">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/cozumler/${s.slug}`}
                    className="group grid gap-1 py-6 transition-colors duration-150 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                  >
                    <span>
                      <span className="block text-lg font-semibold text-ink-950 group-hover:text-brand-700">{s.name}</span>
                      <span className="mt-1 block text-pretty text-[0.9375rem] leading-relaxed text-ink-600">{s.summary}</span>
                    </span>
                    <span
                      aria-hidden
                      className="hidden font-mono text-[0.75rem] text-ink-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand-700 sm:block"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {companyRows.length > 0 && (
            <div className="mt-20 border-t border-line pt-10">
              <h2 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">Firma bilgileri</h2>
              <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {companyRows.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sm text-ink-500">{k}</dt>
                    <dd className="mt-1 text-ink-950">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
