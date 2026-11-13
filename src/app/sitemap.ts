import type { MetadataRoute } from "next";
import { features } from "@/content/features";
import { solutions } from "@/content/solutions";
import { absoluteUrl } from "@/lib/site";

/**
 * Site haritası. Modül ve çözüm sayfaları içerik kayıtlarından otomatik eklenir.
 * lastModified: içerik değiştiğinde CONTENT_UPDATED güncellenir (her derlemede
 * değişen tarih, arama motorlarına yanlış "güncellendi" sinyali verir).
 */
const CONTENT_UPDATED = new Date("2026-11-11");

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

const staticPages: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/ozellikler", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cozumler", priority: 0.8, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.8, changeFrequency: "yearly" },
  { path: "/hakkimizda", priority: 0.6, changeFrequency: "yearly" },
  { path: "/sss", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kvkk", priority: 0.2, changeFrequency: "yearly" },
  { path: "/gizlilik", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cerez-politikasi", priority: 0.2, changeFrequency: "yearly" },
  { path: "/kullanim-kosullari", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...staticPages,
    ...features.map((f) => ({ path: `/ozellikler/${f.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...solutions.map((s) => ({ path: `/cozumler/${s.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  return entries.map((e) => ({
    url: absoluteUrl(e.path),
    lastModified: CONTENT_UPDATED,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
