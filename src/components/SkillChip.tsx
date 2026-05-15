export function SkillChip({ children }: { children: string }) {
  return (
    <>
      <span className="chip">{children}</span>
      <style>{`
        .chip {
          color: var(--text);
          transition: color 160ms ease;
        }
        .chip::before {
          content: '[';
          color: var(--text-faint);
        }
        .chip::after {
          content: ']';
          color: var(--text-faint);
        }
        .chip:hover {
          color: var(--accent);
        }
        .chip:hover::before,
        .chip:hover::after {
          color: var(--accent);
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
          column-gap: 14px;
          row-gap: 4px;
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
