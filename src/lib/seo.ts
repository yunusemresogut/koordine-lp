import type { Metadata } from "next";
import { absoluteUrl, sameAs, site } from "./site";

type PageSeo = {
  /** Sayfa başlığı; marka eki kök layout'taki şablondan eklenir */
  title: string;
  description: string;
  /** "/" ile başlayan yol, canonical için */
  path: string;
  /** Başlık şablonunu atlamak için (ana sayfa) */
  absoluteTitle?: boolean;
  /** Arama motorlarına kapalı sayfalar */
  noindex?: boolean;
  ogType?: "website" | "article";
  /** Segmentte opengraph-image yoksa kök görseli kullan */
  defaultOgImage?: boolean;
};

/**
 * Sayfa metadata'sı: canonical, OpenGraph ve Twitter alanlarını tek yerden üretir.
 * OG görseli, ilgili segmentteki opengraph-image dosyasından Next tarafından eklenir.
 */
export function pageMetadata({ title, description, path, absoluteTitle, noindex, ogType = "website", defaultOgImage }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      // Yalnızca kendi opengraph-image dosyası olmayan sayfalar için (aksi halde dosyayı ezer)
      ...(defaultOgImage
        ? { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

/* ---------------- JSON-LD ---------------- */

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  const c = site.company;
  const address = c.address
    ? {
        "@type": "PostalAddress",
        streetAddress: c.address,
        addressLocality: c.city,
        addressCountry: c.country,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    ...(c.legalName ? { legalName: c.legalName } : {}),
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/koordine-logo.png"),
      width: 1983,
      height: 793,
    },
    email: site.email.support,
    ...(address ? { address } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.email.support,
        availableLanguage: ["Turkish", "English"],
        areaServed: "TR",
        ...(c.phone ? { telephone: c.phone } : {}),
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "tr-TR",
    publisher: { "@id": orgId },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    url: site.url,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Construction project management",
    operatingSystem: "Web",
    inLanguage: ["tr-TR", "en"],
    description: site.description,
    publisher: { "@id": orgId },
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/iletisim"),
      availability: "https://schema.org/InStock",
      description: "Firmanıza özel teklif için iletişime geçin.",
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

export function webPageSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
  };
}
