import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Badge, td, th, type Tone } from "./primitives";

/**
 * WorkPlanMockup — Bir sahanın keşif kalemleri (poz no, miktar, birim, birim fiyat, tutar, malzeme durumu)
 * ve iş programı (Gantt: aktivite kodu, iş kalemi, haftalık çubuklar, ilerleme yüzdesi, bugün çizgisi).
 *
 * Proplar:
 * - `view`: "both" (keşif + iş planı, varsayılan) | "estimate" (yalnız keşif) | "gantt" (yalnız iş planı).
 * - `frame`, `label`, `className`.
 * Dar pencerede birim fiyat/durum ve sorumlu sütunları gizlenir; Gantt hafta sayısı korunur.
 */
export function WorkPlanMockup({
  view = "both",
  frame = true,
  label,
  className,
}: {
  view?: "both" | "estimate" | "gantt";
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  const aria =
    label ??
    (view === "estimate"
      ? "Koordine keşif tablosu örneği: poz numaralı kalemler, miktar, tutar ve malzeme durumu."
      : view === "gantt"
        ? "Koordine iş programı örneği: haftalara yayılmış iş kalemleri ve ilerleme yüzdeleri."
        : "Koordine keşif ve iş programı örneği: poz numaralı keşif kalemleri ve Gantt görünümünde iş kalemleri.");

  return (
    <AppFrame label={aria} crumbs={["Sahalar", "Levent Ofis Katı"]} code="KSF" bare={!frame} className={className}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-4 text-[11.5px]">
          <Tab active={view !== "gantt"}>Keşif</Tab>
          <Tab active={view === "gantt"}>İş Planı</Tab>
          <span className="hidden text-ink-500 @lg:inline">Dosyalar</span>
          <span className="hidden text-ink-500 @lg:inline">Notlar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden h-6 items-center rounded-sm border border-line px-2 text-[10.5px] text-ink-600 @md:flex">İçe aktar · Excel</span>
          <span className="flex h-6 items-center rounded-sm bg-brand-600 px-2 text-[10.5px] font-medium text-white">
            {view === "gantt" ? "+ İş ekle" : "+ Kalem ekle"}
          </span>
        </div>
      </div>
      {view !== "gantt" && <Estimate />}
      {view === "both" && (
        <div className="flex items-center justify-between border-y border-line bg-paper px-4 py-2">
          <span className="text-[11.5px] font-semibold text-ink-950">İş Planı</span>
          <span className="flex items-center gap-3 text-[10.5px] text-ink-500">
            <span className="hidden @md:inline">Tablo · <span className="text-ink-900">Gantt</span></span>
            <span className="font-mono text-ink-700">Ortalama %54</span>
          </span>
        </div>
      )}
      {view !== "estimate" && <Gantt />}
    </AppFrame>
  );
}

function Tab({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span className={cn("relative py-1", active ? "font-semibold text-ink-950" : "text-ink-500")}>
      {children}
      {active && <span className="absolute inset-x-0 -bottom-[11px] h-0.5 bg-brand-600" />}
    </span>
  );
}

const MAT_TONE: Record<string, Tone> = { Geldi: "ok", Bekleniyor: "warn", Gitti: "brand" };

function Estimate() {
  const rows = [
    ["15.250.1011", "12,5 mm alçı levha ile bölme duvar", "420", "m²", "₺685,40", "₺287.868,00", "Geldi"],
    ["15.275.1102", "Taş yünü ses yalıtımı, 50 mm", "420", "m²", "₺212,60", "₺89.292,00", "Geldi"],
    ["35.255.1301", "NYM 3×2,5 mm² kablo", "1.850", "m", "₺48,90", "₺90.465,00", "Bekleniyor"],
    ["25.110.1201", "VRF iç ünite, kaset tip", "14", "adet", "€1.420,00", "€19.880,00", "Gitti"],
  ];
  return (
    <>
    <table className="w-full border-collapse">
      <thead className="border-b border-line bg-paper/40">
        <tr>
          <th className={th}>Poz no</th>
          <th className={th}>Kalem</th>
          <th className={cn(th, "text-right")}>Miktar</th>
          <th className={cn(th, "hidden text-right @2xl:table-cell")}>Birim fiyat</th>
          <th className={cn(th, "text-right")}>Tutar</th>
          <th className={cn(th, "hidden @xl:table-cell")}>Durum</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-line">
        {rows.map(([poz, name, qty, unit, price, amount, status]) => (
          <tr key={poz}>
            <td className={cn(td, "whitespace-nowrap font-mono text-[10.5px] text-ink-600")}>{poz}</td>
            <td className={cn(td, "max-w-0 truncate")} style={{ width: "40%" }}>
              {name}
            </td>
            <td className={cn(td, "whitespace-nowrap text-right font-mono text-[11px] tabular-nums")}>
              {qty} <span className="text-ink-500">{unit}</span>
            </td>
            <td className={cn(td, "hidden whitespace-nowrap text-right font-mono text-[11px] tabular-nums @2xl:table-cell")}>{price}</td>
            <td className={cn(td, "whitespace-nowrap text-right font-mono text-[11px] tabular-nums")}>{amount}</td>
            <td className={cn(td, "hidden @xl:table-cell")}>
              <Badge tone={MAT_TONE[status]}>{status}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex items-center justify-between gap-3 border-t border-line-strong bg-paper/60 px-3 py-1.5">
      <span className="text-[11px] font-medium text-ink-700">Tüm keşif toplamı</span>
      <span className="font-mono text-[11px] font-semibold tabular-nums text-ink-950">
        ₺467.625,00 <span className="text-ink-400">·</span> €19.880,00
      </span>
    </div>
    </>
  );
}

const WEEKS = ["44", "45", "46", "47", "48", "49"];
const WEEK_DATES = ["26.10", "02.11", "09.11", "16.11", "23.11", "30.11"];
/** Bugün (11.11.2026): 46. haftanın 3. günü → 2 + 2/7 hafta */
const TODAY = 2 + 2 / 7;

function Gantt() {
  const items: { code: string; name: string; who: string; start: number; len: number; pct: number }[] = [
    { code: "A1010", name: "Söküm ve yıkım", who: "Yalın Yapı", start: 0, len: 1, pct: 100 },
    { code: "A1020", name: "Alçıpan bölme duvarlar", who: "Kuzey Alçı", start: 1, len: 2, pct: 85 },
    { code: "A1030", name: "Elektrik kablolama", who: "Okan Demir", start: 1, len: 2.6, pct: 60 },
    { code: "A1040", name: "Mekanik tesisat (VRF)", who: "Burak Yıldız", start: 1.3, len: 2.4, pct: 55 },
    { code: "A1050", name: "Asma tavan", who: "Kuzey Alçı", start: 2, len: 1.7, pct: 30 },
    { code: "A1060", name: "Zemin kaplama", who: "Yalın Yapı", start: 3, len: 1.6, pct: 0 },
    { code: "A1070", name: "Boya ve ince işler", who: "Yalın Yapı", start: 4, len: 1.4, pct: 0 },
    { code: "A1080", name: "Mobilya montajı ve teslim", who: "Selin Kara", start: 4.6, len: 1.3, pct: 0 },
  ];
  const pctX = (w: number) => `${(w / WEEKS.length) * 100}%`;

  return (
    <div className="grid grid-cols-[minmax(0,9.5rem)_minmax(0,1fr)] @xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
      {/* Sol: iş kalemleri */}
      <div className="border-r border-line">
        <div className="flex h-8 items-end border-b border-line px-3 pb-1.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-500">
          İş kalemi
        </div>
        {items.map((it) => (
          <div key={it.code} className="flex h-7 items-center gap-2 border-b border-line/70 px-3 last:border-b-0">
            <span className="hidden font-mono text-[9.5px] text-ink-400 @xl:inline">{it.code}</span>
            <span className="min-w-0 flex-1 truncate text-[11px] text-ink-800">{it.name}</span>
            <span className="font-mono text-[10px] tabular-nums text-ink-500">%{it.pct}</span>
          </div>
        ))}
      </div>

      {/* Sağ: haftalar */}
      <div className="relative">
        <div className="grid h-8 border-b border-line" style={{ gridTemplateColumns: `repeat(${WEEKS.length}, minmax(0, 1fr))` }}>
          {WEEKS.map((w, i) => (
            <div key={w} className="flex flex-col justify-end border-l border-line/70 px-1.5 pb-1 first:border-l-0">
              <span className="font-mono text-[9.5px] text-ink-700">H{w}</span>
              <span className="hidden font-mono text-[8.5px] text-ink-400 @lg:block">{WEEK_DATES[i]}</span>
            </div>
          ))}
        </div>
        <div className="relative">
          {/* Hafta çizgileri */}
          <div className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${WEEKS.length}, minmax(0, 1fr))` }}>
            {WEEKS.map((w) => (
              <div key={w} className="border-l border-line/60 first:border-l-0" />
            ))}
          </div>
          {items.map((it) => (
            <div key={it.code} className="relative h-7 border-b border-line/70 last:border-b-0">
              <div
                className={cn(
                  "absolute top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-xs border",
                  it.pct === 100 ? "border-ink-300 bg-ink-100" : it.pct > 0 ? "border-brand-300 bg-brand-100" : "border-line-strong bg-white"
                )}
                style={{ left: pctX(it.start), width: pctX(it.len) }}
              >
                <div className={cn("h-full", it.pct === 100 ? "bg-ink-300" : "bg-brand-600")} style={{ width: `${it.pct}%` }} />
              </div>
            </div>
          ))}
          {/* Bugün */}
          <div className="absolute inset-y-0 w-px bg-risk" style={{ left: pctX(TODAY) }}>
            <span className="absolute -top-px left-1 whitespace-nowrap rounded-xs bg-risk px-1 font-mono text-[8.5px] leading-3 text-white">11.11</span>
          </div>
          {/* Açılış */}
          <div className="absolute inset-y-0 w-px border-l border-dashed border-ink-700" style={{ left: pctX(5 + 2 / 7) }} />
        </div>
      </div>
    </div>
  );
}
