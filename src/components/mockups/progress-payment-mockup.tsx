import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Badge, Progress, td, th, type Tone } from "./primitives";

/**
 * ProgressPaymentMockup — Hakediş / sözleşme / fatura tablosu.
 * Sözleşme kodları (SZ-0012), saha, dönem, KDV dahil tutar ve net ödenecek (₺ ve € birlikte; kur
 * çevrimi yapılmadığı için toplamlar para birimi başına ayrı), durum rozetleri ve altta toplam satırı.
 * Örnek rakamlar uygulamanın hesabıyla tutarlıdır: KDV %20, tevkifat 4/10, teminat %5, damga ‰9,48.
 *
 * Proplar:
 * - `view`: "payments" (hakedişler, varsayılan) | "contracts" (sözleşmeler) | "invoices" (faturalar).
 * - `showSummary`: hakediş görünümünde üstteki sözleşme ilerleme özeti (varsayılan true).
 * - `rows`: gösterilecek satır sayısı (varsayılan tümü, en fazla 5).
 * - `frame`, `label`, `className`.
 * Dar pencerede saha/dönem sütunları gizlenir.
 */
export function ProgressPaymentMockup({
  view = "payments",
  showSummary = true,
  rows,
  frame = true,
  label,
  className,
}: {
  view?: "payments" | "contracts" | "invoices";
  showSummary?: boolean;
  rows?: number;
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  const meta = VIEWS[view];
  const visible = meta.rows.slice(0, rows ?? meta.rows.length);
  // Toplamlar görünen satırlardan, para birimi başına ayrı hesaplanır (kur çevrimi yok)
  const totals =
    rows === undefined
      ? meta.totals
      : sumByCurrency(visible.map((r) => r.amount), view === "contracts" ? "Toplam" : "Net ödenecek");
  return (
    <AppFrame
      label={label ?? meta.label}
      crumbs={["Finans", meta.title]}
      bare={!frame}
      className={className}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-ink-950">{meta.title}</div>
          <div className="truncate text-[11px] text-ink-500">{meta.description}</div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="hidden h-7 w-40 items-center rounded-sm border border-line px-2 text-[11px] text-ink-400 @xl:flex">
            {meta.search}
          </span>
          <span className="flex h-7 items-center rounded-sm bg-brand-600 px-2.5 text-[11px] font-medium text-white">+ Yeni</span>
        </div>
      </div>

      {view === "payments" && showSummary && (
        <div className="grid gap-3 border-b border-line bg-paper/60 px-4 py-3 @xl:grid-cols-[1.3fr_1fr] @xl:items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] text-brand-700">SZ-0012</span>
              <span className="truncate text-[11.5px] font-medium text-ink-900">Kadıköy Bahariye Mağaza Sözleşmesi</span>
            </div>
            <div className="mt-0.5 text-[10.5px] text-ink-500">Taraf: Yalın Yapı İnşaat Taahhüt · Sözleşme bedeli ₺4.850.000,00</div>
          </div>
          <div>
            <div className="mb-1 flex items-baseline justify-between text-[10.5px]">
              <span className="text-ink-500">Sözleşme ilerlemesi</span>
              <span className="font-mono tabular-nums text-ink-900">%20</span>
            </div>
            <Progress value={20} />
            <div className="mt-1 font-mono text-[9.5px] tabular-nums text-ink-500">Toplam hakediş ₺3.272.040,00 · Ödenen ₺986.400,00</div>
          </div>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead className="border-b border-line bg-paper/40">
          <tr>
            {meta.columns.map((c) => (
              <th key={c.key} className={cn(th, c.hide, c.right && "text-right")}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {visible.map((r, i) => (
            <tr key={i} className={i === meta.highlight ? "bg-brand-50/50" : undefined}>
              {meta.columns.map((c) => {
                const v = r[c.key];
                return (
                  <td key={c.key} className={cn(td, c.hide, c.right && "text-right", c.mono && "font-mono tabular-nums text-[11px]", c.code && "font-mono text-[10.5px] text-brand-700")}>
                    {c.key === "status" ? <Badge tone={STATUS_TONE[v] ?? "neutral"}>{v}</Badge> : v}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="divide-y divide-line border-t border-line-strong bg-paper/60">
        {totals.map((t) => (
          <div key={t.label} className="flex items-center justify-end gap-3 px-3 py-1.5">
            <span className="text-[10.5px] font-medium text-ink-500">{t.label}</span>
            <span className="min-w-[6.5rem] text-right font-mono text-[11px] font-semibold tabular-nums text-ink-950">{t.value}</span>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}

const STATUS_TONE: Record<string, Tone> = {
  Taslak: "muted",
  "Onay bekliyor": "warn",
  "Ödeme bekliyor": "brand",
  Onaylandı: "brand",
  Ödendi: "ok",
  Aktif: "ok",
  Tamamlandı: "neutral",
  "Süresi doldu": "risk",
  İptal: "risk",
};

type Col = { key: string; label: string; hide?: string; right?: boolean; mono?: boolean; code?: boolean };

const hideSm = "hidden @md:table-cell";
const hideMd = "hidden @2xl:table-cell";

const VIEWS: Record<
  "payments" | "contracts" | "invoices",
  {
    title: string;
    description: string;
    search: string;
    label: string;
    columns: Col[];
    rows: Record<string, string>[];
    totals: { label: string; value: string }[];
    highlight?: number;
  }
> = {
  payments: {
    title: "Hakedişler",
    description: "Sözleşmeye bağlı hakedişler: metraj, kesintiler, onay ve ödeme.",
    search: "Hakediş, sözleşme…",
    label: "Koordine hakediş tablosu örneği: hakediş, sözleşme kodu, dönem, KDV dahil tutar, net ödenecek ve durum sütunları.",
    highlight: 1,
    columns: [
      { key: "title", label: "Hakediş" },
      { key: "contract", label: "Sözleşme", hide: hideSm, code: true },
      { key: "period", label: "Dönem", hide: hideMd },
      { key: "total", label: "Tutar (KDV dahil)", hide: hideMd, right: true, mono: true },
      { key: "amount", label: "Net ödenecek", right: true, mono: true },
      { key: "status", label: "Durum" },
    ],
    rows: [
      { title: "4. Hakediş", contract: "SZ-0012", period: "Kasım 2026", total: "₺1.039.800,00", amount: "₺918.940,58", status: "Taslak" },
      { title: "3. Hakediş", contract: "SZ-0012", period: "Ekim 2026", total: "₺1.245.840,00", amount: "₺1.101.031,86", status: "Onay bekliyor" },
      { title: "2. Hakediş", contract: "SZ-0012", period: "Eylül 2026", total: "₺986.400,00", amount: "₺871.747,44", status: "Ödendi" },
      { title: "1. Hakediş", contract: "SZ-0015", period: "Ekim 2026", total: "€84.240,00", amount: "€74.448,50", status: "Ödendi" },
      { title: "2. Hakediş", contract: "SZ-0009", period: "Eylül 2026", total: "₺642.300,00", amount: "₺567.643,33", status: "Onaylandı" },
    ],
    totals: [
      { label: "Net ödenecek (TRY)", value: "₺3.459.363,21" },
      { label: "Net ödenecek (EUR)", value: "€74.448,50" },
    ],
  },
  contracts: {
    title: "Sözleşmeler",
    description: "Saha projelerine bağlı sözleşmeler.",
    search: "Kod, taraf, saha…",
    label: "Koordine sözleşme listesi örneği: kod, taraf, saha, tutar ve durum.",
    columns: [
      { key: "code", label: "Kod", code: true },
      { key: "party", label: "Taraf", hide: hideSm },
      { key: "site", label: "Saha", hide: hideMd },
      { key: "end", label: "Bitiş", hide: hideMd, mono: true },
      { key: "amount", label: "Tutar", right: true, mono: true },
      { key: "status", label: "Durum" },
    ],
    rows: [
      { code: "SZ-0016", party: "Öz Mekanik Tesisat", site: "Ataşehir AVM Mağaza", end: "30.03.2027", amount: "₺2.180.000,00", status: "Taslak" },
      { code: "SZ-0015", party: "Kuzey Yapı Ltd.", site: "Levent Ofis Katı", end: "15.01.2027", amount: "€312.000,00", status: "Aktif" },
      { code: "SZ-0012", party: "Yalın Yapı İnşaat Taahhüt", site: "Kadıköy Bahariye Mağaza", end: "30.11.2026", amount: "₺4.850.000,00", status: "Aktif" },
      { code: "SZ-0009", party: "Ege Dekorasyon", site: "Üsküdar Sahil Kafe", end: "30.09.2026", amount: "₺1.420.000,00", status: "Tamamlandı" },
      { code: "SZ-0007", party: "Marmara Elektrik", site: "Ümraniye Lojistik Depo", end: "31.07.2026", amount: "$96.400,00", status: "Süresi doldu" },
    ],
    totals: [
      { label: "Toplam (TRY)", value: "₺8.450.000,00" },
      { label: "Toplam (EUR)", value: "€312.000,00" },
      { label: "Toplam (USD)", value: "$96.400,00" },
    ],
  },
  invoices: {
    title: "Faturalar",
    description: "Gelen ve giden faturaların kaydı, belgesi ve ödeme takibi.",
    search: "Fatura no, firma, VKN…",
    label: "Koordine fatura listesi örneği: fatura no, firma, vade, KDV dahil toplam, tevkifat sonrası net ödenecek ve durum.",
    columns: [
      { key: "no", label: "Fatura No", code: true },
      { key: "party", label: "Firma", hide: hideSm },
      { key: "due", label: "Vade", hide: hideMd, mono: true },
      { key: "total", label: "Toplam", hide: hideMd, right: true, mono: true },
      { key: "amount", label: "Net ödenecek", right: true, mono: true },
      { key: "status", label: "Durum" },
    ],
    rows: [
      { no: "KDA2026000000418", party: "Yalın Yapı İnşaat Taahhüt", due: "10.12.2026", total: "₺986.400,00", amount: "₺920.640,00", status: "Ödeme bekliyor" },
      { no: "KDA2026000000402", party: "Ege Dekorasyon", due: "15.10.2026", total: "₺642.300,00", amount: "₺599.480,00", status: "Ödendi" },
      { no: "KDA2026000000397", party: "Kuzey Yapı Ltd.", due: "20.11.2026", total: "€84.240,00", amount: "€78.624,00", status: "Ödendi" },
      { no: "KDA2026000000421", party: "Marmara Elektrik", due: "05.12.2026", total: "₺420.000,00", amount: "₺392.000,00", status: "Taslak" },
    ],
    totals: [
      { label: "Net ödenecek (TRY)", value: "₺1.912.120,00" },
      { label: "Net ödenecek (EUR)", value: "€78.624,00" },
    ],
  },
};

const CURRENCY: Record<string, string> = { "₺": "TRY", "€": "EUR", $: "USD", "£": "GBP" };

function sumByCurrency(amounts: string[], prefix: string) {
  const sums = new Map<string, number>();
  for (const a of amounts) {
    const sym = a[0];
    const n = Number(a.slice(1).replace(/\./g, "").replace(",", "."));
    sums.set(sym, (sums.get(sym) ?? 0) + n);
  }
  return [...sums].map(([sym, n]) => ({
    label: `${prefix} (${CURRENCY[sym] ?? sym})`,
    value: `${sym}${n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  }));
}
