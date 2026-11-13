import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine iletişim ve demo talebi";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "İletişim",
    title: "Koordine'yi kendi projelerinizle görün.",
    subtitle: "Demo talep edin ya da destek@koordine.com.tr adresine yazın.",
  });
}
