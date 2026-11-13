import { AppFrame, Badge, StatusBadge, type SiteStatus } from "@/components/mockups";
import { Avatar, th, td } from "@/components/mockups/primitives";
import { cn } from "@/lib/utils";

/**
 * Modül sayfalarına özel ürün görselleri (mockup kütüphanesinde karşılığı olmayan ekranlar).
 * Aynı dil: AppFrame + açık tema, 11–13px metin, mono sayılar. Veriler örnektir; alan ve
 * durum adları uygulamadaki etiketlerle aynıdır. Referans "bugün": 11.11.2026.
 */

/* ------------------------------------------------------------------ Açılış takvimi (Pano) */

const OPENINGS: { group: "Geciken" | "7 gün içinde" | "30 gün içinde"; rows: { name: string; city: string; date: string; status: SiteStatus; days: string }[] }[] = [
  {
    group: "Geciken",
    rows: [{ name: "Ankara Kızılay Ofis", city: "Çankaya, Ankara", date: "30.10.2026", status: "santiye", days: "12 gün gecikti" }],
  },
  {
    group: "7 gün içinde",
    rows: [{ name: "Kadıköy Bahariye Mağaza", city: "Kadıköy, İstanbul", date: "14.11.2026", status: "yakinda_aciliyor", days: "3 gün kaldı" }],
  },
  {
    group: "30 gün içinde",
    rows: [
      { name: "Levent Ofis Katı", city: "Beşiktaş, İstanbul", date: "02.12.2026", status: "santiye", days: "21 gün kaldı" },
      { name: "İzmir Alsancak Mağaza", city: "Konak, İzmir", date: "06.12.2026", status: "santiye", days: "25 gün kaldı" },
      { name: "Maltepe Sahil Mağaza", city: "Maltepe, İstanbul", date: "09.12.2026", status: "santiye", days: "28 gün kaldı" },
    ],
  },
];

export function OpeningCalendarVisual({ className }: { className?: string }) {
  return (
    <AppFrame
      label="Koordine açılış takvimi örneği: geciken, 7 gün içinde ve 30 gün içinde açılacak sahalar, açılışa kalan günle."
      crumbs={["Pano", "Saha portföyü"]}
      code="SAH"
      className={className}
    >
      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        {[
          { k: "30 gün içinde açılış", v: "4", note: "En yakın: Kadıköy Bahariye" },
          { k: "Geciken açılış", v: "1", note: "Tarihi geçmiş, henüz açılmamış", risk: true },
          { k: "Açılan saha", v: "3", note: "Açılış, hakediş ve fatura" },
        ].map((m) => (
          <div key={m.k} className="min-w-0 px-3 py-2.5 @lg:px-4">
            <div className="truncate font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-500">{m.k}</div>
            <div className={cn("mt-1 font-mono text-[20px] leading-none tabular-nums", m.risk ? "text-risk" : "text-ink-950")}>{m.v}</div>
            <div className="mt-1 hidden truncate text-[10.5px] text-ink-500 @lg:block">{m.note}</div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-1 pt-3">
        <div className="text-[13px] font-semibold text-ink-950">Açılış takvimi</div>
        <div className="text-[11px] text-ink-500">Henüz açılmamış sahalar ve açılışa kalan gün.</div>
      </div>
      <div className="px-4 pb-4">
        {OPENINGS.map((g) => (
          <div key={g.group} className="mt-3">
            <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-500">
              <span className={cn("size-1.5 rounded-full", g.group === "Geciken" ? "bg-risk" : g.group === "7 gün içinde" ? "bg-warn" : "bg-brand-600")} />
              {g.group}
              <span className="h-px flex-1 bg-line" />
            </div>
            <ul className="mt-1.5 divide-y divide-line border border-line">
              {g.rows.map((r) => (
                <li key={r.name} className="flex items-center gap-3 px-3 py-2">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-medium text-ink-950">{r.name}</div>
                    <div className="truncate text-[10px] text-ink-500">{r.city}</div>
                  </div>
                  <StatusBadge status={r.status} className="hidden @md:inline-flex" />
                  <span className="hidden font-mono text-[10.5px] tabular-nums text-ink-600 @lg:inline">{r.date}</span>
                  <span
                    className={cn(
                      "w-[6.5rem] shrink-0 text-right font-mono text-[10.5px] tabular-nums",
                      g.group === "Geciken" ? "text-risk" : g.group === "7 gün içinde" ? "text-[#8a5a12]" : "text-ink-700"
                    )}
                  >
                    {r.days}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="mt-2 text-[10.5px] text-ink-500">+3 saha daha</div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ Zimmet geçmişi */

const HISTORY: {
  state: "Zimmette" | "Teslim alındı";
  condition?: "Sağlam" | "Hasarlı";
  who: string;
  site: string;
  range: string;
  by: string;
  note?: string;
  returnNote?: string;
}[] = [
  {
    state: "Zimmette",
    who: "Kemal Yurt",
    site: "Levent Ofis Katı",
    range: "03.11.2026 → planlanan 20.11.2026",
    by: "zimmetleyen Emre Aydın",
    note: "2 sivri, 1 yassı uç ile verildi",
  },
  {
    state: "Teslim alındı",
    condition: "Hasarlı",
    who: "Ali Rıza Tan",
    site: "Kadıköy Bahariye Mağaza",
    range: "06.10.2026 → 28.10.2026",
    by: "teslim alan Emre Aydın",
    returnNote: "Kablosu yıpranmış, bakıma alındı",
  },
  {
    state: "Teslim alındı",
    condition: "Sağlam",
    who: "Mert Çelik",
    site: "Maltepe Sahil Mağaza",
    range: "01.09.2026 → 30.09.2026",
    by: "teslim alan Selin Kara",
  },
];

export function AssignmentHistoryVisual({ className }: { className?: string }) {
  return (
    <AppFrame
      label="Koordine zimmet geçmişi örneği: bir kırıcı delicinin üç zimmet kaydı, şantiyesi, tarihleri ve teslimdeki durumu."
      crumbs={["Envanter", "Zimmet geçmişi"]}
      code="ENV"
      className={className}
    >
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-[10.5px] text-ink-500">DMR-0012</span>
            <span className="truncate text-[13px] font-semibold text-ink-950">Kırıcı delici</span>
          </div>
          <div className="truncate text-[11px] text-ink-500">Bosch GSH 11 VC · Ekipman</div>
        </div>
        <Badge tone="brand">Zimmette</Badge>
      </div>
      <ol className="relative px-4 py-3">
        <span aria-hidden className="absolute bottom-6 left-[27px] top-6 w-px bg-line-strong" />
        {HISTORY.map((h, i) => (
          <li key={i} className="relative flex gap-3 py-2.5">
            <Avatar name={h.who} tone={i === 0 ? "brand" : "paper"} className="relative size-6" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-[12px] font-medium text-ink-950">{h.who}</span>
                {h.state === "Zimmette" ? (
                  <Badge tone="brand">Zimmette</Badge>
                ) : (
                  <Badge tone={h.condition === "Hasarlı" ? "warn" : "ok"}>Teslim alındı · {h.condition}</Badge>
                )}
              </div>
              <div className="mt-0.5 truncate text-[11px] text-ink-600">{h.site}</div>
              <div className="mt-1 font-mono text-[10.5px] tabular-nums text-ink-500">
                {h.range} <span className="hidden @md:inline">· {h.by}</span>
              </div>
              {h.note && <div className="mt-1 text-[10.5px] text-ink-600">Not: {h.note}</div>}
              {h.returnNote && <div className="mt-1 text-[10.5px] text-ink-600">Teslim notu: {h.returnNote}</div>}
            </div>
          </li>
        ))}
      </ol>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ Yetki matrisi */

/** Uygulamadaki yerleşik İnşaat Mühendisi şablonu (builtInMatrixForRole): G E D S */
const PERMISSIONS: { module: string; crud: string }[] = [
  { module: "Harita", crud: "GED" },
  { module: "Sahalar", crud: "GED" },
  { module: "Projeler", crud: "GED" },
  { module: "Onaylar", crud: "GD" },
  { module: "Tadilat Talepleri", crud: "GED" },
  { module: "Sözleşmeler", crud: "" },
  { module: "Hakediş", crud: "" },
  { module: "Faturalar", crud: "" },
  { module: "Envanter", crud: "" },
  { module: "Personel ve belgeler", crud: "" },
  { module: "Özlük bilgileri (hassas)", crud: "" },
  { module: "Puantaj", crud: "" },
  { module: "İzinler (İK onayı)", crud: "" },
  { module: "Duyurular (yayınlama)", crud: "" },
  { module: "Personel talepleri (İK)", crud: "" },
];

const CRUD = [
  { k: "G", label: "Görüntüle" },
  { k: "E", label: "Ekle" },
  { k: "D", label: "Düzenle" },
  { k: "S", label: "Sil" },
];

export function PermissionMatrixVisual({ className }: { className?: string }) {
  return (
    <AppFrame
      label="Koordine yetki matrisi örneği: İnşaat Mühendisi rolünün 15 bölümdeki görüntüleme, ekleme, düzenleme ve silme yetkileri."
      crumbs={["Admin", "Yetkiler"]}
      code="EKP"
      className={className}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-ink-950">İnşaat Mühendisi</div>
          <div className="truncate text-[11px] text-ink-500">Yerleşik rol · uygulama varsayılanı</div>
        </div>
        <div className="flex gap-1.5">
          <span className="hidden h-6 items-center rounded-sm border border-line bg-white px-2 text-[10.5px] text-ink-700 @md:flex">Sadece görüntüleme</span>
          <span className="flex h-6 items-center rounded-sm bg-brand-600 px-2 text-[10.5px] font-medium text-white">Rolü kaydet</span>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead className="border-b border-line bg-paper/40">
          <tr>
            <th className={th}>Bölüm</th>
            {CRUD.map((c) => (
              <th key={c.k} className={cn(th, "w-12 text-center @lg:w-20")}>
                <span className="@lg:hidden">{c.k}</span>
                <span className="hidden @lg:inline">{c.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {PERMISSIONS.map((p) => (
            <tr key={p.module} className={p.crud ? undefined : "bg-paper/40"}>
              <td className={cn(td, "max-w-0 truncate py-1.5", !p.crud && "text-ink-400")}>{p.module}</td>
              {CRUD.map((c) => {
                const on = p.crud.includes(c.k);
                return (
                  <td key={c.k} className={cn(td, "py-1.5 text-center")}>
                    <span
                      className={cn(
                        "inline-grid size-3.5 place-items-center rounded-xs border",
                        on ? "border-brand-600 bg-brand-600" : "border-line-strong bg-white"
                      )}
                    >
                      {on && (
                        <svg viewBox="0 0 10 10" className="size-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M2 5.2 4.2 7.3 8 2.8" />
                        </svg>
                      )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t border-line bg-paper/60 px-4 py-2 text-[10.5px] text-ink-500">
        Bu matris, bu role atanan yeni kullanıcılar ve “rol varsayılanını uygula” için kullanılır.
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ Rapor kapsamı */

/** Son 14 gün; 1 = rapor var, 0 = rapor yok. En az raporlanan üstte (uygulamadaki sıralama). */
const COVERAGE: { site: string; days: number[] }[] = [
  { site: "Ankara Kızılay Ofis", days: [1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0] },
  { site: "Maltepe Sahil Mağaza", days: [1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1] },
  { site: "İzmir Alsancak Mağaza", days: [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1] },
  { site: "Levent Ofis Katı", days: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1] },
];
const DAY_LABELS = ["29", "30", "31", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];

export function CoverageVisual({ className }: { className?: string }) {
  return (
    <AppFrame
      label="Koordine günlük rapor kapsamı örneği: dört şantiyenin son 14 günde rapor girilen ve girilmeyen günleri."
      crumbs={["Pano", "Günlük rapor kapsamı"]}
      code="RPR"
      className={className}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
        <div className="text-[11px] text-ink-600">
          <span className="text-ink-500">Bugün:</span> <span className="font-mono tabular-nums text-ink-950">3 / 4</span> şantiye
        </div>
        <div className="flex items-center gap-3 text-[10.5px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-xs bg-ok" /> Rapor var
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-xs border border-risk/40 bg-risk/10" /> Rapor yok
          </span>
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_2.5rem] items-end gap-x-3 @xl:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_3rem]">
          <span />
          <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px] font-mono text-[8.5px] tabular-nums text-ink-400">
            {DAY_LABELS.map((d, i) => (
              <span key={d} className={cn("text-center", i % 2 === 1 && "@max-md:invisible")}>
                {d}
              </span>
            ))}
          </div>
          <span className="text-right font-mono text-[8.5px] uppercase tracking-[0.08em] text-ink-400">14 g</span>
        </div>
        <ul className="mt-1.5 space-y-1.5">
          {COVERAGE.map((row) => {
            const n = row.days.filter(Boolean).length;
            return (
              <li
                key={row.site}
                className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_2.5rem] items-center gap-x-3 @xl:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_3rem]"
              >
                <span className="truncate text-[11px] text-ink-800">{row.site}</span>
                <span className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[3px]">
                  {row.days.map((d, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-4 rounded-xs",
                        d ? "bg-ok" : "border border-risk/40 bg-risk/10",
                        i === row.days.length - 1 && "outline outline-1 outline-offset-1 outline-ink-950/40"
                      )}
                    />
                  ))}
                </span>
                <span className="text-right font-mono text-[10.5px] tabular-nums text-ink-700">{n}/14</span>
              </li>
            );
          })}
        </ul>
      </div>
    </AppFrame>
  );
}
