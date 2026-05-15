import { useEffect, useRef, useState } from 'react';

interface Stats {
  repos: number;
  stars: number;
  followers: number;
}

function useCountUp(target: number, durationMs = 700) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    if (target <= 0) {
      setValue(0);
      return;
    }
    startRef.current = null;
    const step = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / durationMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs]);

  return value;
}

const USER = 'ia24b-platreta';
const CACHE_KEY = `gh-stats:${USER}`;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

async function fetchStats(): Promise<Stats | null> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${USER}`);
    if (!userRes.ok) return null;
    const user = await userRes.json();
    const reposRes = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner`);
    const repos: Array<{ stargazers_count: number; fork: boolean }> = reposRes.ok ? await reposRes.json() : [];
    const stars = repos
      .filter((r) => !r.fork)
      .reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
    return {
      repos: user.public_repos ?? repos.length,
      stars,
      followers: user.followers ?? 0,
    };
  } catch {
    return null;
  }
}

export function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, t } = JSON.parse(cached) as { data: Stats; t: number };
        if (Date.now() - t < CACHE_TTL_MS) {
          setStats(data);
          setLoaded(true);
          return;
        }
      }
    } catch {
      /* ignore */
    }

    fetchStats().then((s) => {
      if (!mounted) return;
      setStats(s);
      setLoaded(true);
      if (s) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data: s, t: Date.now() }));
        } catch {
          /* ignore */
        }
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!loaded) {
    return (
      <span className="gh-stats">
        <span className="text-faint">[ </span>
        <span className="text-dim">loading…</span>
        <span className="text-faint"> ]</span>
      </span>
    );
  }

  if (!stats) return null;

  return (
    <>
      <StatsLink stats={stats} />
    </>
  );
}

function StatsLink({ stats }: { stats: Stats }) {
  const repos = useCountUp(stats.repos);
  const stars = useCountUp(stats.stars);
  return (
    <>
      <a
        className="gh-stats"
        href={`https://github.com/${USER}`}
        target="_blank"
        rel="noreferrer"
        title={`@${USER} on GitHub · ${stats.repos} repo${stats.repos === 1 ? '' : 's'}${stats.stars ? ` · ${stats.stars} stars` : ''}`}
      >
        <span className="text-faint">[ </span>
        <span className="text-dim">repos:</span>
        <span className="text-accent gh-stats__num">{repos}</span>
        {stats.stars > 0 && (
          <>
            <span className="text-faint"> · </span>
            <span className="text-dim">★</span>
            <span className="text-accent gh-stats__num">{stars}</span>
          </>
        )}
        <span className="text-faint"> ]</span>
      </a>
      <style>{`
        .gh-stats {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          letter-spacing: 0;
          border-bottom: none;
        }
        .gh-stats:hover { border-bottom: none; }
        .gh-stats__num {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </>
  );
}
