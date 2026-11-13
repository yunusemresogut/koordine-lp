import { Container } from "@/components/ui/container";
import type { FeatureWithDetail } from "@/content/feature-details";
import { cn } from "@/lib/utils";
import { FeatureVisual, isDocumentVisual, isNarrowVisual } from "./feature-visual";

/**
 * Hero altındaki büyük ürün görseli: ölçü çizgisi ve alt yazı ile pafta üzerindeki bir çizim gibi.
 * A4 belge ve dar paneller ortalanır, geniş tablolar konteyner genişliğini kullanır.
 */
export function HeroVisual({ feature }: { feature: FeatureWithDetail }) {
  const { key, caption } = feature.detail.visual;
  const doc = isDocumentVisual(key);
  const narrow = isNarrowVisual(key);

  return (
    <div className="relative border-b border-line bg-paper">
      <Container size="wide" className="py-10 sm:py-14">
        <figure className={cn("mx-auto", doc ? "max-w-[620px]" : narrow ? "max-w-[880px]" : "max-w-[1180px]")}>
          {/* Ölçü çizgisi */}
          <div aria-hidden className="relative mb-4 hidden h-3 sm:block">
            <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
            <span className="absolute left-0 top-0 h-3 w-px bg-ink-400" />
            <span className="absolute right-0 top-0 h-3 w-px bg-ink-400" />
          </div>
          <FeatureVisual visual={key} frameDocument className={cn(doc && "shadow-float")} />
          <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
            <span className="normal-case tracking-[0.04em] text-ink-600">{caption}</span>
            <span className="text-ink-400">Örnek veri</span>
          </figcaption>
        </figure>
      </Container>
    </div>
  );
}
