import { FeatureIcon } from "@/components/ui/feature-icon";
import type { FeatureWithDetail } from "@/content/feature-details";
import { pad2 } from "@/lib/utils";

/**
 * Modül paftası (antet kutusu): kod, pafta sırası ve yalnızca ürün gerçeklerinden oluşan satırlar.
 * /cozumler sayfalarındaki SheetAside ile aynı aileden.
 */
export function ModuleSheet({ feature, total }: { feature: FeatureWithDetail; total: number }) {
  return (
    <div className="crop-marks border border-line-strong bg-white text-ink-400 shadow-panel">
      <div className="flex items-center justify-between gap-3 border-b border-line-strong px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
        <span className="flex items-center gap-2 text-ink-500">
          <FeatureIcon name={feature.icon} className="size-3.5 text-ink-500" />
          Modül paftası
        </span>
        <span className="text-brand-700">
          {feature.code} / M-{pad2(feature.index + 1)}
        </span>
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
      <div className="flex items-center justify-between border-t border-line-strong bg-paper px-4 py-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-500">
        <span>Koordine</span>
        <span>
          Pafta {pad2(feature.index + 1)} / {pad2(total)}
        </span>
      </div>
    </div>
  );
}
