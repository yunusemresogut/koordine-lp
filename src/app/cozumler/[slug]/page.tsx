import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { ApproachSection } from "@/components/solutions/approach-section";
import { FaqSection } from "@/components/solutions/faq-section";
import { RealitiesSection } from "@/components/solutions/realities-section";
import { RelatedSection } from "@/components/solutions/related-section";
import { RolesTable } from "@/components/solutions/roles-table";
import { SheetAside } from "@/components/solutions/sheet-aside";
import { WorkflowDiagram } from "@/components/solutions/workflow-diagram";
import { ButtonLink } from "@/components/ui/button";
import { solutionDetailBySlug } from "@/content/solution-details";
import { solutions } from "@/content/solutions";
import { pageMetadata, webPageSchema } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionDetailBySlug(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.seoTitle,
    description: solution.seoDescription,
    path: `/cozumler/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = solutionDetailBySlug(slug);
  if (!solution) notFound();

  const { detail } = solution;
  const path = `/cozumler/${solution.slug}`;

  return (
    <>
      <JsonLd data={webPageSchema({ name: solution.seoTitle, description: solution.seoDescription, path })} />

      <PageHero
        crumbs={[
          { name: "Çözümler", path: "/cozumler" },
          { name: solution.name, path },
        ]}
        eyebrow={solution.name}
        title={detail.hero.title}
        lede={detail.hero.lede}
        aside={<SheetAside solution={solution} />}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/iletisim#demo" size="lg" arrow>
            Demo talep et
          </ButtonLink>
          <ButtonLink href="#is-akisi" variant="secondary" size="lg">
            İş akışını görün
          </ButtonLink>
        </div>
      </PageHero>

      <RealitiesSection realities={detail.realities} />
      <ApproachSection approach={detail.approach} />
      <WorkflowDiagram name={solution.name} workflow={detail.workflow} />
      <RolesTable roles={detail.roles} />
      <RelatedSection solution={solution} />
      <FaqSection faqs={detail.faqs} />

      <CtaBand title={detail.cta.title} lede={detail.cta.lede} />
    </>
  );
}
