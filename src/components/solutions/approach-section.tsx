import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import type { SolutionDetail } from "@/content/solution-details";

/**
 * "Koordine ile": her satır bir modülle eşleşir.
 * Satır düzeni: modül (bağlantı) | çözüm metni.
 */
export function ApproachSection({ approach }: { approach: SolutionDetail["approach"] }) {
  return (
    <section aria-labelledby="koordine-ile" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            eyebrow="Koordine ile"
            align="split"
            title={<span id="koordine-ile">Koordine bu işleri nasıl kolaylaştırır?</span>}
            lede="Her bilgi ilgili sahanın altında tutulur ve yetkisi olan herkes aynı kaydı görür."
          />
        </Reveal>

        <ul className="mt-14 border border-line bg-white shadow-panel">
          {approach.map((a) => {
            const f = featureBySlug(a.feature);
            if (!f) return null;
            return (
              <li key={a.title} className="grid border-b border-line last:border-b-0 lg:grid-cols-12">
                <div className="border-b border-line bg-paper/60 px-5 py-4 lg:col-span-4 lg:border-b-0 lg:border-r lg:px-6 lg:py-7 xl:col-span-3">
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className="group/btn inline-flex items-center gap-3 text-ink-950"
                    aria-label={`${f.name} modülü`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-sm border border-line-strong bg-white text-brand-700 transition-colors duration-200 group-hover/btn:border-brand-600">
                      <FeatureIcon name={f.icon} className="size-[18px]" />
                    </span>
                    <span className="text-[0.9375rem] font-medium leading-tight underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover/btn:decoration-brand-700">
                      {f.name}
                    </span>
                    <Arrow className="text-ink-400 group-hover/btn:text-brand-700" />
                  </Link>
                </div>
                <div className="px-5 py-6 lg:col-span-8 lg:px-8 lg:py-7 xl:col-span-9">
                  <h3 className="text-balance text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950">{a.title}</h3>
                  <p className="mt-2.5 max-w-3xl text-pretty text-[0.9875rem] leading-relaxed text-ink-600">{a.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
