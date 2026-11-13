import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Koordine hakkında";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Hakkımızda",
    title: "Sahada olan, kayıtta da olsun.",
    subtitle: "Koordine'nin neden var olduğu ve ürünü yönlendiren ilkeler.",
    code: "HKK",
  });
}
