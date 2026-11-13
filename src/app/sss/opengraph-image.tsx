import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine sık sorulan sorular";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Sık sorulan sorular",
    title: "Koordine hakkında merak edilenler",
    subtitle: "Modüller, veri güvenliği, kurulum, destek ve fiyatlandırma.",
    code: "SSS",
  });
}
