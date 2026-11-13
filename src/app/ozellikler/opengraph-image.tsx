import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine özellikleri — 9 modül";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Özellikler",
    title: "Sahanın her işi için bir modül, hepsi aynı kayıtta.",
    subtitle: "Saha, keşif, hakediş, raporlar, talepler, İK, envanter, ekip ve asistan.",
    code: "M-09",
  });
}
