import { ProgressPaymentMockup, WorkPlanMockup } from "@/components/mockups";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const STEPS = [
  { title: "Saha", body: "Konum, durum, açılış tarihi ve sorumlular." },
  { title: "Keşif", body: "Poz numaralı kalemler, miktar ve birim fiyat." },
  { title: "İş programı", body: "Tarihli iş kalemleri ve ilerleme yüzdesi." },
  { title: "Hakediş", body: "Sözleşmeye bağlı hakedişler ve faturalar." },
];

/**
 * Akış bölümü: Saha, keşif, iş programı, hakediş. Üstte süreç şeridi,
 * altında iki alternatif yerleşimli anlatım (iş programı, hakediş) ve ilgili ürün görselleri.
 */
export function FlowSection() {
  return (
    <section aria-labelledby="flow-title" className="border-b border-line bg-white py-20 sm:py-28">
      <Container size="wide">
        <SectionHeader
          eyebrow="Proje akışı"
          title={<span id="flow-title">Keşif, iş programı ve hakediş aynı sahanın içinde tutulur.</span>}
          lede="Ayrı dosyalar arasında rakam taşımazsınız. Biri güncellendiğinde ofisteki ve şantiyedeki herkes aynı rakamı görür."
        />

        {/* Süreç şeridi */}
        <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative bg-white p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-ink-950">{s.title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-600">{s.body}</p>
              {i < STEPS.length - 1 && (
                <span aria-hidden className="absolute -right-[7px] top-1/2 z-10 hidden size-3.5 -translate-y-1/2 rotate-45 border-r border-t border-line bg-white lg:block" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-28">
          <Row
            title="Keşif ve iş programı aynı ekranda."
            body="Keşif kalemlerini ve iş planını Excel'den, iş planını ayrıca Primavera P6 dosyasından içe aktarabilirsiniz. Günlük saha raporu o gün yapılacak işleri iş planından alır."
            points={["Poz no, miktar, birim fiyat ve para birimi", "Tablo ve Gantt görünümü", "Kalem bazında malzeme durumu"]}
            href="/ozellikler/kesif-ve-is-programi"
            linkText="Keşif ve iş programı"
            visual={<WorkPlanMockup />}
          />
          <Row
            flip
            title="Hakedişler sözleşmeye, faturalar hakedişe bağlanır."
            body="Sözleşmenin ne kadarının hakedişe dönüştüğünü ve ne kadarının ödendiğini ayrıca hesaplamanız gerekmez. Farklı para birimleri kur çevrimi yapılmadan ayrı toplanır."
            points={["Sözleşme ve hakediş durumları ayrı izlenir", "Faturada KDV oranı ve KDV hariç tutar"]}
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
  title,
  body,
  points,
  href,
  linkText,
  visual,
  flip,
}: {
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
        <h3 className="text-balance text-[1.625rem] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-950 sm:text-[2rem]">{title}</h3>
        <p className="mt-4 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">{body}</p>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {points.map((p) => (
            <li key={p} className="flex gap-3 py-2.5 text-[0.9375rem] text-ink-800">
              <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 bg-ink-400" />
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
