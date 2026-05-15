import { useEffect, useState } from 'react';

/**
 * Fake-but-believable cpu / mem readout that jitters over time.
 * Pure decoration — gives the terminal title bar a sense of life.
 */
export function SystemTicker() {
  const [cpu, setCpu] = useState(18);
  const [mem, setMem] = useState(47);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      setCpu((c) => {
        // bias toward the 15–35 range with occasional small spikes
        const delta = (Math.random() - 0.5) * 8;
        const next = c + delta + (c > 35 ? -2 : c < 15 ? 2 : 0);
        return Math.max(6, Math.min(78, Math.round(next)));
      });
      setMem((m) => {
        const delta = (Math.random() - 0.5) * 3;
        return Math.max(35, Math.min(72, Math.round(m + delta)));
      });
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="sysmon">
      <span className="text-faint">cpu </span>
      <span className="mono">{String(cpu).padStart(2, ' ')}%</span>
      <span className="text-faint"> · mem </span>
      <span className="mono">{String(mem).padStart(2, ' ')}%</span>
      <style>{`
        .sysmon {
          font-variant-numeric: tabular-nums;
          font-size: 0.78rem;
        }
      `}</style>
    </span>
  );
}
