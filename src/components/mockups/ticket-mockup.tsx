import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Avatar, Badge, type Tone } from "./primitives";

/**
 * TicketMockup — Tadilat talepleri panosu (Açık / Devam ediyor / Çözüldü; TT-0042 kodlu kartlar,
 * öncelik, saha, atanan kişi) ve proje onayları (mimari, mekanik, elektrik disiplin onayları).
 *
 * Proplar:
 * - `view`: "both" (pano + onaylar, varsayılan) | "board" (yalnız pano) | "approvals" (yalnız onaylar).
 * - `frame`, `label`, `className`.
 * Dar pencerede pano tek sütunlu listeye döner.
 */
export function TicketMockup({
  view = "both",
  frame = true,
  label,
  className,
}: {
  view?: "both" | "board" | "approvals";
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  const aria =
    label ??
    (view === "approvals"
      ? "Koordine proje onayları örneği: sahalar için mimari, mekanik ve elektrik onay durumları."
      : "Koordine tadilat talepleri örneği: kodlu talepler durum sütunlarında, öncelik ve atanan kişiyle; yanında proje onayları.");
  return (
    <AppFrame
      label={aria}
      crumbs={view === "approvals" ? ["Projeler", "Onaylar"] : ["Talepler", "Tadilat Talepleri"]}
      code="TLP"
      bare={!frame}
      className={className}
    >
      <div className={cn("grid", view === "both" && "@3xl:grid-cols-[minmax(0,1fr)_17rem]")}>
        {view !== "approvals" && <Board />}
        {view !== "board" && <Approvals bordered={view === "both"} />}
      </div>
    </AppFrame>
  );
}

type Ticket = { code: string; title: string; site: string; priority: "Yüksek" | "Orta" | "Düşük"; who?: string; date: string };

const PRIORITY_TONE: Record<Ticket["priority"], Tone> = { Yüksek: "risk", Orta: "warn", Düşük: "neutral" };

const COLUMNS: { title: string; tickets: Ticket[] }[] = [
  {
    title: "Açık",
    tickets: [
      { code: "TT-0047", title: "Vitrin camında çatlak", site: "Kadıköy Bahariye Mağaza", priority: "Yüksek", date: "11.11.2026" },
      { code: "TT-0045", title: "Depo kapısı menteşe değişimi", site: "Üsküdar Sahil Kafe", priority: "Düşük", who: "Mert Çelik", date: "08.11.2026" },
    ],
  },
  {
    title: "Devam ediyor",
    tickets: [
      { code: "TT-0042", title: "Klima drenaj hattında sızıntı", site: "Ümraniye Lojistik Depo", priority: "Yüksek", who: "Burak Yıldız", date: "05.11.2026" },
      { code: "TT-0039", title: "Aydınlatma armatürü değişimi", site: "Bakırköy Cadde Mağaza", priority: "Orta", who: "Okan Demir", date: "31.10.2026" },
    ],
  },
  {
    title: "Çözüldü",
    tickets: [{ code: "TT-0036", title: "Zemin seramiği onarımı", site: "Bakırköy Cadde Mağaza", priority: "Orta", who: "Mert Çelik", date: "27.10.2026" }],
  },
];

function Board() {
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <div>
          <div className="text-[13px] font-semibold text-ink-950">Tadilat Talepleri</div>
          <div className="text-[11px] text-ink-500">Saha tadilat ve bakım talepleri.</div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="hidden h-7 items-center rounded-sm border border-line px-2 text-[10.5px] text-ink-600 @lg:flex">Tüm öncelikler</span>
          <span className="flex h-7 items-center rounded-sm bg-brand-600 px-2.5 text-[11px] font-medium text-white">+ Yeni</span>
        </div>
      </div>
      <div className="grid gap-3 bg-paper/70 p-3 @xl:grid-cols-3">
        {COLUMNS.map((col, ci) => (
          <div key={col.title} className={cn("min-w-0", ci === 2 && "hidden @xl:block")}>
            <div className="mb-2 flex items-center justify-between px-0.5">
              <span className="text-[11px] font-semibold text-ink-800">{col.title}</span>
              <span className="font-mono text-[10px] text-ink-400">{col.tickets.length}</span>
            </div>
            <div className="space-y-2">
              {col.tickets.map((t) => (
                <div key={t.code} className={cn("rounded-sm border bg-white p-2.5", t.code === "TT-0042" ? "border-brand-300 shadow-sm" : "border-line")}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] text-brand-700">{t.code}</span>
                    <Badge tone={PRIORITY_TONE[t.priority]}>{t.priority}</Badge>
                  </div>
                  <div className="mt-1.5 text-[11.5px] font-medium leading-snug text-ink-950">{t.title}</div>
                  <div className="mt-0.5 truncate text-[10.5px] text-ink-500">{t.site}</div>
                  <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
                    <span className="flex min-w-0 items-center gap-1.5">
                      {t.who ? <Avatar name={t.who} className="size-5 text-[8.5px]" /> : <span className="size-5 rounded-full border border-dashed border-ink-300" />}
                      <span className="truncate text-[10.5px] text-ink-600">{t.who ?? "Atanmamış"}</span>
                    </span>
                    <span className="font-mono text-[9.5px] text-ink-400">{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Approval = "ok" | "wait";

function Approvals({ bordered }: { bordered?: boolean }) {
  const rows: { site: string; opening: string; note: string; tone: Tone; a: Approval; m: Approval; e: Approval }[] = [
    { site: "Kadıköy Bahariye Mağaza", opening: "14.11.2026", note: "3 gün kaldı", tone: "risk", a: "ok", m: "ok", e: "wait" },
    { site: "Levent Ofis Katı", opening: "02.12.2026", note: "21 gün kaldı", tone: "warn", a: "ok", m: "wait", e: "wait" },
    { site: "Maltepe Sahil Mağaza", opening: "09.12.2026", note: "28 gün kaldı", tone: "neutral", a: "wait", m: "ok", e: "ok" },
  ];
  return (
    <div className={cn("min-w-0", bordered && "border-t border-line @3xl:border-l @3xl:border-t-0")}>
      <div className="border-b border-line px-4 py-2.5">
        <div className="text-[13px] font-semibold text-ink-950">Proje onayları</div>
        <div className="text-[11px] leading-snug text-ink-500">Açılışı en yakın olan üstte.</div>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.site} className="px-4 py-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[11.5px] font-medium text-ink-950">{r.site}</div>
                <div className="font-mono text-[9.5px] text-ink-500">Açılış {r.opening}</div>
              </div>
              <Badge tone={r.tone}>{r.note}</Badge>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              <Disc label="Mimari" v={r.a} />
              <Disc label="Mekanik" v={r.m} />
              <Disc label="Elektrik" v={r.e} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Disc({ label, v }: { label: string; v: Approval }) {
  return (
    <span
      className={cn(
        "flex items-center justify-between gap-1 rounded-xs border px-1.5 py-1 text-[10px]",
        v === "ok" ? "border-ok/25 bg-ok/[0.07] text-ink-800" : "border-dashed border-warn/50 bg-white text-ink-700"
      )}
    >
      <span className="truncate">{label}</span>
      {v === "ok" ? (
        <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-ok" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m2.5 6.2 2.2 2.2 4.8-5" />
        </svg>
      ) : (
        <span className="size-1.5 shrink-0 rounded-full bg-warn" />
      )}
    </span>
  );
}
