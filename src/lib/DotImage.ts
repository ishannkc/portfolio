export interface DotImageOptions {
  /** Dots across the canvas width. Smaller = denser grid. */
  gapDivisor: number;
  /** Minimum distance between dots in CSS pixels. */
  minGap: number;
  /** Cursor repel radius as a fraction of the canvas width. */
  radius: number;
  /** Cursor push strength. */
  push: number;
  /** Spring constant pulling dots back home. */
  spring: number;
  /** Velocity damping (0..1). */
  friction: number;
  /** Row ripple amplitude in pixels (0 = off). */
  wave: number;
  /** Dot colour. */
  rgb: [number, number, number];
  /** Crosshair colour. */
  crosshair: string;
  /** Empty margin around the subject as a fraction of the canvas. */
  pad: number;
  /** Called if the source image cannot be loaded. */
  onError?: () => void;
}

interface Dot {
  /** Home position on the canvas, in CSS pixels. */
  hx: number;
  hy: number;
  /** Current position. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Normalised brightness (0..1). */
  lum: number;
}

interface BBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

const DEFAULTS: Omit<DotImageOptions, "onError"> = {
  gapDivisor: 110,
  minGap: 4,
  radius: 0.16,
  push: 6,
  spring: 0.07,
  friction: 0.82,
  wave: 2.5,
  rgb: [128, 0, 32], // site accent #800020
  crosshair: "#ffffff",
  pad: 0.04,
};

/**
 * Renders an image as a grid of interactive dots on a canvas.
 * Framework-agnostic: instantiate with a canvas element and destroy on unmount.
 */
export default class DotImage {
  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private o: DotImageOptions;
  private mouse = { x: -9999, y: -9999 };
  private p: Dot[] = [];
  private visible = true;
  private raf = 0;
  private destroyed = false;
  private reduced: boolean;
  private dpr: number;
  private img: HTMLImageElement | null = null;
  private bbox: BBox | null = null;
  private w = 0;
  private h = 0;
  private gap = 0;
  private ro: ResizeObserver;
  private io: IntersectionObserver;

  constructor(
    canvas: HTMLCanvasElement,
    src: string,
    opts: Partial<DotImageOptions> = {},
  ) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.o = { ...DEFAULTS, ...opts };
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.onMove = (e) => {
      const r = this.c.getBoundingClientRect();
      this.mouse.x = e.clientX - r.left;
      this.mouse.y = e.clientY - r.top;
    };
    this.onLeave = () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    };

    this.c.style.touchAction = "pan-y"; // keep page scrolling on touch
    this.c.addEventListener("pointermove", this.onMove);
    this.c.addEventListener("pointerleave", this.onLeave);

    this.ro = new ResizeObserver(() => {
      if (this.img) this.build();
    });
    this.ro.observe(this.c);

    this.io = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.loop();
    });
    this.io.observe(this.c);

    this.load(src);
  }

  private onMove: (e: PointerEvent) => void;
  private onLeave: () => void;

  private load(src: string) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (this.destroyed) return;
      this.img = img;
      this.bbox = this.computeBBox(img);
      this.build();
      this.loop();
    };
    img.onerror = () => {
      if (this.destroyed) return;
      this.o.onError?.();
    };
    img.src = src;
  }

  /** Find the non-transparent bounding box (in source pixels) via a probe canvas. */
  private computeBBox(img: HTMLImageElement): BBox {
    const ps = 400 / Math.max(img.width, img.height);
    const pw = Math.max(1, Math.round(img.width * ps));
    const ph = Math.max(1, Math.round(img.height * ps));
    const pc = document.createElement("canvas");
    pc.width = pw;
    pc.height = ph;
    const px = pc.getContext("2d", { willReadFrequently: true });
    if (!px) return { x: 0, y: 0, w: img.width, h: img.height };
    px.drawImage(img, 0, 0, pw, ph);
    const d = px.getImageData(0, 0, pw, ph).data;
    let x0 = pw;
    let y0 = ph;
    let x1 = 0;
    let y1 = 0;
    for (let y = 0; y < ph; y++) {
      for (let x = 0; x < pw; x++) {
        if (d[(y * pw + x) * 4 + 3] > 20) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    if (x1 <= x0 || y1 <= y0) {
      return { x: 0, y: 0, w: img.width, h: img.height };
    }
    const m = 0.01; // 1% safety margin
    const sx = Math.max(0, x0 / ps - img.width * m);
    const sy = Math.max(0, y0 / ps - img.height * m);
    const ex = Math.min(img.width, x1 / ps + img.width * m);
    const ey = Math.min(img.height, y1 / ps + img.height * m);
    return { x: sx, y: sy, w: ex - sx, h: ey - sy };
  }

  private build() {
    const r = this.c.getBoundingClientRect();
    if (!r.width || !r.height || !this.img || !this.bbox) return;
    this.w = r.width;
    this.h = r.height;
    this.c.width = Math.round(this.w * this.dpr);
    this.c.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const b = this.bbox;
    const o = this.o;
    const s = Math.min(
      (this.w * (1 - 2 * o.pad)) / b.w,
      (this.h * (1 - 2 * o.pad)) / b.h,
    );
    const dw = b.w * s;
    const dh = b.h * s;
    const dx = (this.w - dw) / 2;
    const dy = (this.h - dh) / 2;

    const off = document.createElement("canvas");
    off.width = Math.ceil(this.w);
    off.height = Math.ceil(this.h);
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    octx.drawImage(this.img, b.x, b.y, b.w, b.h, dx, dy, dw, dh);
    const data = octx.getImageData(0, 0, off.width, off.height).data;

    this.gap = Math.max(o.minGap, Math.round(this.w / o.gapDivisor));
    const raw: Dot[] = [];
    for (let y = 0; y < off.height; y += this.gap) {
      for (let x = 0; x < off.width; x += this.gap) {
        const i = (y * off.width + x) * 4;
        if (data[i + 3] < 40) continue; // transparent -> no dot
        const lum =
          (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
        raw.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, lum });
      }
    }

    // Normalise brightness so dark clothes/hair still show up.
    const sorted = raw.map((p) => p.lum).sort((a, b) => a - b);
    const lo = sorted[Math.floor(sorted.length * 0.05)] ?? 0;
    const hi = sorted[Math.floor(sorted.length * 0.95)] ?? 1;
    for (const p of raw) {
      const n = Math.min(1, Math.max(0, (p.lum - lo) / Math.max(0.0001, hi - lo)));
      p.lum = Math.pow(n, 0.7);
    }
    this.p = raw;
    if (this.reduced) this.draw(0); // static render for reduced-motion users
  }

  private loop() {
    if (this.raf || this.destroyed || this.reduced) return;
    this.raf = requestAnimationFrame((t) => {
      this.raf = 0;
      this.draw(t);
      if (this.visible && !this.destroyed) this.loop();
    });
  }

  private draw(t: number) {
    if (!this.p.length) return;
    const { ctx, o, mouse } = this;
    const radius = o.radius * this.w;
    const k = this.gap / 5;
    const wave = this.reduced ? 0 : o.wave;
    const [R, G, B] = o.rgb;
    ctx.clearRect(0, 0, this.w, this.h);

    for (const p of this.p) {
      const ty =
        p.hy + Math.sin(p.hx * 0.03 + t * 0.0015 + p.hy * 0.02) * wave;
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const d = Math.hypot(dx, dy);
      if (d < radius && d > 0.01) {
        const f = Math.pow(1 - d / radius, 2) * o.push;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
      p.vx += (p.hx - p.x) * o.spring;
      p.vy += (ty - p.y) * o.spring;
      p.vx *= o.friction;
      p.vy *= o.friction;
      p.x += p.vx;
      p.y += p.vy;

      const speed = Math.min(Math.hypot(p.vx, p.vy) / 4, 1);
      const size = (0.6 + p.lum * 1.4 + speed * 1.2) * k;
      ctx.fillStyle = `rgba(${R},${G},${B},${0.3 + p.lum * 0.55 + speed * 0.3})`;
      if (size > 1.6 * k) {
        // plus-shaped bright dots
        ctx.fillRect(p.x - size, p.y - 0.4, size * 2, 0.8);
        ctx.fillRect(p.x - 0.4, p.y - size, 0.8, size * 2);
      } else {
        ctx.fillRect(p.x - size / 2, p.y - size / 2, size, size);
      }
    }

    if (mouse.x > -999) {
      // crosshair cursor
      ctx.strokeStyle = o.crosshair;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(mouse.x - 9, mouse.y);
      ctx.lineTo(mouse.x + 9, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - 9);
      ctx.lineTo(mouse.x, mouse.y + 9);
      ctx.stroke();
    }
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    this.c.removeEventListener("pointermove", this.onMove);
    this.c.removeEventListener("pointerleave", this.onLeave);
    this.ro.disconnect();
    this.io.disconnect();
  }
}
