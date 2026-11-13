import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import type { FeatureWithDetail, FlowTone, SpecialBlock } from "@/content/feature-details";
import { cn } from "@/lib/utils";
import { CoverageVisual } from "./visuals";

/**
 * Modüle özgü derin anlatım bölümü. İçerik feature-details.ts'deki bloklardan gelir:
 * akış (flow), sütun eşleme (mapping), yetki matrisi (matrix), uygulama kodları (codes),
 * tanım listesi (list), kayıt zinciri (chain) ve rapor kapsamı (coverage).
 */

const TONE: Record<FlowTone, string> = {
  brand: "bg-brand-600",
  ok: "bg-ok",
  warn: "bg-warn",
  risk: "bg-risk",
  muted: "bg-ink-300",
  ink: "bg-ink-950",
};

/** Tam genişlik isteyen bloklar; diğerleri iki sütunlu ızgarada yarım genişlik */
function isFull(b: SpecialBlock) {
  if (b.type === "chain" || b.type === "coverage") return true;
  if (b.type === "flow") return b.steps.length > 4;
  return false;
}

export function SpecialSection({ feature }: { feature: FeatureWithDetail }) {
  const { special } = feature.detail;

  // Tek kalan yarım blok tam genişliğe yayılır (boş hücre kalmasın)
  const layout: boolean[] = [];
  let run = 0;
  special.blocks.forEach((b, i) => {
    if (isFull(b)) {
      if (run % 2 === 1) layout[i - 1] = true;
      run = 0;
      layout.push(true);
    } else {
      run++;
      layout.push(false);
    }
  });
  if (run % 2 === 1) layout[layout.length - 1] = true;

  return (
    <section aria-labelledby={`${special.id}-baslik`} id={special.id} className="scroll-mt-20 border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <SectionHeader
            id={`${special.id}-baslik`}
            eyebrow={special.eyebrow}
            align="split"
            title={special.title}
            lede={special.lede}
          />
        </Reveal>
        <div className="mt-14 grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {special.blocks.map((b, i) => (
            <Reveal key={b.title} className={cn("min-w-0", layout[i] && "lg:col-span-2")}>
              <BlockTitle title={b.title} />
              <Block block={b} wide={layout[i]} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function BlockTitle({ title }: { title: string }) {
  return (
    <h3 className="border-b border-ink-950 pb-3 text-[1.0625rem] font-semibold text-ink-950">
      {title}
    </h3>
  );
}

function Block({ block, wide }: { block: SpecialBlock; wide: boolean }) {
  switch (block.type) {
    case "flow":
      return <Flow block={block} horizontal={wide && block.steps.length > 3} />;
    case "mapping":
      return <Mapping block={block} />;
    case "matrix":
      return <Matrix block={block} />;
    case "codes":
      return <Codes block={block} />;
    case "list":
      return <DefList block={block} wide={wide} />;
    case "chain":
      return <Chain block={block} />;
    case "coverage":
      return (
        <figure className="mt-6">
          <CoverageVisual className="max-w-[880px]" />
          <figcaption className="mt-3 max-w-2xl text-[0.875rem] leading-relaxed text-ink-500">{block.caption}</figcaption>
        </figure>
      );
  }
}

/* ---------------- Akış ---------------- */

function Marker({ step }: { step: Extract<SpecialBlock, { type: "flow" }>["steps"][number] }) {
  return (
    <span className="relative z-10 grid size-[22px] shrink-0 place-items-center border border-ink-950 bg-white">
      <span
        className={cn("size-2.5", !step.color && TONE[step.tone ?? "brand"])}
        style={step.color ? { backgroundColor: step.color } : undefined}
      />
    </span>
  );
}

function Flow({ block, horizontal }: { block: Extract<SpecialBlock, { type: "flow" }>; horizontal: boolean }) {
  const n = block.steps.length;
  return (
    <div className="mt-6">
      <ol
        className={cn("grid", horizontal && (n === 6 ? "lg:grid-cols-6" : n === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"))}
      >
        {block.steps.map((s, i) => {
          const last = i === n - 1;
          return (
            <li key={s.label} className={cn("relative flex gap-4 pb-7 last:pb-0", horizontal && "lg:block lg:pb-0 lg:pr-6")}>
              {!last && (
                <span aria-hidden className="pointer-events-none absolute inset-0">
                  <span className={cn("absolute bottom-0 left-[10.5px] top-[22px] w-px bg-line-strong", horizontal && "lg:hidden")} />
                  {horizontal && <span className="absolute left-[22px] right-0 top-[10.5px] hidden h-px bg-line-strong lg:block" />}
                </span>
              )}
              <Marker step={s} />
              <div className={cn("min-w-0", horizontal && "lg:mt-4")}>
                <p className="text-[1rem] font-semibold text-ink-950">{s.label}</p>
                <p className="mt-1 text-pretty text-[0.9063rem] leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
      {block.note && <p className="mt-7 border-l-2 border-brand-600 pl-4 text-[0.875rem] leading-relaxed text-ink-500">{block.note}</p>}
    </div>
  );
}

/* ---------------- Sütun eşleme ---------------- */

function Mapping({ block }: { block: Extract<SpecialBlock, { type: "mapping" }> }) {
  return (
    <div className="mt-6 border border-line-strong bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-line-strong bg-paper px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.06em]">
        <span className="truncate text-ink-800">{block.source}</span>
        <span className="shrink-0 uppercase tracking-[0.14em] text-ink-400">→ Koordine</span>
      </div>
      <ul className="divide-y divide-line">
        {block.rows.map((r) => (
          <li key={r.from + r.to} className="grid gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)]">
            <span className="font-mono text-[0.8125rem] text-ink-800">{r.from}</span>
            <span aria-hidden className="hidden text-ink-300 sm:block">
              →
            </span>
            <span className="text-[0.875rem] text-ink-950">
              <span className="sr-only">: </span>
              {r.to}
              {r.note && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">{r.note}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Matris ---------------- */

function Matrix({ block }: { block: Extract<SpecialBlock, { type: "matrix" }> }) {
  return (
    <div className="mt-6">
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left">
          <caption className="sr-only">{block.caption}</caption>
          <thead>
            <tr className="border-b border-line-strong font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-500">
              <th scope="col" className="py-3 pr-4 font-medium">
                Rol
              </th>
              {block.cols.map((c) => (
                <th key={c} scope="col" className="w-[4.5rem] px-1 py-3 text-center font-medium sm:w-24 sm:px-2">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((r) => (
              <tr key={r.label} className="border-b border-line">
                <th scope="row" className="py-3 pr-4 font-normal">
                  <span className="block text-[0.9375rem] font-medium text-ink-950">{r.label}</span>
                  {r.note && <span className="block text-[0.8125rem] text-ink-500">{r.note}</span>}
                </th>
                {r.cells.map((c, i) => (
                  <td key={i} className="px-1 py-3 text-center sm:px-2">
                    {c === "yes" ? (
                      <span className="inline-grid size-5 place-items-center bg-ink-950 text-white">
                        <svg aria-hidden viewBox="0 0 10 10" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M2 5.2 4.2 7.3 8 2.8" />
                        </svg>
                        <span className="sr-only">Evet</span>
                      </span>
                    ) : c === "no" ? (
                      <span className="inline-block h-px w-3 bg-ink-300">
                        <span className="sr-only">Hayır</span>
                      </span>
                    ) : (
                      <span className="font-mono text-[0.75rem] text-ink-700">{c}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note && <p className="mt-5 border-l-2 border-brand-600 pl-4 text-[0.875rem] leading-relaxed text-ink-500">{block.note}</p>}
    </div>
  );
}

/* ---------------- Kodlar ---------------- */

function Codes({ block }: { block: Extract<SpecialBlock, { type: "codes" }> }) {
  return (
    <ul className="mt-6 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2">
      {block.codes.map((c) => (
        <li key={c.code} className="flex items-start gap-3 border-b border-r border-line px-4 py-3">
          <span className="grid h-7 min-w-9 shrink-0 place-items-center border border-ink-950 px-1 font-mono text-[0.75rem] font-medium text-ink-950">
            {c.code}
          </span>
          <span className="min-w-0">
            <span className="block text-[0.9375rem] font-medium leading-snug text-ink-950">{c.label}</span>
            {c.note && <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">{c.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Tanım listesi ---------------- */

function DefList({ block, wide }: { block: Extract<SpecialBlock, { type: "list" }>; wide: boolean }) {
  return (
    <dl className={cn("mt-2", wide && "lg:grid lg:grid-cols-2 lg:gap-x-12")}>
      {block.items.map((it) => (
        <div key={it.term} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
          <dt className="font-mono text-[0.75rem] uppercase leading-6 tracking-[0.1em] text-ink-500">{it.term}</dt>
          <dd className="text-pretty text-[0.9375rem] leading-relaxed text-ink-700">{it.body}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------- Kayıt zinciri ---------------- */

function Chain({ block }: { block: Extract<SpecialBlock, { type: "chain" }> }) {
  return (
    <ol className="mt-6 grid gap-0 lg:grid-cols-4">
      {block.nodes.map((n, i) => {
        const last = i === block.nodes.length - 1;
        return (
          <li key={n.label} className="relative flex flex-col lg:pr-8">
            <div className="flex-1 border border-ink-950 bg-white">
              <div className="border-b border-ink-950 px-4 py-2.5">
                <span className="text-[1.0625rem] font-semibold text-ink-950">{n.label}</span>
              </div>
              <div className="px-4 py-3">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-400">Alanlar</p>
                <ul className="mt-1.5 space-y-1 text-[0.875rem] text-ink-700">
                  {n.fields.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 bg-ink-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-400">Durumlar</p>
                <ul className="mt-1.5 flex flex-wrap gap-1">
                  {n.states.map((s) => (
                    <li key={s} className="rounded-xs border border-line-strong bg-paper px-1.5 py-0.5 text-[0.75rem] text-ink-700">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {!last && (
              <>
                {/* Mobil: aşağı ok + bağlantı etiketi */}
                <div aria-hidden className="flex items-center gap-3 py-3 pl-6 lg:hidden">
                  <span className="h-6 w-px bg-ink-950" />
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-500">{n.link ?? ""}</span>
                </div>
                {/* Geniş ekran: sağa ok */}
                <span aria-hidden className="absolute right-0 top-[1.4rem] hidden w-8 items-center lg:flex">
                  <span className="h-px flex-1 bg-ink-950" />
                  <span className="size-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-ink-950" />
                </span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}
