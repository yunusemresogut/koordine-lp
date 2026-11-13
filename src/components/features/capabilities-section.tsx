import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FeatureWithDetail } from "@/content/feature-details";
import { pad2 } from "@/lib/utils";

const COUNT: Record<number, string> = { 4: "Dört", 5: "Beş", 6: "Altı" };

/**
 * "Ne yapar": numaralı spesifikasyon listesi. Her madde gerçek alan / durum adlarını
 * mono etiketler olarak taşır (uygulamada ekranda gördüğünüz kelimeler).
 */
export function CapabilitiesSection({ index, feature }: { index: string; feature: FeatureWithDetail }) {
  const items = feature.detail.capabilities;
  return (
    <section aria-labelledby="ne-yapar" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            id="ne-yapar"
            index={index}
            eyebrow="Ne yapar"
            align="split"
            title={`${COUNT[items.length] ?? items.length} yetenek, ekrandaki adlarıyla.`}
            lede="Her maddenin altındaki etiketler, uygulamada o ekranda gördüğünüz alan ve durum adlarıdır."
          />
        </Reveal>

        <ol className="mt-14 grid border-t border-ink-950 lg:grid-cols-2 lg:gap-x-16">
          {items.map((c, i) => (
            <li key={c.title} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-b border-line py-8 sm:grid-cols-[4rem_minmax(0,1fr)]">
              <span aria-hidden className="font-mono text-[1.5rem] leading-none tracking-[-0.02em] text-ink-300 sm:text-[1.75rem]">
                {pad2(i + 1)}
              </span>
              <div>
                <h3 className="text-balance text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] text-ink-950">{c.title}</h3>
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
        </ol>
      </Container>
    </section>
  );
}
