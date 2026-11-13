import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Üretim dışı ortamlar (Vercel preview vb.) tamamen kapatılır; yalnızca ana alan adı indekslenir.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
