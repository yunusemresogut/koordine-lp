"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureIcon } from "@/components/ui/feature-icon";
import { features } from "@/content/features";
import { mainNav } from "@/content/navigation";
import { appLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

type MenuKey = "features" | "solutions" | null;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sayfa değişince menüleri kapat
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = useCallback((key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(key);
  }, []);
  const hoverClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        // backdrop-filter kullanılmaz: fixed konumlu mobil menünün kapsayıcısını bozar
        "sticky top-0 z-50 h-[var(--header-h)] border-b bg-paper transition-colors duration-200",
        scrolled || open || mobileOpen ? "border-line" : "border-transparent"
      )}
    >
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-sm focus:bg-ink-950 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        İçeriğe geç
      </a>
      <Container size="wide" className="flex h-full items-center justify-between gap-6">
        <Link href="/" className="-m-1 shrink-0 p-1" aria-label="Koordine ana sayfa">
          <Logo priority className="h-[26px]" />
        </Link>

        {/* Masaüstü */}
        <div ref={navRef} className="hidden flex-1 items-center justify-between lg:flex" onMouseLeave={hoverClose}>
          <nav aria-label="Ana menü" className="ml-8 flex items-center gap-1">
            <MenuTrigger
              label={mainNav.features.label}
              active={isActive("/ozellikler")}
              expanded={open === "features"}
              onToggle={() => setOpen(open === "features" ? null : "features")}
              onHover={() => hoverOpen("features")}
              controls="menu-features"
            />
            <MenuTrigger
              label={mainNav.solutions.label}
              active={isActive("/cozumler")}
              expanded={open === "solutions"}
              onToggle={() => setOpen(open === "solutions" ? null : "solutions")}
              onHover={() => hoverOpen("solutions")}
              controls="menu-solutions"
            />
            {mainNav.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => hoverOpen(null)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "rounded-sm px-3 py-2 text-[0.9375rem] transition-colors",
                  isActive(l.href) ? "text-ink-950" : "text-ink-600 hover:text-ink-950"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={appLinks.login} className={buttonClasses({ variant: "ghost", size: "sm" })}>
              Giriş yap
            </a>
            <Link href="/iletisim#demo" className={buttonClasses({ variant: "primary", size: "sm" })}>
              Demo talep et
            </Link>
          </div>

          {/* Açılır paneller */}
          <div
            onMouseEnter={() => open && hoverOpen(open)}
            className={cn(
              "absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_24px_48px_-32px_rgba(4,12,38,0.35)] transition-[opacity,transform] duration-200",
              open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
            )}
          >
            <Container size="wide">
              {open === "features" && <FeaturesPanel />}
              {open === "solutions" && <SolutionsPanel />}
            </Container>
          </div>
        </div>

        {/* Mobil */}
        <button
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-sm text-ink-950 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span aria-hidden className="relative block h-3 w-5">
            <span
              className={cn(
                "absolute left-0 h-px w-5 bg-current transition-transform duration-200",
                mobileOpen ? "top-1.5 rotate-45" : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-5 bg-current transition-transform duration-200",
                mobileOpen ? "top-1.5 -rotate-45" : "top-3"
              )}
            />
          </span>
        </button>
      </Container>

      <MobileMenu open={mobileOpen} isActive={isActive} />
    </header>
  );
}

function MenuTrigger({
  label,
  active,
  expanded,
  onToggle,
  onHover,
  controls,
}: {
  label: string;
  active: boolean;
  expanded: boolean;
  onToggle: () => void;
  onHover: () => void;
  controls: string;
}) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onToggle}
      onMouseEnter={onHover}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.9375rem] transition-colors",
        active || expanded ? "text-ink-950" : "text-ink-600 hover:text-ink-950"
      )}
    >
      {label}
      <svg aria-hidden viewBox="0 0 10 6" className={cn("w-2.5 transition-transform", expanded && "rotate-180")}>
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    </button>
  );
}

function FeaturesPanel() {
  return (
    <div id="menu-features" className="grid grid-cols-12 gap-10 py-8">
      <div className="col-span-3 border-r border-line pr-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Platform</p>
        <p className="mt-3 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink-950">
          Sahadan finansa, tek kayıt üzerinde çalışan dokuz modül.
        </p>
        <Link
          href="/ozellikler"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          Tüm özelliklere bakın <span aria-hidden>→</span>
        </Link>
      </div>
      <ul className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-1">
        {features.map((f) => (
          <li key={f.slug}>
            <Link
              href={`/ozellikler/${f.slug}`}
              className="group flex gap-3 rounded-sm p-3 transition-colors hover:bg-paper"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-sm border border-line bg-white text-ink-700 transition-colors group-hover:border-brand-300 group-hover:text-brand-700">
                <FeatureIcon name={f.icon} className="size-4" />
              </span>
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink-950">{f.name}</span>
                <span className="mt-0.5 line-clamp-2 block text-[0.8125rem] leading-snug text-ink-500">{f.summary}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SolutionsPanel() {
  return (
    <div id="menu-solutions" className="grid grid-cols-12 gap-10 py-8">
      <div className="col-span-3 border-r border-line pr-8">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">Kimler için</p>
        <p className="mt-3 text-lg font-semibold leading-snug tracking-[-0.01em] text-ink-950">
          Sahada iş yapan her disiplin için aynı düzen.
        </p>
      </div>
      <ul className="col-span-9 grid grid-cols-2 gap-x-6 gap-y-1">
        {mainNav.solutions.items.map((s, i) => (
          <li key={s.href}>
            <Link href={s.href} className="group flex gap-4 rounded-sm p-3 transition-colors hover:bg-paper">
              <span className="mt-0.5 font-mono text-xs text-ink-400 group-hover:text-brand-700">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block text-[0.9375rem] font-medium text-ink-950">{s.label}</span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-500">{s.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMenu({ open, isActive }: { open: boolean; isActive: (href: string) => boolean }) {
  const id = useId();
  return (
    <div
      id="mobile-menu"
      hidden={!open}
      className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto border-t border-line bg-paper lg:hidden"
    >
      <Container className="flex min-h-full flex-col py-6">
        <nav aria-label="Mobil menü" className="flex-1">
          <MobileGroup id={`${id}-f`} title="Özellikler" href="/ozellikler" items={mainNav.features.items} />
          <MobileGroup id={`${id}-s`} title="Çözümler" href="/cozumler" items={mainNav.solutions.items} />
          <ul className="mt-2">
            {mainNav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 text-lg text-ink-950"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 grid gap-3 pb-[env(safe-area-inset-bottom)]">
          <Link href="/iletisim#demo" className={buttonClasses({ variant: "primary", size: "lg" })}>
            Demo talep et
          </Link>
          <a href={appLinks.login} className={buttonClasses({ variant: "secondary", size: "lg" })}>
            Giriş yap
          </a>
        </div>
      </Container>
    </div>
  );
}

function MobileGroup({
  id,
  title,
  href,
  items,
}: {
  id: string;
  title: string;
  href: string;
  items: { href: string; label: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-lg text-ink-950"
      >
        {title}
        <span aria-hidden className="font-mono text-ink-400">
          {expanded ? "−" : "+"}
        </span>
      </button>
      <ul id={id} hidden={!expanded} className="pb-4">
        <li>
          <Link href={href} className="block py-2 text-[0.9375rem] font-medium text-brand-700">
            Tümüne bakın →
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="block py-2 text-[0.9375rem] text-ink-600">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
