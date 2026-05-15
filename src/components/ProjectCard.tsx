interface ProjectCardProps {
  index: number;
  slug: string;
  description: string;
  tags: string[];
  href?: string;
  year?: string;
  status?: string;
}

export function ProjectCard({ index, slug, description, tags, href, year, status }: ProjectCardProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    href ? (
      <a className="proj" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <div className="proj proj--static">{children}</div>
    );

  const num = String(index).padStart(2, '0');

  return (
    <>
      <Wrapper>
        <div className="proj__line">
          <span className="proj__num text-faint">{num}</span>
          <span className="proj__slug">{slug}</span>
          {year && <span className="proj__year text-dim">{year}</span>}
          {status && <span className="proj__status">[{status}]</span>}
          {href && <span className="proj__arrow text-faint" aria-hidden="true">→</span>}
        </div>
        <p className="proj__desc text-dim">
          <span className="text-faint">{'// '}</span>
          {description}
        </p>
        <div className="proj__tags text-faint">
          deps: {tags.map((t, i) => (
            <span key={t}>
              <span className="text-dim">{t}</span>
              {i < tags.length - 1 && ', '}
            </span>
          ))}
        </div>
      </Wrapper>
      <style>{`
        .proj {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 14px 16px;
          border: 1px dashed var(--border);
          color: inherit;
          transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }
        .proj:not(.proj--static):hover {
          border-color: var(--accent);
          border-style: solid;
          background: var(--surface-2);
          box-shadow: var(--shadow-glow);
        }
        .proj:not(.proj--static):hover .proj__slug {
          color: var(--accent);
        }
        .proj__line {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 10px;
          font-size: 0.95rem;
        }
        .proj__num {
          font-variant-numeric: tabular-nums;
        }
        .proj__slug {
          color: var(--text-bright);
          font-weight: 500;
          letter-spacing: -0.005em;
        }
        .proj__year {
          font-size: 0.82rem;
        }
        .proj__status {
          color: var(--amber);
          font-size: 0.78rem;
          letter-spacing: 0.04em;
        }
        .proj__arrow {
          margin-left: auto;
        }
        .proj__desc {
          font-size: 0.88rem;
          line-height: 1.5;
          margin-left: 30px;
        }
        .proj__tags {
          font-size: 0.78rem;
          margin-left: 30px;
        }
        @media (max-width: 480px) {
          .proj__desc, .proj__tags {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}
