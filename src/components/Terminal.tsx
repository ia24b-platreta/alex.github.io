import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { findCommand, commandNames } from '../commands';
import { useTheme } from '../theme';
import { PromptLine } from './PromptLine';

type EntryBody =
  | { kind: 'in'; text: string }
  | { kind: 'out'; node: ReactNode }
  | { kind: 'space' };

type Entry = EntryBody & { id: number };

const MAX_HISTORY = 50;
const MAX_BUFFER = 200;

const WELCOME: Entry[] = [
  { id: 0, kind: 'out', node: 'alex.shell 1.0.0 — type `help` to see what works.' },
  { id: 1, kind: 'out', node: 'try: whoami · ls projects · cat about · man alex · sudo hire-me' },
  { id: 2, kind: 'space' },
];

export function Terminal() {
  const { theme, toggle } = useTheme();
  const setTheme = (t: 'dark' | 'light') => {
    if (t !== theme) toggle();
  };

  const [buffer, setBuffer] = useState<Entry[]>(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState<number>(-1); // -1 = current draft
  const [draft, setDraft] = useState('');
  const idRef = useRef(WELCOME.length);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const append = useCallback((...entries: EntryBody[]) => {
    setBuffer((b) => {
      const next: Entry[] = [
        ...b,
        ...entries.map((e) => ({ ...e, id: idRef.current++ }) as Entry),
      ];
      return next.length > MAX_BUFFER ? next.slice(next.length - MAX_BUFFER) : next;
    });
  }, []);

  // autoscroll when buffer changes
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [buffer]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      append({ kind: 'in', text: trimmed });

      if (!trimmed) {
        return;
      }

      // Update history (no duplicates back-to-back)
      setHistory((h) => {
        const last = h[h.length - 1];
        if (last === trimmed) return h;
        const next = [...h, trimmed];
        return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
      });

      const [name, ...args] = trimmed.split(/\s+/);
      const cmd = findCommand(name);

      if (!cmd) {
        append({
          kind: 'out',
          node: (
            <span className="text-faint">
              <span className="text-red">{name}</span>
              {`: command not found. try `}
              <span className="text-accent">help</span>.
            </span>
          ),
        });
        append({ kind: 'space' });
        return;
      }

      const result = cmd.run(args, { raw: trimmed, theme, setTheme });

      if (result.clear) {
        setBuffer([]);
        idRef.current = 0;
        return;
      }
      if (result.output !== undefined && result.output !== null && result.output !== '') {
        append({ kind: 'out', node: result.output });
      }
      if (result.scrollTo) {
        const id = result.scrollTo === 'top' ? 'top' : result.scrollTo;
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      if (result.navigate) {
        const { href, newTab } = result.navigate;
        if (newTab) {
          window.open(href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = href;
        }
      }
      append({ kind: 'space' });
    },
    [append, theme, setTheme],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
      setHIndex(-1);
      setDraft('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIdx = hIndex === -1 ? history.length - 1 : Math.max(0, hIndex - 1);
      if (hIndex === -1) setDraft(input);
      setHIndex(newIdx);
      setInput(history[newIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex === -1) return;
      const newIdx = hIndex + 1;
      if (newIdx >= history.length) {
        setHIndex(-1);
        setInput(draft);
      } else {
        setHIndex(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // tab completion (simple: prefix match against visible commands)
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1] ?? '';
      if (!last) return;
      const matches = commandNames(false).filter((n) => n.startsWith(last.toLowerCase()));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(' ') + ' ');
      } else if (matches.length > 1) {
        append({ kind: 'in', text: input });
        append({ kind: 'out', node: matches.join('  ') });
        append({ kind: 'space' });
      }
    } else if (e.key === 'Escape') {
      e.currentTarget.blur();
    } else if (e.ctrlKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      setBuffer([]);
      idRef.current = 0;
    } else if (e.ctrlKey && (e.key === 'c' || e.key === 'C') && input) {
      e.preventDefault();
      append({ kind: 'in', text: input + '^C' });
      append({ kind: 'space' });
      setInput('');
      setHIndex(-1);
    }
  };

  return (
    <section id="terminal" className="terminal-section">
      <div className="container">
        <div className="terminal__cmd">
          <PromptLine cmd="./tty0" />
          <span className="terminal__hint text-faint">// type below — try `help`</span>
        </div>

        <div
          className="term"
          onClick={focusInput}
          role="region"
          aria-label="Interactive terminal. Type help to see commands."
        >
          <div className="term__bar">
            <span className="term__bar-pre text-faint">tty0</span>
            <span className="term__bar-dim text-faint">—</span>
            <span className="term__bar-title">alex@portfolio:~</span>
            <span className="term__bar-status" aria-hidden="true">
              <span className="term__bar-dot" />
            </span>
          </div>
          <div className="term__body" ref={scrollRef}>
            {buffer.map((e) => {
              if (e.kind === 'space') return <div key={e.id} className="term__space" />;
              if (e.kind === 'in') {
                return (
                  <div key={e.id} className="term__row">
                    <span className="prompt" />
                    <span className="term__cmd">{e.text}</span>
                  </div>
                );
              }
              return (
                <pre key={e.id} className="term__out">
                  {e.node}
                </pre>
              );
            })}

            <div className="term__row term__input-row">
              <span className="prompt" />
              <input
                ref={inputRef}
                value={input}
                onChange={(ev) => {
                  setInput(ev.target.value);
                  if (hIndex !== -1) setHIndex(-1);
                }}
                onKeyDown={onKeyDown}
                className="term__input"
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                aria-label="Terminal input"
                placeholder=""
                inputMode="text"
              />
              <span className="caret term__caret" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .terminal-section {
          padding-block: clamp(40px, 6vw, 64px);
        }
        .terminal__cmd {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: baseline;
          margin-bottom: 16px;
          font-size: 0.95rem;
        }
        .terminal__hint {
          font-size: 0.82rem;
        }
        .term {
          border: 1px solid var(--border-strong);
          background: var(--bg-deep);
          cursor: text;
          overflow: hidden;
          box-shadow: var(--shadow-glow);
        }
        [data-theme='light'] .term {
          background: var(--surface);
        }
        .term__bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--border);
          background: var(--surface);
          font-size: 0.78rem;
          letter-spacing: 0.02em;
        }
        .term__bar-pre { font-weight: 500; }
        .term__bar-dim { opacity: 0.6; }
        .term__bar-title { color: var(--text-dim); flex: 1; }
        .term__bar-status {
          display: inline-flex;
          align-items: center;
        }
        .term__bar-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }
        @media (prefers-reduced-motion: no-preference) {
          .term__bar-dot {
            animation: pulse-dot 2.4s ease-in-out infinite;
          }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        .term__body {
          padding: 14px 16px 16px;
          height: clamp(280px, 50vh, 460px);
          overflow-y: auto;
          font-size: 0.9rem;
          line-height: 1.55;
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: var(--border-strong) transparent;
        }
        .term__body::-webkit-scrollbar { width: 8px; }
        .term__body::-webkit-scrollbar-track { background: transparent; }
        .term__body::-webkit-scrollbar-thumb {
          background: var(--border-strong);
          border-radius: 4px;
        }
        .term__row {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          align-items: baseline;
        }
        .term__cmd { color: var(--text-bright); }
        .term__out {
          font-family: inherit;
          margin: 4px 0;
          color: var(--text);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .term__space { height: 6px; }
        .term__input-row {
          margin-top: 2px;
        }
        .term__input {
          flex: 1;
          min-width: 100px;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-bright);
          font: inherit;
          font-size: 0.9rem;
          caret-color: transparent;
          padding: 0;
        }
        .term__caret {
          margin-left: -8px;
        }
        .term__input:not(:focus) ~ .term__caret {
          opacity: 0.4;
        }
      `}</style>
    </section>
  );
}
