import { useEffect, useState } from 'react';

const STORAGE_KEY = 'session-start';

function readStart(): number {
  if (typeof window === 'undefined') return Date.now();
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const n = parseInt(stored, 10);
      if (!Number.isNaN(n)) return n;
    }
  } catch {
    /* ignore */
  }
  const now = Date.now();
  try {
    sessionStorage.setItem(STORAGE_KEY, String(now));
  } catch {
    /* ignore */
  }
  return now;
}

function fmt(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function UptimeTicker() {
  const [start] = useState(readStart);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const secs = Math.max(0, Math.floor((now - start) / 1000));

  return (
    <span className="uptime" title="session uptime">
      <span className="text-faint">up </span>
      <span className="text-dim mono">{fmt(secs)}</span>
      <style>{`
        .uptime {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </span>
  );
}
