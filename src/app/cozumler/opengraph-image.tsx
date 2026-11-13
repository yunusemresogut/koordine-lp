import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine çözümleri: inşaat, mimarlık, mühendislik ve perakende yatırımları";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Çözümler",
    title: "Sektörünüze göre Koordine",
    subtitle: "İnşaat ve taahhüt, mimarlık, mühendislik ve MEP, perakende yatırımları.",
  });
}
