import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import type { SolutionDetail } from "@/content/solution-details";
import { pad2 } from "@/lib/utils";

/** "Sahadaki gerçek": solda yapışkan başlık, sağda numaralı editoryal liste */
export function RealitiesSection({ index, name, realities }: { index: string; name: string; realities: SolutionDetail["realities"] }) {
  return (
    <section aria-labelledby="sahadaki-gercek" className="border-t border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <Eyebrow index={index} className="mb-5">
                Sahadaki gerçek
              </Eyebrow>
              <h2
                id="sahadaki-gercek"
                className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
              >
                Bu işi yapanların iyi bildiği sorunlar.
              </h2>
              <p className="mt-5 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                {name} için günlük operasyonun nerede tıkandığı. Sağdaki her madde, bir sonraki bölümde aynı numarayla karşılık bulur.
              </p>
            </div>
          </div>

          <ol className="border-t border-ink-950 lg:col-span-8">
            {realities.map((r, i) => (
              <li key={r.title} className="grid gap-3 border-b border-line py-8 sm:grid-cols-[5.5rem_1fr] sm:gap-8 sm:py-10">
                <span aria-hidden className="font-mono text-[0.8125rem] tracking-[0.12em] text-brand-700">
                  S.{pad2(i + 1)}
                </span>
                <div>
                  <h3 className="text-balance text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950 sm:text-[1.5rem]">
                    {r.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600">{r.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
