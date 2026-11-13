import { useId } from "react";
import { cn } from "@/lib/utils";
import { AppFrame } from "./app-frame";
import { mockSites, type MockSite } from "./data";
import { SITE_STATUS, StatusBadge, Progress } from "./primitives";

/**
 * MapMockup — Saha haritası: stilize İstanbul (kıyı çizgisi, Boğaz, Haliç, yollar, mahalle blokları)
 * üzerinde durum renkli saha pinleri; solda saha listesi (ad, semt/şehir, durum rozeti, açılış tarihi).
 * Gerçek bir harita kopyası değildir; SVG ile çizilir, resim yüklemez.
 *
 * Proplar:
 * - `selectedId`: vurgulanan saha (pin büyür, bilgi kartı açılır). Varsayılan "kdk" (Kadıköy). `null` → kart yok.
 * - `showList`: soldaki saha listesi (varsayılan true). Dar pencerelerde (<672px) liste zaten gizlenir.
 * - `showLegend`: durum açıklaması (varsayılan true).
 * - `frame`: uygulama penceresi çerçevesi (varsayılan true).
 * - `label`: ekran okuyucu etiketi.
 * - `className`.
 */
export function MapMockup({
  selectedId = "kdk",
  showList = true,
  showLegend = true,
  frame = true,
  label = "Koordine saha haritası örneği: İstanbul'daki sahalar durum renkli pinlerle ve yan listede gösteriliyor.",
  className,
}: {
  selectedId?: string | null;
  showList?: boolean;
  showLegend?: boolean;
  frame?: boolean;
  label?: string;
  className?: string;
}) {
  const selected = mockSites.find((s) => s.id === selectedId);

  return (
    <AppFrame label={label} crumbs={["Saha", "Harita"]} code="SAH" bare={!frame} className={className}>
      <div className={cn("grid", showList && "@2xl:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)]")}>
        {showList && <SiteList selectedId={selected?.id} />}
        <div className="relative aspect-[20/13] w-full overflow-hidden bg-[#e9ecf1]">
          <CityMap />
          <svg viewBox="0 0 800 520" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
            {mockSites.map((s) => (
              <Pin key={s.id} site={s} active={s.id === selected?.id} />
            ))}
          </svg>

          {/* Üst araç çubuğu */}
          <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <span className="hidden h-7 w-44 items-center gap-1.5 rounded-sm border border-line bg-white/95 px-2 text-[11px] text-ink-400 shadow-sm @md:flex">
                <SearchGlyph />
                Saha, şehir ara...
              </span>
              <span className="flex h-7 items-center gap-1.5 rounded-sm border border-line bg-white/95 px-2 text-[11px] text-ink-700 shadow-sm">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-400">Bölge</span>
                İstanbul
              </span>
            </div>
            <span className="flex h-7 items-center rounded-sm border border-line bg-white/95 px-2 font-mono text-[10px] text-ink-600 shadow-sm">
              9 / 24 görünür
            </span>
          </div>

          {selected && <SitePopup site={selected} />}

          {showLegend && (
            <div className="absolute bottom-2.5 left-2.5 hidden flex-col gap-1 rounded-sm border border-line bg-white/95 px-2.5 py-2 shadow-sm @lg:flex">
              {(["proje", "ihale", "santiye", "yakinda_aciliyor", "acilis", "hakedis", "fatura"] as const).map((k) => (
                <span key={k} className="flex items-center gap-1.5 text-[10px] text-ink-700">
                  <span className="size-2 rounded-full" style={{ backgroundColor: SITE_STATUS[k].color }} />
                  {SITE_STATUS[k].label}
                </span>
              ))}
            </div>
          )}

          <div className="absolute bottom-2.5 right-2.5 flex items-end gap-2">
            <div className="flex flex-col items-start gap-0.5 font-mono text-[9px] text-ink-500">
              <span>0 — 2 km</span>
              <span className="flex h-1.5 w-16 border border-t-0 border-ink-500" />
            </div>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function SiteList({ selectedId }: { selectedId?: string }) {
  return (
    <div className="hidden min-h-0 flex-col border-r border-line @2xl:flex">
      <div className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="text-[12px] font-semibold text-ink-950">Sahalar</span>
        <span className="font-mono text-[10px] text-ink-500">24</span>
      </div>
      <ul className="min-h-0 flex-1 divide-y divide-line overflow-hidden">
        {mockSites.slice(0, 7).map((s) => (
          <li key={s.id} className={cn("relative px-3 py-2", s.id === selectedId && "bg-brand-50/70")}>
            {s.id === selectedId && <span className="absolute inset-y-0 left-0 w-0.5 bg-brand-600" />}
            <div className="truncate text-[11.5px] font-medium text-ink-950">{s.name}</div>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="truncate text-[10.5px] text-ink-500">
                {s.district}, {s.city}
              </span>
              <StatusBadge status={s.status} />
            </div>
            <div className="mt-1 font-mono text-[9.5px] text-ink-400">Açılış {s.opening}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SitePopup({ site }: { site: MockSite }) {
  const left = (site.x / 800) * 100;
  const top = (site.y / 520) * 100;
  // Kart pinin soluna/üstüne açılır, kenara taşmasın diye yön seçilir
  const openLeft = left > 55;
  return (
    <div
      className="absolute hidden w-52 rounded-sm border border-line-strong bg-white p-2.5 shadow-float @md:block"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: `translate(${openLeft ? "calc(-100% - 18px)" : "18px"}, -85%)`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate text-[11.5px] font-semibold text-ink-950">{site.name}</div>
          <div className="text-[10px] text-ink-500">
            {site.type} · {site.district}, {site.city}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <StatusBadge status={site.status} />
        {site.countdown && <span className="rounded-xs bg-warn/10 px-1 font-mono text-[9.5px] text-[#8a5a12]">{site.countdown}</span>}
      </div>
      <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 border-t border-line pt-2 text-[10px]">
        <dt className="text-ink-500">Açılış</dt>
        <dd className="text-right font-mono text-ink-800">{site.opening}</dd>
        <dt className="text-ink-500">Şantiye şefi</dt>
        <dd className="truncate text-right text-ink-800">{site.id === "lvt" ? "Mert Çelik" : "Emre Aydın"}</dd>
      </dl>
      {site.progress !== undefined && (
        <div className="mt-2">
          <div className="mb-1 flex justify-between text-[10px]">
            <span className="text-ink-500">İş planı</span>
            <span className="font-mono text-ink-800">%{site.progress}</span>
          </div>
          <Progress value={site.progress} />
        </div>
      )}
    </div>
  );
}

function Pin({ site, active }: { site: MockSite; active: boolean }) {
  const color = SITE_STATUS[site.status].color;
  const s = active ? 1.45 : 1;
  return (
    <g transform={`translate(${site.x} ${site.y}) scale(${s})`}>
      {active && <circle r="15" fill={color} opacity="0.16" />}
      <path d="M0 0 C-5 -7 -8 -10.5 -8 -14.5 A8 8 0 1 1 8 -14.5 C8 -10.5 5 -7 0 0 Z" fill={color} stroke="#fff" strokeWidth="1.6" />
      <circle cy="-14.5" r="2.8" fill="#fff" />
    </g>
  );
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  );
}

/**
 * Stilize şehir planı. Mahalle blokları <pattern> ile çizilir (az DOM düğümü),
 * su yüzeyleri blokların üstüne gelir, köprüler en üstte.
 */
function CityMap() {
  const uid = `m${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const id = (k: string) => `${uid}-${k}`;
  const water = "#d6e1f1";
  const waterLine = "#b9c9e3";
  return (
    <svg viewBox="0 0 800 520" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id={id("mm-blocks-a")} width="34" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(-9)">
          <rect x="2" y="2" width="13" height="9" fill="#dde1e8" />
          <rect x="18" y="2" width="14" height="9" fill="#e1e4ea" />
          <rect x="2" y="14" width="20" height="10" fill="#e1e4ea" />
          <rect x="25" y="14" width="7" height="10" fill="#dce0e7" />
        </pattern>
        <pattern id={id("mm-blocks-b")} width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(14)">
          <rect x="2" y="2" width="11" height="12" fill="#dde1e8" />
          <rect x="16" y="2" width="12" height="12" fill="#e1e4ea" />
          <rect x="2" y="17" width="26" height="11" fill="#dfe2e9" />
        </pattern>
        <clipPath id={id("mm-west")}>
          <path d="M0 0H560L470 400L0 420Z" />
        </clipPath>
        <clipPath id={id("mm-east")}>
          <path d="M560 0H800V520H450L470 400Z" />
        </clipPath>
      </defs>

      {/* Kara ve mahalle blokları */}
      <rect width="800" height="520" fill="#eceef2" />
      <rect width="800" height="520" fill={`url(#${id("mm-blocks-a")})`} clipPath={`url(#${id("mm-west")})`} />
      <rect width="800" height="520" fill={`url(#${id("mm-blocks-b")})`} clipPath={`url(#${id("mm-east")})`} />

      {/* Parklar / ormanlık alanlar */}
      <path d="M210 40 C260 20 330 30 350 70 C365 105 310 125 260 112 C220 102 190 70 210 40Z" fill="#dfe8dc" />
      <path d="M640 40 C690 25 760 50 770 95 C775 130 720 140 680 120 C650 104 620 70 640 40Z" fill="#dfe8dc" />
      <path d="M545 300 C560 292 575 300 572 312 C568 322 552 322 546 314Z" fill="#dfe8dc" />

      {/* Ana yollar (su altında kalanlar su tarafından örtülür) */}
      <g fill="none" strokeLinecap="round">
        <g stroke="#cfd4df" strokeWidth="7">
          <path d="M0 352 C120 346 250 322 372 296 C410 288 432 280 452 274" />
          <path d="M490 266 C560 252 650 296 800 312" />
          <path d="M0 176 C150 170 300 168 440 158 L498 152" />
          <path d="M548 148 C620 140 700 168 800 158" />
        </g>
        <g stroke="#ffffff" strokeWidth="4.5">
          <path d="M0 352 C120 346 250 322 372 296 C410 288 432 280 452 274" />
          <path d="M490 266 C560 252 650 296 800 312" />
          <path d="M0 176 C150 170 300 168 440 158 L498 152" />
          <path d="M548 148 C620 140 700 168 800 158" />
        </g>
        <g stroke="#ffffff" strokeWidth="2.2">
          <path d="M60 420 C140 405 200 400 300 392 C360 388 400 384 430 378" />
          <path d="M120 60 C150 150 170 250 190 410" />
          <path d="M300 40 C320 140 340 220 360 300 C368 330 380 360 400 380" />
          <path d="M380 120 C395 170 405 205 415 250" />
          <path d="M520 400 C560 360 600 340 640 330 C700 316 760 330 800 340" />
          <path d="M600 60 C602 140 610 210 620 270 C630 330 650 380 670 420" />
          <path d="M520 300 C560 280 590 250 650 235 C700 222 750 228 800 236" />
          <path d="M700 120 C712 200 724 280 740 440" />
        </g>
        <g stroke="#f7f8fa" strokeWidth="1.2">
          <path d="M40 260 C120 255 200 250 300 238" />
          <path d="M60 110 C150 112 240 108 330 98" />
          <path d="M230 200 C260 240 280 280 300 330" />
          <path d="M560 200 C600 196 640 192 700 196" />
          <path d="M540 360 C580 380 620 392 660 396" />
          <path d="M460 60 C470 100 476 120 480 140" />
        </g>
      </g>

      {/* Su: Marmara, Boğaz, Haliç */}
      <g fill={water} stroke={waterLine} strokeWidth="1">
        <path d="M0 436 C90 420 170 428 250 426 C320 424 380 410 432 398 L470 400 C520 404 570 430 640 440 C700 448 760 466 800 468 L800 520 L0 520Z" />
        <path d="M432 398 C440 340 420 300 450 260 C480 220 470 170 510 130 C540 100 560 60 585 0 L628 0 C602 60 580 104 548 140 C512 180 522 226 492 266 C466 302 482 346 470 400Z" />
        <path d="M441 372 C412 362 380 350 342 334 C330 330 322 338 334 345 C372 362 404 376 436 388Z" />
      </g>

      {/* Köprüler */}
      <g strokeLinecap="butt">
        <path d="M444 276 L498 264" stroke="#cfd4df" strokeWidth="7" />
        <path d="M444 276 L498 264" stroke="#ffffff" strokeWidth="4.5" />
        <path d="M492 153 L552 147" stroke="#cfd4df" strokeWidth="7" />
        <path d="M492 153 L552 147" stroke="#ffffff" strokeWidth="4.5" />
      </g>

      {/* Su adları */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="10" letterSpacing="2.5" fill="#7d93b8">
        <text x="250" y="482">MARMARA DENİZİ</text>
        <text x="0" y="0" transform="translate(528 92) rotate(-58)">
          İSTANBUL BOĞAZI
        </text>
      </g>

      {/* Koordinat çerçevesi */}
      <g fontFamily="var(--font-plex-mono), monospace" fontSize="8.5" fill="#7f88a0" stroke="#a9b0c2">
        {[100, 300, 500, 700].map((x, i) => (
          <g key={x}>
            <line x1={x} y1="0" x2={x} y2="7" />
            <text x={x + 4} y="16" stroke="none">{["28°55′", "29°00′", "29°05′", "29°10′"][i]}</text>
          </g>
        ))}
        {[120, 260].map((y, i) => (
          <g key={y}>
            <line x1="0" y1={y} x2="7" y2={y} />
            <text x="10" y={y + 3} stroke="none">{["41°05′", "41°00′"][i]}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
