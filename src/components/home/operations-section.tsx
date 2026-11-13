import { HrMockup, InventoryMockup, TicketMockup } from "@/components/mockups";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";

/**
 * Günlük operasyon: talepler ve disiplin onayları (geniş satır), altında İK ve envanter yan yana.
 * Mozaik yerleşim; her parçanın kendi modül kodu ve bağlantısı var.
 */
export function OperationsSection() {
  return (
    <section aria-labelledby="ops-title" className="border-b border-line py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Eyebrow index="05" className="mb-5">
              Günlük operasyon
            </Eyebrow>
            <h2 id="ops-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Sahanın gündelik işleri de aynı yerde.
            </h2>
            <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              Tadilat talepleri, disiplin onayları, puantaj, belgeler ve ekipman: sahadaki gündelik işler de aynı kayıtta
              ilerler. Talep kimde, onay nerede bekliyor, kırıcı hangi şantiyede; sormadan görürsünüz.
            </p>

            <div className="mt-8 border-t border-ink-950 pt-5">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">TLP</p>
              <h3 className="mt-2 text-xl font-semibold text-ink-950">Talepler ve disiplin onayları</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                Her talep TT kodu, öncelik ve sorumluyla açılır; size atanan ve yüksek öncelikli talepler bildirim olarak
                gelir. Açılmamış sahalarda mimari, mekanik ve elektrik onayını ilgili disiplin verir; açılışı en yakın olan
                üstte durur.
              </p>
              <TextLink href="/ozellikler/talepler-ve-onaylar" className="mt-4">
                Talepler ve onaylar
              </TextLink>
            </div>
          </div>
          <div className="lg:col-span-8">
            <TicketMockup />
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <Tile
            code="İK"
            title="Puantaj ve personel belgeleri"
            body="Günlük saha raporundaki yoklama puantaja işlenir. Sertifika ve muayene bitişleri izlenir; süresi yaklaşan belge için bildirim gider."
            href="/ozellikler/insan-kaynaklari"
            link="İnsan kaynakları"
          >
            <HrMockup />
          </Tile>
          <Tile
            code="ENV"
            title="Envanter ve zimmet"
            body="Her demirbaş numarasıyla kayıtlıdır. Kime, hangi şantiye için zimmetlendiği, planlanan teslim tarihi ve araç belgelerinin bitişi tek listede."
            href="/ozellikler/envanter-ve-zimmet"
            link="Envanter ve zimmet"
          >
            <InventoryMockup />
          </Tile>
        </div>
      </Container>
    </section>
  );
}

function Tile({
  code,
  title,
  body,
  href,
  link,
  children,
}: {
  code: string;
  title: string;
  body: string;
  href: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-6 grid gap-x-6 gap-y-2 border-t border-ink-950 pt-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-brand-700">{code}</p>
          <h3 className="mt-2 text-xl font-semibold text-ink-950">{title}</h3>
        </div>
        <div>
          <p className="text-[0.9375rem] leading-relaxed text-ink-600">{body}</p>
          <TextLink href={href} className="mt-3">
            {link}
          </TextLink>
        </div>
      </div>
      {children}
    </div>
  );
}
