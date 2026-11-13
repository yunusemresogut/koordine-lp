import { HrMockup, InventoryMockup, TicketMockup } from "@/components/mockups";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-header";

/**
 * Günlük operasyon: talepler ve disiplin onayları (geniş satır), altında İK ve envanter yan yana.
 * Mozaik yerleşim; her parçanın kendi bağlantısı var.
 */
export function OperationsSection() {
  return (
    <section aria-labelledby="ops-title" className="border-b border-line py-20 sm:py-28">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Eyebrow className="mb-5">
              Günlük operasyon
            </Eyebrow>
            <h2 id="ops-title" className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink-950 sm:text-[2.625rem]">
              Talepler, puantaj ve ekipman takibi.
            </h2>
            <p className="mt-5 text-pretty text-[1.0625rem] leading-relaxed text-ink-600">
              Bir talebin kimde olduğunu, onayın nerede beklediğini ya da kırıcının hangi şantiyede olduğunu telefon
              açmadan görürsünüz.
            </p>

            <div className="mt-8 border-t border-ink-950 pt-5">
              <h3 className="text-xl font-semibold text-ink-950">Talepler ve disiplin onayları</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-600">
                Talepler öncelik ve sorumluyla açılır. Size atanan ve yüksek öncelikli talepler bildirim olarak gelir.
                Henüz açılmamış sahalarda mimari, mekanik ve elektrik onaylarını ilgili disiplin verir.
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
            title="Puantaj ve personel belgeleri"
            body="Günlük rapordaki yoklama puantaja işlenir. Süresi yaklaşan sertifika ve muayeneler için bildirim gelir."
            href="/ozellikler/insan-kaynaklari"
            link="İnsan kaynakları"
          >
            <HrMockup />
          </Tile>
          <Tile
            title="Envanter ve zimmet"
            body="Her demirbaşın kime ve hangi şantiye için zimmetlendiğini, teslim tarihini ve araç belgelerinin bitişini görürsünüz."
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
  title,
  body,
  href,
  link,
  children,
}: {
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
          <h3 className="text-xl font-semibold text-ink-950">{title}</h3>
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
