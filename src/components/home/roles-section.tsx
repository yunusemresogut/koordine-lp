import { ChatMockup } from "@/components/mockups";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { permissionColumns, permissionRows, securityFacts } from "@/content/home";
import { cn } from "@/lib/utils";

const ACTIONS = [
  { k: "G", label: "görüntüle" },
  { k: "E", label: "ekle" },
  { k: "D", label: "düzenle" },
  { k: "S", label: "sil" },
];

/**
 * Saha ve ofis rolleri: uygulamadaki varsayılan yetki matrisi (gerçek tablo, ekran okuyucuya açık),
 * altında ekip sohbeti görseli ve güvenlik gerçekleri.
 */
export function RolesSection() {
  return (
    <section aria-labelledby="roles-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Roller ve yetkiler"
          align="split"
          title={<span id="roles-title">Herkes yalnızca yetkili olduğu modülleri görür.</span>}
          lede="Mühendis, mimar, saha sorumlusu ve muhasebe için hazır roller gelir. Tablodaki yetkiler varsayılandır, kurucu bunları her kullanıcı için değiştirebilir."
        />

        <div className="mt-14">
          <div
            className="relative overflow-x-auto border border-ink-950"
            tabIndex={0}
            role="region"
            aria-label="Varsayılan rol yetkileri tablosu, yatay kaydırılabilir"
          >
            <table className="w-full min-w-[920px] border-collapse text-left">
              <caption className="sr-only">
                Rollere göre varsayılan modül yetkileri. G görüntüle, E ekle, D düzenle, S sil.
              </caption>
              <thead>
                <tr className="border-b border-ink-950 bg-paper">
                  <th scope="col" className="sticky left-0 z-10 w-[24%] min-w-[13rem] bg-paper px-4 py-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink-500">
                    Rol
                  </th>
                  {permissionColumns.map((c) => (
                    <th key={c} scope="col" className="border-l border-line px-3 py-3 align-bottom text-[0.8125rem] font-medium leading-tight text-ink-800">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {permissionRows.map((r) => (
                  <tr key={r.role}>
                    <th scope="row" className="sticky left-0 z-10 min-w-[13rem] bg-white px-4 py-3.5 align-top font-normal shadow-[1px_0_0_var(--color-line)] lg:shadow-none">
                      <span className="block text-[0.9375rem] font-semibold text-ink-950">{r.role}</span>
                      {r.note && <span className="mt-0.5 block text-[0.8125rem] text-ink-500">{r.note}</span>}
                    </th>
                    {r.cells.map((cell, i) => (
                      <td key={i} className="border-l border-line px-3 py-3.5 align-top">
                        <Cell value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.75rem] text-ink-500">
            {ACTIONS.map((a) => (
              <span key={a.k}>
                <span className="text-ink-950">{a.k}</span> {a.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="h-px w-3 bg-ink-300" /> erişim yok
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-7">
            <ChatMockup />
          </div>
          <div className="lg:col-span-5">
            <h3 className="text-balance text-[1.625rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-950">
              Ekip içi yazışma ve bildirimler.
            </h3>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-600">
              Firma içi sohbette rapor, fotoğraf ve dosya paylaşabilirsiniz. Talepler, hakedişler, izinler ve belge
              bitişleri bildirim olarak gelir.
            </p>
            <dl className="mt-8 divide-y divide-line border-y border-line">
              {securityFacts.map((f) => (
                <div key={f.title} className="grid gap-1 py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[0.9375rem] font-semibold text-ink-950">{f.title}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-ink-600">{f.body}</dd>
                </div>
              ))}
            </dl>
            <TextLink href="/ozellikler/ekip-ve-iletisim" className="mt-6">
              Ekip ve iletişim
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Cell({ value }: { value: string }) {
  if (!value) {
    return (
      <span className="inline-flex h-[22px] items-center">
        <span aria-hidden className="h-px w-3 bg-ink-300" />
        <span className="sr-only">Erişim yok</span>
      </span>
    );
  }
  const granted = ACTIONS.filter((a) => value.includes(a.k));
  return (
    <>
      <span aria-hidden className="inline-flex gap-[3px]">
        {ACTIONS.map((a) => {
          const on = value.includes(a.k);
          return (
            <span
              key={a.k}
              className={cn(
                "grid size-[22px] place-items-center font-mono text-[0.6875rem] font-medium",
                on ? "bg-ink-950 text-white" : "border border-dashed border-line-strong text-ink-300"
              )}
            >
              {a.k}
            </span>
          );
        })}
      </span>
      <span className="sr-only">{granted.map((a) => a.label).join(", ")}</span>
    </>
  );
}
