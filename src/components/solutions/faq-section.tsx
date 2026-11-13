import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import type { SolutionDetail } from "@/content/solution-details";
import { faqSchema } from "@/lib/seo";

/** Sektöre özgü SSS: yerel <details> akordeon + FAQPage JSON-LD */
export function FaqSection({ faqs }: { faqs: SolutionDetail["faqs"] }) {
  return (
    <section aria-labelledby="sss" className="border-t border-line bg-white py-20 sm:py-28">
      <JsonLd data={faqSchema(faqs)} />
      <Container size="wide">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">SSS</Eyebrow>
            <h2 id="sss" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Sık sorulan sorular
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              Genel sorular için{" "}
              <Link href="/sss" className="text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-700">
                SSS sayfasına
              </Link>{" "}
              bakabilirsiniz.
            </p>
          </div>

          <div className="border-t border-ink-950 lg:col-span-8">
            {faqs.map((q, i) => (
              <details key={q.question} className="group border-b border-line" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-5 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-pretty text-[1.125rem] font-semibold leading-snug text-ink-950">{q.question}</span>
                  <span aria-hidden className="relative mt-1.5 size-3.5 shrink-0 text-ink-500">
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="-mt-1 max-w-2xl pb-7 pr-8 text-pretty text-[1rem] leading-relaxed text-ink-600">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
