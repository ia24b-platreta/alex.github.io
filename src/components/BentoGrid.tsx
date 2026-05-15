import type { ReactNode } from 'react';

export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="stack-grid">{children}</div>
      <style>{`
        .stack-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
      `}</style>
    </>
  );
}
