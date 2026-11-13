import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CapabilitiesSection } from "@/components/features/capabilities-section";
import { ConnectionsSection } from "@/components/features/connections-section";
import { HeroVisual } from "@/components/features/hero-visual";
import { ModulePager } from "@/components/features/module-pager";
import { ModuleSheet } from "@/components/features/module-sheet";
import { ScreensSection } from "@/components/features/screens-section";
import { SolutionsSection } from "@/components/features/solutions-section";
import { SpecialSection } from "@/components/features/special-section";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/solutions/faq-section";
import { ButtonLink } from "@/components/ui/button";
import { featureDetailBySlug, featuresWithDetails } from "@/content/feature-details";
import { features } from "@/content/features";
import { pageMetadata, webPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feature = featureDetailBySlug(slug);
  if (!feature) return {};
  return pageMetadata({
    title: feature.seoTitle,
    description: feature.seoDescription,
    path: `/ozellikler/${feature.slug}`,
  });
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const feature = featureDetailBySlug(slug);
  if (!feature) notFound();

  const { detail } = feature;
  const path = `/ozellikler/${feature.slug}`;

  return (
    <>
      {/* FaqSection kendi FAQPage şemasını basar */}
      <JsonLd data={webPageSchema({ name: feature.seoTitle, description: feature.seoDescription, path })} />

      <PageHero
        crumbs={[
          { name: "Özellikler", path: "/ozellikler" },
          { name: feature.name, path },
        ]}
        eyebrow={feature.name}
        index={feature.code}
        title={detail.hero.title}
        lede={detail.hero.lede}
        aside={<ModuleSheet feature={feature} total={featuresWithDetails.length} />}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/iletisim#demo" size="lg" arrow>
            Demo talep et
          </ButtonLink>
          <ButtonLink href={detail.hero.secondary.href} variant="secondary" size="lg">
            {detail.hero.secondary.label}
          </ButtonLink>
        </div>
      </PageHero>

      <HeroVisual feature={feature} />
      <CapabilitiesSection index="01" feature={feature} />
      <ScreensSection index="02" feature={feature} />
      <SpecialSection index="03" feature={feature} />
      <ConnectionsSection index="04" feature={feature} />
      <SolutionsSection index="05" feature={feature} />
      <FaqSection index="06" faqs={detail.faqs} />
      <ModulePager feature={feature} />

      <CtaBand title={detail.cta.title} lede={detail.cta.lede} />
    </>
  );
}
