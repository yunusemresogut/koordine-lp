import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Avatar, Badge, td, th, type Tone } from "./primitives";

/**
 * InventoryMockup — Envanter listesi: demirbaş no, ad / marka-model, kategori (Ekipman, Araç, El aleti,
 * Elektronik, İş güvenliği), durum (Boşta / Zimmette / Bakımda), zimmetli kişi ve şantiye, teslim / belge uyarıları.
 *
 * Proplar:
 * - `rows`: gösterilecek satır sayısı (varsayılan 7).
 * - `frame`, `label`, `className`.
 * Dar pencerede kategori ve zimmet tarihi sütunları gizlenir.
 */
export function InventoryMockup({
  rows = 7,
  frame = true,
  label = "Koordine envanter listesi örneği: demirbaş numarası, kategori, durum ve zimmetli kişi sütunları.",
  className,
}: {
  rows?: number;
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <AppFrame label={label} crumbs={["Envanter"]} code="ENV" bare={!frame} className={className}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-ink-950">Envanter</div>
          <div className="truncate text-[11px] text-ink-500">Ekipman ve araçlar, kimde olduğu ve zimmet geçmişi.</div>
        </div>
        <span className="flex h-7 shrink-0 items-center rounded-sm bg-brand-600 px-2.5 text-[11px] font-medium text-white">+ Yeni envanter</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line bg-paper/60 px-4 py-2">
        <span className="flex h-6 w-40 items-center rounded-sm border border-line bg-white px-2 text-[10.5px] text-ink-400">Ad, demirbaş no, kişi…</span>
        <span className="hidden h-6 items-center rounded-sm border border-line bg-white px-2 text-[10.5px] text-ink-700 @md:flex">Tüm kategoriler</span>
        <span className="hidden h-6 items-center rounded-sm border border-line bg-white px-2 text-[10.5px] text-ink-700 @md:flex">Durum: Tümü</span>
      </div>
      <table className="w-full border-collapse">
        <thead className="border-b border-line bg-paper/40">
          <tr>
            <th className={th}>Demirbaş</th>
            <th className={cn(th, "hidden @2xl:table-cell")}>Kategori</th>
            <th className={th}>Durum</th>
            <th className={cn(th, "hidden @lg:table-cell")}>Zimmetli</th>
            <th className={cn(th, "hidden @3xl:table-cell")}>Zimmet / teslim</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {ITEMS.slice(0, rows).map((it) => (
            <tr key={it.code}>
              <td className={cn(td, "max-w-0")} style={{ width: "46%" }}>
                <div className="flex flex-col @lg:flex-row @lg:items-baseline @lg:gap-2">
                  <span className="shrink-0 font-mono text-[10px] text-ink-500">{it.code}</span>
                  <span className="truncate font-medium text-ink-950">{it.name}</span>
                </div>
                <div className="truncate text-[10px] text-ink-500">{it.brand}</div>
              </td>
              <td className={cn(td, "hidden whitespace-nowrap @2xl:table-cell")}>{it.category}</td>
              <td className={td}>
                <Badge tone={STATE_TONE[it.state]}>{it.state}</Badge>
              </td>
              <td className={cn(td, "hidden max-w-0 @lg:table-cell")}>
                {it.who ? (
                  <div className="flex items-center gap-2">
                    <Avatar name={it.who} tone="paper" className="size-5 text-[8.5px]" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] text-ink-900">{it.who}</div>
                      {it.site && <div className="truncate text-[10px] text-ink-500">{it.site}</div>}
                    </div>
                  </div>
                ) : (
                  <span className="text-ink-400">—</span>
                )}
              </td>
              <td className={cn(td, "hidden whitespace-nowrap @3xl:table-cell")}>
                {it.due ? (
                  <span className={cn("font-mono text-[10.5px]", it.dueTone === "risk" ? "text-risk" : it.dueTone === "warn" ? "text-[#8a5a12]" : "text-ink-600")}>
                    {it.due}
                  </span>
                ) : (
                  <span className="text-ink-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppFrame>
  );
}

const STATE_TONE: Record<string, Tone> = { Boşta: "ok", Zimmette: "brand", Bakımda: "warn", Hurda: "muted" };

const ITEMS: {
  code: string;
  name: string;
  brand: string;
  category: string;
  state: "Boşta" | "Zimmette" | "Bakımda";
  who?: string;
  site?: string;
  due?: string;
  dueTone?: "risk" | "warn";
}[] = [
  { code: "DMR-0012", name: "Kırıcı delici", brand: "Bosch GSH 11 VC", category: "Ekipman", state: "Zimmette", who: "Kemal Yurt", site: "Levent Ofis Katı", due: "Teslim · 20.11.2026" },
  { code: "DMR-0019", name: "Akülü vidalama", brand: "Makita DDF485", category: "El aleti", state: "Zimmette", who: "Ali Rıza Tan", site: "Kadıköy Bahariye Mağaza", due: "Teslim gecikti · 3 gün geçti", dueTone: "risk" },
  { code: "DMR-0004", name: "Ford Transit Custom", brand: "34 KRD 418", category: "Araç", state: "Zimmette", who: "Emre Aydın", due: "Muayene · 18 gün kaldı", dueTone: "warn" },
  { code: "DMR-0027", name: "Seyyar iskele, 6 m", brand: "Alüminyum, tekerlekli", category: "Ekipman", state: "Boşta" },
  { code: "DMR-0031", name: "Lazer nivo", brand: "Leica Lino L2P5", category: "El aleti", state: "Zimmette", who: "Mert Çelik", site: "Levent Ofis Katı" },
  { code: "DMR-0040", name: "Dizüstü bilgisayar", brand: "Lenovo ThinkPad T14", category: "Elektronik", state: "Zimmette", who: "Selin Kara" },
  { code: "DMR-0045", name: "Emniyet kemeri seti", brand: "Tam vücut, 5 adet", category: "İş güvenliği", state: "Bakımda" },
];
