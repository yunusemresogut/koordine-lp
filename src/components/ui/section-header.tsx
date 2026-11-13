import { cn } from "@/lib/utils";

/**
 * Pafta tarzı bölüm etiketi: "01 — SAHA". Mono, büyük harf, ince çizgiyle.
 * tone="dark" koyu (mürekkep) zeminler içindir.
 */
export function Eyebrow({
  index,
  children,
  tone = "light",
  className,
}: {
  index?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-ink-500" : "text-ink-300",
        className
      )}
    >
      {index && <span className={tone === "light" ? "text-brand-700" : "text-brand-300"}>{index}</span>}
      {index && <span aria-hidden className={cn("h-px w-6", tone === "light" ? "bg-line-strong" : "bg-white/25")} />}
      <span>{children}</span>
    </p>
  );
}

type SectionHeaderProps = {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "split";
  /** Başlık etiketi; sayfada tek h1 olmalı, bölümler h2 */
  as?: "h1" | "h2" | "h3";
  /** Başlık id'si; section aria-labelledby için */
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Bölüm başlığı. align="split" geniş ekranda başlığı solda, açıklamayı sağda gösterir
 * (her bölümün ortalanmış başlık+paragraf olmasından kaçınmak için).
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  as: Tag = "h2",
  id,
  className,
  children,
}: SectionHeaderProps) {
  const titleCls = cn(
    "text-balance font-semibold tracking-[-0.025em]",
    Tag === "h1" ? "text-[2.5rem] leading-[1.05] sm:text-[3.5rem]" : "text-[2rem] leading-[1.1] sm:text-[2.625rem]",
    tone === "light" ? "text-ink-950" : "text-white"
  );
  const ledeCls = cn("text-pretty text-[1.0625rem] leading-relaxed sm:text-lg", tone === "light" ? "text-ink-600" : "text-ink-300");

  if (align === "split") {
    return (
      <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-12", className)}>
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow index={index} tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
          <Tag id={id} className={titleCls}>{title}</Tag>
        </div>
        {(lede || children) && (
          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            {lede && <p className={ledeCls}>{lede}</p>}
            {children}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow index={index} tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
      <Tag id={id} className={titleCls}>{title}</Tag>
      {lede && <p className={cn(ledeCls, "mt-5 max-w-2xl")}>{lede}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
