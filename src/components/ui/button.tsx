import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,border-color,box-shadow] duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 rounded-sm";

const variants: Record<Variant, string> = {
  // Birincil: marka mavisi dolgu
  primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-[inset_0_-1px_0_rgba(0,0,0,0.18)]",
  // İkincil: kâğıt üzerinde mürekkep çerçeve
  secondary: "border border-line-strong bg-white text-ink-950 hover:border-ink-950",
  ghost: "text-ink-700 hover:text-ink-950 hover:bg-ink-50",
  // Koyu zemin üzerinde
  inverse: "bg-white text-ink-950 hover:bg-brand-50",
  "inverse-outline": "border border-white/25 text-white hover:border-white/70 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  /** Sağda ok işareti (hover'da kayar) */
  arrow?: boolean;
};

export function ButtonLink({ variant, size, arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; arrow?: boolean };

export function Button({ variant, size, arrow, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn("size-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" strokeLinecap="square" />
    </svg>
  );
}

/** Metin bağlantısı + ok; kartların ve bölümlerin altında */
export function TextLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group/btn inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-brand-700 hover:text-brand-800",
        className
      )}
      {...props}
    >
      <span className="underline decoration-brand-300 decoration-1 underline-offset-4 group-hover/btn:decoration-brand-700">
        {children}
      </span>
      <Arrow />
    </Link>
  );
}
