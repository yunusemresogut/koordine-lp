"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { heroSceneConfig } from "./config";
import type { HeroSceneHandle } from "./scene";

/**
 * Hero arka planındaki topografik saha sahnesi (three.js).
 *
 * - three.js ana pakete girmez; sayfa yüklendikten sonra dinamik olarak indirilir.
 * - Yalnızca geniş ekranda (config.minWidth) yüklenir.
 * - Görünür değilken ve sekme arka plandayken durur.
 * - "Hareketi azalt" tercihinde tek kare çizilir, animasyon olmaz.
 * - WebGL yoksa ya da hata olursa hiçbir şey göstermez; sayfa aynı kalır.
 *
 * Ayarlar: ./config.ts. Kaldırmak için hero.tsx'teki <HeroScene /> satırını silin.
 */
function supportsWebGL() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function HeroScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let handle: HeroSceneHandle | null = null;
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Dar ekranda hiç yükleme (three.js indirilmez)
    if (!window.matchMedia(`(min-width: ${heroSceneConfig.minWidth}px)`).matches) return;

    const boot = async () => {
      // WebGL yoksa three.js'i hiç indirme (konsola hata da düşmesin)
      if (!supportsWebGL()) return;
      const { createHeroScene } = await import("./scene");
      if (cancelled) return;
      try {
        handle = createHeroScene(canvas, heroSceneConfig, { reducedMotion });
      } catch {
        return; // WebGL desteklenmiyor: sessizce vazgeç
      }
      const h = handle;

      const resize = () => h.resize(wrap.clientWidth, wrap.clientHeight);
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      cleanups.push(() => ro.disconnect());

      let inView = true;
      const sync = () => (inView && !document.hidden ? h.start() : h.stop());
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        sync();
      });
      io.observe(wrap);
      document.addEventListener("visibilitychange", sync);
      cleanups.push(() => {
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
      });

      if (heroSceneConfig.motion.pointer > 0 && !reducedMotion) {
        const onMove = (e: PointerEvent) => {
          const r = wrap.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 2 - 1;
          const y = ((e.clientY - r.top) / r.height) * 2 - 1;
          h.setPointer(Math.max(-1, Math.min(1, x)), Math.max(-1, Math.min(1, y)));
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onMove));
      }

      h.renderOnce();
      sync();
      // İlk kare çizildikten sonra yumuşakça görünür ol
      requestAnimationFrame(() => {
        if (!cancelled) wrap.dataset.ready = "true";
      });
    };

    // Sayfanın ilk yüklemesini geciktirmesin
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => void boot());

    return () => {
      cancelled = true;
      cancelIdle(id);
      cleanups.forEach((fn) => fn());
      handle?.dispose();
    };
  }, []);

  if (!heroSceneConfig.enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 hidden opacity-0 lg:block transition-opacity duration-[1600ms] ease-out data-[ready=true]:opacity-100",
        className
      )}
      style={{
        // Altta ve metnin solunda sönümlenir; ürün görselleriyle yarışmaz
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 14%, #000 58%, transparent 100%), linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 35%, #000 75%)",
        maskComposite: "intersect",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 14%, #000 58%, transparent 100%), linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.5) 35%, #000 75%)",
        WebkitMaskComposite: "source-in",
      }}
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
