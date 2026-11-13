import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine hakkında";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Hakkımızda",
    title: "Koordine'yi sahada çalışan ekipler için geliştiriyoruz.",
    subtitle: "Neden geliştirdik ve ürünü nasıl kuruyoruz.",
  });
}
