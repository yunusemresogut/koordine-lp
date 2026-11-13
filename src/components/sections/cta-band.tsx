import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { site } from "@/lib/site";

/**
 * Sayfa sonu çağrı bandı. Footer'ın hemen üstünde, tüm sayfalarda ortak kullanılır.
 * Koyu mürekkep zemin + ince ızgara; footer ile görsel olarak birleşir.
 */
export function CtaBand({
  title = "Koordine'yi kendi projeleriniz üzerinden görün.",
  lede = "30 dakikalık bir görüşmede ekranları birlikte inceleyelim ve sorularınızı cevaplayalım. Kurulum ve veri aktarımında da birlikte ilerleriz.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink-950">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <Container size="wide" className="relative">
        <div className="grid gap-10 border-b border-line-dark py-20 sm:py-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark">Demo</Eyebrow>
            <h2
              id="cta-title"
              className="mt-5 text-balance text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.025em] text-white sm:text-[3rem]"
            >
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink-300">{lede}</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/iletisim#demo" variant="inverse" size="lg" arrow>
                Demo talep et
              </ButtonLink>
              <ButtonLink href="/ozellikler" variant="inverse-outline" size="lg">
                Özellikleri inceleyin
              </ButtonLink>
            </div>
            <p className="text-sm text-ink-400">
              Sorularınız için{" "}
              <a href={`mailto:${site.email.support}`} className="text-ink-200 underline decoration-white/30 underline-offset-4 hover:text-white">
                {site.email.support}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
