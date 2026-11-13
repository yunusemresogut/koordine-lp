import Link from "next/link";
import { Fragment } from "react";
import { Arrow, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import { solutionsWithDetails } from "@/content/solution-details";
import { pad2 } from "@/lib/utils";

/** /cozumler hero'sunun yanındaki pafta dizini (sayfa içi bağlantılar) */
export function SolutionsSheetIndex() {
  return (
    <nav aria-label="Çözüm dizini" className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="flex items-center justify-between border-b border-line-strong px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        <span className="text-ink-500">Pafta dizini</span>
        <span className="text-brand-700">ÇZM / {pad2(solutionsWithDetails.length)}</span>
      </div>
      <ol className="divide-y divide-line">
        {solutionsWithDetails.map((s, i) => (
          <li key={s.slug}>
            <a
              href={`#${s.slug}`}
              className="group/btn grid grid-cols-[2rem_minmax(0,1fr)_auto] sm:grid-cols-[2.25rem_4.5rem_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3.5 text-[0.9375rem] text-ink-900 transition-colors duration-200 hover:bg-paper"
            >
              <span className="font-mono text-[0.75rem] text-brand-700">{pad2(i + 1)}</span>
              <span className="hidden font-mono text-[0.6875rem] tracking-[0.1em] text-ink-500 sm:inline">ÇZM-{s.detail.code}</span>
              <span className="truncate font-medium">{s.name}</span>
              <Arrow className="rotate-90 text-ink-400 group-hover/btn:text-brand-700" />
            </a>
          </li>
        ))}
      </ol>
      <div className="border-t border-line-strong bg-paper px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">
        9 modül · 6 rapor tipi · TR / EN
      </div>
    </nav>
  );
}

/** Editoryal çözüm listesi: büyük numaralı satırlar, özet, öne çıkan modüller ve akış özeti */
export function SolutionsIndexList({ index }: { index: string }) {
  return (
    <section aria-labelledby="sektorler" className="border-t border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            index={index}
            eyebrow="Sektörler"
            align="split"
            title={<span id="sektorler">Sektörünüze göre başlangıç noktası.</span>}
            lede="Modüller aynıdır; değişen, hangi kayıtla başladığınız ve hangi rollerin nerede devreye girdiğidir."
          />
        </Reveal>

        <ol className="mt-14 border-t border-ink-950">
          {solutionsWithDetails.map((s, i) => {
            const modules = s.detail.modules
              .slice(0, 4)
              .map((slug) => featureBySlug(slug))
              .filter((f) => f !== undefined);
            return (
              <li key={s.slug} id={s.slug} className="scroll-mt-24 border-b border-line">
                <Reveal className="grid grid-cols-1 gap-6 py-10 sm:py-14 lg:grid-cols-12 lg:gap-10">
                  <div className="flex items-baseline gap-4 lg:col-span-2 lg:block">
                    <span
                      aria-hidden
                      className="font-mono text-[3.5rem] font-medium leading-none tracking-[-0.04em] text-ink-200 sm:text-[4.5rem]"
                    >
                      {pad2(i + 1)}
                    </span>
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 lg:mt-3 lg:block">
                      ÇZM-{s.detail.code}
                    </span>
                  </div>

                  <div className="lg:col-span-6">
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

                  <div className="flex flex-col justify-between gap-6 lg:col-span-4">
                    <div>
                      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">Öne çıkan modüller</p>
                      <ul className="mt-3 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-4 border-t border-line [&>li]:min-w-0">
                        {modules.map((f) => (
                          <li key={f.slug} className="flex items-baseline gap-2 border-b border-line py-2 text-[0.875rem] text-ink-800">
                            <span className="w-7 shrink-0 font-mono text-[0.625rem] tracking-[0.1em] text-brand-700">{f.code}</span>
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
        </ol>
      </Container>
    </section>
  );
}
