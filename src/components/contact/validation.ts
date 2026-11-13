/**
 * Demo / iletişim formu alanları ve doğrulama kuralları.
 * Hem istemci (contact-form.tsx) hem sunucu (app/api/contact/route.ts) aynı kuralları kullanır.
 */
import { features, type FeatureSlug } from "@/content/features";

export const companyTypes = [
  "İnşaat / taahhüt",
  "Mimarlık ofisi",
  "Mühendislik / MEP",
  "Perakende / mağaza yatırımı",
  "Diğer",
] as const;

export const teamSizes = ["1–10", "11–50", "51–200", "200+"] as const;

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  company: { min: 2, max: 120 },
  phone: { max: 30 },
  message: { max: 2000 },
} as const;

export type ContactInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  companyType: string;
  teamSize: string;
  modules: FeatureSlug[];
  message: string;
  consent: boolean;
  /** Honeypot: insanlar görmez, doluysa bot kabul edilir */
  website: string;
};

export type ContactField = Exclude<keyof ContactInput, "website">;

/** Odaklama ve hata özeti için alan sırası (formdaki görünüm sırası) */
export const FIELD_ORDER: ContactField[] = [
  "name",
  "email",
  "company",
  "phone",
  "companyType",
  "teamSize",
  "modules",
  "message",
  "consent",
];

export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]+$/;
const moduleSlugs = new Set<string>(features.map((f) => f.slug));

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Gelen ham veriyi (JSON / form) güvenli tiplere indirger */
export function normalizeContact(raw: unknown): ContactInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const modules = Array.isArray(r.modules)
    ? Array.from(new Set(r.modules.filter((m): m is FeatureSlug => typeof m === "string" && moduleSlugs.has(m))))
    : [];
  return {
    name: str(r.name),
    email: str(r.email).toLowerCase(),
    company: str(r.company),
    phone: str(r.phone),
    companyType: str(r.companyType),
    teamSize: str(r.teamSize),
    modules,
    message: str(r.message),
    consent: r.consent === true,
    website: str(r.website),
  };
}

export function validateContact(input: ContactInput): ContactErrors {
  const e: ContactErrors = {};

  if (!input.name) e.name = "Ad soyad girin.";
  else if (input.name.length < LIMITS.name.min) e.name = "Ad soyad en az 2 karakter olmalı.";
  else if (input.name.length > LIMITS.name.max) e.name = `Ad soyad en fazla ${LIMITS.name.max} karakter olabilir.`;

  if (!input.email) e.email = "İş e-posta adresinizi girin.";
  else if (input.email.length > LIMITS.email.max || !EMAIL_RE.test(input.email))
    e.email = "Geçerli bir e-posta adresi girin (ör. ad.soyad@firma.com.tr).";

  if (!input.company) e.company = "Firma adını girin.";
  else if (input.company.length < LIMITS.company.min) e.company = "Firma adı en az 2 karakter olmalı.";
  else if (input.company.length > LIMITS.company.max)
    e.company = `Firma adı en fazla ${LIMITS.company.max} karakter olabilir.`;

  if (input.phone) {
    const digits = input.phone.replace(/\D/g, "").length;
    if (input.phone.length > LIMITS.phone.max || !PHONE_RE.test(input.phone) || digits < 7 || digits > 15)
      e.phone = "Geçerli bir telefon numarası girin (ör. 0212 555 01 23) ya da boş bırakın.";
  }

  if (input.companyType && !(companyTypes as readonly string[]).includes(input.companyType))
    e.companyType = "Listeden bir firma tipi seçin.";

  if (input.teamSize && !(teamSizes as readonly string[]).includes(input.teamSize))
    e.teamSize = "Listeden bir ekip büyüklüğü seçin.";

  if (input.message.length > LIMITS.message.max)
    e.message = `Mesaj en fazla ${LIMITS.message.max} karakter olabilir (şu an ${input.message.length}).`;

  if (!input.consent) e.consent = "Devam etmek için Aydınlatma Metni'ni okuduğunuzu onaylayın.";

  return e;
}

export const hasErrors = (e: ContactErrors) => Object.keys(e).length > 0;

const moduleNames = (slugs: FeatureSlug[]) =>
  slugs.map((s) => features.find((f) => f.slug === s)?.name ?? s).join(", ");

/** E-posta gövdesi ve mailto: yedeği için düz metin özet */
export function contactSummaryLines(input: ContactInput): [label: string, value: string][] {
  return [
    ["Ad soyad", input.name],
    ["E-posta", input.email],
    ["Firma", input.company],
    ["Telefon", input.phone || "Belirtilmedi"],
    ["Firma tipi", input.companyType || "Belirtilmedi"],
    ["Ekip büyüklüğü", input.teamSize || "Belirtilmedi"],
    ["İlgilenilen modüller", input.modules.length ? moduleNames(input.modules) : "Belirtilmedi"],
    ["Mesaj", input.message || "Belirtilmedi"],
  ];
}

export function contactPlainText(input: ContactInput) {
  return contactSummaryLines(input)
    .map(([k, v]) => (k === "Mesaj" ? `\n${k}:\n${v}` : `${k}: ${v}`))
    .join("\n");
}
