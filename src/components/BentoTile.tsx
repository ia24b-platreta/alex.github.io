import type { ReactNode, CSSProperties } from 'react';

interface BentoTileProps {
  children: ReactNode;
  label?: string;
  colSpan?: number;
  rowSpan?: number;
  accent?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function BentoTile({
  children,
  label,
  colSpan = 2,
  rowSpan = 1,
  accent = false,
  className = '',
  style,
}: BentoTileProps) {
  const tileStyle: CSSProperties = {
    ...style,
    ['--col-span' as string]: colSpan,
    ['--row-span' as string]: rowSpan,
  };

  return (
    <article className={`tile${accent ? ' tile--accent' : ''} ${className}`} style={tileStyle}>
      {label && <span className="tile__label mono">{label}</span>}
      <div className="tile__body">{children}</div>
      <style>{`
        .tile {
          position: relative;
          padding: 22px;
          border-radius: var(--radius-md);
          background: var(--surface-glass);
          border: 1px solid var(--border);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
        }
        @media (prefers-reduced-motion: no-preference) {
          .tile:hover {
            border-color: var(--border-strong);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
        }
        @media (min-width: 960px) {
          .tile {
            grid-column: span var(--col-span);
            grid-row: span var(--row-span);
            padding: 28px;
          }
        }
        .tile--accent {
          border-color: color-mix(in srgb, var(--gold) 35%, var(--border));
        }
        .tile--accent::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, color-mix(in srgb, var(--gold) 18%, transparent), transparent 60%);
          pointer-events: none;
        }
        .tile__label {
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .tile__body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>
    </article>
  );
}
