import { useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type Props = {
  src: string;
  alt: string;
};

type Glyph = {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  alpha: number;
  size: number;
  depth: number;
};

const CHARS = "@#%&8BWM*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorFor(alpha: number, accent: number, depth: number, time: number) {
  const shimmer = Math.sin(time * 0.003 + alpha * 8) * 0.15;
  
  const baseR = 10, baseG = 25, baseB = 47;
  const neonR = 100, neonG = 255, neonB = 218;

  const t = clamp(depth * 1.5 + accent * 0.4 + shimmer, 0, 1);
  
  const r = Math.round(mix(baseR, neonR, t));
  const g = Math.round(mix(baseG, neonG, t));
  const b = Math.round(mix(baseB, neonB, t));
  
  const opacity = clamp(alpha + accent * 0.5 + shimmer, 0.2, 0.96);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function measure(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return {
    width: Math.max(240, Math.round(rect.width)),
    height: Math.max(220, Math.round(rect.height)),
  };
}

function sampleImage(image: HTMLImageElement, width: number, height: number): Glyph[] {
  const offscreen = document.createElement("canvas");
  const ctx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  offscreen.width = width;
  offscreen.height = height;
  ctx.clearRect(0, 0, width, height);

  const fit = 0.92;
  const sourceRatio = image.width / image.height;
  let drawHeight = height * fit;
  let drawWidth = drawHeight * sourceRatio;
  if (drawWidth > width * fit) {
    drawWidth = width * fit;
    drawHeight = drawWidth / sourceRatio;
  }

  const drawX = (width - drawWidth) / 2;
  const drawY = (height - drawHeight) / 2;
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  const pixels = ctx.getImageData(0, 0, width, height).data;
  const stepY = width <= 280 ? 7 : 8;
  const stepX = stepY * 0.72;
  const glyphs: Glyph[] = [];

  for (let y = 0; y < height; y += stepY) {
    for (let x = 0; x < width; x += stepX) {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const index = (iy * width + ix) * 4;
      const a = pixels[index + 3] / 255;
      if (a < 0.2) continue;

      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];
      const brightness = (red + green + blue) / 765;
      const ink = 1 - brightness;
      if (ink < 0.08) continue;

      const charIndex = Math.floor(clamp(brightness, 0, 1) * (CHARS.length - 1));
      const alpha = clamp(ink * 1.65, 0.12, 0.95);

      glyphs.push({
        originX: x,
        originY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        char: CHARS[charIndex] ?? ".",
        alpha,
        size: stepY * (0.92 + ink * 0.24),
        depth: brightness,
      });
    }
  }

  return glyphs;
}

export function AsciiAvatar({ src, alt }: Props) {
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  // Removed isFinePointer restriction so it stays alive and interactive on mobile devices
  const animate = !prefersReduced;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glyphsRef = useRef<Glyph[]>([]);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    let disposed = false;
    const image = new Image();

    const draw = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const pointer = pointerRef.current;
      const radius = Math.min(width, height) * 0.23;

      if (animate) {
        const dx = pointer.x - width / 2;
        const dy = pointer.y - height / 2;
        const normX = Math.atan(dx / 300) / (Math.PI / 2);
        const normY = Math.atan(dy / 300) / (Math.PI / 2);
        // Apply 3D CSS transform to the entire canvas for a perfect look-at effect
        ctx.canvas.style.transform = `perspective(800px) rotateX(${-normY * 12}deg) rotateY(${normX * 12}deg)`;
      } else {
        ctx.canvas.style.transform = "none";
      }

      for (const glyph of glyphsRef.current) {
        let accent = 0;

        if (animate) {
          const px = pointer.x;
          const py = pointer.y;

          let localVx = 0;
          let localVy = 0;
          const distToMouse = Math.hypot(glyph.x - px, glyph.y - py);
          if (pointer.active && distToMouse < radius) {
            const force = (1 - distToMouse / radius) ** 2;
            const angle = Math.atan2(glyph.y - py, glyph.x - px);
            localVx = Math.cos(angle) * force * 1.5;
            localVy = Math.sin(angle) * force * 1.5;
            accent = force;
          }

          // Return strictly to origin point, preserving character grid completely
          glyph.vx += (glyph.originX - glyph.x) * 0.04 + localVx;
          glyph.vy += (glyph.originY - glyph.y) * 0.04 + localVy;
          glyph.vx *= 0.82;
          glyph.vy *= 0.82;
          glyph.x += glyph.vx;
          glyph.y += glyph.vy;
        } else {
          glyph.x = glyph.originX;
          glyph.y = glyph.originY;
        }

        ctx.font = `700 ${glyph.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = colorFor(glyph.alpha, accent, glyph.depth, time);
        ctx.fillText(glyph.char, glyph.x, glyph.y);
      }
    };

    const resize = () => {
      const { width, height } = measure(root);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx || !image.complete) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glyphsRef.current = sampleImage(image, width, height);
      const time = Date.now() - startTimeRef.current;
      draw(ctx, width, height, time);
    };

    const tick = () => {
      if (disposed) return;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { width, height } = measure(root);
        const time = Date.now() - startTimeRef.current;
        draw(ctx, width, height, time);
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
    };

    const onEnter = (event: PointerEvent) => {
      pointerRef.current.active = true;
      onMove(event);
    };

    const onLeave = () => {
      pointerRef.current.active = false;
    };

    const onWindowMove = (event: PointerEvent) => {
      if (pointerRef.current.active) return;
      const rect = root.getBoundingClientRect();
      pointerRef.current.x = event.clientX - rect.left;
      pointerRef.current.y = event.clientY - rect.top;
    };

    const onImageLoad = () => {
      if (disposed) return;
      resize();
      if (animate) {
        root.addEventListener("pointerenter", onEnter);
        root.addEventListener("pointermove", onMove, { passive: true });
        root.addEventListener("pointerleave", onLeave);
        window.addEventListener("pointermove", onWindowMove, { passive: true });
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    image.onload = onImageLoad;
    image.src = src;
    if (image.complete) onImageLoad();

    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [animate, src]);

  return (
    <div ref={rootRef} className="avatar ascii-avatar" aria-label={alt} data-cursor="drag">
      <canvas ref={canvasRef} className="ascii-canvas" aria-hidden="true" />
      <div className="avatar-frame" aria-hidden="true" />
    </div>
  );
}
