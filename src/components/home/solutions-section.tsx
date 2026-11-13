import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { solutionModules } from "@/content/home";
import { solutions } from "@/content/solutions";

/**
 * Kimler için: 4 çözüm, ortak çizgili hücreler. Her hücrenin altında öne çıkan modüller yazar.
 * /cozumler/[slug] sayfalarına bağlanır.
 */
export function SolutionsSection() {
  return (
    <section aria-labelledby="solutions-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Kimler için"
          align="split"
          title={<span id="solutions-title">Sahada proje yürüten firmalar için.</span>}
          lede="Platform aynıdır, öne çıkan modüller değişir. Taahhüt firmaları hakediş ve puantajı, mimarlık ofisleri saha raporlarını ve keşfi daha çok kullanır."
        />

        <ul className="mt-14 grid border-l border-t border-ink-950 md:grid-cols-2">
          {solutions.map((s) => (
            <li key={s.slug} className="border-b border-r border-ink-950">
              <Link
                href={`/cozumler/${s.slug}`}
                className="group/btn flex h-full flex-col justify-between gap-10 p-6 transition-colors duration-200 hover:bg-paper sm:p-8"
              >
                <div>
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-balance text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink-950 group-hover/btn:text-brand-800 sm:text-[1.75rem]">
                      {s.name}
                    </h3>
                    <Arrow className="mt-2 size-5 shrink-0 text-ink-400 group-hover/btn:text-brand-700" />
                  </div>
                  <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-ink-600">{s.summary}</p>
                </div>
                <p className="border-t border-line pt-4 text-[0.875rem] text-ink-600">
                  <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400">Öne çıkan</span>
                  {solutionModules[s.slug]}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
