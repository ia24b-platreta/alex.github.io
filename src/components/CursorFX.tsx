import { useEffect, useRef, useState } from 'react';

/**
 * Two effects bundled:
 * 1. A subtle green block that follows the cursor with a tiny lag.
 * 2. A green ripple that expands and fades on every click.
 *
 * Skips on touch-only devices and when prefers-reduced-motion is set.
 */
export function CursorFX() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const ripplesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // pointer:fine excludes touch-only devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;
    let raf: number | undefined;
    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (raf === undefined) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      tx = -100;
      ty = -100;
    };
    const loop = () => {
      // simple lerp for lag
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      dot.style.transform = `translate3d(${cx - 6}px, ${cy - 6}px, 0)`;
      if (Math.abs(tx - cx) > 0.2 || Math.abs(ty - cy) > 0.2) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = undefined;
      }
    };

    const onDown = (e: PointerEvent) => {
      const layer = ripplesRef.current;
      if (!layer) return;
      const r = document.createElement('span');
      r.className = 'cfx-ripple';
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      layer.appendChild(r);
      r.addEventListener('animationend', () => r.remove(), { once: true });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      if (raf !== undefined) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div className="cfx-dot" ref={dotRef} aria-hidden="true" />
      <div className="cfx-ripples" ref={ripplesRef} aria-hidden="true" />
      <style>{`
        .cfx-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--accent) 70%, transparent);
          box-shadow:
            0 0 8px var(--accent),
            0 0 18px color-mix(in srgb, var(--accent) 50%, transparent);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 9999;
          will-change: transform;
          transform: translate3d(-100px, -100px, 0);
        }
        [data-theme='light'] .cfx-dot {
          mix-blend-mode: multiply;
          background: color-mix(in srgb, var(--accent) 35%, transparent);
          box-shadow: 0 0 6px color-mix(in srgb, var(--accent) 40%, transparent);
        }
        .cfx-ripples {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9998;
        }
        .cfx-ripple {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1.5px solid var(--accent);
          transform: translate(-50%, -50%) scale(0.4);
          opacity: 0.85;
          animation: cfx-ripple-out 620ms ease-out forwards;
          mix-blend-mode: screen;
        }
        [data-theme='light'] .cfx-ripple {
          mix-blend-mode: multiply;
          border-color: color-mix(in srgb, var(--accent) 60%, transparent);
        }
        @keyframes cfx-ripple-out {
          0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0.85; }
          100% { transform: translate(-50%, -50%) scale(4);   opacity: 0;    }
        }
      `}</style>
    </>
  );
}
