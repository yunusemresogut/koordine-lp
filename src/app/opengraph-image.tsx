import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine — Saha, proje ve şantiye yönetimi tek platformda";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Saha · Proje · Şantiye",
    title: "Sahadan finansa, projelerinizin tamamı tek platformda.",
    subtitle: "Mühendislik, mimarlık ve taahhüt firmaları için yönetim platformu.",
  });
}
