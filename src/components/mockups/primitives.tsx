import { cn } from "@/lib/utils";

/**
 * Ürün görsellerinde ortak küçük parçalar: durum rozeti, avatar, ilerleme çubuğu.
 * Yalnızca mockup klasörü içinde kullanılır; site arayüzü için değildir.
 */

export type Tone = "ok" | "warn" | "risk" | "brand" | "neutral" | "muted" | "ink";

const TONES: Record<Tone, string> = {
  ok: "border-ok/25 bg-ok/10 text-ok",
  warn: "border-warn/30 bg-warn/10 text-[#8a5a12]",
  risk: "border-risk/25 bg-risk/10 text-risk",
  brand: "border-brand-600/20 bg-brand-50 text-brand-700",
  neutral: "border-line bg-paper text-ink-600",
  muted: "border-line bg-white text-ink-500",
  ink: "border-ink-950 bg-ink-950 text-white",
};

/** Küçük durum rozeti (uygulamadaki tablo rozetlerinin açık tema karşılığı) */
export function Badge({ tone = "neutral", children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-xs border px-1.5 py-px text-[10.5px] font-medium leading-[16px]",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/** Saha (proje) durumları — uygulamadaki ProjectStatus ve harita pin renkleri */
export type SiteStatus = "proje" | "ihale" | "santiye" | "yakinda_aciliyor" | "acilis" | "hakedis" | "fatura";

export const SITE_STATUS: Record<SiteStatus, { label: string; color: string }> = {
  proje: { label: "Proje", color: "#3f9a9b" },
  ihale: { label: "İhale", color: "#4f7fd9" },
  santiye: { label: "Şantiye", color: "#c08a2e" },
  yakinda_aciliyor: { label: "Yakında açılıyor", color: "#cf5a54" },
  acilis: { label: "Açılış", color: "#2f9a72" },
  hakedis: { label: "Hakediş", color: "#cd7440" },
  fatura: { label: "Fatura", color: "#5a6480" },
};

export function StatusBadge({ status, className }: { status: SiteStatus; className?: string }) {
  const s = SITE_STATUS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-xs border px-1.5 py-px text-[10.5px] font-medium leading-[16px]",
        className
      )}
      style={{ color: s.color, borderColor: `${s.color}40`, backgroundColor: `${s.color}14` }}
    >
      <span className="size-1.5 rounded-full" style={{ backgroundColor: s.color }} />
      <span className="text-ink-800">{s.label}</span>
    </span>
  );
}

/** Baş harfli kişi avatarı */
export function Avatar({ name, className, tone = "ink" }: { name: string; className?: string; tone?: "ink" | "brand" | "paper" }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[9.5px] font-semibold",
        tone === "ink" && "bg-ink-800 text-white",
        tone === "brand" && "bg-brand-600 text-white",
        tone === "paper" && "border border-line bg-paper text-ink-700",
        className
      )}
    >
      {initials}
    </span>
  );
}

/** İnce ilerleme çubuğu */
export function Progress({ value, className, tone = "brand" }: { value: number; className?: string; tone?: "brand" | "ok" | "ink" }) {
  return (
    <span className={cn("block h-1 w-full overflow-hidden rounded-xs bg-ink-100", className)}>
      <span
        className={cn("block h-full", tone === "brand" && "bg-brand-600", tone === "ok" && "bg-ok", tone === "ink" && "bg-ink-700")}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </span>
  );
}

/** Tablo başlık hücresi stili */
export const th = "px-3 py-2 text-left font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-ink-500";
/** Tablo gövde hücresi stili */
export const td = "px-3 py-2 align-middle text-[11.5px] text-ink-800";
