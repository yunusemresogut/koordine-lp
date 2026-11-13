"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Yatay, erişilebilir sekme listesi (WAI-ARIA tabs, otomatik etkinleştirme).
 * Ok tuşları, Home ve End ile gezinilir. Paneller sunucuda üretilir; bu bileşen yalnızca
 * görünürlüğü yönetir. Dar ekranda sekme şeridi kendi içinde yatay kayar (sayfa kaymaz).
 */
export function ScreenTabs({
  label,
  tabs,
  panels,
}: {
  label: string;
  tabs: { code: string; label: string }[];
  panels: React.ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  const focusTab = (i: number) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    refs.current[n]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 };
    if (e.key in map) {
      e.preventDefault();
      focusTab(map[e.key]);
    }
  };

  return (
    <div>
      <div className="relative border-b border-line-strong">
        <div role="tablist" aria-label={label} className="-mb-px flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t, i) => {
            const selected = i === active;
            return (
              <button
                key={t.code + t.label}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${base}-panel-${i}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex shrink-0 items-baseline gap-2.5 border-b-2 px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-offset-[-2px] sm:px-5",
                  selected ? "border-brand-600 bg-white text-ink-950" : "border-transparent text-ink-500 hover:text-ink-950"
                )}
              >
                <span className={cn("font-mono text-[0.6875rem] tracking-[0.1em]", selected ? "text-brand-700" : "text-ink-400")}>{t.code}</span>
                <span className="whitespace-nowrap text-[0.9375rem] font-medium">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {panels.map((p, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${base}-panel-${i}`}
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          tabIndex={0}
          className="pt-10 focus-visible:outline-offset-4"
        >
          {p}
        </div>
      ))}
    </div>
  );
}
