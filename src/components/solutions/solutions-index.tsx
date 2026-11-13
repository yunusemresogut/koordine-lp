import Link from "next/link";
import { Fragment } from "react";
import { Arrow, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import { solutionsWithDetails } from "@/content/solution-details";

/** /cozumler hero'sunun yanındaki sektör dizini (sayfa içi bağlantılar) */
export function SolutionsSheetIndex() {
  return (
    <nav aria-label="Çözüm dizini" className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="border-b border-line-strong px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
        Sektörler
      </div>
      <ul className="divide-y divide-line">
        {solutionsWithDetails.map((s) => (
          <li key={s.slug}>
            <a
              href={`#${s.slug}`}
              className="group/btn grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 text-[0.9375rem] text-ink-900 transition-colors duration-200 hover:bg-paper"
            >
              <span className="truncate font-medium">{s.name}</span>
              <Arrow className="rotate-90 text-ink-400 group-hover/btn:text-brand-700" />
            </a>
          </li>
        ))}
      </ul>
      <div className="border-t border-line-strong bg-paper px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">
        Hepsinde aynı 9 modül
      </div>
    </nav>
  );
}

/** Editoryal çözüm listesi: ad, özet, akış özeti ve öne çıkan modüller */
export function SolutionsIndexList() {
  return (
    <section aria-labelledby="sektorler" className="border-t border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            eyebrow="Sektörler"
            align="split"
            title={<span id="sektorler">Her sektör farklı bir yerden başlar</span>}
            lede="Modüller her sektörde aynı. Sektörden sektöre değişen, ilk açılan kayıt ve devreye giren roller."
          />
        </Reveal>

        <ul className="mt-14 border-t border-ink-950">
          {solutionsWithDetails.map((s) => {
            const modules = s.detail.modules
              .slice(0, 4)
              .map((slug) => featureBySlug(slug))
              .filter((f) => f !== undefined);
            return (
              <li key={s.slug} id={s.slug} className="scroll-mt-24 border-b border-line">
                <Reveal className="grid grid-cols-1 gap-6 py-10 sm:py-14 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7 xl:col-span-6">
                    <h3 className="text-balance text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-950 sm:text-[2.125rem]">
                      <Link href={`/cozumler/${s.slug}`} className="transition-colors duration-200 hover:text-brand-700">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">{s.summary}</p>
                    <p className="mt-6 font-mono text-[0.6875rem] uppercase leading-6 tracking-[0.1em] text-ink-500">
                      {s.detail.workflow.map((w, wi) => (
                        <Fragment key={w.step}>
                          {wi > 0 && " "}
                          <span className="whitespace-nowrap">
                            {wi > 0 && (
                              <span aria-hidden className="pr-1.5 text-ink-300">
                                →
                              </span>
                            )}
                            {w.step}
                          </span>
                        </Fragment>
                      ))}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between gap-6 lg:col-span-5 xl:col-span-5 xl:col-start-8">
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">Öne çıkan modüller</p>
                      <ul className="mt-3 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-4 border-t border-line [&>li]:min-w-0">
                        {modules.map((f) => (
                          <li key={f.slug} className="flex items-center gap-2 border-b border-line py-2 text-[0.875rem] text-ink-800">
                            <FeatureIcon name={f.icon} className="size-3.5 shrink-0 text-brand-700" />
                            <span className="truncate">{f.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <TextLink href={`/cozumler/${s.slug}`} aria-label={`${s.name} çözümünü inceleyin`}>
                      Çözümü inceleyin
                    </TextLink>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
