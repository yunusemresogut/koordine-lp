import { AssistantSection } from "@/components/home/assistant-section";
import { ContextSection } from "@/components/home/context-section";
import { FaqSection } from "@/components/home/faq-section";
import { FlowSection } from "@/components/home/flow-section";
import { HomeHero } from "@/components/home/hero";
import { ModulesIndex } from "@/components/home/modules-index";
import { OnboardingSection } from "@/components/home/onboarding-section";
import { OperationsSection } from "@/components/home/operations-section";
import { ReportsSection } from "@/components/home/reports-section";
import { RolesSection } from "@/components/home/roles-section";
import { SolutionsSection } from "@/components/home/solutions-section";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { homeSeo } from "@/content/home";
import { pageMetadata, softwareApplicationSchema, webPageSchema } from "@/lib/seo";

export const metadata = pageMetadata({
  title: homeSeo.title,
  description: homeSeo.description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), webPageSchema({ name: homeSeo.title, description: homeSeo.description, path: "/" })]} />
      <HomeHero />
      <ContextSection />
      <ModulesIndex />
      <FlowSection />
      <ReportsSection />
      <OperationsSection />
      <RolesSection />
      <AssistantSection />
      <SolutionsSection />
      <OnboardingSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}
