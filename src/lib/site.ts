/**
 * Site genelindeki sabit bilgiler. Firma bilgileri (unvan, adres, MERSİS vb.)
 * netleşince yalnızca burası güncellenir; yasal metinler ve JSON-LD buradan okur.
 */

type CompanyField =
  | "legalName"
  | "address"
  | "city"
  | "country"
  | "phone"
  | "mersis"
  | "taxOffice"
  | "taxNumber"
  | "kepAddress";

const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const site = {
  name: "Koordine",
  url: trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? "https://koordine.com.tr"),
  appUrl: trimSlash(process.env.NEXT_PUBLIC_APP_URL ?? "https://app.koordine.com.tr"),
  locale: "tr_TR",
  language: "tr",
  tagline: "Saha, proje ve şantiye yönetimi tek platformda",
  description:
    "Koordine; mühendislik, mimarlık ve taahhüt firmaları için saha takibi, keşif, iş programı, hakediş, saha raporları ve ekip yönetimini tek platformda birleştirir.",
  email: {
    support: "destek@koordine.com.tr",
  },
  /** Firma tarafından doldurulacak. Boş alanlar sitede ve şemada gösterilmez. */
  company: <Record<CompanyField, string>>{
    legalName: "",
    address: "",
    city: "İstanbul",
    country: "TR",
    phone: "",
    mersis: "",
    taxOffice: "",
    taxNumber: "",
    kepAddress: "",
  },
  social: <Record<"linkedin" | "instagram" | "x" | "youtube", string>>{
    linkedin: "",
    instagram: "",
    x: "",
    youtube: "",
  },
} as const;

export const appLinks = {
  login: `${site.appUrl}/login`,
  register: `${site.appUrl}/register`,
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.url}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
}

export const sameAs = Object.values(site.social).filter(Boolean);
