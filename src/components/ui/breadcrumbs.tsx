import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** Görünür içerik yolu + BreadcrumbList şeması. İlk öğe her zaman Ana sayfa. */
export function Breadcrumbs({ items, tone = "light", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const all: Crumb[] = [{ name: "Ana sayfa", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="İçerik yolu" className={cn("font-mono text-[0.75rem] tracking-[0.04em]", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === "light" ? "text-ink-950" : "text-white"}>
                    {c.name}
                  </span>
                ) : (
                  <Link
                    href={c.path}
                    className={cn(
                      "transition-colors",
                      tone === "light" ? "text-ink-500 hover:text-ink-950" : "text-ink-300 hover:text-white"
                    )}
                  >
                    {c.name}
                  </Link>
                )}
                {!last && (
                  <span aria-hidden className={tone === "light" ? "text-ink-300" : "text-ink-500"}>
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}
