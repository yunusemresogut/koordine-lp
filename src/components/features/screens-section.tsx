import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FeatureWithDetail } from "@/content/feature-details";
import { cn } from "@/lib/utils";
import { FeatureVisual, isDocumentVisual, isNarrowVisual } from "./feature-visual";
import { ScreenTabs } from "./screen-tabs";

/**
 * "Ekranlar": modülün mockup varyantları sekmelerle. Her panelde solda görsel, sağda
 * ekranın kısa tarifi ve notlar. A4 belgeler dar bir sütunda gösterilir.
 */
export function ScreensSection({ feature }: { feature: FeatureWithDetail }) {
  const { screens } = feature.detail;

  const panels = screens.tabs.map((t) => {
    const doc = isDocumentVisual(t.key);
    const narrow = isNarrowVisual(t.key);
    return (
      <div key={t.key} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className={cn("min-w-0", doc ? "lg:col-span-6 xl:col-span-5" : narrow ? "lg:col-span-7" : "lg:col-span-8")}>
          <div className={cn(doc && "relative mx-auto max-w-[460px]")}>
            {doc && <div aria-hidden className="absolute -inset-3 border border-dashed border-line-strong" />}
            <FeatureVisual visual={t.key} className={cn(doc && "relative shadow-float")} />
          </div>
        </div>
        <div className={cn("flex flex-col", doc ? "lg:col-span-6 xl:col-span-7" : narrow ? "lg:col-span-5" : "lg:col-span-4")}>
          <h3 className="text-balance text-[1.5rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950">{t.label}</h3>
          <p className="mt-3 text-pretty text-[1rem] leading-relaxed text-ink-600">{t.summary}</p>
          <ul className="mt-6 border-t border-line-strong">
            {t.points.map((p) => (
              <li key={p} className="flex gap-3 border-b border-line py-3.5 text-[0.9375rem] leading-relaxed text-ink-700">
                <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 bg-ink-400" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  });

  return (
    <section aria-labelledby="ekranlar-baslik" id="ekranlar" className="scroll-mt-20 border-b border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader id="ekranlar-baslik" eyebrow="Ekranlar" align="split" title={screens.title} lede={screens.lede} />
        </Reveal>
        <div className="mt-12">
          <ScreenTabs label={`${feature.name} ekranları`} tabs={screens.tabs.map((t) => ({ label: t.label }))} panels={panels} />
        </div>
      </Container>
    </section>
  );
}
