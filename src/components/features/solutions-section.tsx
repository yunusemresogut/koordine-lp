import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-header";
import type { FeatureWithDetail } from "@/content/feature-details";
import { solutionDetailBySlug } from "@/content/solution-details";

/** "Hangi çözümler için önemli": çözüm sayfalarına bağlanan, gerekçeli satır listesi */
export function SolutionsSection({ feature }: { feature: FeatureWithDetail }) {
  const rows = feature.detail.solutions
    .map((s) => ({ ...s, solution: solutionDetailBySlug(s.slug) }))
    .filter((s) => s.solution !== undefined);

  return (
    <section aria-labelledby="cozumler" className="border-b border-line bg-paper py-20 sm:py-28">
      <Container size="wide">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">
              Çözümler
            </Eyebrow>
            <h2 id="cozumler" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Hangi işler için önemli.
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              {feature.name} her firmada kullanılır. Aşağıdaki sektörlerde günlük işin önemli bir parçasıdır.
            </p>
          </div>

          <ul className="border-t border-ink-950 lg:col-span-8">
            {rows.map(({ slug, why, solution }) => (
              <li key={slug} className="border-b border-line-strong">
                <Link
                  href={`/cozumler/${slug}`}
                  className="group/btn grid grid-cols-[minmax(0,1fr)_1rem] items-start gap-x-4 gap-y-2 py-6 transition-colors duration-200 hover:bg-white sm:px-3"
                >
                  <span className="min-w-0">
                    <span className="block text-[1.1875rem] font-semibold leading-snug text-ink-950">{solution!.name}</span>
                    <span className="mt-1.5 block text-pretty text-[0.9688rem] leading-relaxed text-ink-600">{why}</span>
                  </span>
                  <Arrow className="mt-1.5 text-ink-400 group-hover/btn:text-brand-700" />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
