import { FeatureIcon } from "@/components/ui/feature-icon";
import type { FeatureWithDetail } from "@/content/feature-details";

/**
 * Hero yanındaki modül özeti: modül adı ve yalnızca ürün gerçeklerinden oluşan satırlar.
 * /cozumler sayfalarındaki SheetAside ile aynı aileden.
 */
export function ModuleSheet({ feature }: { feature: FeatureWithDetail }) {
  return (
    <div className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="flex items-center gap-2.5 border-b border-line-strong px-4 py-3">
        <FeatureIcon name={feature.icon} className="size-4 text-brand-700" />
        <span className="text-[0.9375rem] font-semibold text-ink-950">{feature.name}</span>
        <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">Kısaca</span>
      </div>
      <dl className="divide-y divide-line text-[0.875rem]">
        {feature.detail.sheet.map((row) => (
          <div key={row.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[7.5rem_minmax(0,1fr)]">
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
