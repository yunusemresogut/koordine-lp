import { cn } from "@/lib/utils";

/**
 * Ürün görsellerinin ortak "uygulama penceresi" çerçevesi.
 * Üstte uygulama içi ince başlık çubuğu: Koordine işareti, yol kırıntısı (mono), sağda modül kodu.
 * Kök eleman `role="img"` + `aria-label` taşır; içerik `aria-hidden` olduğu için ekran okuyucu
 * yalnızca etiketi okur.
 *
 * Proplar:
 * - `label` (zorunlu): ekran okuyucu açıklaması, ör. "Saha haritası ve saha listesi örneği".
 * - `crumbs`: başlık çubuğundaki yol, ör. ["Saha", "Harita"].
 * - `code`: sağdaki mono modül kodu, ör. "SAH".
 * - `aside`: başlık çubuğunun sağına ek içerik (kod yerine ya da yanında).
 * - `bare`: çerçeve çizmeden yalnızca erişilebilirlik kökünü verir (iç içe kullanım için).
 * - `className` / `bodyClassName`: dış kutu ve gövde sınıfları.
 *
 * Kök `@container` olduğundan içerikteki `@md:`, `@xl:` vb. varyantlar pencere genişliğine göre çalışır.
 */
export function AppFrame({
  label,
  crumbs = [],
  code,
  aside,
  bare,
  className,
  bodyClassName,
  children,
}: {
  label: string;
  crumbs?: string[];
  code?: string;
  aside?: React.ReactNode;
  bare?: boolean;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  if (bare) {
    return (
      <div role="img" aria-label={label} className={cn("@container", className)}>
        <div aria-hidden className={bodyClassName}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={cn("@container overflow-hidden rounded-md border border-line-strong/80 bg-white text-left shadow-panel", className)}
    >
      <div aria-hidden className="flex h-full flex-col">
        <div className="flex h-8 shrink-0 items-center gap-3 border-b border-line bg-paper px-3">
          <span className="grid size-3.5 shrink-0 place-items-center rounded-xs bg-ink-950">
            <span className="size-1.5 bg-brand-500" />
          </span>
          <span className="flex min-w-0 items-center gap-1.5 truncate font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">
            {crumbs.map((c, i) => (
              <span key={c} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-ink-300">/</span>}
                <span className={i === crumbs.length - 1 ? "text-ink-800" : undefined}>{c}</span>
              </span>
            ))}
          </span>
          <span className="ml-auto flex shrink-0 items-center gap-2">
            {aside}
            {code && (
              <span className="rounded-xs border border-line bg-white px-1.5 font-mono text-[9.5px] leading-4 tracking-[0.1em] text-ink-600">
                {code}
              </span>
            )}
          </span>
        </div>
        <div className={cn("min-h-0 flex-1", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}
