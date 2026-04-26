import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type CursorMode = "default" | "link" | "text" | "drag";

function isInteractive(el: Element | null) {
  if (!el) return false;
  return Boolean(
    el.closest(
      'a, button, input, textarea, select, summary, [role="button"], [tabindex]:not([tabindex="-1"]), [data-cursor]'
    )
  );
}

function modeForElement(el: Element | null): CursorMode {
  const node = el?.closest("[data-cursor]") as HTMLElement | null;
  const explicit = (node?.dataset.cursor as CursorMode | undefined) ?? undefined;
  if (explicit) return explicit;
  if (el?.closest("input, textarea")) return "text";
  if (isInteractive(el)) return "link";
  return "default";
}

export function CustomCursor() {
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)", false);
  const isFinePointer = useMediaQuery("(hover:hover) and (pointer:fine)", false);
  const enabled = isFinePointer && !prefersReduced;

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const currentDot = useRef({ x: 0, y: 0 });
  const currentRing = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("has-custom-cursor", enabled);
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onOver = (e: Event) => setMode(modeForElement(e.target as Element | null));
    const onOut = (e: Event) => {
      const related = (e as MouseEvent).relatedTarget as Element | null;
      setMode(modeForElement(related));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    const tick = () => {
      const { x, y } = target.current;

      currentDot.current.x += (x - currentDot.current.x) * 0.65;
      currentDot.current.y += (y - currentDot.current.y) * 0.65;

      currentRing.current.x += (x - currentRing.current.x) * 0.18;
      currentRing.current.y += (y - currentRing.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentDot.current.x}px, ${currentDot.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentRing.current.x}px, ${currentRing.current.y}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  const className = `cursor ${visible ? "is-visible" : ""} mode-${mode}`;

  return (
    <div className={className} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}

