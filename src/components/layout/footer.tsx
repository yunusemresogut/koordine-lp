import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { CRANE_JIB_BOTTOM_PX, FooterCrane, FooterCraneHook } from "./footer-crane";
import { features } from "@/content/features";
import { companyNav, legalNav } from "@/content/navigation";
import { solutions } from "@/content/solutions";
import { appLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const c = site.company;

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="bg-grid-dark mask-fade-b pointer-events-none absolute inset-0" />
      <Container size="wide" className="relative">
        {/* Kule vinç çizimi (kanca Çözümler sütununda). Kaldırmak için bu iki satırı silin */}
        <FooterCrane className="absolute -right-3 top-0 hidden text-white/[0.16] lg:block" />
        <div className="grid gap-12 border-b border-line-dark py-16 lg:grid-cols-12 lg:pt-40">
          <div className="lg:col-span-4">
            <Logo tone="dark" className="h-7" />
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-300">
              Mühendislik, mimarlık ve taahhüt firmaları için saha, proje ve şantiye yönetimi platformu.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Destek</dt>
                <dd className="mt-1">
                  <a href={`mailto:${site.email.support}`} className="text-white hover:text-brand-300">
                    {site.email.support}
                  </a>
                </dd>
              </div>
              {c.phone && (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Telefon</dt>
                  <dd className="mt-1">
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="text-white hover:text-brand-300">
                      {c.phone}
                    </a>
                  </dd>
                </div>
              )}
              {c.address && (
                <div>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Adres</dt>
                  <dd className="mt-1 text-ink-300">{c.address}</dd>
                </div>
              )}
            </dl>
          </div>

          <FooterColumn
            className="lg:col-span-3"
            title="Özellikler"
            links={features.map((f) => ({ href: `/ozellikler/${f.slug}`, label: f.name }))}
          />
          <FooterColumn
            className="relative lg:col-span-3"
            title="Çözümler"
            links={solutions.map((s) => ({ href: `/cozumler/${s.slug}`, label: s.name }))}
          >
            {/* Kanca, Özellikler ile Çözümler arasındaki boşluğa sarkar (sütun üstü = lg:pt-40 = 160px) */}
            <FooterCraneHook
              className="absolute -left-6 hidden -translate-x-1/2 text-white/[0.16] lg:block"
              style={{ top: CRANE_JIB_BOTTOM_PX - 160 }}
            />
          </FooterColumn>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
            <FooterColumn title="Kurumsal" links={companyNav} />
            <FooterColumn title="Hesap" links={[{ href: appLinks.login, label: "Giriş yap", external: true }]} />
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 text-[0.8125rem] lg:flex-row lg:items-center lg:justify-between">
          <p className="text-ink-500">
            © {year} {c.legalName || site.name}. Tüm hakları saklıdır.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-400 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
  children,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      {children}
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">{title}</p>
      <ul className="mt-5 space-y-3 text-[0.9375rem]">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} className="text-ink-200 transition-colors hover:text-white">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="text-ink-200 transition-colors hover:text-white">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
