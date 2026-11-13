import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { featuresWithDetails, type FeatureWithDetail } from "@/content/feature-details";
import { cn, pad2 } from "@/lib/utils";

/** Önceki / sonraki modül (features.ts sırası, uçlarda döngüsel) ve tüm modüller bağlantısı */
export function ModulePager({ feature }: { feature: FeatureWithDetail }) {
  const n = featuresWithDetails.length;
  const prev = featuresWithDetails[(feature.index - 1 + n) % n];
  const next = featuresWithDetails[(feature.index + 1) % n];

  return (
    <nav aria-label="Modüller arasında gezinme" className="border-b border-line bg-paper">
      <Container size="wide">
        <div className="grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <PagerLink f={prev} dir="prev" />
          <Link
            href="/ozellikler"
            className="flex items-center justify-center border-line px-6 py-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-600 transition-colors duration-200 hover:bg-white hover:text-ink-950 max-sm:order-last max-sm:border-t sm:border-x"
          >
            Tüm modüller · {pad2(n)}
          </Link>
          <PagerLink f={next} dir="next" />
        </div>
      </Container>
    </nav>
  );
}

function PagerLink({ f, dir }: { f: FeatureWithDetail; dir: "prev" | "next" }) {
  return (
    <Link
      href={`/ozellikler/${f.slug}`}
      rel={dir}
      className={cn(
        "group/btn flex items-center gap-4 py-7 transition-colors duration-200 hover:bg-white sm:px-6",
        dir === "next" ? "justify-end text-right max-sm:border-t max-sm:border-line" : "justify-start"
      )}
    >
      {dir === "prev" && <Arrow className="rotate-180 text-ink-400 group-hover/btn:text-brand-700" />}
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
          {dir === "prev" ? "Önceki modül" : "Sonraki modül"} · {f.code}
        </span>
        <span className="mt-1 block truncate text-[1.125rem] font-semibold text-ink-950">{f.name}</span>
      </span>
      {dir === "next" && <Arrow className="text-ink-400 group-hover/btn:text-brand-700" />}
    </Link>
  );
}
