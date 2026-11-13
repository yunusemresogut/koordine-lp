import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Ortak OpenGraph görseli (1200×630). Pafta düzeni: ızgara zemin, sol üstte logo,
 * büyük başlık, altta antet satırı. Türkçe karakterler için IBM Plex yerel olarak yüklenir.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const assets = () => {
  const root = process.cwd();
  return Promise.all([
    readFile(join(root, "src/assets/fonts/IBMPlexSans-400.ttf")),
    readFile(join(root, "src/assets/fonts/IBMPlexSans-600.ttf")),
    readFile(join(root, "src/assets/fonts/IBMPlexMono-500.ttf")),
    readFile(join(root, "public/brand/koordine-logo-wide-dark.png")),
  ]);
};

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  code,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Sağ alttaki pafta kodu, ör. "SAH" */
  code?: string;
}) {
  const [regular, semibold, mono, logo] = await assets();
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const grid = "rgba(170,196,255,0.08)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#040c26",
          backgroundImage: `linear-gradient(to right, ${grid} 1px, transparent 1px), linear-gradient(to bottom, ${grid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          padding: "64px 72px",
          fontFamily: "Plex",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={233} height={48} alt="" />
          <div
            style={{
              display: "flex",
              fontFamily: "PlexMono",
              fontSize: 20,
              letterSpacing: 3,
              color: "#8eb5ff",
            }}
          >
            {eyebrow.toLocaleUpperCase("tr-TR")}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <div style={{ display: "flex", width: 56, height: 4, background: "#005ffd", marginBottom: 32 }} />
          <div style={{ display: "flex", fontSize: 68, fontWeight: 600, lineHeight: 1.06, letterSpacing: -2 }}>{title}</div>
          {subtitle && (
            <div style={{ display: "flex", marginTop: 28, fontSize: 28, lineHeight: 1.4, color: "#a9b0c2", fontWeight: 400 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 22,
            fontFamily: "PlexMono",
            fontSize: 18,
            letterSpacing: 2,
            color: "#7f88a0",
          }}
        >
          <div style={{ display: "flex" }}>KOORDINE.COM.TR</div>
          <div style={{ display: "flex" }}>{`PAFTA / ${code ?? "00"}`}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Plex", data: regular, weight: 400, style: "normal" },
        { name: "Plex", data: semibold, weight: 600, style: "normal" },
        { name: "PlexMono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
