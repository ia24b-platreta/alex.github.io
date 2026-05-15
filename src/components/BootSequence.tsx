import { useEffect, useState } from 'react';

interface BootLine {
  t: number;
  label: string;
  dots?: number;
  ok?: boolean;
}

const LINES: BootLine[] = [
  { t: 0.0001, label: 'booting alex.platreta v1.0.0' },
  { t: 0.0023, label: 'init kernel',           dots: 22, ok: true },
  { t: 0.0078, label: 'mounting /about',       dots: 22, ok: true },
  { t: 0.0142, label: 'mounting /skills',      dots: 22, ok: true },
  { t: 0.0211, label: 'mounting /projects',    dots: 22, ok: true },
  { t: 0.0287, label: 'loading achievements.log', dots: 18, ok: true },
  { t: 0.0345, label: 'mounting /contact',     dots: 22, ok: true },
  { t: 0.0421, label: 'spawning /dev/tty0',    dots: 22, ok: true },
  { t: 0.0498, label: 'system ready.' },
];

const STORAGE_KEY = 'boot-seen';
const PER_LINE_MS = 90;
const DOT_MS = 14;

interface ProgressLineProps {
  line: BootLine;
  onDone: () => void;
}

function ProgressLine({ line, onDone }: ProgressLineProps) {
  const [dotsShown, setDotsShown] = useState(line.dots ? 0 : (line.label.length));
  const total = line.dots ?? 0;
  const allDotsDone = dotsShown >= total;

  useEffect(() => {
    if (!line.dots) {
      const t = window.setTimeout(onDone, 40);
      return () => clearTimeout(t);
    }
    if (dotsShown < total) {
      const t = window.setTimeout(() => setDotsShown((d) => d + 1), DOT_MS + Math.random() * 10);
      return () => clearTimeout(t);
    }
    // dots are done, now show OK then advance
    const t = window.setTimeout(onDone, 40);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dotsShown, total, line.dots]);

  return (
    <div className="boot__line">
      <span className="text-faint">
        [{line.t.toFixed(7).padStart(11, ' ')}]
      </span>{' '}
      <span className="text-dim">{line.label}</span>
      {line.dots ? (
        <>
          {' '}
          <span className="text-faint">{'.'.repeat(dotsShown)}</span>
          {allDotsDone && line.ok && <span className="text-accent"> OK</span>}
        </>
      ) : null}
    </div>
  );
}

export function BootSequence() {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [advanceTick, setAdvanceTick] = useState(0);

  const [skip] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (sessionStorage.getItem(STORAGE_KEY)) return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return false;
  });

  // Initial: kick off first line
  useEffect(() => {
    if (skip) {
      setDone(true);
      return;
    }
    setShown(1);
  }, [skip]);

  // Advance to next line whenever current finishes
  useEffect(() => {
    if (skip || shown === 0 || shown >= LINES.length) return;
    if (advanceTick === 0) return; // wait for child to signal
    const t = window.setTimeout(() => setShown((s) => Math.min(LINES.length, s + 1)), PER_LINE_MS - 30);
    return () => clearTimeout(t);
  }, [advanceTick, shown, skip]);

  // After last line completes, fade out
  useEffect(() => {
    if (skip || shown < LINES.length) return;
    // Wait for last line's onDone via advanceTick increment
    if (advanceTick === 0) return;
    const t = window.setTimeout(() => {
      setDone(true);
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    }, 380);
    return () => clearTimeout(t);
  }, [advanceTick, shown, skip]);

  // Skip on any input
  useEffect(() => {
    if (skip || done) return;
    const dismiss = () => {
      setDone(true);
      try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
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
          <ProgressLine
            key={i}
            line={l}
            onDone={() => setAdvanceTick((n) => n + 1)}
          />
        ))}
        {shown < LINES.length && (
          <span className="caret boot__caret" aria-hidden="true" />
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
          animation: boot-in 120ms ease-out;
        }
        .boot__inner {
          max-width: 560px;
          width: 100%;
          font-size: 0.82rem;
          line-height: 1.55;
        }
        .boot__line {
          font-variant-numeric: tabular-nums;
        }
        .boot__caret {
          display: inline-block;
        }
        .boot__hint {
          margin-top: 14px;
          font-size: 0.78rem;
          animation: boot-hint-in 240ms ease-out;
        }
        @keyframes boot-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes boot-hint-in {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
