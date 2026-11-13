import { notFound } from "next/navigation";
import { featureBySlug, features } from "@/content/features";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine özellikleri";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = featureBySlug(slug);
  if (!feature) notFound();

  return renderOg({
    eyebrow: "Özellikler",
    title: feature.name,
    subtitle: feature.summary,
  });
}
