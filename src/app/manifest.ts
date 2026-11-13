import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Saha, Proje ve Şantiye Yönetimi`,
    short_name: site.name,
    description: site.description,
    lang: "tr",
    start_url: "/",
    display: "browser",
    background_color: "#f6f7f9",
    theme_color: "#040c26",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
