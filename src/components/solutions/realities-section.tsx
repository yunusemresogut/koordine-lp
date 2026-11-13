import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import type { SolutionDetail } from "@/content/solution-details";

/** "Sahadaki durum": solda yapışkan başlık, sağda editoryal liste */
export function RealitiesSection({ realities }: { realities: SolutionDetail["realities"] }) {
  return (
    <section aria-labelledby="sahadaki-durum" className="border-t border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <Eyebrow className="mb-5">Sahadaki durum</Eyebrow>
              <h2
                id="sahadaki-durum"
                className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]"
              >
                Bu sektörde sık karşılaşılan sorunlar
              </h2>
            </div>
          </div>

          <ul className="border-t border-ink-950 lg:col-span-8">
            {realities.map((r) => (
              <li key={r.title} className="border-b border-line py-8 sm:py-10">
                <h3 className="text-balance text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-ink-950 sm:text-[1.5rem]">
                  {r.title}
                </h3>
                <p className="mt-3 max-w-2xl text-pretty text-[1.0625rem] leading-relaxed text-ink-600">{r.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
