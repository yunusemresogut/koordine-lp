import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import { contextRows } from "@/content/home";

/**
 * Bağlam: sahadaki bilgi bugün nerede dağınık duruyor, Koordine'de nerede toplanıyor.
 * Solda kısa manifesto, sağda "bugün / Koordine ile" teknik karşılaştırma listesi.
 */
export function ContextSection() {
  return (
    <section aria-labelledby="context-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow index="01" className="mb-5">
                Bağlam
              </Eyebrow>
              <h2 id="context-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
                Bir şantiyenin bilgisi bugün en az altı yere dağılmış durumda.
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
                <p>
                  Rapor WhatsApp grubunda, keşif bir Excel dosyasında, hakediş muhasebenin tablosunda, ekipman birinin
                  hafızasında. Her biri kendi içinde çalışır; bir araya getirmek her hafta birinin işidir.
                </p>
                <p className="text-ink-900">
                  Koordine bu bilgileri sahaya bağlı tek bir kayıtta toplar. Sahadan giren bilgi ofiste, ofiste verilen
                  karar sahada aynı anda görünür.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="hidden grid-cols-[3.5rem_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.25fr)] gap-6 border-b border-ink-950 pb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500 md:grid">
              <span>No</span>
              <span>Konu</span>
              <span>Bugün</span>
              <span className="text-brand-700">Koordine ile</span>
            </div>
            <ol className="divide-y divide-line border-b border-line md:border-t-0">
              {contextRows.map((r, i) => (
                <li key={r.topic} className="grid gap-x-6 gap-y-2 py-6 md:grid-cols-[3.5rem_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.25fr)] md:py-7">
                  <span className="font-mono text-[0.75rem] text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                    <span className="ml-2 text-brand-700 md:ml-0 md:mt-1 md:block">{r.code}</span>
                  </span>
                  <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink-950">{r.topic}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                    <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-400 md:hidden">Bugün</span>
                    {r.before}
                  </p>
                  <p className="relative text-[0.9375rem] leading-relaxed text-ink-900 md:pl-5">
                    <span aria-hidden className="absolute left-0 top-[0.7em] hidden h-px w-3 bg-brand-600 md:block" />
                    <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-brand-700 md:hidden">Koordine</span>
                    {r.after}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
