"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Görünür alana girince hafifçe belirir. Yalnızca bölüm düzeyinde, ölçülü kullanın.
 * JS yoksa (noscript stili) ve reduced-motion'da içerik doğrudan görünür.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "li" | "article"; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver yoksa öğeyi doğrudan görünür yap (state'e gerek yok)
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Etiket türü değişse de ref tipi aynı kalsın diye div olarak daraltılır
  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref as React.RefObject<HTMLDivElement>}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("reveal", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
