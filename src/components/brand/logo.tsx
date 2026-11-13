import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Koordine logosu. tone="dark" koyu zemin içindir (açık renkli varyant).
 * Kaynak: maps-analytics/public/img → public/brand
 */
export function Logo({
  variant = "full",
  tone = "light",
  className,
  priority,
}: {
  variant?: "full" | "mark";
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
}) {
  const suffix = tone === "dark" ? "-dark" : "";
  if (variant === "mark") {
    return (
      <Image
        src={`/brand/koordine-mark${suffix}.png`}
        alt="Koordine"
        width={128}
        height={128}
        priority={priority}
        className={cn("size-8 select-none", className)}
      />
    );
  }
  return (
    <Image
      src={`/brand/koordine-logo-wide${suffix}.png`}
      alt="Koordine"
      width={814}
      height={168}
      priority={priority}
      className={cn("h-7 w-auto select-none", className)}
    />
  );
}
