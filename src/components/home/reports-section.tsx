import { ReportDocumentMockup } from "@/components/mockups";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { reportTabs } from "@/content/home";
import { ReportTabs } from "./report-tabs";

/**
 * Saha raporları (koyu bölüm): 6 rapor tipi, erişilebilir dikey sekmelerle.
 * Her panelde ilgili A4 belge görseli ve belgenin bölümleri.
 */
export function ReportsSection() {
  const panels = reportTabs.map((r) => (
    <div key={r.type} className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-10">
      <div className="relative mx-auto w-full max-w-[460px]">
        <div aria-hidden className="absolute -inset-3 border border-dashed border-white/15" />
        <ReportDocumentMockup type={r.type} className="relative" />
      </div>
      <div className="flex flex-col">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">Belgede neler var</p>
        <h3 className="mt-3 text-[1.375rem] font-semibold leading-snug text-white">{r.label}</h3>
        <ul className="mt-5 divide-y divide-line-dark border-y border-line-dark">
          {r.contents.map((c) => (
            <li key={c} className="flex gap-3 py-3 text-[0.9375rem] leading-relaxed text-ink-200">
              <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 bg-brand-400" />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return (
    <section aria-labelledby="reports-title" className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <Container size="wide" className="relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow tone="dark" className="mb-5">
              Saha raporları
            </Eyebrow>
            <h2 id="reports-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-white sm:text-[2.625rem]">
              Saha raporları her seferinde aynı düzende hazırlanır.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <p className="text-pretty text-[1.0625rem] leading-relaxed text-ink-300 sm:text-lg">
              Altı rapor tipi hazır şablonla gelir. Saha ekibi formu doldurur, rapor firmanızın adıyla A4 PDF olarak
              çıkar. Eski raporları şantiyeye, şehre ve hazırlayana göre arayabilirsiniz.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <ReportTabs
            label="Rapor tipleri"
            tabs={reportTabs.map((r) => ({ label: r.label, summary: r.summary }))}
            panels={panels}
          />
        </div>

        <div className="mt-14 border-t border-line-dark pt-6">
          <ButtonLink href="/ozellikler/saha-raporlari" variant="inverse-outline" arrow>
            Saha raporlarını inceleyin
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
