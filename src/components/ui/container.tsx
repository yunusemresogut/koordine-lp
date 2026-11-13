import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

/** Sayfa genişliği: 1200px içerik, mobilde 20px kenar boşluğu */
export function Container({ size = "default", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "default" && "max-w-[1240px]",
        size === "narrow" && "max-w-[860px]",
        size === "wide" && "max-w-[1400px]",
        className
      )}
      {...props}
    />
  );
}
