import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import { solutionsWithDetails, type SolutionWithDetail } from "@/content/solution-details";
import { pad2 } from "@/lib/utils";

/** İlgili modüller (solda, satır listesi) + diğer çözümler (sağda, pafta dizini) */
export function RelatedSection({ index, solution }: { index: string; solution: SolutionWithDetail }) {
  const modules = solution.detail.modules.map((s) => featureBySlug(s)).filter((f) => f !== undefined);
  const others = solutionsWithDetails
    .map((s, i) => ({ ...s, n: i + 1 }))
    .filter((s) => s.slug !== solution.slug);

  return (
    <section aria-labelledby="ilgili-moduller" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index={index} className="mb-5">
              İlgili modüller
            </Eyebrow>
            <h2
              id="ilgili-moduller"
              className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
            >
              Bu çözümün dayandığı modüller.
            </h2>
            <ul className="mt-10 border-t border-line-strong">
              {modules.map((f) => (
                <li key={f.slug} className="border-b border-line-strong">
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className="group/btn grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-5 transition-colors duration-200 hover:bg-white sm:grid-cols-[3.5rem_1fr_auto] sm:px-3"
                  >
                    <span className="pt-0.5 font-mono text-[0.75rem] tracking-[0.12em] text-brand-700">{f.code}</span>
                    <span>
                      <span className="flex items-center gap-2 text-[1.0625rem] font-semibold text-ink-950">
                        <FeatureIcon name={f.icon} className="size-4 text-ink-500" />
                        {f.name}
                      </span>
                      <span className="mt-1 block text-pretty text-[0.9375rem] leading-relaxed text-ink-600">{f.summary}</span>
                    </span>
                    <Arrow className="mt-1.5 text-ink-400 group-hover/btn:text-brand-700" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink-500">Diğer çözümler</h3>
            <ul className="mt-5 border border-line-strong bg-white">
              {others.map((s) => (
                <li key={s.slug} className="border-b border-line last:border-b-0">
                  <Link href={`/cozumler/${s.slug}`} className="group/btn block px-5 py-5 transition-colors duration-200 hover:bg-paper">
                    <span className="flex items-center justify-between font-mono text-[0.6875rem] tracking-[0.14em] text-ink-500">
                      <span>
                        {pad2(s.n)} · ÇZM-{s.detail.code}
                      </span>
                      <Arrow className="text-ink-400 group-hover/btn:text-brand-700" />
                    </span>
                    <span className="mt-2 block text-[1.0625rem] font-semibold leading-snug text-ink-950">{s.name}</span>
                    <span className="mt-1 block text-pretty text-[0.875rem] leading-relaxed text-ink-600">{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/cozumler"
              className="mt-5 inline-flex font-mono text-[0.75rem] uppercase tracking-[0.12em] text-ink-600 underline decoration-line-strong underline-offset-4 hover:text-ink-950"
            >
              Tüm çözümler
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
