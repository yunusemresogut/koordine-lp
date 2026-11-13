import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Avatar } from "./primitives";

/**
 * ChatMockup — Firma içi birebir sohbet: solda ekip listesi (rol, son mesaj, okunmamış sayısı),
 * sağda konuşma; PDF rapor ve görsel paylaşımı, "Görüldü" bilgisi. İsteğe bağlı bildirim kartı.
 *
 * Proplar:
 * - `showNotification`: sağ üstte bildirim kartı (varsayılan true).
 * - `showContacts`: soldaki ekip listesi (varsayılan true; dar pencerede zaten gizlenir).
 * - `frame`, `label`, `className`.
 */
export function ChatMockup({
  showNotification = true,
  showContacts = true,
  frame = true,
  label = "Koordine ekip sohbeti örneği: şantiye şefiyle yazışma, paylaşılan PDF rapor ve fotoğraf, yeni bildirim.",
  className,
}: {
  showNotification?: boolean;
  showContacts?: boolean;
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <AppFrame
      label={label}
      crumbs={["Ekip", "Mesajlar"]}
      code="EKP"
      bare={!frame}
      className={className}
      aside={
        <span className="relative">
          <svg viewBox="0 0 16 16" className="size-3.5 text-ink-500" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M4 11V7a4 4 0 1 1 8 0v4l1 1.5H3L4 11ZM6.5 14h3" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-risk" />
        </span>
      }
    >
      <div className={cn("relative grid", showContacts && "@xl:grid-cols-[14rem_minmax(0,1fr)]")}>
        {showContacts && <Contacts />}
        <Conversation />
        {showNotification && (
          <div className="absolute right-3 top-3 hidden w-60 rounded-sm border border-line-strong bg-white p-2.5 shadow-float @lg:block">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-risk">Yüksek öncelikli talep</span>
              <span className="font-mono text-[9.5px] text-ink-400">şimdi</span>
            </div>
            <div className="mt-1 text-[11.5px] font-medium text-ink-950">TT-0047 · Vitrin camında çatlak</div>
            <div className="text-[10.5px] text-ink-500">Kadıköy Bahariye Mağaza · Haritada aç</div>
          </div>
        )}
      </div>
    </AppFrame>
  );
}

function Contacts() {
  const people = [
    { name: "Emre Aydın", role: "Saha Sorumlusu", last: "Rapor ekte, armatürler gecikiyor.", unread: 0, active: true },
    { name: "Selin Kara", role: "Mimar", last: "Malzeme sunumunu güncelledim.", unread: 2 },
    { name: "Burak Yıldız", role: "Makine Mühendisi", last: "VRF test raporu yarın.", unread: 0 },
    { name: "Ayşe Koç", role: "Muhasebe", last: "3. hakediş faturası kesildi.", unread: 1 },
    { name: "Deniz Arslan", role: "Bölge Müdürü", last: "Siz: Açılış planını konuşalım.", unread: 0 },
  ];
  return (
    <div className="hidden border-r border-line @xl:block">
      <div className="border-b border-line px-3 py-2">
        <span className="flex h-7 items-center rounded-sm border border-line bg-paper px-2 text-[10.5px] text-ink-400">Kişi ara…</span>
      </div>
      <ul className="divide-y divide-line">
        {people.map((p) => (
          <li key={p.name} className={cn("relative flex items-start gap-2 px-3 py-2", p.active && "bg-brand-50/70")}>
            {p.active && <span className="absolute inset-y-0 left-0 w-0.5 bg-brand-600" />}
            <Avatar name={p.name} tone={p.active ? "brand" : "ink"} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[11px] font-medium text-ink-950">{p.name}</span>
                {p.unread > 0 && (
                  <span className="grid h-4 min-w-4 place-items-center rounded-full bg-brand-600 px-1 font-mono text-[9px] text-white">{p.unread}</span>
                )}
              </div>
              <div className="truncate text-[9.5px] text-ink-500">{p.role}</div>
              <div className="truncate text-[10px] text-ink-600">{p.last}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Conversation() {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex items-center gap-2 border-b border-line px-4 py-2">
        <Avatar name="Emre Aydın" tone="brand" />
        <div>
          <div className="text-[12px] font-semibold text-ink-950">Emre Aydın</div>
          <div className="text-[10px] text-ink-500">Saha Sorumlusu · Kadıköy Bahariye Mağaza</div>
        </div>
      </div>
      <div className="flex-1 space-y-2.5 bg-paper/60 px-4 py-3">
        <div className="text-center font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-400">Bugün</div>
        <Msg>Günlük raporu kaydettim. Aydınlatma armatürleri 13&apos;üne kaydı.</Msg>
        <div className="max-w-[78%]">
          <div className="flex items-center gap-2.5 rounded-md border border-line bg-white p-2">
            <span className="grid h-9 w-7 shrink-0 place-items-center rounded-xs border border-line-strong bg-paper font-mono text-[8px] font-medium text-risk">
              PDF
            </span>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-medium text-ink-950">Gunluk-Santiye-Raporu-Kadikoy-2026-11-11.pdf</div>
              <div className="font-mono text-[9.5px] text-ink-500">1,2 MB · Dosya</div>
            </div>
          </div>
        </div>
        <div className="max-w-[46%] overflow-hidden rounded-md border border-line bg-white">
          <svg viewBox="0 0 160 90" className="block w-full bg-paper" fill="none" stroke="#a9b0c2" strokeWidth="0.8">
            {/* Vitrin: iki cam, ortada kapı, sol camda çatlak */}
            <path d="M6 10 H154" stroke="#7f88a0" />
            <rect x="10" y="16" width="58" height="64" />
            <rect x="92" y="16" width="58" height="64" />
            <rect x="72" y="16" width="16" height="64" />
            <path d="M84 48 v6" stroke="#7f88a0" />
            <path d="M10 22 L22 30 L19 38 L31 47 L28 55 L40 62" stroke="#c2413a" strokeWidth="1" />
            <path d="M22 30 L30 27 M31 47 L39 45" stroke="#c2413a" strokeWidth="0.7" />
            <path d="M0 84 L160 84" stroke="#7f88a0" />
          </svg>
          <div className="px-2 py-1 text-[10px] text-ink-500">Vitrin camı, sol köşe</div>
        </div>
        <Msg mine>Teşekkürler. Vitrin için talebi açtım, TT-0047. Elektrik onayını bugün tamamlayalım.</Msg>
        <div className="text-right font-mono text-[9.5px] text-ink-400">Görüldü · 14:32</div>
      </div>
      <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
        <span className="grid size-7 place-items-center rounded-sm border border-line text-ink-500">
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="m13 7.5-5.3 5.3a3.2 3.2 0 0 1-4.5-4.5l5.6-5.6a2.1 2.1 0 0 1 3 3l-5.4 5.4a1 1 0 0 1-1.5-1.5L10 4.5" />
          </svg>
        </span>
        <span className="flex h-7 flex-1 items-center truncate rounded-sm border border-line-strong px-2 text-[10.5px] text-ink-400">
          Emre Aydın kişisine mesaj yazın…
        </span>
      </div>
    </div>
  );
}

function Msg({ children, mine }: { children: React.ReactNode; mine?: boolean }) {
  return (
    <div className={cn("flex", mine && "justify-end")}>
      <div
        className={cn(
          "max-w-[78%] rounded-md px-3 py-2 text-[11.5px] leading-snug",
          mine ? "rounded-br-xs bg-ink-950 text-white" : "rounded-bl-xs border border-line bg-white text-ink-800"
        )}
      >
        {children}
      </div>
    </div>
  );
}
