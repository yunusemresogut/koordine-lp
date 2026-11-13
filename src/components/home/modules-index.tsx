import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { SectionHeader } from "@/components/ui/section-header";
import { features } from "@/content/features";
import { moduleScope } from "@/content/home";

/**
 * Modül listesi: 9 modül, sade bir tablo düzeninde.
 * Her satır /ozellikler/[slug] sayfasına bağlanır.
 */
export function ModulesIndex() {
  return (
    <section aria-labelledby="modules-title" className="border-b border-line py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Modüller"
          align="split"
          title={<span id="modules-title">Koordine&apos;de neler var?</span>}
          lede="Dokuz modülün hepsi aynı saha listesini, kullanıcıları ve yetkileri kullanır. Bir modüle girdiğiniz bilgiyi diğerinde yeniden girmezsiniz."
        />

        <div className="mt-14 border border-ink-950 bg-white">
          <div
            aria-hidden
            className="hidden grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)_minmax(0,1.1fr)_2rem] gap-6 border-b border-ink-950 px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 lg:grid"
          >
            <span>Modül</span>
            <span>Ne işe yarar</span>
            <span>Kapsam</span>
            <span />
          </div>
          <ul className="divide-y divide-line">
            {features.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/ozellikler/${f.slug}`}
                  className="group/btn grid grid-cols-[minmax(0,1fr)_1.5rem] items-start gap-x-4 gap-y-1 px-4 py-5 transition-colors duration-200 hover:bg-brand-50/60 focus-visible:bg-brand-50/60 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.5fr)_minmax(0,1.1fr)_2rem] lg:items-center lg:gap-6"
                >
                  <h3 className="flex items-center gap-2.5 text-[1.0625rem] font-semibold text-ink-950">
                    <FeatureIcon name={f.icon} className="size-[18px] shrink-0 text-ink-500 group-hover/btn:text-brand-700" />
                    {f.name}
                  </h3>
                  <Arrow className="row-span-2 mt-1 size-4 justify-self-end text-ink-400 group-hover/btn:text-brand-700 lg:order-last lg:row-span-1 lg:mt-0" />
                  <p className="text-[0.9375rem] leading-relaxed text-ink-600">{f.summary}</p>
                  <p className="hidden text-[0.875rem] leading-relaxed text-ink-500 lg:block">{moduleScope[f.slug]}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
