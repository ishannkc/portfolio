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
  /** Called once, after the first frame has been drawn to the canvas. */
  onReady?: () => void;
}

interface BBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

const DEFAULTS: Omit<DotImageOptions, "onError" | "onReady"> = {
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

/** Furthest a dot may stray from its home position, in CSS pixels. */
const MAX_DISPLACEMENT = 80;
const MAX_DISPLACEMENT_SQ = MAX_DISPLACEMENT * MAX_DISPLACEMENT;

/** DPR caps: phone GPUs pay for every backing-store pixel. */
const FINE_DPR_CAP = 2;
const COARSE_DPR_CAP = 1.5;

/** Coarser grid for touch devices (no hover, fewer pixels to fill). */
const COARSE_GAP = 5;
const COARSE_DOT_SCALE = 1.12;
const COARSE_MAX_DOTS = 6000;

/** Batched drawing: dot radii are quantised into buckets, alphas into levels. */
const ALPHA_LEVELS = 32;
const SIZE_BUCKETS = 10;
const SIZE_BUCKET_STEP = 0.35; // multiples of the dot-size unit `k`
const BUCKET_COUNT = ALPHA_LEVELS * SIZE_BUCKETS;

/** Frame-time safety net (coarse pointers only). */
const FRAME_SAMPLE_TARGET = 30;
const FRAME_BUDGET_MS = 20;
const DEGRADE_GAP_FACTOR = 1.5;

/** Touch tap burst length, in milliseconds. */
const TAP_BURST_MS = 320;

/** Velocity/offset below which a dot counts as at rest (px/frame, px). */
const REST_SPEED_SQ = 0.0009;
const REST_OFFSET_SQ = 0.0004;

const LUM_BINS = 64;

/**
 * Renders an image as a grid of interactive dots on a canvas.
 * Framework-agnostic: instantiate with a canvas element and destroy on unmount.
 */
export default class DotImage {
  private c: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private o: DotImageOptions;
  private reduced: boolean;
  private coarse: boolean;
  private dpr: number;
  private img: HTMLImageElement | null = null;
  private bbox: BBox | null = null;

  private w = 0;
  private h = 0;
  private gap = 0;
  private dotScale = 1;
  private gapScale = 1;

  private start = 0;
  private assembled = false;
  private staticMode = false;
  private degraded = false;
  private readyFired = false;

  private visible = true;
  private raf = 0;
  private destroyed = false;
  private lastWidth = -1;

  /** Dot data, stored as parallel typed arrays (no per-dot objects). */
  private n = 0;
  private hx = new Float32Array(0);
  private hy = new Float32Array(0);
  private sx = new Float32Array(0);
  private sy = new Float32Array(0);
  /** Precomputed curve-control offset for the assemble path. */
  private cvx = new Float32Array(0);
  private cvy = new Float32Array(0);
  private dly = new Float32Array(0);
  private dur = new Float32Array(0);
  private ease = new Float32Array(0);
  private tw = new Float32Array(0);
  /** Base dot size and settled opacity, precomputed from brightness. */
  private bs = new Float32Array(0);
  private ba = new Float32Array(0);
  private x = new Float32Array(0);
  private y = new Float32Array(0);
  private vx = new Float32Array(0);
  private vy = new Float32Array(0);

  /** Per-frame batching scratch space (allocated once, reused). */
  private sizeIdx = new Uint8Array(0);
  private alphaIdx = new Uint8Array(0);
  private order = new Int32Array(0);
  private bucketCount = new Int32Array(BUCKET_COUNT);
  private bucketStart = new Int32Array(BUCKET_COUNT);
  private bucketCursor = new Int32Array(BUCKET_COUNT);
  private alphaStyles: string[] = [];

  private mouse = { x: -9999, y: -9999 };
  private burstX = 0;
  private burstY = 0;
  private burstUntil = 0;
  private burstActive = false;

  private sampleFrames = 0;
  private sampleTime = 0;
  private lastFrameTime = 0;
  private budgetChecked = false;

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
    this.coarse = window.matchMedia("(pointer: coarse)").matches;
    this.dpr = Math.min(
      window.devicePixelRatio || 1,
      this.coarse ? COARSE_DPR_CAP : FINE_DPR_CAP,
    );
    this.alphaStyles = this.buildAlphaStyles();

    this.c.style.touchAction = "pan-y"; // keep page scrolling on touch
    this.c.addEventListener("pointermove", this.onMove, { passive: true });
    this.c.addEventListener("pointerleave", this.onLeave);
    this.c.addEventListener("pointerdown", this.onDown, { passive: true });
    document.addEventListener("visibilitychange", this.onVisibility);

    // Only a real width change should re-sample. Height-only changes (mobile
    // browser chrome collapsing) must not rebuild the whole dot grid.
    this.lastWidth = Math.round(this.c.getBoundingClientRect().width);
    this.ro = new ResizeObserver(() => {
      const width = Math.round(this.c.getBoundingClientRect().width);
      if (width === this.lastWidth) return;
      this.lastWidth = width;
      if (!this.img) return;
      this.build();
      this.kick();
    });
    this.ro.observe(this.c);

    this.io = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      if (this.visible) this.kick();
      else this.cancel();
    });
    this.io.observe(this.c);

    this.load(src);
  }

  private onMove = (e: PointerEvent) => {
    // Touch/pen drags are for scrolling, not for repelling dots.
    if (e.pointerType !== "mouse") return;
    const r = this.c.getBoundingClientRect();
    this.mouse.x = e.clientX - r.left;
    this.mouse.y = e.clientY - r.top;
    this.kick();
  };

  private onLeave = () => {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  };

  private onDown = (e: PointerEvent) => {
    // A short, one-off burst so taps still feel alive without tracking drags.
    if (e.pointerType === "mouse") return;
    const r = this.c.getBoundingClientRect();
    this.burstX = e.clientX - r.left;
    this.burstY = e.clientY - r.top;
    this.burstUntil = performance.now() + TAP_BURST_MS;
    this.burstActive = true;
    this.kick();
  };

  private onVisibility = () => {
    if (document.hidden) this.cancel();
    else if (this.visible) this.kick();
  };

  private buildAlphaStyles(): string[] {
    const [r, g, b] = this.o.rgb;
    const out: string[] = [];
    for (let i = 0; i < ALPHA_LEVELS; i++) {
      out.push(`rgba(${r},${g},${b},${(i / (ALPHA_LEVELS - 1)).toFixed(3)})`);
    }
    return out;
  }

  private load(src: string) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (this.destroyed) return;
      this.img = img;
      this.bbox = this.computeBBox(img);
      this.build();
      this.kick();
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

    // Downscale the source to display size first: getImageData then costs
    // (display pixels), not the full-resolution PNG.
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.ceil(this.w));
    off.height = Math.max(1, Math.ceil(this.h));
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;
    octx.drawImage(this.img, b.x, b.y, b.w, b.h, dx, dy, dw, dh);
    const data = octx.getImageData(0, 0, off.width, off.height).data;
    const pw = off.width;
    const ph = off.height;

    // Spacing is defined in CSS pixels. Touch devices get a coarser grid and a
    // hard dot cap so the frame loop stays cheap.
    this.dotScale = this.coarse ? COARSE_DOT_SCALE : 1;
    let gap = Math.max(o.minGap, Math.round(this.w / o.gapDivisor));
    if (this.coarse) gap = Math.max(gap, COARSE_GAP);
    gap = Math.max(1, Math.round(gap * this.gapScale));

    const countDots = (step: number) => {
      let count = 0;
      for (let y = 0; y < ph; y += step) {
        for (let x = 0; x < pw; x += step) {
          if (data[(y * pw + x) * 4 + 3] >= 40) count++;
        }
      }
      return count;
    };

    let count = countDots(gap);
    const maxDots = this.coarse ? COARSE_MAX_DOTS : Number.POSITIVE_INFINITY;
    if (count > maxDots) {
      gap = Math.ceil(gap * Math.sqrt(count / maxDots));
      count = countDots(gap);
    }
    if (!count) return;
    this.gap = gap;

    const n = count;
    this.n = n;
    this.hx = new Float32Array(n);
    this.hy = new Float32Array(n);
    this.sx = new Float32Array(n);
    this.sy = new Float32Array(n);
    this.cvx = new Float32Array(n);
    this.cvy = new Float32Array(n);
    this.dly = new Float32Array(n);
    this.dur = new Float32Array(n);
    this.ease = new Float32Array(n);
    this.tw = new Float32Array(n);
    this.bs = new Float32Array(n);
    this.ba = new Float32Array(n);
    this.x = new Float32Array(n);
    this.y = new Float32Array(n);
    this.vx = new Float32Array(n);
    this.vy = new Float32Array(n);
    this.sizeIdx = new Uint8Array(n);
    this.alphaIdx = new Uint8Array(n);
    this.order = new Int32Array(n);

    const { hx, hy, sx, sy, cvx, cvy, dly, dur, ease, tw, bs, ba, x, y } = this;
    const lum = new Float32Array(n);
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let i = 0;
    for (let gy = 0; gy < ph; gy += gap) {
      for (let gx = 0; gx < pw; gx += gap) {
        const di = (gy * pw + gx) * 4;
        if (data[di + 3] < 40) continue; // transparent -> no dot
        hx[i] = gx;
        hy[i] = gy;
        lum[i] =
          (0.299 * data[di] + 0.587 * data[di + 1] + 0.114 * data[di + 2]) / 255;
        if (gx < minX) minX = gx;
        if (gy < minY) minY = gy;
        if (gx > maxX) maxX = gx;
        if (gy > maxY) maxY = gy;
        i++;
      }
    }

    // Brightness percentiles from a histogram (avoids sorting/allocating).
    const hist = new Int32Array(LUM_BINS);
    for (let j = 0; j < n; j++) {
      const bin = Math.min(LUM_BINS - 1, (lum[j] * LUM_BINS) | 0);
      hist[bin]++;
    }
    const percentile = (frac: number) => {
      const want = frac * n;
      let acc = 0;
      for (let bin = 0; bin < LUM_BINS; bin++) {
        acc += hist[bin];
        if (acc >= want) return bin / (LUM_BINS - 1);
      }
      return 1;
    };
    const lo = percentile(0.05);
    const hi = percentile(0.95);
    const span = Math.max(0.0001, hi - lo);
    for (let j = 0; j < n; j++) {
      let v = (lum[j] - lo) / span;
      v = v < 0 ? 0 : v > 1 ? 1 : v;
      const norm = Math.pow(v, 0.7);
      bs[j] = 0.6 + norm * 1.4;
      ba[j] = 0.3 + norm * 0.55;
      tw[j] = Math.random() * Math.PI * 2;
    }

    // First build starts the assemble animation; later rebuilds (resize,
    // degraded density) reuse the settled layout so the effect does not replay.
    const firstBuild = !this.assembled;
    this.assembled = true;

    if (firstBuild && !this.reduced) {
      const spanX = Math.max(1, maxX - minX);
      const spanY = Math.max(1, maxY - minY);
      for (let j = 0; j < n; j++) {
        const startX = minX + Math.random() * spanX;
        const startY = minY + Math.random() * spanY;
        sx[j] = startX;
        sy[j] = startY;
        const ddx = hx[j] - startX;
        const ddy = hy[j] - startY;
        const len = Math.hypot(ddx, ddy) || 1;
        const curve = (Math.random() - 0.5) * Math.min(20, len * 0.5);
        // Curve control offset computed once, not per frame.
        cvx[j] = (-ddy / len) * curve;
        cvy[j] = (ddx / len) * curve;
        dly[j] = Math.random() * 0.2;
        dur[j] = 0.4 + Math.random() * 0.4;
        ease[j] = 2 + Math.random() * 2;
        x[j] = startX;
        y[j] = startY;
      }
    } else {
      for (let j = 0; j < n; j++) {
        sx[j] = hx[j];
        sy[j] = hy[j];
        dly[j] = 0;
        dur[j] = 1;
        ease[j] = 1;
        cvx[j] = 0;
        cvy[j] = 0;
        x[j] = hx[j];
        y[j] = hy[j];
      }
    }

    // Sampling is finished: only now does the assemble clock start.
    if (firstBuild) this.start = performance.now();
    this.sampleFrames = 0;
    this.sampleTime = 0;
    this.lastFrameTime = 0;

    // Reduced motion (or a device that already failed the budget) renders a
    // single static frame.
    if (this.reduced || this.staticMode) this.render(Number.POSITIVE_INFINITY);
  }

  private kick() {
    if (
      this.destroyed ||
      this.reduced ||
      this.staticMode ||
      !this.visible ||
      document.hidden
    ) {
      return;
    }
    this.loop();
  }

  private cancel() {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  }

  private loop() {
    if (this.raf || this.destroyed || this.reduced || this.staticMode) return;
    this.raf = requestAnimationFrame(this.onFrame);
  }

  private onFrame = (t: number) => {
    this.raf = 0;
    if (this.destroyed || this.staticMode) return;

    // Frame-time sampling for the slow-device safety net (outliers such as a
    // backgrounded tab are ignored).
    if (this.lastFrameTime) {
      const dt = t - this.lastFrameTime;
      if (dt > 0 && dt < 250) {
        this.sampleFrames++;
        this.sampleTime += dt;
      }
    }
    this.lastFrameTime = t;

    const animate = this.render(t);

    if (this.coarse && !this.budgetChecked && this.sampleFrames >= FRAME_SAMPLE_TARGET) {
      this.checkBudget();
      if (this.destroyed || this.staticMode) return;
    }

    // On coarse pointers keep drawing until the frame budget has been sampled
    // once, otherwise a slow device could sleep before it is measured.
    if (animate || (this.coarse && !this.budgetChecked)) this.loop();
  };

  /**
   * Measures the average frame time and, on coarse pointers, drops to a
   * coarser grid once, then to a static frame if still over budget.
   */
  private checkBudget() {
    const frames = this.sampleFrames;
    const elapsed = this.sampleTime;
    this.sampleFrames = 0;
    this.sampleTime = 0;
    if (!frames) return;
    if (elapsed / frames <= FRAME_BUDGET_MS) {
      this.budgetChecked = true;
      return;
    }

    if (!this.degraded) {
      this.degraded = true;
      this.budgetChecked = false;
      this.gapScale *= DEGRADE_GAP_FACTOR;
      this.build();
      this.kick();
      return;
    }

    // Still slow at the coarsest density: no animation, just the portrait.
    this.staticMode = true;
    this.budgetChecked = true;
    this.cancel();
    this.snapHome();
    this.render(Number.POSITIVE_INFINITY);
  }

  /** Put every dot at rest on its home position (static frame). */
  private snapHome() {
    for (let i = 0; i < this.n; i++) {
      this.x[i] = this.hx[i];
      this.y[i] = this.hy[i];
      this.vx[i] = 0;
      this.vy[i] = 0;
    }
  }

  /** Returns true when another frame is needed. */
  private render(now: number): boolean {
    const n = this.n;
    if (!n) return false;
    const { ctx, o } = this;
    const finite = Number.isFinite(now);
    if (!finite) this.burstActive = false;

    const k = (this.gap / 5) * this.dotScale;
    const step = SIZE_BUCKET_STEP * k;
    const radius = o.radius * this.w;
    const radius2 = radius * radius;
    const maxAlpha = ALPHA_LEVELS - 1;
    const nowTs = finite ? now : 0;
    const elapsed = finite ? (now - this.start) / 1000 : Number.POSITIVE_INFINITY;
    const twinkleOn = !this.coarse && finite;

    if (this.burstActive && nowTs >= this.burstUntil) this.burstActive = false;
    const burstOn = this.burstActive && finite;
    const burstFade = burstOn ? (this.burstUntil - nowTs) / TAP_BURST_MS : 0;

    // A single interaction centre per frame keeps the inner loop branch-free.
    let ix = 0;
    let iy = 0;
    let strength = 0;
    if (this.mouse.x > -999) {
      ix = this.mouse.x;
      iy = this.mouse.y;
      strength = 1;
    } else if (burstOn && burstFade > 0) {
      ix = this.burstX;
      iy = this.burstY;
      strength = burstFade;
    }

    const { hx, hy, sx, sy, cvx, cvy, dly, dur, ease, tw, bs, ba, x, y, vx, vy } =
      this;
    const counts = this.bucketCount;
    counts.fill(0);

    let assembling = false;
    let moving = false;
    const push = o.push;
    const spring = o.spring;
    const friction = o.friction;

    for (let i = 0; i < n; i++) {
      const homeX = hx[i];
      const homeY = hy[i];
      let px = x[i];
      let py = y[i];
      let eased = 1;
      let assemblingDot = false;

      if (finite) {
        let prog = (elapsed - dly[i]) / dur[i];
        if (prog < 0) prog = 0;
        else if (prog > 1) prog = 1;
        if (prog < 1) {
          // Timestamp-based progress: dropped frames do not stretch the
          // total assemble duration.
          eased = 1 - Math.pow(1 - prog, ease[i]);
          const bend = Math.sin(prog * Math.PI);
          px = sx[i] + (homeX - sx[i]) * eased + cvx[i] * bend;
          py = sy[i] + (homeY - sy[i]) * eased + cvy[i] * bend;
          x[i] = px;
          y[i] = py;
          vx[i] = 0;
          vy[i] = 0;
          assemblingDot = true;
          assembling = true;
        }
      }

      let speed = 0;
      if (!assemblingDot) {
        let vxi = vx[i];
        let vyi = vy[i];

        if (strength > 0) {
          const dxp = px - ix;
          const dyp = py - iy;
          const d2 = dxp * dxp + dyp * dyp;
          if (d2 < radius2 && d2 > 1e-4) {
            const d = Math.sqrt(d2);
            const falloff = 1 - d / radius;
            const force = falloff * falloff * push * strength;
            vxi += (dxp / d) * force;
            vyi += (dyp / d) * force;
          }
        }

        // The spring runs every frame for every dot, independent of the
        // pointer and with no canvas-boundary handling.
        vxi += (homeX - px) * spring;
        vyi += (homeY - py) * spring;
        vxi *= friction;
        vyi *= friction;
        px += vxi;
        py += vyi;

        // Keep each dot within reach of its home so it can never be pushed
        // against the canvas edge and clipped into a pile.
        const offX = px - homeX;
        const offY = py - homeY;
        const off2 = offX * offX + offY * offY;
        if (off2 > MAX_DISPLACEMENT_SQ) {
          const ratio = MAX_DISPLACEMENT / Math.sqrt(off2);
          px = homeX + offX * ratio;
          py = homeY + offY * ratio;
        }

        x[i] = px;
        y[i] = py;
        vx[i] = vxi;
        vy[i] = vyi;

        const speed2 = vxi * vxi + vyi * vyi;
        if (speed2 > 0.0001) {
          speed = Math.sqrt(speed2) * 0.25;
          if (speed > 1) speed = 1;
        }
        if (!moving && (speed2 > REST_SPEED_SQ || off2 > REST_OFFSET_SQ)) {
          moving = true;
        }
      }

      const twinkle = twinkleOn ? Math.sin(nowTs * 0.0007 + tw[i]) : 0;
      const twinkleAmount = 0.2 * eased;
      const size =
        (bs[i] + speed * 1.2 + twinkle * twinkleAmount * 0.5) * k;
      const alpha =
        (ba[i] + speed * 0.3) *
        (0.3 + 0.7 * eased) *
        (1 + twinkle * twinkleAmount);

      const si = Math.min(
        SIZE_BUCKETS - 1,
        Math.max(0, Math.round(size / step)),
      );
      const ai = Math.min(maxAlpha, Math.max(0, Math.round(alpha * maxAlpha)));
      this.sizeIdx[i] = si;
      this.alphaIdx[i] = ai;
      counts[ai * SIZE_BUCKETS + si]++;
    }

    // Counting sort into size/alpha buckets so each bucket is one path + fill.
    const startOff = this.bucketStart;
    const cursor = this.bucketCursor;
    let acc = 0;
    for (let b = 0; b < BUCKET_COUNT; b++) {
      startOff[b] = acc;
      cursor[b] = acc;
      acc += counts[b];
    }
    const order = this.order;
    for (let i = 0; i < n; i++) {
      const b = this.alphaIdx[i] * SIZE_BUCKETS + this.sizeIdx[i];
      order[cursor[b]++] = i;
    }

    ctx.clearRect(0, 0, this.w, this.h);
    for (let ai = 0; ai < ALPHA_LEVELS; ai++) {
      const base = ai * SIZE_BUCKETS;
      let total = 0;
      for (let si = 0; si < SIZE_BUCKETS; si++) total += counts[base + si];
      if (!total) continue;

      ctx.fillStyle = this.alphaStyles[ai];
      ctx.beginPath();
      for (let si = 0; si < SIZE_BUCKETS; si++) {
        const count = counts[base + si];
        if (!count) continue;
        const size = si * step;
        const half = size * 0.5;
        const plus = size > 1.6 * k;
        const end = startOff[base + si] + count;
        for (let j = startOff[base + si]; j < end; j++) {
          const i = order[j];
          const px = x[i];
          const py = y[i];
          if (plus) {
            // plus-shaped bright dots
            ctx.rect(px - size, py - 0.4, size * 2, 0.8);
            ctx.rect(px - 0.4, py - size, 0.8, size * 2);
          } else {
            ctx.rect(px - half, py - half, size, size);
          }
        }
      }
      ctx.fill();
    }

    if (finite && !this.coarse && this.mouse.x > -999) {
      // crosshair cursor
      const mx = this.mouse.x;
      const my = this.mouse.y;
      ctx.strokeStyle = o.crosshair;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(mx - 9, my);
      ctx.lineTo(mx + 9, my);
      ctx.moveTo(mx, my - 9);
      ctx.lineTo(mx, my + 9);
      ctx.stroke();
    }

    // Fine pointers keep the idle twinkle (unchanged desktop behaviour);
    // coarse pointers sleep as soon as everything is at rest.
    if (!this.readyFired) {
      this.readyFired = true;
      this.o.onReady?.();
    }

    if (this.coarse) return assembling || moving || burstOn;
    return true;
  }

  destroy() {
    this.destroyed = true;
    this.cancel();
    this.c.removeEventListener("pointermove", this.onMove);
    this.c.removeEventListener("pointerleave", this.onLeave);
    this.c.removeEventListener("pointerdown", this.onDown);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.ro.disconnect();
    this.io.disconnect();
    this.n = 0;
  }
}
