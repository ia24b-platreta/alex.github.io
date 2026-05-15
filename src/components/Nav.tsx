import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
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
        <a href="#top" className="nav__brand" aria-label="Alex Platreta, home">
          <span className="nav__mark">A.</span>
          <span className="nav__name">Alex Platreta</span>
        </a>
        <nav aria-label="Primary" className="nav__links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav__link">
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
          padding-block: 14px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          background: color-mix(in srgb, var(--bg) 65%, transparent);
          border-bottom: 1px solid transparent;
          transition: border-color 240ms ease, background 240ms ease;
        }
        .nav--scrolled {
          border-bottom-color: var(--border);
          background: color-mix(in srgb, var(--bg) 82%, transparent);
        }
        .nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .nav__brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .nav__mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          color: #fff;
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .nav__links {
          display: none;
          align-items: center;
          gap: 6px;
        }
        .nav__link {
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.92rem;
          color: var(--text-dim);
          transition: color 180ms ease, background 180ms ease;
        }
        .nav__link:hover {
          color: var(--text);
          background: var(--surface-2);
        }
        @media (min-width: 720px) {
          .nav__links {
            display: inline-flex;
          }
        }
        @media (max-width: 480px) {
          .nav__name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
