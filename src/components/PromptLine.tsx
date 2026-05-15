import { useEffect, useRef, useState } from 'react';
import { Typewriter } from './Typewriter';

interface PromptLineProps {
  cmd: string;
  arg?: string;
  flag?: string;
  cursorOnDone?: boolean;
}

/**
 * A standardised `~/portfolio $ cmd arg` line that types itself out when
 * scrolled into view. After typing once it stays static.
 */
export function PromptLine({ cmd, arg, flag, cursorOnDone = false }: PromptLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'cmd' | 'flag' | 'arg' | 'done'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setArmed(true);
      setPhase('done');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          setPhase('cmd');
          io.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const done = phase === 'done';

  return (
    <div ref={ref} className="prompt-line prompt-line--anim">
      <span className="prompt" />
      {!armed ? null : done ? (
        <>
          <span className="cmd">{cmd}</span>
          {flag && (
            <>
              {' '}
              <span className="flag">{flag}</span>
            </>
          )}
          {arg && (
            <>
              {' '}
              <span className="arg">{arg}</span>
            </>
          )}
          {cursorOnDone && <span className="caret" aria-hidden="true" />}
        </>
      ) : (
        <>
          {phase === 'cmd' && (
            <Typewriter
              text={cmd}
              speed={32}
              className="cmd"
              onDone={() => {
                if (flag) setPhase('flag');
                else if (arg) setPhase('arg');
                else setPhase('done');
              }}
            />
          )}
          {(phase === 'flag' || phase === 'arg') && (
            <>
              <span className="cmd">{cmd}</span>
            </>
          )}
          {phase === 'flag' && flag && (
            <>
              {' '}
              <Typewriter
                text={flag}
                speed={26}
                className="flag"
                onDone={() => setPhase(arg ? 'arg' : 'done')}
              />
            </>
          )}
          {phase === 'arg' && flag && (
            <>
              {' '}
              <span className="flag">{flag}</span>
            </>
          )}
          {phase === 'arg' && arg && (
            <>
              {' '}
              <Typewriter
                text={arg}
                speed={26}
                className="arg"
                onDone={() => setPhase('done')}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
