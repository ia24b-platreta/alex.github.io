interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  year?: string;
  status?: string;
}

export function ProjectCard({ title, description, tags, href, year, status }: ProjectCardProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <a className="proj" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <article className="proj proj--static">{children}</article>
    );

  return (
    <>
      <Wrapper>
        <header className="proj__head">
          {year && <span className="proj__year mono">{year}</span>}
          {status && <span className="proj__status">{status}</span>}
        </header>
        <h3 className="proj__title">{title}</h3>
        <p className="proj__desc">{description}</p>
        <footer className="proj__tags">
          {tags.map((t) => (
            <span key={t} className="proj__tag mono">{t}</span>
          ))}
        </footer>
        {href && (
          <span className="proj__arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        )}
      </Wrapper>
      <style>{`
        .proj {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          border-radius: var(--radius-md);
          background: var(--surface-glass);
          border: 1px solid var(--border);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease;
          min-height: 220px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .proj:not(.proj--static):hover {
            border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
          }
          .proj:not(.proj--static):hover .proj__arrow {
            transform: translate(2px, -2px);
            color: var(--accent-strong);
          }
        }
        .proj__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: var(--text-faint);
          font-size: 0.78rem;
        }
        .proj__year {
          letter-spacing: 0.04em;
        }
        .proj__status {
          padding: 3px 9px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          color: var(--accent-strong);
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .proj__title {
          font-size: 1.25rem;
          letter-spacing: -0.01em;
        }
        .proj__desc {
          color: var(--text-dim);
          font-size: 0.95rem;
          flex: 1;
        }
        .proj__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .proj__tag {
          padding: 3px 9px;
          border-radius: 6px;
          background: var(--surface-2);
          color: var(--text-dim);
          font-size: 0.72rem;
          border: 1px solid var(--border);
        }
        .proj__arrow {
          position: absolute;
          top: 22px;
          right: 22px;
          color: var(--text-faint);
          transition: transform 220ms ease, color 220ms ease;
        }
      `}</style>
    </>
  );
}
