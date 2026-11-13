import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { Badge } from "./primitives";

/**
 * AssistantMockup — "Koordine Asistan" paneli: kullanıcı sorusu, firma verisine dayalı cevap ve
 * kayıt eklemeden önce gösterilen "önizleme → Onayla ve ekle" kartı. Altta yapay zekâ uyarısı.
 * (Uygulamadaki adı "Maps'e Sor"; sitede marka "Koordine Asistan" olarak gösterilir.)
 *
 * Proplar:
 * - `variant`: "full" (soru + cevap + önizleme, varsayılan) | "answer" (soru + cevap) | "preview" (yalnız kayıt önizlemesi akışı).
 * - `frame`, `label`, `className`.
 */
export function AssistantMockup({
  variant = "full",
  frame = true,
  label = "Koordine Asistan örneği: açılış takvimiyle ilgili bir soruya verilen cevap ve onay bekleyen yeni tadilat talebi önizlemesi.",
  className,
}: {
  variant?: "full" | "answer" | "preview";
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  return (
    <AppFrame label={label} crumbs={["Asistan"]} code="AI" bare={!frame} className={className} bodyClassName="flex flex-col">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-2.5">
        <span className="grid size-7 place-items-center rounded-sm bg-ink-950">
          <svg viewBox="0 0 16 16" className="size-3.5 text-brand-300" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.4 3.4l2.1 2.1M10.5 10.5l2.1 2.1M3.4 12.6l2.1-2.1M10.5 5.5l2.1-2.1" />
          </svg>
        </span>
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold text-ink-950">Koordine Asistan</div>
          <div className="truncate text-[10.5px] text-ink-500">Firma verilerinize göre cevaplar, onayınızla kayıt ekler</div>
        </div>
      </div>

      <div className="flex-1 space-y-3 bg-paper/60 px-4 py-4">
        {variant !== "preview" && (
          <>
            <UserMsg>Önümüzdeki 30 günde açılacak sahalar hangileri?</UserMsg>
            <BotMsg>
              <p>30 gün içinde açılışı planlı 3 saha var:</p>
              <ol className="mt-2 space-y-1.5">
                {[
                  ["Kadıköy Bahariye Mağaza", "14.11.2026", "Elektrik onayı bekliyor"],
                  ["Levent Ofis Katı", "02.12.2026", "İş planı ortalaması %54"],
                  ["Maltepe Sahil Mağaza", "09.12.2026", "Mimari onay bekliyor"],
                ].map(([name, date, note], i) => (
                  <li key={name} className="grid grid-cols-[auto_1fr] gap-x-2">
                    <span className="font-mono text-[10px] text-ink-400">{i + 1}.</span>
                    <span>
                      <span className="font-medium text-ink-950">{name}</span>
                      <span className="font-mono text-[10.5px] text-ink-500"> · {date}</span>
                      <span className="block text-[10.5px] text-ink-500">{note}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-2">Kadıköy&apos;de açılışa 3 gün kaldı; elektrik disiplin onayını önceliklendirmenizi öneririm.</p>
            </BotMsg>
          </>
        )}
        {variant !== "answer" && (
          <>
            <UserMsg>Kadıköy için vitrin camındaki çatlakla ilgili yüksek öncelikli bir talep aç.</UserMsg>
            <div className="max-w-[92%] overflow-hidden rounded-md border border-brand-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-line bg-brand-50/60 px-3 py-2">
                <span className="text-[11.5px] font-semibold text-ink-950">Yeni tadilat talebi</span>
                <Badge tone="brand">Önizleme</Badge>
              </div>
              <dl className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 px-3 py-2.5 text-[11px]">
                <dt className="text-ink-500">Başlık</dt>
                <dd className="text-ink-950">Vitrin camında çatlak</dd>
                <dt className="text-ink-500">Saha</dt>
                <dd className="text-ink-950">Kadıköy Bahariye Mağaza</dd>
                <dt className="text-ink-500">Öncelik</dt>
                <dd>
                  <Badge tone="risk">Yüksek</Badge>
                </dd>
                <dt className="text-ink-500">Açıklama</dt>
                <dd className="text-ink-800">Sol vitrin camında köşeden başlayan çatlak; açılış öncesi değişim gerekli.</dd>
              </dl>
              <div className="flex items-center justify-end gap-1.5 border-t border-line px-3 py-2">
                <span className="flex h-7 items-center rounded-sm border border-line px-2.5 text-[11px] text-ink-700">Vazgeç</span>
                <span className="flex h-7 items-center rounded-sm bg-brand-600 px-2.5 text-[11px] font-medium text-white">Onayla ve ekle</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="border-t border-line px-4 py-3">
        <div className="flex h-8 items-center justify-between rounded-sm border border-line-strong bg-white px-2.5 text-[11px] text-ink-400">
          Bir soru sorun…
          <span className="grid size-5 place-items-center rounded-xs bg-ink-950 text-white">
            <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" />
            </svg>
          </span>
        </div>
        <p className="mt-2 text-[10px] text-ink-500">Yapay zekâ hata yapabilir; önemli kararlarda verileri kontrol edin.</p>
      </div>
    </AppFrame>
  );
}

function UserMsg({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[82%] rounded-md rounded-br-xs bg-ink-950 px-3 py-2 text-[11.5px] leading-snug text-white">{children}</div>
    </div>
  );
}

function BotMsg({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("max-w-[92%] rounded-md rounded-bl-xs border border-line bg-white px-3 py-2.5 text-[11.5px] leading-relaxed text-ink-800", className)}>
      {children}
    </div>
  );
}
