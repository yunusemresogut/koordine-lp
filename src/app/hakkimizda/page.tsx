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
  "Koordine, mühendislik, mimarlık ve taahhüt ekiplerinin Excel, mesaj grupları ve kâğıt raporlara dağılan saha işlerini bir araya getirmek için geliştirildi.";

export const metadata = pageMetadata({ title, description, path: "/hakkimizda" });

/** Dağınık araçlar ve Koordine'deki karşılıkları (yalnızca üründe var olan yetenekler) */
const scattered = [
  {
    tool: "Excel tabloları",
    problem: "Dosyalar kopyalanır, hangi sürümün güncel olduğu belirsizleşir.",
    answer: "Keşif ve iş programı sahanın içinde tutulur. Excel ve P6 dosyaları içe aktarılabilir.",
  },
  {
    tool: "Mesajlaşma grupları",
    problem: "Aylar sonra bir fotoğrafı ya da kararı bulmak zordur.",
    answer: "Günlük rapor fotoğraflarıyla kaydedilir. Firma içi sohbet de Koordine'dedir.",
  },
  {
    tool: "E-posta zincirleri",
    problem: "Bir talebin hangi aşamada olduğu ancak sorularak öğrenilir.",
    answer: "Talepler sorumlu kişiyle açılır ve durumu takip edilir.",
  },
  {
    tool: "Kâğıt raporlar",
    problem: "İSG ve uygunsuzluk formları klasörlenir, sonradan aramak zordur.",
    answer: "Raporlar sahada doldurulur, aranabilir ve PDF olarak paylaşılır.",
  },
];

const principles = [
  {
    title: "Bilgi sahada girilir.",
    text: "Raporlar ofise dönüp yeniden yazılmaz. Şantiye şefi formu sahada, fotoğraflarıyla birlikte doldurur.",
  },
  {
    title: "Önemli kayıtlar onaydan geçer.",
    text: "Projeler mimari, mekanik ve elektrik onaylarından geçer. Yapay zekâ asistanı da siz onaylamadan kayıt eklemez.",
  },
  {
    title: "Herkes kendi işini görür.",
    text: "Muhasebe ile saha sorumlusu aynı ekranı görmek zorunda değil. Yetkiler rol ve kullanıcı bazında ayarlanır.",
  },
  {
    title: "Sektörün terimleri kullanılır.",
    text: "Poz no, metraj, hakediş, puantaj, yapım yöntemi. Ekipler her gün kullandığı kelimeleri ekranda da görür.",
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
        title="Koordine'yi sahada çalışan ekipler için geliştiriyoruz."
        lede="Mühendislik, mimarlık ve taahhüt firmalarında saha bilgisi Excel dosyalarına, mesaj gruplarına ve kâğıt raporlara dağılıyor. Koordine bu işleri bir araya getirmek için geliştirildi."
      />

      {/* Sorun */}
      <section aria-labelledby="neden-title" className="border-b border-line">
        <Container size="wide" className="py-20 sm:py-28">
          <Reveal>
            <SectionHeader
              eyebrow="Neden Koordine"
              align="split"
              title={<span id="neden-title">Saha bilgisi genelde dört farklı araçta tutulur.</span>}
              lede="Her biri tek başına işe yarar. Ama aralarındaki bağlantıyı birinin aklında tutması gerekir."
            />
          </Reveal>

          <div className="mt-14 overflow-hidden rounded-md border border-line bg-white">
            <div
              aria-hidden
              className="hidden grid-cols-12 border-b border-line bg-paper-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 md:grid"
            >
              <div className="col-span-3 px-6 py-3">Araç</div>
              <div className="col-span-5 border-l border-line px-6 py-3">Sorun</div>
              <div className="col-span-4 border-l border-line px-6 py-3">Koordine&apos;de</div>
            </div>
            <ul>
              {scattered.map((row) => (
                <li key={row.tool} className="grid border-b border-line last:border-b-0 md:grid-cols-12">
                  <div className="px-6 pb-2 pt-6 md:col-span-3 md:py-6">
                    <h3 className="font-semibold text-ink-950">{row.tool}</h3>
                  </div>
                  <p className="px-6 pb-3 text-pretty text-[0.9375rem] leading-relaxed text-ink-600 md:col-span-5 md:border-l md:border-line md:py-6">
                    <span className="sr-only">Sorun: </span>
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

      {/* İlkeler */}
      <section aria-labelledby="ilkeler-title" className="border-b border-line bg-white">
        <Container size="wide" className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>İlkeler</Eyebrow>
                <h2
                  id="ilkeler-title"
                  className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
                >
                  Ürünü geliştirirken dikkat ettiklerimiz.
                </h2>
              </div>
            </div>

            <ul className="border-t border-ink-950 lg:col-span-8">
              {principles.map((p) => (
                <li key={p.title} className="border-b border-line py-8">
                  <h3 className="text-balance text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-ink-600">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Kimler için */}
      <section aria-labelledby="kimler-title" className="border-b border-line">
        <Container size="wide" className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Kimler için</Eyebrow>
              <h2
                id="kimler-title"
                className="mt-5 text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
              >
                Birden fazla sahayı aynı anda yürüten ekipler.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                Saha ekibi, ofis ve yönetim aynı sistemde kendi yetkileriyle çalışır. Sektörünüze göre nasıl kullanıldığına
                bakabilirsiniz.
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
