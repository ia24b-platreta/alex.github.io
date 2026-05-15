import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#terminal', label: 'shell' },
  { href: '#contact', label: 'contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="alex.platreta — home">
          <span className="nav__dot" aria-hidden="true" />
          <span className="text-faint">user@</span>
          <span className="text-dim">alex.platreta</span>
          <span className="text-faint">:</span>
          <span className="text-cyan">~/portfolio</span>
        </a>
        <nav aria-label="Primary" className="nav__links">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} className="nav__link">
              <span className="text-faint">{String(i + 1).padStart(2, '0')}</span>{' '}
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <style>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          padding-block: 12px;
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px dashed transparent;
          transition: border-color 200ms ease;
          font-size: 0.85rem;
        }
        .nav--scrolled {
          border-bottom-color: var(--border);
        }
        .nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .nav__brand {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: none;
          color: inherit;
        }
        .nav__brand:hover {
          color: inherit;
          border-bottom: none;
        }
        .nav__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px var(--accent);
          margin-right: 4px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .nav__dot {
            animation: pulse-dot 2s ease-in-out infinite;
          }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .nav__links {
          display: none;
          align-items: center;
          gap: 18px;
        }
        .nav__link {
          color: var(--text-dim);
          border-bottom: none;
          font-size: 0.85rem;
          transition: color 160ms ease;
        }
        .nav__link:hover {
          color: var(--accent);
          border-bottom: none;
        }
        @media (min-width: 760px) {
          .nav__links {
            display: inline-flex;
          }
        }
        @media (max-width: 540px) {
          .nav__brand .text-faint:first-of-type,
          .nav__brand .text-dim {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
