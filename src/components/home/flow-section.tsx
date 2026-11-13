import { ProgressPaymentMockup, WorkPlanMockup } from "@/components/mockups";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const STEPS = [
  { code: "SAH", title: "Saha", body: "Konum, durum, açılış tarihi, yüklenici ve şantiye şefi." },
  { code: "KSF", title: "Keşif", body: "Poz numaralı kalemler, miktar, birim fiyat, malzeme durumu." },
  { code: "İŞP", title: "İş programı", body: "Tarihli iş kalemleri, öncül görevler, ilerleme yüzdesi." },
  { code: "HKD", title: "Hakediş", body: "Sözleşmeye bağlı dönemler ve hakedişe bağlı faturalar." },
];

/**
 * Akış bölümü: Saha → Keşif → İş programı → Hakediş. Üstte ölçü çizgisi tarzı süreç şeridi,
 * altında iki alternatif yerleşimli anlatım (iş programı, hakediş) ve ilgili ürün görselleri.
 */
export function FlowSection() {
  return (
    <section aria-labelledby="flow-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          index="03"
          eyebrow="Akış"
          title={<span id="flow-title">Keşiften hakedişe, aynı sahanın kayıtları.</span>}
          lede="Bir sahanın keşfi, iş programı ve hakedişi ayrı dosyalarda değil, aynı kaydın sekmelerinde durur. Biri güncellendiğinde diğerini açan herkes aynı rakamı görür."
        />

        {/* Süreç şeridi */}
        <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.code} className="relative bg-white p-5 sm:p-6">
              <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                <span className="text-brand-700">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-line-strong" />
                <span className="text-ink-500">{s.code}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink-950">{s.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{s.body}</p>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="absolute -right-[7px] top-1/2 z-10 hidden size-3.5 -translate-y-1/2 rotate-45 border-r border-t border-line bg-white lg:block" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-28">
          <Row
            code="KSF"
            title="Keşif ve iş programı yan yana."
            body="Keşif kalemlerini Excel şablonundan, iş planını Excel'den ya da Primavera P6 .xer dosyasından içe aktarın. Kalemlerin malzeme durumu, iş kalemlerinin ilerlemesi ve bugünün çizgisi aynı ekranda; günlük saha raporu o güne denk gelen işleri buradan alır."
            points={["Poz no, miktar, birim, birim fiyat, para birimi", "Tablo ve Gantt görünümü, öncül görevler", "Seçili kalemlerden yüzdelik kalem ekleme"]}
            href="/ozellikler/kesif-ve-is-programi"
            linkText="Keşif ve iş programı"
            visual={<WorkPlanMockup />}
          />
          <Row
            flip
            code="HKD"
            title="Sözleşme, hakediş ve fatura birbirine bağlı."
            body="Hakediş bir sözleşmeye, fatura bir hakedişe bağlanır. Sözleşme ilerlemesi, toplam hakediş ve ödenen tutar ayrıca hesaplanmadan görünür. Farklı para birimleri kur çevrimi yapılmadan, kendi toplamlarıyla izlenir."
            points={["SZ kodlu sözleşmeler; taslak, aktif, fesih, tamamlandı", "Hakediş: taslak, gönderildi, onaylandı, ödendi", "Faturada KDV oranı ve KDV hariç tutar"]}
            href="/ozellikler/hakedis-ve-finans"
            linkText="Hakediş ve finans"
            visual={<ProgressPaymentMockup />}
          />
        </div>
      </Container>
    </section>
  );
}

function Row({
  code,
  title,
  body,
  points,
  href,
  linkText,
  visual,
  flip,
}: {
  code: string;
  title: string;
  body: string;
  points: string[];
  href: string;
  linkText: string;
  visual: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      <div className={cn("lg:col-span-5", flip && "lg:order-2 lg:col-start-8")}>
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">{code}</p>
        <h3 className="mt-3 text-balance text-[1.625rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-950 sm:text-[2rem]">{title}</h3>
        <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">{body}</p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {points.map((p) => (
            <li key={p} className="flex gap-3 py-2.5 text-[0.9375rem] text-ink-800">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-400" />
              {p}
            </li>
          ))}
        </ul>
        <TextLink href={href} className="mt-6">
          {linkText}
        </TextLink>
      </div>
      <div className={cn("relative lg:col-span-7", flip && "lg:order-1 lg:col-start-1 lg:row-start-1")}>
        <div aria-hidden className="bg-dots absolute -inset-4 -z-0 hidden sm:block" />
        <div className="relative">{visual}</div>
      </div>
    </div>
  );
}
