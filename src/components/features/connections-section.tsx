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
 * "Diğer modüllerle bağlantısı": mavi baskı (blueprint) zemininde bağlantı şeması.
 * Solda bu modüle veri getiren modüller, ortada modül düğümü, sağda verinin gittiği modüller.
 * Her şey tek renk beyaz çizgiyle çizilir; sağ altta pafta antet kutusu bulunur.
 * Dar ekranda yukarıdan aşağı akar.
 */
export function ConnectionsSection({ feature }: { feature: FeatureWithDetail }) {
  const incoming = feature.detail.connections.filter((c) => c.dir === "in");
  const outgoing = feature.detail.connections.filter((c) => c.dir === "out");

  return (
    <section aria-labelledby="baglantilar" className="bg-blueprint relative overflow-hidden py-20 sm:py-28">
      <Container size="wide" className="relative">
        <Reveal>
          <SectionHeader
            id="baglantilar"
            eyebrow="Bağlantılar"
            tone="dark"
            align="split"
            title="Diğer modüllerle bağlantısı."
            lede="Koordine'de bir bilgi bir kez girilir ve ilgili modüllerde tekrar kullanılır. Aşağıda bu modülün hangi modüllerden veri aldığı ve hangilerine veri verdiği görünüyor."
            className="[&_p]:text-white/75"
          />
        </Reveal>

        <Reveal className="mt-14">
          <figure className="relative border border-white/45">
            <CornerMarks />

            <div className="grid gap-0 px-4 pb-8 pt-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_14rem_minmax(0,1fr)] lg:pb-10 lg:pt-12">
              <Column title="Bu modüle gelen" items={incoming} side="left" />

              {/* Merkez düğüm: çift çizgili ana parça */}
              <div className="relative flex flex-col items-center justify-center py-8 lg:py-0 lg:pt-8">
                <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-white/55 lg:hidden" />
                <div className="relative w-full max-w-[14rem] border border-white bg-brand-900 p-1.5">
                  <div className="flex flex-col items-center justify-center border border-white/45 px-4 py-7 text-center">
                    <FeatureIcon name={feature.icon} className="size-6 text-white" />
                    <span className="mt-3 text-balance text-[1.125rem] font-semibold leading-snug text-white">{feature.name}</span>
                  </div>
                </div>
              </div>

              <Column title="Bu modülden giden" items={outgoing} side="right" />
            </div>

            <TitleBlock name={feature.name} incoming={incoming.length} outgoing={outgoing.length} />
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

/** Dört köşede kesim işareti */
function CornerMarks() {
  const base = "pointer-events-none absolute size-3 border-white";
  return (
    <span aria-hidden>
      <span className={cn(base, "-left-2 -top-2 border-l border-t")} />
      <span className={cn(base, "-right-2 -top-2 border-r border-t")} />
      <span className={cn(base, "-bottom-2 -left-2 border-b border-l")} />
      <span className={cn(base, "-bottom-2 -right-2 border-b border-r")} />
    </span>
  );
}

/** Pafta antet kutusu (sağ alt) */
function TitleBlock({ name, incoming, outgoing }: { name: string; incoming: number; outgoing: number }) {
  const cells: { k: string; v: string; wide?: boolean }[] = [
    { k: "Proje", v: "Koordine" },
    { k: "Çizim", v: "Bağlantı şeması" },
    { k: "Gelen", v: String(incoming) },
    { k: "Giden", v: String(outgoing) },
    { k: "Modül", v: name, wide: true },
  ];
  return (
    <dl className="grid grid-cols-2 gap-px border-t border-white/45 bg-white/30 sm:grid-cols-[1fr_1.5fr_0.6fr_0.6fr] lg:ml-auto lg:w-[32rem] lg:border-l">
      {cells.map((c) => (
        <div key={c.k} className={cn("bg-brand-900 px-3 py-2", c.wide && "col-span-full")}>
          <dt className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white/55">{c.k}</dt>
          <dd className="mt-0.5 truncate font-mono text-[0.8125rem] text-white">{c.v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Column({ title, items, side }: { title: string; items: Conn[]; side: "left" | "right" }) {
  return (
    <div className="flex min-w-0 flex-col justify-center">
      <h3 className={cn("mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70", side === "left" ? "lg:pr-10" : "lg:pl-10")}>{title}</h3>
      {items.length === 0 ? (
        <p className={cn("border border-dashed border-white/40 px-4 py-4 text-[0.875rem] text-white/70", side === "left" ? "lg:mr-10" : "lg:ml-10")}>
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
  const line = "bg-white/60";
  return (
    <li className={cn("group/conn relative", side === "left" ? "lg:pr-10" : "lg:pl-10")}>
      {/* Toplama hattı (bus): ilk ve son öğenin ortası arasında sürekli dikey çizgi */}
      <span
        aria-hidden
        className={cn("absolute -top-3 hidden h-[calc(50%+0.75rem)] w-px group-first/conn:hidden lg:block", line, side === "left" ? "right-0" : "left-0")}
      />
      <span
        aria-hidden
        className={cn("absolute bottom-0 top-1/2 hidden w-px group-last/conn:hidden lg:block", line, side === "left" ? "right-0" : "left-0")}
      />
      {/* Merkeze bağlayan kısa hat ve ok ucu (geniş ekran) */}
      <span aria-hidden className={cn("absolute top-1/2 hidden h-px w-10 lg:block", line, side === "left" ? "right-0" : "left-0")} />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden size-0 -translate-y-1/2 border-y-[4px] border-l-[7px] border-y-transparent border-l-white lg:block",
          side === "left" ? "right-0" : "left-[2.0625rem]"
        )}
      />
      {/* Bağlantı noktası */}
      <span
        aria-hidden
        className={cn("absolute top-1/2 hidden size-1.5 -translate-y-1/2 border border-white bg-brand-900 lg:block", side === "left" ? "right-10 translate-x-1/2" : "left-10 -translate-x-1/2")}
      />
      <Link
        href={`/ozellikler/${f.slug}`}
        className="group/btn grid grid-cols-[1.25rem_minmax(0,1fr)_1rem] items-start gap-3 border border-white/50 bg-brand-900 px-4 py-3.5 transition-colors duration-200 hover:border-white hover:bg-brand-800"
      >
        <FeatureIcon name={f.icon} className="mt-0.5 size-4 text-white/85" />
        <span className="min-w-0">
          <span className="block text-[0.9375rem] font-semibold text-white">{f.name}</span>
          <span className="mt-1 block text-pretty text-[0.875rem] leading-relaxed text-white/75">{conn.what}</span>
          <span className="mt-2 inline-block border border-dashed border-white/40 px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.06em] text-white/80">
            {conn.record}
          </span>
        </span>
        <Arrow className="mt-1 text-white/60 group-hover/btn:text-white" />
      </Link>
    </li>
  );
}
