import { useEffect, useState } from 'react';

const LINES: { t: number; text: string; ok?: boolean }[] = [
  { t: 0.0001, text: 'booting alex.platreta v1.0.0' },
  { t: 0.0023, text: 'init kernel ........................', ok: true },
  { t: 0.0078, text: 'mounting /about ....................', ok: true },
  { t: 0.0142, text: 'mounting /skills ...................', ok: true },
  { t: 0.0211, text: 'mounting /projects .................', ok: true },
  { t: 0.0287, text: 'loading regionalmeisterschaften.log ', ok: true },
  { t: 0.0345, text: 'mounting /contact ..................', ok: true },
  { t: 0.0421, text: 'spawning shell at /dev/tty0 ........', ok: true },
  { t: 0.0498, text: 'system ready.' },
];

const STORAGE_KEY = 'boot-seen';
const PER_LINE_MS = 70;

export function BootSequence() {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  const [skip] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (sessionStorage.getItem(STORAGE_KEY)) return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return false;
  });

  useEffect(() => {
    if (skip) {
      setDone(true);
      return;
    }
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= LINES.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, PER_LINE_MS);
    return () => clearInterval(id);
  }, [skip]);

  useEffect(() => {
    if (skip || shown < LINES.length) return;
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
    }, 280);
    return () => clearTimeout(t);
  }, [shown, skip]);

  useEffect(() => {
    if (skip || done) return;
    const dismiss = () => {
      setDone(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
    };
    window.addEventListener('keydown', dismiss);
    window.addEventListener('pointerdown', dismiss);
    return () => {
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('pointerdown', dismiss);
    };
  }, [skip, done]);

  if (done) return null;

  return (
    <div className="boot" role="status" aria-label="System boot sequence">
      <div className="boot__inner">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="boot__line">
            <span className="text-faint">
              [{l.t.toFixed(7).padStart(11, ' ')}]
            </span>{' '}
            <span className="text-dim">{l.text}</span>
            {l.ok && <span className="text-accent"> OK</span>}
          </div>
        ))}
        {shown < LINES.length && (
          <span className="caret" aria-hidden="true" />
        )}
        {shown >= LINES.length && (
          <div className="boot__hint text-faint">
            // tap or press any key to continue
          </div>
        )}
      </div>
      <style>{`
        .boot {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: var(--bg-deep);
          color: var(--text);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fade-in 120ms ease-out;
        }
        .boot__inner {
          max-width: 540px;
          width: 100%;
          font-size: 0.82rem;
          line-height: 1.5;
        }
        .boot__line {
          font-variant-numeric: tabular-nums;
        }
        .boot__hint {
          margin-top: 12px;
          font-size: 0.78rem;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
