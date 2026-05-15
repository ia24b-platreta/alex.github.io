export function AchievementTile() {
  return (
    <>
      <div className="ach">
        <div className="ach__title">
          <span className="text-amber">★</span>{' '}
          <span className="text-bright">Regionalmeisterschaften</span>{' '}
          <span className="text-faint mono">2026</span>
        </div>
        <div className="ach__tree">
          <div className="ach__row">
            <span className="text-faint">├─</span>{' '}
            <span className="text-dim">Switzerland</span>{' '}
            <span className="ach__dots" aria-hidden="true" />
            <span className="text-amber mono">rank 11</span>
          </div>
          <div className="ach__row">
            <span className="text-faint">└─</span>{' '}
            <span className="text-dim">Zürich</span>{' '}
            <span className="ach__dots" aria-hidden="true" />
            <span className="text-amber mono">rank&nbsp; 4</span>
          </div>
        </div>
        <div className="ach__comment text-faint">// top 11 / CH · top 4 / ZH</div>
      </div>
      <style>{`
        .ach {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 18px 20px;
          border: 1px dashed var(--border);
          background: color-mix(in srgb, var(--surface) 60%, transparent);
          position: relative;
          overflow: hidden;
          transition: border-color 240ms ease, box-shadow 240ms ease;
        }
        .ach::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--amber), transparent);
          opacity: 0.35;
        }
        .ach:hover {
          border-color: color-mix(in srgb, var(--amber) 50%, var(--border));
          box-shadow: 0 0 24px color-mix(in srgb, var(--amber) 8%, transparent);
        }
        .ach__title {
          font-size: 1rem;
          letter-spacing: -0.005em;
        }
        .ach__tree {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.95rem;
        }
        .ach__row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          font-variant-numeric: tabular-nums;
        }
        .ach__dots {
          flex: 1;
          height: 1em;
          border-bottom: 1px dotted var(--text-faint);
          margin-bottom: 0.25em;
          min-width: 24px;
        }
        .ach__comment {
          font-size: 0.82rem;
          margin-top: 4px;
        }
      `}</style>
    </>
  );
}
