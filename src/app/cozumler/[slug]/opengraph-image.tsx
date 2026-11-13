import { notFound } from "next/navigation";
import { solutionDetailBySlug } from "@/content/solution-details";
import { solutions } from "@/content/solutions";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine çözümleri";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutionDetailBySlug(slug);
  if (!solution) notFound();

  return renderOg({
    eyebrow: "Çözümler",
    title: solution.name,
    subtitle: solution.summary,
    code: `ÇZM-${solution.detail.code}`,
  });
}
