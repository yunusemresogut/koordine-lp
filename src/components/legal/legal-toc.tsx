"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Yasal sayfaların içindekiler listesi; okunan bölümü işaretler. */
export function LegalToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="İçindekiler">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-500">İçindekiler</p>
      <ol className="mt-4 border-l border-line">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px grid grid-cols-[1.5rem_1fr] border-l py-1.5 pl-4 text-[0.875rem] leading-snug transition-colors duration-150",
                  isActive ? "border-brand-600 text-ink-950" : "border-transparent text-ink-600 hover:border-ink-400 hover:text-ink-950"
                )}
              >
                <span className="font-mono text-[0.6875rem] leading-[1.6] tabular-nums text-ink-400">{i + 1}.</span>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
