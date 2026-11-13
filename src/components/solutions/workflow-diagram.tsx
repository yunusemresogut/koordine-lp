import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import type { SolutionDetail } from "@/content/solution-details";
import { cn, pad2 } from "@/lib/utils";

const COLS: Record<number, string> = {
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

/**
 * Pafta estetiğinde akış şeması: numaralı kare düğümler, ince bağlantı çizgileri,
 * mono kayıt etiketleri. Geniş ekranda yatay, dar ekranda dikey akar.
 */
export function WorkflowDiagram({
  index,
  code,
  name,
  workflow,
}: {
  index: string;
  code: string;
  name: string;
  workflow: SolutionDetail["workflow"];
}) {
  const n = workflow.length;
  return (
    <section aria-labelledby="is-akisi" className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeader
            index={index}
            eyebrow="Tipik iş akışı"
            tone="dark"
            align="split"
            title={<span id="is-akisi">Baştan sona {n} adım, hepsi aynı saha kaydında.</span>}
            lede="Her adım bir önceki adımın kaydını kullanır. Etiketler, o adımda uygulamada oluşan kaydın örneğidir."
          />

          <figure className="mt-14 border border-line-dark bg-ink-950/60">
            {/* Pafta başlık şeridi */}
            <div className="flex items-center justify-between border-b border-line-dark px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400 sm:px-6">
              <span>Akış şeması</span>
              <span className="text-brand-300">ŞM-{code}</span>
            </div>

            {/* Ölçü çizgisi (yalnızca geniş ekran) */}
            <div aria-hidden className="hidden px-6 pt-8 lg:block">
              <div className="relative flex items-center justify-center">
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
                <span className="absolute left-0 top-1/2 h-2.5 w-px -translate-y-1/2 bg-white/35" />
                <span className="absolute right-0 top-1/2 h-2.5 w-px -translate-y-1/2 bg-white/35" />
                <span className="relative bg-ink-950 px-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-400">
                  {pad2(1)} — {pad2(n)} · {name}
                </span>
              </div>
            </div>

            <ol className={cn("grid px-4 py-8 sm:px-6 lg:gap-0 lg:pb-10 lg:pt-8", COLS[n] ?? "lg:grid-cols-6")}>
              {workflow.map((w, i) => {
                const f = featureBySlug(w.feature);
                const last = i === n - 1;
                return (
                  <li key={w.step} className="relative flex gap-5 pb-9 last:pb-0 lg:block lg:pb-0 lg:pr-6">
                    {/* Bağlantı çizgisi: mobilde dikey, geniş ekranda yatay */}
                    {!last && (
                      <span aria-hidden className="pointer-events-none absolute inset-0">
                        <span className="absolute bottom-0 left-[21px] top-11 w-px bg-white/25 lg:hidden" />
                        <span className="absolute left-11 right-0 top-[21px] hidden h-px bg-white/25 lg:block" />
                        <svg
                          viewBox="0 0 8 8"
                          className="absolute right-0 top-[17px] hidden size-2 text-white/45 lg:block"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path d="M1 0.5 7 4 1 7.5" />
                        </svg>
                      </span>
                    )}

                    {/* Düğüm */}
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-10 grid size-11 shrink-0 place-items-center border font-mono text-[0.8125rem] tracking-[0.06em]",
                        i === 0 || last
                          ? "border-brand-400 bg-brand-600 text-white"
                          : "border-white/35 bg-ink-950 text-white"
                      )}
                    >
                      {pad2(i + 1)}
                    </span>

                    <div className="min-w-0 pt-1 lg:mt-5 lg:pt-0">
                      <h3 className="text-[1.0625rem] font-semibold leading-snug text-white">{w.step}</h3>
                      <p className="mt-2 text-pretty text-[0.875rem] leading-relaxed text-ink-300 lg:min-h-[4.3rem]">{w.detail}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em]">
                        <span className="border border-white/20 px-1.5 py-0.5 text-brand-200">{w.record}</span>
                        {f && <span className="text-ink-400">{f.code}</span>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
