import type { ReactNode } from 'react';

export function BentoGrid({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bento">{children}</div>
      <style>{`
        .bento {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .bento {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (min-width: 960px) {
          .bento {
            grid-template-columns: repeat(6, 1fr);
            grid-auto-rows: minmax(180px, auto);
          }
        }
      `}</style>
    </>
  );
}
