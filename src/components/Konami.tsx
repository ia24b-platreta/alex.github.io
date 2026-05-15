import { useEffect, useState } from 'react';

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function Konami() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[idx];
      const got = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (got === expected.toLowerCase() || got === expected) {
        idx += 1;
        if (idx === SEQUENCE.length) {
          setUnlocked(true);
          idx = 0;
        }
      } else {
        idx = got === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    document.documentElement.classList.add('konami');
    const t = window.setTimeout(() => {
      // keep the rainbow on but hide the banner overlay
      setUnlocked(false);
    }, 4200);
    return () => window.clearTimeout(t);
  }, [unlocked]);

  return (
    <>
      {unlocked && (
        <div className="konami-overlay" role="status" aria-label="Cheat code activated">
          <pre className="konami-art">{`  ┌──────────────────────────────────────────┐
  │  ★ CHEAT CODE ACCEPTED                    │
  │                                          │
  │  + 30 LIVES                               │
  │  + RAINBOW MODE UNLOCKED                  │
  │  + INFINITE CHARISMA                      │
  └──────────────────────────────────────────┘`}</pre>
        </div>
      )}
      <style>{`
        .konami-overlay {
          position: fixed;
          inset: 0;
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          padding: 24px;
          animation: konami-pop 4.2s ease-out forwards;
        }
        .konami-art {
          font-family: inherit;
          color: var(--accent);
          font-size: clamp(0.7rem, 1.4vw, 1rem);
          line-height: 1.25;
          background: var(--bg-deep);
          padding: 16px 22px;
          border: 1px solid var(--accent);
          box-shadow:
            0 0 0 1px var(--accent),
            0 0 40px color-mix(in srgb, var(--accent) 60%, transparent);
          white-space: pre;
        }
        @keyframes konami-pop {
          0%   { opacity: 0; transform: scale(0.94); }
          10%  { opacity: 1; transform: scale(1); }
          85%  { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1); }
        }

        /* Once unlocked, the body gets a slow hue-rotate */
        html.konami body {
          animation: konami-hue 6s linear infinite;
        }
        @keyframes konami-hue {
          from { filter: hue-rotate(0deg); }
          to   { filter: hue-rotate(360deg); }
        }
      `}</style>
    </>
  );
}
