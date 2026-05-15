import { useEffect, useState } from 'react';
import { PromptLine } from './PromptLine';

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Day[];
}

const USER = 'ia24b-platreta';
const CACHE_KEY = `gh-graph:${USER}`;
const CACHE_TTL_MS = 1000 * 60 * 60 * 3; // 3 hours

const CELL = 11;
const GAP = 3;
const COLS = 53;
const ROWS = 7;
const W = COLS * (CELL + GAP);
const H = ROWS * (CELL + GAP);

function pad(rows: Day[]): (Day | null)[][] {
  // Sort ascending; the API returns the trailing 12 months.
  const sorted = [...rows].sort((a, b) => a.date.localeCompare(b.date));
  // align: first day's column offset = its weekday relative to Sunday
  const first = new Date(sorted[0].date);
  const offset = first.getDay(); // 0=Sun..6=Sat
  const grid: (Day | null)[][] = Array.from({ length: COLS }, () =>
    Array(ROWS).fill(null) as (Day | null)[],
  );
  let col = 0;
  let row = offset;
  for (const d of sorted) {
    if (col >= COLS) break;
    grid[col][row] = d;
    row += 1;
    if (row >= ROWS) {
      row = 0;
      col += 1;
    }
  }
  return grid;
}

export function GitHubGraph() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data: d, t } = JSON.parse(cached) as { data: ApiResponse; t: number };
        if (Date.now() - t < CACHE_TTL_MS) {
          setData(d);
          setLoaded(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }

    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((json: ApiResponse) => {
        if (!mounted) return;
        setData(json);
        setLoaded(true);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: json, t: Date.now() }));
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (!mounted) return;
        setFailed(true);
        setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!loaded) {
    return (
      <div className="ghg">
        <div className="ghg__head">
          <PromptLine cmd="cat" arg="~/.git/contributions.log" />
        </div>
        <p className="text-dim ghg__loading">loading github activity…</p>
        <style>{`
          .ghg__head { font-size: 0.95rem; margin-bottom: 12px; }
          .ghg__loading { font-size: 0.85rem; }
        `}</style>
      </div>
    );
  }

  if (failed || !data) {
    return null;
  }

  const grid = pad(data.contributions);
  const total = data.total.lastYear ?? Object.values(data.total)[0] ?? 0;
  const monthLabels = computeMonthLabels(data.contributions);

  return (
    <div className="ghg">
      <div className="ghg__head">
        <span className="prompt" />
        <span className="cmd text-bright">cat</span>{' '}
        <span className="arg">~/.git/contributions.log</span>
      </div>
      <div className="ghg__meta text-faint">
        <span>{total} contributions in the last year</span>
        <span className="ghg__user">@{USER}</span>
      </div>
      <div className="ghg__scroll">
        <svg
          className="ghg__svg"
          viewBox={`0 0 ${W} ${H + 18}`}
          width="100%"
          height={H + 18}
          role="img"
          aria-label={`${total} GitHub contributions in the last year by ${USER}`}
        >
          {monthLabels.map((m) => (
            <text
              key={`${m.label}-${m.col}`}
              x={m.col * (CELL + GAP)}
              y={10}
              className="ghg__month"
            >
              {m.label}
            </text>
          ))}
          <g transform={`translate(0, 16)`}>
            {grid.map((col, ci) =>
              col.map((d, ri) =>
                d ? (
                  <rect
                    key={`${ci}-${ri}`}
                    x={ci * (CELL + GAP)}
                    y={ri * (CELL + GAP)}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    ry={2}
                    className={`ghg__cell ghg__cell--lvl${d.level}`}
                  >
                    <title>
                      {d.count} contribution{d.count === 1 ? '' : 's'} on {d.date}
                    </title>
                  </rect>
                ) : null,
              ),
            )}
          </g>
        </svg>
      </div>
      <div className="ghg__legend text-faint">
        <span>less</span>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <span key={lvl} className={`ghg__legend-cell ghg__cell--lvl${lvl}`} />
        ))}
        <span>more</span>
      </div>
      <style>{`
        .ghg__head {
          font-size: 0.95rem;
          margin-bottom: 8px;
        }
        .ghg__meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          margin-bottom: 10px;
          padding-left: 2px;
        }
        .ghg__user { font-variant-numeric: tabular-nums; }
        .ghg__scroll {
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: thin;
          scrollbar-color: var(--border-strong) transparent;
        }
        .ghg__svg {
          min-width: ${W}px;
          display: block;
        }
        .ghg__month {
          fill: var(--text-faint);
          font-family: inherit;
          font-size: 9px;
        }
        .ghg__cell {
          transition: fill 200ms ease;
        }
        .ghg__cell--lvl0 { fill: var(--surface-2); stroke: var(--border); stroke-width: 0.5; }
        .ghg__cell--lvl1 { fill: color-mix(in srgb, var(--accent) 22%, var(--surface)); }
        .ghg__cell--lvl2 { fill: color-mix(in srgb, var(--accent) 50%, var(--surface)); }
        .ghg__cell--lvl3 { fill: color-mix(in srgb, var(--accent) 78%, var(--surface)); }
        .ghg__cell--lvl4 { fill: var(--accent); }
        [data-theme='dark'] .ghg__cell--lvl4 {
          filter: drop-shadow(0 0 4px color-mix(in srgb, var(--accent) 50%, transparent));
        }
        .ghg__legend {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 8px;
          font-size: 0.78rem;
          justify-content: flex-end;
        }
        .ghg__legend-cell {
          width: 10px;
          height: 10px;
          border-radius: 2px;
          background: var(--surface-2);
          display: inline-block;
        }
        .ghg__legend-cell.ghg__cell--lvl0 { background: var(--surface-2); border: 1px solid var(--border); }
        .ghg__legend-cell.ghg__cell--lvl1 { background: color-mix(in srgb, var(--accent) 22%, var(--surface)); }
        .ghg__legend-cell.ghg__cell--lvl2 { background: color-mix(in srgb, var(--accent) 50%, var(--surface)); }
        .ghg__legend-cell.ghg__cell--lvl3 { background: color-mix(in srgb, var(--accent) 78%, var(--surface)); }
        .ghg__legend-cell.ghg__cell--lvl4 { background: var(--accent); }
      `}</style>
    </div>
  );
}

function computeMonthLabels(contribs: Day[]): { label: string; col: number }[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const sorted = [...contribs].sort((a, b) => a.date.localeCompare(b.date));
  const first = new Date(sorted[0].date);
  const startOffset = first.getDay();
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  for (let i = 0; i < sorted.length; i++) {
    const d = new Date(sorted[i].date);
    const m = d.getMonth();
    if (m !== lastMonth) {
      const dayIndex = i + startOffset;
      const col = Math.floor(dayIndex / 7);
      // avoid stacking labels too close
      if (labels.length === 0 || col - labels[labels.length - 1].col >= 3) {
        labels.push({ label: months[m], col });
      }
      lastMonth = m;
    }
  }
  return labels;
}
