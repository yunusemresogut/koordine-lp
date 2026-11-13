import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  QuadraticBezierCurve3,
  RingGeometry,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import type { HeroSceneConfig } from "./config";

/**
 * Topografik saha sahnesi. React'ten bağımsızdır; yalnızca bir canvas alır.
 * index.tsx bu modülü tarayıcıda, ihtiyaç olduğunda dinamik olarak yükler.
 */

export type HeroSceneHandle = {
  resize: (width: number, height: number) => void;
  setPointer: (x: number, y: number) => void;
  start: () => void;
  stop: () => void;
  renderOnce: () => void;
  dispose: () => void;
};

/* ---------------- Gürültü (deterministik, bağımlılıksız) ---------------- */

function makeNoise(seed: number) {
  const hash = (x: number, y: number) => {
    const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
    return s - Math.floor(s);
  };
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const value = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const xf = x - xi;
    const yf = y - yi;
    const a = hash(xi, yi);
    const b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1);
    const d = hash(xi + 1, yi + 1);
    const u = smooth(xf);
    const v = smooth(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  return (x: number, y: number) => {
    let sum = 0;
    let amp = 0.5;
    let freq = 1;
    for (let i = 0; i < 3; i++) {
      sum += amp * value(x * freq, y * freq);
      freq *= 2.03;
      amp *= 0.5;
    }
    return sum; // ~0..1
  };
}

/* ---------------- Arazi eğrisi gölgelendiricisi ---------------- */

const terrainVertex = /* glsl */ `
  varying vec3 vWorld;
  varying float vDepth;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    vec4 mv = viewMatrix * wp;
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const terrainFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uMajor;
  uniform vec3 uAccent;
  uniform float uInterval;
  uniform float uMajorEvery;
  uniform float uOpacity;
  uniform float uScan;      // tarama çizgisinin x konumu
  uniform float uScanOn;    // 0 / 1
  uniform vec2 uHalf;       // arazinin yarı boyutu (x, z)
  uniform vec2 uFade;       // derinlik sisi (başlangıç, bitiş)
  varying vec3 vWorld;
  varying float vDepth;

  float isoline(float v, float width) {
    float f = fract(v);
    float d = min(f, 1.0 - f);
    float aa = fwidth(v);
    return 1.0 - smoothstep(aa * (width - 0.5), aa * (width + 0.5), d);
  }

  void main() {
    float h = vWorld.y / uInterval;
    float minor = isoline(h, 0.6);
    float major = isoline(h / uMajorEvery, 0.9);

    // Kenar ve derinlik sönümü: sert sınır görünmesin
    float edge = smoothstep(0.0, 8.0, uHalf.x - abs(vWorld.x)) * smoothstep(0.0, 6.0, uHalf.y - abs(vWorld.z));
    float fog = 1.0 - smoothstep(uFade.x, uFade.y, vDepth);

    // Tarama: x ekseninde ilerleyen yumuşak bant
    float band = uScanOn * exp(-pow((vWorld.x - uScan) / 1.6, 2.0));

    vec3 col = mix(uColor, uMajor, major);
    col = mix(col, uAccent, band * 0.85);
    float a = max(minor * 0.55, major) * uOpacity * (1.0 + band * 0.9);
    a *= edge * fog;
    if (a < 0.003) discard;
    gl_FragColor = vec4(col, a);
  }
`;

/* ---------------- Sahne ---------------- */

export function createHeroScene(
  canvas: HTMLCanvasElement,
  cfg: HeroSceneConfig,
  opts: { reducedMotion: boolean }
): HeroSceneHandle {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cfg.maxDpr));

  const scene = new Scene();
  const camera = new PerspectiveCamera(cfg.camera.fov, 1, 0.1, 200);
  const target = new Vector3(...cfg.camera.target);
  const basePos = new Vector3(...cfg.camera.position);

  const t = cfg.terrain;
  const noise = makeNoise(t.seed);
  const heightAt = (x: number, z: number) => {
    const n = noise(x * t.noiseScale + 10, z * t.noiseScale + 10);
    // Arkaya doğru hafifçe yükselen genel eğim: ufukta tepeler, önde düzlük
    const slope = Math.max(0, -z) * 0.035;
    return (n - 0.45) * t.height * 2 + slope;
  };

  /* Arazi */
  const segX = t.segments;
  const segZ = Math.round((t.segments * t.depth) / t.width);
  const geo = new PlaneGeometry(t.width, t.depth, segX, segZ);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
  }
  pos.needsUpdate = true;

  const terrainMat = new ShaderMaterial({
    vertexShader: terrainVertex,
    fragmentShader: terrainFragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: new Color(cfg.colors.contour) },
      uMajor: { value: new Color(cfg.colors.contourMajor) },
      uAccent: { value: new Color(cfg.colors.accent) },
      uInterval: { value: t.contourInterval },
      uMajorEvery: { value: t.majorEvery },
      uOpacity: { value: t.opacity },
      uScan: { value: -t.width },
      uScanOn: { value: cfg.motion.scanPeriod > 0 && !opts.reducedMotion ? 1 : 0 },
      uHalf: { value: [t.width / 2, t.depth / 2] },
      uFade: { value: [30, 70] },
    },
  });
  const terrain = new Mesh(geo, terrainMat);
  scene.add(terrain);

  /* Sahalar */
  const accent = new Color(cfg.colors.accent);
  const ink = new Color(cfg.colors.contourMajor);
  const disposables: { dispose: () => void }[] = [geo, terrainMat];

  const stemMat = new LineBasicMaterial({ color: ink, transparent: true, opacity: 0.45 });
  const arcMat = new LineBasicMaterial({ color: new Color(cfg.colors.accentSoft), transparent: true, opacity: 0.6 });
  const headMat = new SpriteMaterial({ color: accent, sizeAttenuation: true, depthTest: false });
  const hubMat = new SpriteMaterial({ color: new Color("#040c26"), sizeAttenuation: true, depthTest: false });
  const dotMat = new SpriteMaterial({ color: accent, transparent: true, depthTest: false });
  disposables.push(stemMat, arcMat, headMat, hubMat, dotMat);

  type Pulse = { mesh: Mesh; mat: MeshBasicMaterial; offset: number };
  type Flow = { curve: QuadraticBezierCurve3; dot: Sprite; mat: SpriteMaterial; offset: number };
  const pulses: Pulse[] = [];
  const flows: Flow[] = [];

  const ringGeo = new RingGeometry(0.3, 0.36, 48);
  ringGeo.rotateX(-Math.PI / 2);
  disposables.push(ringGeo);

  const tops: Vector3[] = cfg.sites.map(([x, z], i) => {
    const hub = i === 0;
    const y = heightAt(x, z);
    const stemH = hub ? 2.6 : 1.5 + ((i * 0.37) % 0.7);
    const base = new Vector3(x, y, z);
    const top = new Vector3(x, y + stemH, z);

    const stemGeo = new BufferGeometry().setFromPoints([base, top]);
    disposables.push(stemGeo);
    scene.add(new Line(stemGeo, stemMat));

    const head = new Sprite(hub ? hubMat : headMat);
    head.position.copy(top);
    head.scale.setScalar(hub ? 0.34 : 0.24);
    head.renderOrder = 3;
    scene.add(head);

    const ringMat = new MeshBasicMaterial({ color: accent, transparent: true, opacity: 0, depthWrite: false, blending: AdditiveBlending });
    disposables.push(ringMat);
    const ring = new Mesh(ringGeo, ringMat);
    ring.position.set(x, y + 0.03, z);
    scene.add(ring);
    pulses.push({ mesh: ring, mat: ringMat, offset: i / cfg.sites.length });

    return top;
  });

  /* Merkez ile sahalar arasındaki bağlantılar */
  const hubTop = tops[0];
  tops.slice(1).forEach((p, i) => {
    const mid = hubTop.clone().lerp(p, 0.5);
    mid.y += 1.2 + hubTop.distanceTo(p) * 0.1;
    const curve = new QuadraticBezierCurve3(p.clone(), mid, hubTop.clone());
    const arcGeo = new BufferGeometry().setFromPoints(curve.getPoints(64));
    disposables.push(arcGeo);
    scene.add(new Line(arcGeo, arcMat));

    const mat = dotMat.clone();
    disposables.push(mat);
    const dot = new Sprite(mat);
    dot.scale.setScalar(0.16);
    dot.renderOrder = 4;
    scene.add(dot);
    flows.push({ curve, dot, mat, offset: (i * 0.618) % 1 });
  });

  /* Kamera ve döngü */
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  let elapsed = 0;
  let last = 0;
  let raf = 0;
  let running = false;

  const place = (time: number) => {
    const m = cfg.motion;
    pointer.sx += (pointer.x - pointer.sx) * 0.04;
    pointer.sy += (pointer.y - pointer.sy) * 0.04;
    const angle = opts.reducedMotion ? 0 : Math.sin(time * 0.06) * m.drift + pointer.sx * 0.06 * m.pointer;
    const offset = basePos.clone().sub(target);
    offset.applyAxisAngle(new Vector3(0, 1, 0), angle);
    camera.position.copy(target).add(offset);
    camera.position.y += -pointer.sy * 1.2 * m.pointer;
    camera.lookAt(target);
  };

  const update = (time: number) => {
    const m = cfg.motion;
    if (m.scanPeriod > 0) {
      const s = (time / m.scanPeriod) % 1;
      terrainMat.uniforms.uScan.value = -t.width / 2 + s * (t.width + 12);
    }
    const pulseT = time / m.pulsePeriod;
    for (const p of pulses) {
      const k = (pulseT + p.offset) % 1;
      p.mesh.scale.setScalar(1 + k * 3.5);
      p.mat.opacity = (1 - k) * (1 - k) * 0.45;
    }
    for (const f of flows) {
      const k = (pulseT * 0.8 + f.offset) % 1;
      f.dot.position.copy(f.curve.getPoint(k));
      f.mat.opacity = Math.sin(k * Math.PI);
    }
  };

  const frame = (now: number) => {
    // Sekme arka plandan dönünce büyük sıçrama olmasın
    elapsed += Math.min(0.1, (now - last) / 1000);
    last = now;
    update(elapsed);
    place(elapsed);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const renderOnce = () => {
    if (!opts.reducedMotion) update(elapsed);
    else for (const f of flows) f.dot.visible = false;
    place(elapsed);
    renderer.render(scene, camera);
  };

  return {
    resize(width, height) {
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Dar ekranda sahneyi biraz uzaklaştır, sahalar kadrajda kalsın
      camera.fov = cfg.camera.fov * (camera.aspect < 1.2 ? 1.5 : 1);
      camera.updateProjectionMatrix();
      if (!running) renderOnce();
    },
    setPointer(x, y) {
      pointer.x = x;
      pointer.y = y;
    },
    start() {
      if (running || opts.reducedMotion) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    },
    renderOnce,
    dispose() {
      cancelAnimationFrame(raf);
      running = false;
      for (const d of disposables) d.dispose();
      renderer.dispose();
    },
  };
}
