import { JsonLd } from "@/components/seo/json-ld";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { faq, faqByCategory, faqCategories } from "@/content/faq";
import { faqSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const title = "Sık Sorulan Sorular";
const description =
  "Koordine hakkında sık sorulanlar: modüller, Excel'den veri aktarımı, roller ve yetkiler, yapay zekâ asistanı, veri güvenliği, kurulum ve fiyatlandırma.";

export const metadata = pageMetadata({ title, description, path: "/sss" });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faq)} />
      <PageHero
        crumbs={[{ name: "SSS", path: "/sss" }]}
        eyebrow="Sık sorulan sorular"
        title="Koordine hakkında merak edilenler."
        lede={`${faq.length} soruyu beş başlıkta topladık. Aradığınızı bulamazsanız ${site.email.support} adresine yazın.`}
      />

      <section aria-label="Sorular" className="bg-white">
        <Container size="wide" className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Kategori atlama bağlantıları */}
            <nav aria-label="Soru kategorileri" className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Başlıklar</p>
                <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-l lg:border-line">
                  {faqCategories.map((c) => (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className="flex items-baseline gap-3 rounded-sm border border-line px-3 py-2 text-[0.9375rem] text-ink-700 transition-colors duration-150 hover:border-ink-950 hover:text-ink-950 lg:-ml-px lg:rounded-none lg:border-0 lg:border-l lg:border-transparent lg:py-2.5 lg:pl-5 lg:hover:border-ink-950"
                      >
                        <span>{c.label}</span>
                        <span className="ml-auto hidden font-mono text-[0.6875rem] tabular-nums text-ink-400 lg:inline">
                          {faqByCategory(c.id).length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <div className="space-y-16 lg:col-span-9">
              {faqCategories.map((c) => (
                <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-28">
                  <div className="border-b border-ink-950 pb-4">
                    <h2 id={`${c.id}-title`} className="text-[1.625rem] font-semibold tracking-[-0.02em] text-ink-950">
                      {c.label}
                    </h2>
                  </div>
                  <div className="divide-y divide-line border-b border-line">
                    {faqByCategory(c.id).map((q) => (
                      <details key={q.id} id={q.id} className="group scroll-mt-28">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                          <span className="text-pretty text-[1.0625rem] font-medium leading-snug text-ink-950 transition-colors duration-150 group-hover:text-brand-700">
                            {q.question}
                          </span>
                          <span
                            aria-hidden
                            className="relative mt-1 flex size-5 shrink-0 items-center justify-center rounded-xs border border-line-strong text-ink-600 transition-colors duration-150 group-open:border-ink-950 group-open:bg-ink-950 group-open:text-white"
                          >
                            <span className="absolute h-px w-2.5 bg-current" />
                            <span className="absolute h-2.5 w-px bg-current group-open:hidden" />
                          </span>
                        </summary>
                        <div className="max-w-3xl pb-7 pr-10">
                          {q.answer.split("\n\n").map((para, pi) => (
                            <p key={pi} className="mt-3 first:mt-0 text-pretty leading-relaxed text-ink-600">
                              {para}
                            </p>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <div className="flex flex-col gap-5 rounded-md border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 className="text-lg font-semibold text-ink-950">Sorunuz burada yok mu?</h2>
                  <p className="mt-1 text-[0.9375rem] text-ink-600">
                    Barındırma, sözleşme ya da teknik konular için ekibimize yazın.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <TextLink href="/iletisim">İletişim sayfası</TextLink>
                  <a
                    href={`mailto:${site.email.support}`}
                    className="text-[0.9375rem] text-ink-700 underline decoration-line-strong underline-offset-4 hover:text-ink-950"
                  >
                    {site.email.support}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
