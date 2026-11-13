import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Avatar, Badge, td, th, type Tone } from "./primitives";

/**
 * HrMockup - İnsan kaynakları: aylık puantaj tablosu (X çalıştı, Y yarım gün, İ yıllık izin, R raporlu,
 * D devamsız, H hafta tatili) ve personel belgeleri / sertifika bitiş uyarıları.
 *
 * Proplar:
 * - `view`: "both" (puantaj + belge uyarıları, varsayılan) | "timesheet" | "certificates".
 * - `frame`, `label`, `className`.
 * Dar pencerede puantajda daha az gün gösterilir.
 */
export function HrMockup({
  view = "both",
  frame = true,
  label,
  className,
}: {
  view?: "both" | "timesheet" | "certificates";
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  const aria =
    label ??
    (view === "certificates"
      ? "Koordine personel belgeleri örneği: sertifika türleri, bitiş tarihleri ve süre uyarıları."
      : "Koordine puantaj örneği: personel bazında günlük çalışma ve izin kodları; altta süresi yaklaşan belgeler.");
  return (
    <AppFrame label={aria} crumbs={["İnsan Kaynakları", view === "certificates" ? "Belgeler" : "Puantaj"]} bare={!frame} className={className}>
      {view !== "certificates" && <Timesheet />}
      {view !== "timesheet" && <Certificates compact={view === "both"} />}
    </AppFrame>
  );
}

/* Kasım 2026: 1, 8, 15 Pazar. Bugün 11.11.2026 */
const DAYS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const DOW = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

const CODE_STYLE: Record<string, string> = {
  X: "text-ink-800",
  Y: "bg-brand-50 text-brand-700",
  İ: "bg-ok/10 text-ok",
  R: "bg-warn/10 text-[#8a5a12]",
  D: "bg-risk/10 text-risk",
  H: "text-ink-300",
  "": "",
};

function Timesheet() {
  const people: { name: string; role: string; codes: string[] }[] = [
    { name: "Emre Aydın", role: "Şantiye şefi", codes: ["X", "X", "X", "X", "X", "X", "H", "X", "X", "X"] },
    { name: "Mert Çelik", role: "İnşaat mühendisi", codes: ["X", "X", "İ", "İ", "X", "X", "H", "X", "X", "X"] },
    { name: "Kemal Yurt", role: "Elektrikçi · günlük", codes: ["X", "X", "X", "X", "X", "Y", "H", "X", "D", "X"] },
    { name: "Ali Rıza Tan", role: "Alçıpan ustası · taşeron", codes: ["X", "R", "R", "X", "X", "X", "H", "X", "X", "X"] },
    { name: "Hasan Polat", role: "Tesisatçı · günlük", codes: ["X", "X", "X", "X", "X", "X", "H", "X", "X", "Y"] },
  ];
  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div>
          <div className="text-[13px] font-semibold text-ink-950">Puantaj · Kasım 2026</div>
          <div className="text-[11px] text-ink-500">Levent Ofis Katı · 18 personel</div>
        </div>
        <span className="hidden h-7 items-center rounded-sm border border-line px-2 text-[10.5px] text-ink-600 @lg:flex">Excel olarak al</span>
      </div>
      <table className="w-full table-fixed border-collapse">
        <thead className="border-b border-line bg-paper/40">
          <tr>
            <th className={cn(th, "w-[38%] @xl:w-[30%]")}>Personel</th>
            {DAYS.map((d, i) => (
              <th
                key={d}
                className={cn(
                  "px-0 py-1.5 text-center font-mono text-[9.5px] font-medium text-ink-500",
                  i >= 7 && "hidden @lg:table-cell",
                  d === 11 && "bg-brand-50 text-brand-700"
                )}
              >
                <span className="block">{String(d).padStart(2, "0")}</span>
                <span className="block text-[8.5px] text-ink-400">{DOW[(d + 5) % 7]}</span>
              </th>
            ))}
            <th className={cn(th, "hidden px-2 text-right @md:table-cell")}>Gün</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {people.map((p) => {
            const all = [...p.codes, "", ""];
            const worked = p.codes.reduce((n, c) => n + (c === "X" ? 1 : c === "Y" ? 0.5 : 0), 0);
            return (
              <tr key={p.name}>
                <td className={cn(td, "py-1.5")}>
                  <div className="flex items-center gap-2">
                    <Avatar name={p.name} tone="paper" className="hidden size-5 text-[8.5px] @md:inline-flex" />
                    <div className="min-w-0">
                      <div className="truncate text-[11px] font-medium text-ink-950">{p.name}</div>
                      <div className="truncate text-[9.5px] text-ink-500">{p.role}</div>
                    </div>
                  </div>
                </td>
                {DAYS.map((d, i) => (
                  <td key={d} className={cn("px-0 py-1.5 text-center", i >= 7 && "hidden @lg:table-cell", d === 11 && "bg-brand-50/60")}>
                    <span className={cn("inline-grid h-5 w-5 place-items-center rounded-xs font-mono text-[10px] font-medium", CODE_STYLE[all[i]])}>
                      {all[i] || <span className="text-ink-200">·</span>}
                    </span>
                  </td>
                ))}
                <td className="hidden px-2 text-right font-mono text-[11px] tabular-nums text-ink-800 @md:table-cell">
                  {worked.toLocaleString("tr-TR")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-line px-4 py-2 font-mono text-[9.5px] text-ink-500">
        <span>X Çalıştı</span>
        <span>Y Yarım gün</span>
        <span>İ Yıllık izin</span>
        <span>R Raporlu</span>
        <span>D Devamsız</span>
        <span>H Hafta tatili</span>
      </div>
    </div>
  );
}

function Certificates({ compact }: { compact?: boolean }) {
  const rows: { name: string; doc: string; end: string; state: string; tone: Tone }[] = [
    { name: "Kemal Yurt", doc: "İş makinesi operatör belgesi", end: "02.11.2026", state: "Süresi geçti", tone: "risk" },
    { name: "Ali Rıza Tan", doc: "Yüksekte çalışma eğitimi", end: "24.11.2026", state: "Yakında bitiyor", tone: "warn" },
    { name: "Hasan Polat", doc: "Sağlık muayenesi (periyodik)", end: "06.12.2026", state: "Yakında bitiyor", tone: "warn" },
    { name: "Mert Çelik", doc: "İSG eğitimi", end: "14.05.2027", state: "Geçerli", tone: "ok" },
    { name: "Emre Aydın", doc: "Mesleki yeterlilik belgesi (MYK)", end: "-", state: "Süresiz", tone: "neutral" },
  ];
  const list = compact ? rows.slice(0, 3) : rows;
  return (
    <div className={cn(compact && "border-t border-line-strong")}>
      <div className="flex items-center justify-between gap-2 border-b border-line bg-paper/60 px-4 py-2">
        <span className="text-[11.5px] font-semibold text-ink-950">{compact ? "Belge uyarıları" : "Personel belgeleri"}</span>
        <span className="flex items-center gap-1.5">
          <Badge tone="risk">1 süresi geçti</Badge>
          <Badge tone="warn" className="hidden @md:inline-flex">
            2 bitiyor
          </Badge>
        </span>
      </div>
      <ul className="divide-y divide-line">
        {list.map((r) => (
          <li key={r.doc} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 @xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto]">
            <div className="min-w-0">
              <div className="truncate text-[11px] font-medium text-ink-950">{r.doc}</div>
              <div className="truncate text-[10px] text-ink-500 @xl:hidden">
                {r.name}
                {r.end !== "-" && ` · ${r.end}`}
              </div>
            </div>
            <div className="hidden truncate text-[11px] text-ink-700 @xl:block">{r.name}</div>
            <div className="hidden font-mono text-[10.5px] text-ink-600 @xl:block">{r.end}</div>
            <Badge tone={r.tone}>{r.state}</Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
