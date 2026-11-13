import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import { solutionsWithDetails, type SolutionWithDetail } from "@/content/solution-details";

/** İlgili modüller (solda, satır listesi) + diğer çözümler (sağda, pafta dizini) */
export function RelatedSection({ solution }: { solution: SolutionWithDetail }) {
  const modules = solution.detail.modules.map((s) => featureBySlug(s)).filter((f) => f !== undefined);
  const others = solutionsWithDetails.filter((s) => s.slug !== solution.slug);

  return (
    <section aria-labelledby="ilgili-moduller" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-5">İlgili modüller</Eyebrow>
            <h2
              id="ilgili-moduller"
              className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
            >
              Bu sektörde en çok kullanılan modüller
            </h2>
            <ul className="mt-10 border-t border-line-strong">
              {modules.map((f) => (
                <li key={f.slug} className="border-b border-line-strong">
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className="group/btn grid grid-cols-[2.25rem_1fr_auto] items-start gap-4 py-5 transition-colors duration-200 hover:bg-white sm:px-3"
                  >
                    <span className="grid size-9 place-items-center rounded-sm border border-line-strong bg-white text-brand-700">
                      <FeatureIcon name={f.icon} className="size-[18px]" />
                    </span>
                    <span>
                      <span className="block text-[1.0625rem] font-semibold text-ink-950">{f.name}</span>
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
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-[1.0625rem] font-semibold leading-snug text-ink-950">{s.name}</span>
                      <Arrow className="shrink-0 text-ink-400 group-hover/btn:text-brand-700" />
                    </span>
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
