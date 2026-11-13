import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { onboardingSteps } from "@/content/home";

/**
 * Nasıl başlarız: üç adım, ölçü çizgisi üzerinde. Süre vaadi yok.
 */
export function OnboardingSection() {
  return (
    <section aria-labelledby="start-title" className="border-b border-line py-20 sm:py-28">
      <Container size="wide">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow className="mb-5">
              Nasıl başlarız
            </Eyebrow>
            <h2 id="start-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Başlangıç üç adımdan oluşur.
            </h2>
          </div>
          <ButtonLink href="/iletisim#demo" variant="secondary" arrow className="self-start lg:self-auto">
            Demo görüşmesi planlayın
          </ButtonLink>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-0">
          {/* Ölçü çizgisi */}
          <span aria-hidden className="absolute left-0 right-0 top-[9px] hidden h-px bg-ink-950 md:block" />
          <span aria-hidden className="absolute left-0 top-[3px] hidden h-[13px] w-px bg-ink-950 md:block" />
          <span aria-hidden className="absolute right-0 top-[3px] hidden h-[13px] w-px bg-ink-950 md:block" />
          {onboardingSteps.map((s, i) => (
            <li key={s.title} className="relative border-l border-line-strong pl-5 md:border-l-0 md:pl-0 md:pr-10">
              <span aria-hidden className="absolute -left-[5px] top-1 block size-[9px] rotate-45 border border-ink-950 bg-paper md:left-0 md:top-[5px]" />
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-brand-700 md:mt-9">Adım {i + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-ink-950">{s.title}</h3>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
