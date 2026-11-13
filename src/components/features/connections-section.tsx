import Link from "next/link";
import { Arrow } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { featureBySlug } from "@/content/features";
import type { FeatureWithDetail } from "@/content/feature-details";
import { cn } from "@/lib/utils";

type Conn = FeatureWithDetail["detail"]["connections"][number];

/**
 * "Diğer modüllerle bağlantısı": koyu pafta zemininde bağlantı şeması.
 * Solda bu modüle veri getiren modüller, ortada modül düğümü, sağda verinin aktığı modüller.
 * Dar ekranda yukarıdan aşağı akar.
 */
export function ConnectionsSection({ feature }: { feature: FeatureWithDetail }) {
  const incoming = feature.detail.connections.filter((c) => c.dir === "in");
  const outgoing = feature.detail.connections.filter((c) => c.dir === "out");

  return (
    <section aria-labelledby="baglantilar" className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div aria-hidden className="bg-grid-dark pointer-events-none absolute inset-0" />
      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeader
            id="baglantilar"
            eyebrow="Bağlantılar"
            tone="dark"
            align="split"
            title="Diğer modüllerle bağlantısı."
            lede="Koordine'de bir bilgi bir kez girilir ve ilgili modüllerde tekrar kullanılır. Aşağıda bu modülün hangi modüllerden veri aldığı ve hangilerine veri verdiği görünüyor."
          />
        </Reveal>

        <Reveal className="mt-14">
          <figure className="border border-line-dark bg-ink-950/70">
            <div className="flex items-center justify-between border-b border-line-dark px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400 sm:px-6">
              <span>Bağlantı şeması</span>
              <span>
                {incoming.length} gelen, {outgoing.length} giden
              </span>
            </div>

            <div className="grid gap-0 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_13rem_minmax(0,1fr)] lg:py-10">
              <Column title="Bu modüle gelen" items={incoming} side="left" />

              {/* Merkez düğüm */}
              <div className="relative flex flex-col items-center justify-center py-6 lg:py-0 lg:pt-8">
                <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-white/15 lg:hidden" />
                <div className="relative flex w-full max-w-[13rem] flex-col items-center justify-center border border-brand-400 bg-ink-900 px-4 py-7 text-center">
                  <FeatureIcon name={feature.icon} className="size-6 text-brand-300" />
                  <span className="mt-3 text-balance text-[1.125rem] font-semibold leading-snug text-white">{feature.name}</span>
                </div>
              </div>

              <Column title="Bu modülden giden" items={outgoing} side="right" />
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

function Column({ title, items, side }: { title: string; items: Conn[]; side: "left" | "right" }) {
  return (
    <div className={cn("flex min-w-0 flex-col justify-center", side === "left" ? "lg:pr-0" : "lg:pl-0")}>
      <h3 className={cn("mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-400", side === "left" ? "lg:pr-10" : "lg:pl-10")}>{title}</h3>
      {items.length === 0 ? (
        <p className={cn("border border-dashed border-line-dark px-4 py-4 text-[0.875rem] text-ink-400", side === "left" ? "lg:mr-10" : "lg:ml-10")}>
          Bu yönde doğrudan bağlantı yok.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((c) => (
            <ConnItem key={c.feature + c.dir + c.record} conn={c} side={side} />
          ))}
        </ul>
      )}
    </div>
  );
}

function ConnItem({ conn, side }: { conn: Conn; side: "left" | "right" }) {
  const f = featureBySlug(conn.feature);
  if (!f) return null;
  return (
    <li className={cn("group/conn relative", side === "left" ? "lg:pr-10" : "lg:pl-10")}>
      {/* Toplama hattı (bus): ilk ve son öğenin ortası arasında sürekli dikey çizgi */}
      <span
        aria-hidden
        className={cn(
          "absolute -top-3 hidden h-[calc(50%+0.75rem)] w-px bg-white/25 group-first/conn:hidden lg:block",
          side === "left" ? "right-0" : "left-0"
        )}
      />
      <span
        aria-hidden
        className={cn("absolute bottom-0 top-1/2 hidden w-px bg-white/25 group-last/conn:hidden lg:block", side === "left" ? "right-0" : "left-0")}
      />
      {/* Merkeze bağlayan kısa hat (geniş ekran) */}
      <span
        aria-hidden
        className={cn("absolute top-1/2 hidden h-px w-10 bg-white/25 lg:block", side === "left" ? "right-0" : "left-0")}
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden size-0 -translate-y-1/2 border-y-[4px] border-y-transparent lg:block",
          side === "left" ? "right-0 border-l-[6px] border-l-white/40" : "left-[2.125rem] border-l-[6px] border-l-white/40"
        )}
      />
      <Link
        href={`/ozellikler/${f.slug}`}
        className="group/btn grid grid-cols-[1.25rem_minmax(0,1fr)_1rem] items-start gap-3 border border-line-dark bg-ink-900/60 px-4 py-3.5 transition-colors duration-200 hover:border-white/40 hover:bg-ink-900"
      >
        <FeatureIcon name={f.icon} className="mt-0.5 size-4 text-brand-300" />
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-semibold text-white">{f.name}</span>
          <span className="mt-1 block text-pretty text-[0.875rem] leading-relaxed text-ink-300">{conn.what}</span>
          <span className="mt-2 inline-block rounded-xs border border-dashed border-white/20 px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.06em] text-ink-300">
            {conn.record}
          </span>
        </span>
        <Arrow className="mt-1 text-ink-400 group-hover/btn:text-white" />
      </Link>
    </li>
  );
}
