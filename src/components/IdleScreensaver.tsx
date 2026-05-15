import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 30_000;
const FRAME_MS = 50; // 20fps
const WIDTH = 60;
const HEIGHT = 22;

// Constants from the classic donut.c (Andy Sloane)
const R1 = 1;
const R2 = 2;
const K2 = 5;
const K1 = (WIDTH * K2 * 3) / (8 * (R1 + R2));
const THETA_STEP = 0.07;
const PHI_STEP = 0.02;
const CHARSET = '.,-~:;=!*#$@';

function renderFrame(A: number, B: number): string {
  const output = new Array<string>(WIDTH * HEIGHT).fill(' ');
  const zbuf = new Array<number>(WIDTH * HEIGHT).fill(0);
  const cosA = Math.cos(A);
  const sinA = Math.sin(A);
  const cosB = Math.cos(B);
  const sinB = Math.sin(B);

  for (let theta = 0; theta < 2 * Math.PI; theta += THETA_STEP) {
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    for (let phi = 0; phi < 2 * Math.PI; phi += PHI_STEP) {
      const cosP = Math.cos(phi);
      const sinP = Math.sin(phi);

      const circleX = R2 + R1 * cosT;
      const circleY = R1 * sinT;

      const x = circleX * (cosB * cosP + sinA * sinB * sinP) - circleY * cosA * sinB;
      const y = circleX * (sinB * cosP - sinA * cosB * sinP) + circleY * cosA * cosB;
      const z = K2 + cosA * circleX * sinP + circleY * sinA;
      const ooz = 1 / z;

      const xp = Math.floor(WIDTH / 2 + K1 * ooz * x);
      const yp = Math.floor(HEIGHT / 2 - (K1 / 2) * ooz * y);
      const L =
        cosP * cosT * sinB -
        cosA * cosT * sinP -
        sinA * sinT +
        cosB * (cosA * sinT - cosT * sinA * sinP);

      if (L > 0 && yp >= 0 && yp < HEIGHT && xp >= 0 && xp < WIDTH) {
        const idx = yp * WIDTH + xp;
        if (ooz > zbuf[idx]) {
          zbuf[idx] = ooz;
          const li = Math.floor(L * 8);
          output[idx] = CHARSET[Math.max(0, Math.min(CHARSET.length - 1, li))];
        }
      }
    }
  }

  let result = '';
  for (let r = 0; r < HEIGHT; r++) {
    result += output.slice(r * WIDTH, (r + 1) * WIDTH).join('') + '\n';
  }
  return result;
}

export function IdleScreensaver() {
  const [idle, setIdle] = useState(false);
  const [frame, setFrame] = useState('');
  const timerRef = useRef<number | undefined>(undefined);
  const aRef = useRef(0);
  const bRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const lastFrameTime = useRef(0);
  const reducedRef = useRef(false);

  // Set up reduced-motion + activity tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedRef.current) return;

    const reset = () => {
      setIdle(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setIdle(true), IDLE_MS);
    };
    reset();

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'keydown',
      'touchstart',
      'scroll',
      'wheel',
      'click',
      'pointerdown',
    ];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    document.addEventListener('visibilitychange', reset);

    return () => {
      window.clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
      document.removeEventListener('visibilitychange', reset);
    };
  }, []);

  // Animate while idle
  useEffect(() => {
    if (!idle) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const loop = (t: number) => {
      if (t - lastFrameTime.current >= FRAME_MS) {
        lastFrameTime.current = t;
        aRef.current += 0.05;
        bRef.current += 0.025;
        setFrame(renderFrame(aRef.current, bRef.current));
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [idle]);

  if (!idle) return null;

  return (
    <div className="saver" role="presentation" aria-hidden="true">
      <pre className="saver__donut">{frame}</pre>
      <div className="saver__hint text-faint">
        // idle. touch anywhere to wake.
      </div>
      <style>{`
        .saver {
          position: fixed;
          inset: 0;
          z-index: 150;
          background: var(--bg-deep);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: saver-in 240ms ease-out;
        }
        @keyframes saver-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .saver__donut {
          font-family: inherit;
          color: var(--accent);
          font-size: clamp(8px, 1.8vw, 14px);
          line-height: 1;
          letter-spacing: 0;
          white-space: pre;
          margin: 0;
          text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 50%, transparent);
          font-variant-ligatures: none;
          font-feature-settings: 'liga' 0, 'calt' 0;
        }
        [data-theme='light'] .saver__donut {
          text-shadow: none;
        }
        .saver__hint {
          margin-top: 24px;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
