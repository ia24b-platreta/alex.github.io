import { BentoTile } from './BentoTile';

export function AchievementTile() {
  return (
    <BentoTile label="Recognition" colSpan={4} rowSpan={1} accent>
      <div className="ach">
        <div className="ach__medal" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="15" r="6" />
            <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
            <path d="M7 3h10l-1.5 7h-7L7 3z" />
          </svg>
        </div>
        <div className="ach__copy">
          <div className="ach__rank">
            <span className="ach__num mono">11<sup>th</sup></span>
            <span className="ach__where">in Switzerland</span>
            <span className="ach__sep" aria-hidden="true">·</span>
            <span className="ach__num mono">4<sup>th</sup></span>
            <span className="ach__where">in Zürich</span>
          </div>
          <p className="ach__event">
            Regionalmeisterschaften <span className="mono">2026</span>
          </p>
        </div>
      </div>
      <style>{`
        .ach {
          display: flex;
          gap: 18px;
          align-items: center;
          height: 100%;
        }
        .ach__medal {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: color-mix(in srgb, var(--gold) 18%, transparent);
          color: var(--gold);
          border: 1px solid color-mix(in srgb, var(--gold) 35%, transparent);
        }
        .ach__copy {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ach__rank {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 6px 8px;
          font-size: 1.05rem;
        }
        .ach__num {
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .ach__num sup {
          font-size: 0.6em;
          margin-left: 1px;
          color: var(--text-dim);
        }
        .ach__where {
          color: var(--text-dim);
          font-size: 0.95rem;
        }
        .ach__sep {
          color: var(--text-faint);
          padding-inline: 2px;
        }
        .ach__event {
          font-size: 0.9rem;
          color: var(--text-faint);
          letter-spacing: 0.01em;
        }
        @media (max-width: 480px) {
          .ach__num {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </BentoTile>
  );
}
