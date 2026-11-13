import type { Metadata } from "next";
import { ConnectionMatrixSection, FeatureGroupsSection, FeaturesSheetIndex, PlatformSection } from "@/components/features/overview";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Özellikler: Saha, Keşif, Hakediş ve Saha Raporları";
const description =
  "Saha ve harita, keşif ve iş programı, hakediş, saha raporları, talepler, İK, envanter, ekip iletişimi ve yapay zekâ asistanı: Koordine'nin 9 modülünü inceleyin.";
const path = "/ozellikler";

export const metadata: Metadata = pageMetadata({ title, description, path });

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ name: title, description, path })} />

      <PageHero
        crumbs={[{ name: "Özellikler", path }]}
        eyebrow="Özellikler"
        index="00"
        title="Sahanın her işi için bir modül, hepsi aynı kayıtta."
        lede="Haritadaki pin, keşif kalemi, günlük rapor, hakediş dönemi, puantaj hücresi ve zimmet kaydı aynı sahaya bağlıdır. Dokuz modül bu kayıtları farklı ekiplerin işine göre gösterir."
        aside={<FeaturesSheetIndex />}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/iletisim#demo" size="lg" arrow>
            Demo talep et
          </ButtonLink>
          <ButtonLink href="#matris" variant="secondary" size="lg">
            Bağlantıları görün
          </ButtonLink>
        </div>
      </PageHero>

      <FeatureGroupsSection index="01" />
      <PlatformSection index="02" />
      <ConnectionMatrixSection index="03" />

      <CtaBand
        title="Hangi modülle başlayacağınızı birlikte seçelim."
        lede="30 dakikalık görüşmede bugünkü iş akışınızı dinleyelim; Koordine'yi ihtiyacınız olan modüllerle, kendi saha tiplerinize yakın bir örnek üzerinden gösterelim."
      />
    </>
  );
}
