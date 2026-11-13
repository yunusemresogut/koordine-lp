import { cn } from "@/lib/utils";

/**
 * Footer arka planındaki kule vinç çizimi (teknik çizim tarzı, statik SVG).
 *
 * İki parçadan oluşur:
 * - <FooterCrane />: kule, ana kol ve karşı kol. Footer içeriğinin sağ kenarına sabitlenir;
 *   kule sağ boşlukta yükselir, ana kol sütun başlıklarının üstünden sola uzanır.
 * - <FooterCraneHook />: araba, halat ve kanca. Bir sütunun içine konur ve sütunlar arasındaki
 *   boşluğa sarkar; böylece ekran genişliği değişse de yazıların üstüne düşmez.
 *
 * Çizim sabit ölçekte (SCALE) çizilir, böylece kancanın bağlandığı kol yüksekliği piksel olarak bilinir.
 * Kaldırmak için footer.tsx'teki iki satırı (<FooterCrane />, <FooterCraneHook />) silin.
 */

// Çizim ölçüleri (viewBox birimi)
const W = 764;
const H = 520;
const SCALE = 1.23; // 1 birim = 1.23 px
const MAST_L = 700; // kule sol dikmesi
const MAST_R = 738; // kule sağ dikmesi
const JIB_TOP = 96; // kol üst başlığı
const JIB_BOT = 116; // kol alt başlığı
const JIB_TIP = 40; // ana kol ucu
const CJIB_END = 940; // karşı kol (görünüm dışına taşar)
const APEX_Y = 22; // kule tepesi

/** Ana kolun alt başlığının footer üstünden uzaklığı (px). Kanca buradan sarkar. */
export const CRANE_JIB_BOTTOM_PX = Math.round(JIB_BOT * SCALE);

/** İki yatay başlık arasında zikzak (kafes) çizgisi */
function truss(x1: number, x2: number, top: number, bottom: number, step: number) {
  const pts: string[] = [];
  let up = false;
  const dir = x2 > x1 ? 1 : -1;
  for (let x = x1; dir > 0 ? x <= x2 : x >= x2; x += step * dir) {
    pts.push(`${x},${up ? top : bottom}`);
    up = !up;
  }
  return `M${pts.join(" L")}`;
}

/** Kule gövdesi: iki dikme arasında çapraz kafes */
function mastLattice(from: number, to: number, step: number) {
  const d: string[] = [];
  for (let y = from; y > to; y -= step) {
    d.push(`M${MAST_L},${y} L${MAST_R},${y - step}`, `M${MAST_L},${y - step} L${MAST_R},${y - step}`);
  }
  return d.join(" ");
}

const strokeCls = "[&_path]:[vector-effect:non-scaling-stroke]";

export function FooterCrane({ className }: { className?: string }) {
  // Kule görünüm altına taşar; footer'ın overflow-hidden'ı keser
  const mastBase = H + 300;
  const mastTop = JIB_BOT + 22;
  const apexX = (MAST_L + MAST_R) / 2;

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      width={W * SCALE}
      height={H * SCALE}
      fill="none"
      overflow="visible"
      className={cn("pointer-events-none select-none", strokeCls, className)}
    >
      <g stroke="currentColor" strokeWidth={1} strokeLinejoin="round">
        {/* Kule */}
        <path d={`M${MAST_L},${mastBase} V${mastTop} M${MAST_R},${mastBase} V${mastTop}`} />
        <path d={mastLattice(mastBase, mastTop, 38)} opacity={0.75} />

        {/* Döner tabla ve kabin */}
        <path d={`M${MAST_L - 8},${mastTop} H${MAST_R + 8} V${JIB_BOT} H${MAST_L - 8} Z`} />
        <path d={`M${MAST_L - 34},${JIB_BOT + 2} h26 v20 h-26 Z M${MAST_L - 30},${JIB_BOT + 6} h18 v8 h-18 Z`} />

        {/* Kule tepesi */}
        <path d={`M${MAST_L},${JIB_TOP} L${apexX},${APEX_Y} L${MAST_R},${JIB_TOP} M${apexX},${APEX_Y} V${JIB_TOP}`} />

        {/* Ana kol */}
        <path d={`M${MAST_L},${JIB_TOP} H${JIB_TIP} L${JIB_TIP},${JIB_BOT} H${MAST_L}`} />
        <path d={truss(MAST_L, JIB_TIP, JIB_TOP, JIB_BOT, 20)} opacity={0.75} />

        {/* Karşı kol ve karşı ağırlık (görünüm dışına taşar) */}
        <path d={`M${MAST_R},${JIB_TOP + 4} H${CJIB_END} M${MAST_R},${JIB_BOT} H${CJIB_END}`} />
        <path d={truss(MAST_R, CJIB_END, JIB_TOP + 4, JIB_BOT, 22)} opacity={0.75} />
        <path d={`M836,${JIB_BOT} h46 v44 h-46 Z M836,${JIB_BOT + 15} h46 M836,${JIB_BOT + 30} h46`} />

        {/* Askı halatları */}
        <path
          d={`M${apexX},${APEX_Y} L${JIB_TIP + 150},${JIB_TOP} M${apexX},${APEX_Y} L${MAST_L - 250},${JIB_TOP} M${apexX},${APEX_Y} L880,${JIB_TOP + 4}`}
          opacity={0.8}
        />

        {/* Ölçü çizgisi: kol açıklığı */}
        <path
          d={`M${JIB_TIP},${JIB_TOP - 26} H${MAST_L} M${JIB_TIP},${JIB_TOP - 32} v12 M${MAST_L},${JIB_TOP - 32} v12`}
          opacity={0.6}
        />
      </g>
    </svg>
  );
}

/**
 * Araba, halat ve kanca. Konumlandırılmış (relative) bir sütunun içine konur;
 * `top` değeri sütunun footer üstünden uzaklığına göre verilir.
 */
export function FooterCraneHook({ className, style, rope = 190 }: { className?: string; style?: React.CSSProperties; rope?: number }) {
  const w = 20;
  const h = 7 + rope + 34;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      width={w * SCALE}
      height={h * SCALE}
      fill="none"
      overflow="visible"
      style={style}
      className={cn("pointer-events-none select-none", strokeCls, className)}
    >
      {/* Araba ve halatlar */}
      <g stroke="currentColor" strokeWidth={1}>
        <path d={`M0,0 h${w} v7 h-${w} Z`} />
        <path d={`M7,7 V${7 + rope} M13,7 V${7 + rope}`} opacity={0.8} />
      </g>
      {/* Kanca: tek renkli vurgu */}
      <g className="text-brand-400" stroke="currentColor" strokeWidth={1.25} opacity={0.75}>
        <path d={`M2,${7 + rope} h16 v12 h-16 Z`} />
        <path d={`M10,${19 + rope} v8 a7,7 0 1 1 -7,7`} />
      </g>
    </svg>
  );
}
