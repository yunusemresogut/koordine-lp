import { MapMockup, ProgressPaymentMockup, ReportDocumentMockup } from "@/components/mockups";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { hero } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Ana sayfa üst bölümü: tek h1, değer önerisi, iki CTA, ürün gerçekleri satırı ve
 * ürün kompozisyonu (harita penceresi + A4 rapor + hakediş tablosu). Resim yok; tamamen HTML/CSS/SVG.
 */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-80" />
      <Container size="wide" className="relative pt-12 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-6">
              {hero.eyebrow}
            </Eyebrow>
            <h1
              id="hero-title"
              className="text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink-950 sm:text-[3.5rem] lg:text-[4.25rem]"
            >
              {hero.title}
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-pretty text-lg leading-relaxed text-ink-600">{hero.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/iletisim#demo" size="lg" arrow>
                Demo talep et
              </ButtonLink>
              <ButtonLink href="/ozellikler" variant="secondary" size="lg">
                Özellikleri inceleyin
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Ürün gerçekleri */}
        <dl className="mt-14 grid grid-cols-2 border-l border-t border-line-strong bg-white/70 sm:grid-cols-4">
          {hero.facts.map((f) => (
            <div key={f.k} className="border-b border-r border-line-strong px-4 py-3 sm:px-5">
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">{f.k}</dt>
              <dd className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                <span className="font-mono text-xl font-medium tabular-nums text-ink-950">{f.v}</span>
                <span className="text-[0.8125rem] text-ink-500">{f.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <Composition />
      </Container>
    </section>
  );
}

/** Izgara üzerinde ana pencere, üst üste binen paneller, ölçü çizgisi ve çağrı etiketleri */
function Composition() {
  return (
    <div className="relative mt-14 pb-16 sm:mt-16 lg:pb-28 xl:pb-40">
      {/* Üst ölçü çizgisi */}
      <div aria-hidden className="mb-4 hidden items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400 sm:flex">
        <span className="h-3 w-px bg-ink-300" />
        <span className="h-px flex-1 bg-ink-300" />
        <span>İstanbul sahaları, 41°00′K 29°01′D</span>
        <span className="h-px flex-1 bg-ink-300" />
        <span className="h-3 w-px bg-ink-300" />
      </div>

      <div className="relative">
        <div className="lg:w-[76%]">
          <Callout text="Harita ve saha listesi" />
          <MapMockup selectedId="lvt" showLegend={false} className="shadow-float" />
        </div>

        <div className="pointer-events-none absolute right-0 top-[13%] hidden w-[28%] lg:block">
          {/* Etiket sağa yaslı: harita penceresinin sağ üst çipleriyle çakışmasın */}
          <Callout text="Günlük saha raporu" className="ml-auto pl-2 pr-0" />
          <ReportDocumentMockup type="daily" className="drop-shadow-[0_24px_32px_rgba(4,12,38,0.22)]" />
        </div>

        {/* Saha listesinin sağından başlar; etiket altta, listeyi kesmez */}
        <div className="pointer-events-none absolute -bottom-[22%] left-[21%] hidden w-[44%] xl:block">
          <ProgressPaymentMockup rows={3} showSummary={false} className="shadow-float" />
          <Callout text="Hakedişler" className="mb-0 mt-2" />
        </div>
      </div>
    </div>
  );
}

function Callout({ text, className }: { text: string; className?: string }) {
  return (
    <p aria-hidden className={cn("mb-2 flex w-fit items-center gap-2 bg-paper py-0.5 pr-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500", className)}>
      <span className="size-1.5 rounded-full bg-brand-600" />
      {text}
    </p>
  );
}
