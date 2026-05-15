export function AchievementTile() {
  return (
    <>
      <div className="ach">
        <pre className="ach__frame">{`┌──────────────────────────────────────────────────────────────┐
│  Regionalmeisterschaften 2026                                │
│                                                              │
│    >  Switzerland  ........................  rank 11         │
│    >  Zürich       ........................  rank  4         │
│                                                              │
│  // top 11 / CH · top 4 / ZH                                 │
└──────────────────────────────────────────────────────────────┘`}</pre>

        <div className="ach__compact">
          <div className="ach__title">Regionalmeisterschaften 2026</div>
          <div className="ach__row">
            <span className="ach__where">Switzerland</span>
            <span className="ach__dots" aria-hidden="true">·························</span>
            <span className="ach__rank text-amber">rank 11</span>
          </div>
          <div className="ach__row">
            <span className="ach__where">Zürich</span>
            <span className="ach__dots" aria-hidden="true">······························</span>
            <span className="ach__rank text-amber">rank&nbsp; 4</span>
          </div>
          <div className="ach__comment text-faint">// top 11 / CH · top 4 / ZH</div>
        </div>
      </div>
      <style>{`
        .ach {
          color: var(--text);
        }
        .ach__frame {
          font-family: inherit;
          font-size: 0.78rem;
          line-height: 1.3;
          color: var(--accent-dim);
          white-space: pre;
          margin: 0;
          overflow-x: auto;
        }
        .ach__frame {
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 30%, transparent);
        }
        [data-theme='light'] .ach__frame {
          text-shadow: none;
          color: var(--accent);
        }
        .ach__compact {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 14px;
          border: 1px dashed var(--border-strong);
          font-size: 0.88rem;
        }
        .ach__title {
          color: var(--text-bright);
          margin-bottom: 6px;
        }
        .ach__row {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .ach__where {
          color: var(--text);
        }
        .ach__dots {
          flex: 1;
          color: var(--text-faint);
          overflow: hidden;
          white-space: nowrap;
        }
        .ach__rank {
          font-variant-numeric: tabular-nums;
        }
        .ach__comment {
          margin-top: 6px;
        }
        @media (max-width: 640px) {
          .ach__frame {
            display: none;
          }
          .ach__compact {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
