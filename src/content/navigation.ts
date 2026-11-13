import { features } from "./features";
import { solutions } from "./solutions";

export type NavLink = { href: string; label: string; description?: string };

export const mainNav = {
  features: {
    label: "Özellikler",
    href: "/ozellikler",
    items: features.map((f) => ({ href: `/ozellikler/${f.slug}`, label: f.name, description: f.summary })),
  },
  solutions: {
    label: "Çözümler",
    href: "/cozumler",
    items: solutions.map((s) => ({ href: `/cozumler/${s.slug}`, label: s.name, description: s.summary })),
  },
  links: [
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/sss", label: "SSS" },
    { href: "/iletisim", label: "İletişim" },
  ] satisfies NavLink[],
};

export const legalNav: NavLink[] = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
];

export const companyNav: NavLink[] = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/iletisim#demo", label: "Demo Talebi" },
];
