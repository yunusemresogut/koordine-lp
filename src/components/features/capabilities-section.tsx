import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FeatureWithDetail } from "@/content/feature-details";

/**
 * "Ne yapar": yetenek listesi. Her madde gerçek alan / durum adlarını
 * mono etiketler olarak taşır (uygulamada ekranda gördüğünüz kelimeler).
 */
export function CapabilitiesSection({ feature }: { feature: FeatureWithDetail }) {
  const items = feature.detail.capabilities;
  return (
    <section aria-labelledby="ne-yapar" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            id="ne-yapar"
            eyebrow="Ne yapar"
            align="split"
            title={`${feature.name} modülünde neler var?`}
            lede="Maddelerin altındaki etiketler, uygulamada aynı ekranda gördüğünüz alan ve durum adlarıdır."
          />
        </Reveal>

        <ul className="mt-14 grid border-t border-ink-950 lg:grid-cols-2 lg:gap-x-16">
          {items.map((c) => (
            <li key={c.title} className="border-b border-line py-8 lg:odd:last:col-span-2 lg:odd:last:[&>div]:max-w-[calc(50%-2rem)]">
              <div className="flex items-baseline gap-3">
                <span aria-hidden className="size-2 shrink-0 translate-y-[-0.1em] bg-brand-600" />
                <h3 className="text-balance text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950">{c.title}</h3>
              </div>
              <div className="pl-5">
                <p className="mt-2.5 text-pretty text-[0.9875rem] leading-relaxed text-ink-600">{c.body}</p>
                {c.terms.length > 0 && (
                  <ul aria-label="Uygulamadaki karşılıkları" className="mt-4 flex flex-wrap gap-1.5">
                    {c.terms.map((t) => (
                      <li
                        key={t}
                        className="rounded-xs border border-dashed border-line-strong bg-paper px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.02em] text-ink-700"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
