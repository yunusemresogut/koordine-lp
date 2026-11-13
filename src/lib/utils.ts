import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "01", "02" … bölüm numaraları için */
export function pad2(n: number) {
  return String(n).padStart(2, "0");
}
