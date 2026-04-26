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

const CHARS = " .'`^\"\\,:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorFor(alpha: number, accent: number, depth: number, time: number) {
  // Gazijarin style: uniform monochromatic neon
  const r = 100, g = 255, b = 218; // #64ffda
  
  // Opacity increases when hovering (accent)
  const opacity = clamp(alpha + accent * 0.6, 0.15, 0.75);
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

  const fit = 1.0; // Show full body, not just face
  const sourceRatio = image.width / image.height;
  let drawHeight = height * fit;
  let drawWidth = drawHeight * sourceRatio;
  if (drawWidth > width * fit) {
    drawWidth = width * fit;
    drawHeight = drawWidth / sourceRatio;
  }

  const drawX = (width - drawWidth) / 2;
  const drawY = (height - drawHeight) / 2; // Center vertically
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  const pixels = ctx.getImageData(0, 0, width, height).data;
  const stepY = width <= 280 ? 5 : 6; // Balanced resolution for full body
  const stepX = stepY * 0.55; // Tighter horizontal spacing for denser look
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
      let brightness = (red + green + blue) / 765;
      
      // Rely on alpha channel (line 82) to skip background, NOT brightness
      // This preserves dark hair while still removing transparent background
      
      // Gazijarin mapping: darker areas use sparse characters, brighter areas use dense ones
      let b = clamp(brightness * 1.1, 0, 1);
      
      const charIndex = Math.floor(b * (CHARS.length - 1));
      const alpha = clamp(b * 0.8, 0.1, 0.75); // Softer opacity

      glyphs.push({
        originX: x,
        originY: y,
        // Start scattered randomly for the water-drop formation effect
        x: x + (Math.random() - 0.5) * width * 1.2,
        y: y + (Math.random() - 0.5) * height * 1.2,
        vx: 0,
        vy: 0,
        char: CHARS[charIndex] ?? ".",
        alpha,
        size: stepY * 1.1, // Constant size for classic ASCII look
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

      ctx.canvas.style.transition = "transform 0.15s ease-out";
      if (animate && pointer.active) {
        const dx = pointer.x - width / 2;
        const dy = pointer.y - height / 2;
        const normX = Math.atan(dx / 300) / (Math.PI / 2);
        const normY = Math.atan(dy / 300) / (Math.PI / 2);
        // Apply 3D CSS transform to the entire canvas for a perfect look-at effect
        ctx.canvas.style.transform = `perspective(800px) rotateX(${-normY * 12}deg) rotateY(${normX * 12}deg)`;
      } else {
        ctx.canvas.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
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

          // Water-drop formation: stronger pull during the first 2 seconds
          const formationDuration = 2000; // 2 seconds
          const formationProgress = clamp(time / formationDuration, 0, 1);
          // Ease-out cubic for a fluid, water-like deceleration
          const ease = 1 - Math.pow(1 - formationProgress, 3);
          // Spring strength ramps up from very gentle to full
          const spring = 0.01 + ease * 0.06;
          const damping = 0.75 + ease * 0.07;

          glyph.vx += (glyph.originX - glyph.x) * spring + localVx;
          glyph.vy += (glyph.originY - glyph.y) * spring + localVy;
          glyph.vx *= damping;
          glyph.vy *= damping;
          glyph.x += glyph.vx;
          glyph.y += glyph.vy;
        } else {
          glyph.x = glyph.originX;
          glyph.y = glyph.originY;
        }

        // Fade in opacity during formation
        const fadeProgress = clamp(time / 1200, 0, 1);
        const drawAlpha = glyph.alpha * fadeProgress;

        ctx.font = `700 ${glyph.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = colorFor(drawAlpha, accent, glyph.depth, time);
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



    const onImageLoad = () => {
      if (disposed) return;
      resize();
      if (animate) {
        root.addEventListener("pointerenter", onEnter);
        root.addEventListener("pointermove", onMove, { passive: true });
        root.addEventListener("pointerleave", onLeave);
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
