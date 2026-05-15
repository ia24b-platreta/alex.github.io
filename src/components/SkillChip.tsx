export function SkillChip({ children }: { children: string }) {
  return (
    <>
      <span className="chip mono">{children}</span>
      <style>{`
        .chip {
          display: inline-flex;
          align-items: center;
          padding: 5px 12px;
          border-radius: 999px;
          font-size: 0.82rem;
          color: var(--text);
          background: var(--surface-2);
          border: 1px solid var(--border);
          letter-spacing: -0.01em;
          transition: border-color 180ms ease, color 180ms ease, transform 180ms ease;
          white-space: nowrap;
        }
        @media (prefers-reduced-motion: no-preference) {
          .chip:hover {
            border-color: color-mix(in srgb, var(--accent) 60%, var(--border));
            color: var(--accent-strong);
            transform: translateY(-1px);
          }
        }
      `}</style>
    </>
  );
}

export function ChipCloud({ items }: { items: string[] }) {
  return (
    <>
      <div className="cloud">
        {items.map((it) => (
          <SkillChip key={it}>{it}</SkillChip>
        ))}
      </div>
      <style>{`
        .cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      `}</style>
    </>
  );
}
