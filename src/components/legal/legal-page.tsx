import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { legalNav } from "@/content/navigation";
import { webPageSchema } from "@/lib/seo";
import { site } from "@/lib/site";
import { LegalToc } from "./legal-toc";

/** Tüm yasal metinlerin son güncelleme tarihi (metin değiştiğinde güncelleyin) */
export const LEGAL_UPDATED = { display: "11.11.2026", iso: "2026-11-11" };

export type LegalSection = { id: string; title: string; content: React.ReactNode };

/**
 * Ortak yasal sayfa düzeni: PageHero, solda yapışkan içindekiler, sağda prose-legal metin.
 * Yasal sayfalarda CtaBand kullanılmaz.
 */
export function LegalPage({
  title,
  lede,
  path,
  crumb,
  code,
  description,
  intro,
  sections,
}: {
  title: string;
  lede: string;
  path: string;
  crumb: string;
  /** Pafta kodu, ör. "YS-01" */
  code: string;
  description: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
}) {
  const others = legalNav.filter((l) => l.href !== path);

  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path })} />
      <PageHero crumbs={[{ name: crumb, path }]} eyebrow={`Yasal · ${code}`} title={title} lede={lede}>
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-500">
          Son güncelleme: <time dateTime={LEGAL_UPDATED.iso} className="text-ink-950">{LEGAL_UPDATED.display}</time>
        </p>
      </PageHero>

      <div className="bg-white">
        <Container size="wide" className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pb-6">
                <LegalToc items={sections.map(({ id, title }) => ({ id, title }))} />
                <div className="mt-10 hidden border-t border-line pt-6 lg:block">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Diğer metinler</p>
                  <ul className="mt-3 space-y-2 text-[0.875rem]">
                    {others.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-ink-600 hover:text-ink-950">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <article className="min-w-0 lg:col-span-8 xl:col-span-7">
              {process.env.NODE_ENV !== "production" && <DevNotice />}
              <div className="prose-legal max-w-[72ch]">
                {intro}
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28">
                    <h2 id={`${s.id}-h`}>
                      <span className="mr-3 font-mono text-[0.8125rem] font-medium tabular-nums text-brand-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </h2>
                    {s.content}
                  </section>
                ))}
              </div>

              <div className="mt-14 border-t border-line pt-6 text-sm text-ink-500 lg:hidden">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]">Diğer metinler</p>
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {others.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-ink-700 underline decoration-line-strong underline-offset-4 hover:text-ink-950">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-10 text-sm text-ink-500">
                Bu metinle ilgili sorularınız için{" "}
                <a href={`mailto:${site.email.support}`} className="text-brand-700 underline underline-offset-4">
                  {site.email.support}
                </a>
              </p>
            </article>
          </div>
        </Container>
      </div>
    </>
  );
}

/** Yalnızca geliştirme ortamında görünen hatırlatma */
function DevNotice() {
  return (
    <div role="note" className="mb-10 rounded-sm border border-warn/50 border-l-4 border-l-warn bg-[#fdf5e3] px-4 py-3 text-sm leading-relaxed text-ink-950">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[#7a4f12]">Geliştirme notu</p>
      <p className="mt-1">
        Firma bilgileri <code className="font-mono text-[0.8125rem]">src/lib/site.ts</code> içinde doldurulmalı ve metin hukuk
        danışmanınızca gözden geçirilmeli.
      </p>
    </div>
  );
}
