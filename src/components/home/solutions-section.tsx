import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { solutionModules } from "@/content/home";
import { solutions } from "@/content/solutions";

/**
 * Kimler için: 4 çözüm, ortak çizgili "pafta" hücreleri. Her hücrenin sağ altında küçük bir antet
 * kutusu (sayfa kodu + ilgili modüller) var. /cozumler/[slug] sayfalarına bağlanır.
 */
export function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          index="08"
          eyebrow="Kimler için"
          align="split"
          title={<span id="solutions-title">Projeyi sahada yürüten ekipler için.</span>}
          lede="Aynı platform, farklı ağırlıklar: taahhüt firması için hakediş ve puantaj, mimarlık ofisi için malzeme sunumu ve kontrol listesi öne çıkar."
        />

        <ul className="mt-14 grid border-l border-t border-ink-950 md:grid-cols-2">
          {solutions.map((s, i) => (
            <li key={s.slug} className="border-b border-r border-ink-950">
              <Link
                href={`/cozumler/${s.slug}`}
                className="group/btn flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-200 hover:bg-paper sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-400">Ç-{String(i + 1).padStart(2, "0")}</span>
                    <Arrow className="size-5 text-ink-400 group-hover/btn:text-brand-700" />
                  </div>
                  <h3 className="mt-6 text-balance text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink-950 group-hover/btn:text-brand-800 sm:text-[1.75rem]">
                    {s.name}
                  </h3>
                  <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-ink-600">{s.summary}</p>
                </div>
                <div className="flex justify-end">
                  <div className="grid grid-cols-[auto_auto] border border-line-strong font-mono text-[0.6875rem] uppercase tracking-[0.1em]">
                    <span className="border-r border-line-strong px-2.5 py-1.5 text-ink-400">Öne çıkan</span>
                    <span className="flex gap-2 px-2.5 py-1.5 text-ink-800">
                      {solutionModules[s.slug].map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
