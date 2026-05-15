import type { ReactNode } from 'react';

interface DirRowProps {
  perms?: string;
  size?: string;
  name: string;
  meta?: ReactNode;
  highlighted?: boolean;
}

export function DirRow({
  perms = 'drwxr-xr-x',
  size,
  name,
  meta,
  highlighted = false,
}: DirRowProps) {
  return (
    <>
      <div className={`row-line${highlighted ? ' row-line--hl' : ''}`}>
        <span className="text-faint">{perms}</span>
        <span className="text-dim row-line__size">{size ?? '   -'}</span>
        <span className="row-line__name">{name}</span>
        {meta && <span className="row-line__meta">{meta}</span>}
      </div>
      <style>{`
        .row-line {
          display: grid;
          grid-template-columns: max-content max-content max-content 1fr;
          gap: 14px;
          align-items: baseline;
          padding: 2px 0;
          font-size: 0.92rem;
        }
        .row-line__size {
          text-align: right;
          min-width: 3ch;
        }
        .row-line__name {
          color: var(--accent);
          font-weight: 500;
        }
        .row-line__meta {
          color: var(--text-dim);
        }
        .row-line--hl .row-line__name {
          color: var(--amber);
        }
        @media (max-width: 480px) {
          .row-line {
            grid-template-columns: max-content 1fr;
          }
          .row-line .text-faint,
          .row-line__size {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
