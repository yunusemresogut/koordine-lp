import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * İç sayfaların üst bölümü: içerik yolu, pafta etiketi, h1 ve açıklama.
 * Sağ tarafa (aside) görsel/özet kutusu konabilir.
 */
export function PageHero({
  crumbs,
  eyebrow,
  index,
  title,
  lede,
  aside,
  children,
  className,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  index?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section aria-labelledby="page-title" className={cn("relative overflow-hidden border-b border-line", className)}>
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-70" />
      <Container size="wide" className="relative pb-16 pt-10 sm:pb-20 sm:pt-12">
        <Breadcrumbs items={crumbs} />
        <div className={cn("mt-12 grid gap-12", aside && "lg:grid-cols-12 lg:items-end")}>
          <div className={cn(aside && "lg:col-span-7")}>
            {eyebrow && (
              <Eyebrow index={index} className="mb-5">
                {eyebrow}
              </Eyebrow>
            )}
            <h1 id="page-title" className="text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink-950 sm:text-[3.5rem] lg:text-[4rem]">
              {title}
            </h1>
            {lede && <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600 sm:text-xl">{lede}</p>}
            {children && <div className="mt-9">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
