"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Erişilebilir dikey sekme listesi (WAI-ARIA tabs, otomatik etkinleştirme).
 * Ok tuşları (yukarı/aşağı, sol/sağ), Home ve End ile gezinilir; yalnızca seçili sekme odak sırasındadır.
 * Paneller sunucuda üretilip `panels` olarak verilir; bu bileşen yalnızca görünürlüğü yönetir.
 */
export function ReportTabs({
  label,
  tabs,
  panels,
}: {
  label: string;
  tabs: { label: string; summary: string }[];
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
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(tabs.length - 1);
        break;
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div role="tablist" aria-label={label} aria-orientation="vertical" className="flex flex-col border-t border-line-dark lg:col-span-4">
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.label}
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
                "group relative block border-b border-line-dark py-4 pl-4 pr-3 text-left transition-colors duration-200 focus-visible:outline-offset-[-2px]",
                selected ? "text-white" : "text-ink-300 hover:text-white"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 transition-colors duration-200",
                  selected ? "bg-brand-400" : "bg-transparent"
                )}
              />
              <span>
                <span className="block text-[1.0625rem] font-medium">{t.label}</span>
                <span className={cn("mt-1 block text-[0.875rem] leading-relaxed", selected ? "text-ink-300" : "hidden")}>{t.summary}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8">
        {panels.map((p, i) => (
          <div
            key={i}
            role="tabpanel"
            id={`${base}-panel-${i}`}
            aria-labelledby={`${base}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className="focus-visible:outline-offset-4"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
