import { FeatureIcon } from "@/components/ui/feature-icon";
import { featureBySlug } from "@/content/features";
import type { SolutionWithDetail } from "@/content/solution-details";

/**
 * Hero yanındaki özet kutusu: çözümün kapsamı, kullandığı modüller, rapor tipleri ve roller.
 * Yalnızca ürün gerçeklerinden beslenir (solution-details.ts).
 */
export function SheetAside({ solution }: { solution: SolutionWithDetail }) {
  const { detail } = solution;
  const modules = detail.modules.map((slug) => featureBySlug(slug)).filter((f) => f !== undefined);

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Kapsam", value: detail.sheet.scope },
    {
      label: "Modüller",
      value: (
        <ul className="grid gap-1.5">
          {modules.map((f) => (
            <li key={f.slug} className="flex items-center gap-2">
              <FeatureIcon name={f.icon} className="size-3.5 shrink-0 text-brand-700" />
              {f.name}
            </li>
          ))}
        </ul>
      ),
    },
    { label: "Raporlar", value: detail.sheet.reports.join(", ") },
    { label: "Roller", value: detail.sheet.roles.join(", ") },
  ];

  return (
    <div className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="border-b border-line-strong px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">
        Kısaca
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
    </div>
  );
}
