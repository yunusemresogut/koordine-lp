import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { features } from "@/content/features";
import { moduleScope } from "@/content/home";

/**
 * Platform dizini: 9 modül, bir çizim paftası listesi (pafta indeksi) gibi.
 * Her satır /ozellikler/[slug] sayfasına bağlanır.
 */
export function ModulesIndex() {
  return (
    <section aria-labelledby="modules-title" className="border-b border-line py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          index="02"
          eyebrow="Platform"
          align="split"
          title={<span id="modules-title">Dokuz modül, tek proje kaydı.</span>}
          lede="Her modül aynı sahaya, aynı kişilere ve aynı yetki yapısına bağlıdır. İhtiyacınız olanla başlayın; veri modüller arasında yeniden girilmez."
        />

        <div className="mt-14 border border-ink-950 bg-white">
          <div className="flex items-center justify-between border-b border-ink-950 px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600 sm:px-6">
            <span>Pafta listesi · Koordine platformu</span>
            <span className="hidden sm:inline">09 modül</span>
          </div>
          <div
            aria-hidden
            className="hidden grid-cols-[4.5rem_4.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_2rem] gap-6 border-b border-line px-6 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-400 lg:grid"
          >
            <span>Pafta</span>
            <span>Kod</span>
            <span>Modül</span>
            <span>Özet</span>
            <span>Kapsam</span>
            <span />
          </div>
          <ol className="divide-y divide-line">
            {features.map((f, i) => (
              <li key={f.slug}>
                <Link
                  href={`/ozellikler/${f.slug}`}
                  className="group/btn grid grid-cols-[3rem_minmax(0,1fr)_1.5rem] items-start gap-x-4 gap-y-1 px-4 py-5 transition-colors duration-200 hover:bg-brand-50/60 focus-visible:bg-brand-50/60 sm:px-6 lg:grid-cols-[4.5rem_4.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_2rem] lg:items-center lg:gap-6"
                >
                  <span className="row-span-2 font-mono text-[0.75rem] text-ink-400 lg:row-span-1">
                    M-{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden lg:block">
                    <span className="inline-flex min-w-11 justify-center border border-line-strong px-1.5 py-0.5 font-mono text-[0.75rem] tracking-[0.08em] text-ink-800 group-hover/btn:border-brand-600 group-hover/btn:text-brand-700">
                      {f.code}
                    </span>
                  </span>
                  <h3 className="flex items-center gap-2.5 text-[1.0625rem] font-semibold text-ink-950">
                    <FeatureIcon name={f.icon} className="size-[18px] shrink-0 text-ink-500 group-hover/btn:text-brand-700" />
                    {f.name}
                    <span className="font-mono text-[0.6875rem] font-normal tracking-[0.08em] text-ink-400 lg:hidden">{f.code}</span>
                  </h3>
                  <Arrow className="row-span-2 mt-1 size-4 justify-self-end text-ink-400 group-hover/btn:text-brand-700 lg:order-last lg:row-span-1 lg:mt-0" />
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600">{f.summary}</p>
                  <p className="hidden font-mono text-[0.75rem] leading-relaxed text-ink-500 lg:block">{moduleScope[f.slug]}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
