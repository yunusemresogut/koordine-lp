import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { homeFaq } from "@/content/home";

/**
 * Kısa SSS: yerel <details> ile açılır (JS yok). FAQPage şeması /sss sayfasında basılır, burada değil.
 */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="bg-white py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">
              Sık sorulanlar
            </Eyebrow>
            <h2 id="faq-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Kısa cevaplar.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-600">
              Kurulum, yetkiler ve güvenlikle ilgili diğer sorular SSS sayfasında.
            </p>
            <TextLink href="/sss" className="mt-6">
              Tüm sorular
            </TextLink>
          </div>
          <div className="lg:col-span-8">
            <div className="divide-y divide-line border-y border-ink-950">
              {homeFaq.map((q, i) => (
                <details key={q.question} className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start gap-5 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <span className="flex-1 text-[1.0625rem] font-semibold leading-snug text-ink-950 sm:text-lg">{q.question}</span>
                    <span aria-hidden className="relative mt-1.5 size-3.5 shrink-0">
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-ink-700" />
                      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-700 transition-transform duration-200 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <p className="pb-6 pr-8 text-[0.9375rem] leading-relaxed text-ink-600 sm:text-base">{q.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
