import { cn } from "@/lib/utils";

/**
 * Bölüm etiketi: kısa, mono, büyük harf.
 * tone="dark" koyu (mürekkep) zeminler içindir.
 */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-[0.75rem] font-medium uppercase tracking-[0.14em]",
        tone === "light" ? "text-ink-500" : "text-ink-300",
        className
      )}
    >
      <span aria-hidden className={cn("size-1.5 shrink-0", tone === "light" ? "bg-brand-600" : "bg-brand-300")} />
      <span>{children}</span>
    </p>
  );
}

type SectionHeaderProps = {
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
          {eyebrow && <Eyebrow tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
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
      {eyebrow && <Eyebrow tone={tone} className="mb-5">{eyebrow}</Eyebrow>}
      <Tag id={id} className={titleCls}>{title}</Tag>
      {lede && <p className={cn(ledeCls, "mt-5 max-w-2xl")}>{lede}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}
