import { useEffect, useRef, useState } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onDone?: () => void;
  className?: string;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Types out `text` character-by-character once. Calls `onDone` when finished.
 * Skips animation if prefers-reduced-motion is set.
 */
export function Typewriter({ text, speed = 30, delay = 0, onDone, className }: TypewriterProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? text.length : 0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      setShown(text.length);
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    doneRef.current = false;
    setShown(0);
    let i = 0;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      const tick = () => {
        i += 1;
        setShown(i);
        if (i >= text.length) {
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
          return;
        }
        timer = window.setTimeout(tick, speed + Math.random() * 18);
      };
      tick();
    }, delay);
    return () => {
      clearTimeout(start);
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, reduced]);

  return <span className={className}>{text.slice(0, shown)}</span>;
}
