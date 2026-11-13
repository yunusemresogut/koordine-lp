import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import type { SolutionDetail } from "@/content/solution-details";
import { pad2 } from "@/lib/utils";

/**
 * "Koordine ile": her sorun (S.01…) bir modülle eşleşir. Satır düzeni:
 * sorun referansı + modül kodu | çözüm metni | kayıt etiketi + modül bağlantısı.
 */
export function ApproachSection({ index, approach }: { index: string; approach: SolutionDetail["approach"] }) {
  return (
    <section aria-labelledby="koordine-ile" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            index={index}
            eyebrow="Koordine ile"
            align="split"
            title={<span id="koordine-ile">Her sorun, sahaya bağlı bir kayda dönüşür.</span>}
            lede="Ayrı tablolar ve mesaj grupları yerine her bilgi ilgili sahanın altında, yetkisi olan herkesin göreceği yerde durur."
          />
        </Reveal>

        <ol className="mt-14 border border-line bg-white shadow-panel">
          {approach.map((a, i) => {
            const f = featureBySlug(a.feature);
            if (!f) return null;
            return (
              <li key={a.title} className="grid border-b border-line last:border-b-0 lg:grid-cols-12">
                <div className="flex items-center gap-4 border-b border-line bg-paper/60 px-5 py-4 lg:col-span-3 lg:flex-col lg:items-start lg:justify-between lg:border-b-0 lg:border-r lg:px-6 lg:py-7">
                  <span className="font-mono text-[0.75rem] tracking-[0.12em] text-ink-500">
                    S.{pad2(i + 1)} <span aria-hidden className="text-ink-300">→</span>
                  </span>
                  <span className="flex items-center gap-2.5 text-ink-950">
                    <span className="grid size-9 place-items-center rounded-sm border border-line-strong bg-white text-brand-700">
                      <FeatureIcon name={f.icon} className="size-[18px]" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-mono text-[0.6875rem] tracking-[0.14em] text-brand-700">{f.code}</span>
                      <span className="block text-[0.9375rem] font-medium">{f.name}</span>
                    </span>
                  </span>
                </div>
                <div className="px-5 py-6 lg:col-span-6 lg:px-8 lg:py-7">
                  <h3 className="text-balance text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950">{a.title}</h3>
                  <p className="mt-2.5 text-pretty text-[0.9875rem] leading-relaxed text-ink-600">{a.body}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-6 lg:col-span-3 lg:flex-col lg:items-end lg:justify-between lg:px-6 lg:py-7">
                  <span className="rounded-xs border border-dashed border-line-strong px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-600">
                    {a.detail}
                  </span>
                  <Link
                    href={`/ozellikler/${f.slug}`}
                    className="group/btn inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-brand-700 hover:text-brand-800"
                  >
                    <span className="underline decoration-brand-300 underline-offset-4 group-hover/btn:decoration-brand-700">
                      {f.name} modülü
                    </span>
                    <Arrow />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
