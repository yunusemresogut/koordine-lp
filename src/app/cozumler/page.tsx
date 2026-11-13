import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { SolutionsIndexList, SolutionsSheetIndex } from "@/components/solutions/solutions-index";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Sektörlere Göre Çözümler";
const description =
  "İnşaat ve taahhüt, mimarlık ofisleri, mühendislik ve MEP ekipleri, perakende ve mağaza yatırımları için Koordine ile saha, proje ve şantiye yönetimi.";
const path = "/cozumler";

export const metadata: Metadata = pageMetadata({ title, description, path });

/** Firmaya göre uyarlanabilen, uygulamada gerçekten bulunan ayarlar */
const adaptations = [
  {
    term: "Saha türleri",
    body: "Mağaza, ofis, AVM, konut, otel, endüstriyel gibi saha türlerini firma ayarlarından ekler, yeniden adlandırırsınız (ör. Depo, Santral).",
  },
  {
    term: "Roller",
    body: "Hazır rollerin adlarını değiştirir, özel rol tanımlarsınız. Her modülde görüntüleme, ekleme, düzenleme, silme yetkisi rol bazında ayarlanır.",
  },
  {
    term: "Kod önekleri",
    body: "Tadilat talepleri ve sözleşmeler sıralı kod alır (TT-0001, SZ-0001); önekleri kendi düzeninize göre değiştirirsiniz.",
  },
  {
    term: "Para birimi",
    body: "Varsayılan para birimini seçersiniz; keşif, sözleşme, hakediş ve faturada TRY, USD, EUR, GBP ve CHF kullanılabilir.",
  },
  {
    term: "Kontrol listeleri",
    body: "Hazır madde kütüphanesinden seçer ya da kendi maddelerinizi yazarsınız; her disiplin için ayrı gruplar tutulur.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path })} />

      <PageHero
        crumbs={[{ name: "Çözümler", path }]}
        eyebrow="Çözümler"
        index="00"
        title="Aynı platform, dört farklı saha gerçeği."
        lede="Taahhüt firmasının günlük raporu, mimarlık ofisinin malzeme onayı, MEP ekibinin test kaydı ve perakende yatırımcısının açılış takvimi. Koordine'nin modülleri her birine farklı bir sırayla karşılık verir."
        aside={<SolutionsSheetIndex />}
      />

      <SolutionsIndexList index="01" />

      <section aria-labelledby="uyarlama" className="border-t border-line bg-paper py-20 sm:py-28">
        <Container size="wide">
          <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow index="02" className="mb-5">
                Firmanıza göre
              </Eyebrow>
              <h2
                id="uyarlama"
                className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
              >
                Sektörünüz listede yok mu?
              </h2>
              <p className="mt-5 max-w-md text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                Koordine sahası, projesi ve ekibi olan her firma için kurulabilir. Aşağıdaki ayarlar, platformu kendi iş düzeninize uydurmanın yoludur.
              </p>
            </div>
            <dl className="border-t border-ink-950 lg:col-span-7">
              {adaptations.map((a) => (
                <div key={a.term} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-500 sm:pt-0.5">{a.term}</dt>
                  <dd className="text-pretty text-[1rem] leading-relaxed text-ink-700">{a.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Sizin sektörünüzün akışını birlikte çıkaralım."
        lede="30 dakikalık görüşmede projelerinizin nasıl ilerlediğini dinleyelim, Koordine'yi bu akış üzerinden gösterelim."
      />
    </>
  );
}
