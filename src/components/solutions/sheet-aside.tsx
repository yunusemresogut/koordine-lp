import { featureBySlug } from "@/content/features";
import type { SolutionWithDetail } from "@/content/solution-details";

/**
 * Pafta antet kutusu: çözümün kullandığı modül kodları, rapor tipleri ve roller.
 * Yalnızca ürün gerçeklerinden beslenir (solution-details.ts).
 */
export function SheetAside({ solution, index }: { solution: SolutionWithDetail; index: number }) {
  const { detail } = solution;
  const modules = detail.modules.map((slug) => featureBySlug(slug)).filter((f) => f !== undefined);

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Kapsam", value: detail.sheet.scope },
    {
      label: "Modüller",
      value: (
        <ul className="flex flex-wrap gap-1.5">
          {modules.map((f) => (
            <li
              key={f.slug}
              title={f.name}
              className="rounded-xs border border-line-strong bg-paper px-1.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.08em] text-ink-800"
            >
              {f.code}
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Raporlar", value: detail.sheet.reports.join(" · ") },
    { label: "Roller", value: detail.sheet.roles.join(" · ") },
  ];

  return (
    <div className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="flex items-center justify-between border-b border-line-strong px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        <span className="text-ink-500">Çözüm paftası</span>
        <span className="text-brand-700">
          ÇZM-{detail.code} / {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <dl className="divide-y divide-line text-[0.875rem]">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[7.5rem_1fr]">
            <dt className="border-r border-line px-4 py-3 font-mono text-[0.6875rem] uppercase leading-5 tracking-[0.12em] text-ink-500">
              {row.label}
            </dt>
            <dd className="px-4 py-3 leading-5 text-ink-800">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-center justify-between border-t border-line-strong bg-paper px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">
        <span>Koordine</span>
        <span>{detail.sheet.reports.length} / 6 rapor tipi</span>
      </div>
    </div>
  );
}
