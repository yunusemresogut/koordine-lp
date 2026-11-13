import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { contextRows } from "@/content/home";

/**
 * Bağlam: şantiye bilgisi çoğu firmada nerede tutuluyor, Koordine'de nasıl tutuluyor.
 * Solda kısa açıklama, sağda dört satırlık sade karşılaştırma.
 */
export function ContextSection() {
  return (
    <section aria-labelledby="context-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow className="mb-5">Neden Koordine</Eyebrow>
              <h2 id="context-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
                Şantiye bilgisi çoğu firmada birkaç farklı yerde tutulur.
              </h2>
              <p className="mt-6 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                Rapor WhatsApp grubunda, keşif Excel&apos;de, hakediş muhasebenin tablosunda olur. Koordine&apos;de hepsine
                sahanın sayfasından ulaşırsınız. Ofis ve şantiye aynı bilgiyi görür.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-6 border-b border-ink-950 pb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 md:grid">
              <span>Konu</span>
              <span>Çoğu firmada</span>
              <span className="text-brand-700">Koordine&apos;de</span>
            </div>
            <ul className="divide-y divide-line border-b border-line">
              {contextRows.map((r) => (
                <li key={r.topic} className="grid gap-x-6 gap-y-2 py-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:py-7">
                  <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink-950">{r.topic}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                    <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400 md:hidden">Çoğu firmada</span>
                    {r.before}
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-900">
                    <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-700 md:hidden">Koordine&apos;de</span>
                    {r.after}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
