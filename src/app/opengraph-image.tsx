import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine: saha, proje ve şantiye yönetimi tek platformda";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Saha, proje ve şantiye yönetimi",
    title: "Saha, proje ve şantiye takibi için tek platform.",
    subtitle: "Mühendislik, mimarlık ve taahhüt firmaları için yönetim platformu.",
  });
}
