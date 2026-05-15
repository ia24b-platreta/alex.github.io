import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Typewriter } from '../components/Typewriter';

type Step = 'banner' | 'whoami_cmd' | 'whoami_out' | 'cat_cmd' | 'cat_out' | 'help_cmd' | 'done';

const ORDER: Step[] = ['banner', 'whoami_cmd', 'whoami_out', 'cat_cmd', 'cat_out', 'help_cmd', 'done'];
const SESSION_KEY = 'hero-typed';

function nextStep(s: Step): Step {
  const i = ORDER.indexOf(s);
  return ORDER[Math.min(i + 1, ORDER.length - 1)];
}

export function Hero() {
  const [step, setStep] = useState<Step>(() => {
    if (typeof window === 'undefined') return 'done';
    if (sessionStorage.getItem(SESSION_KEY)) return 'done';
    return 'banner';
  });

  useEffect(() => {
    if (step === 'banner') {
      const t = setTimeout(() => setStep('whoami_cmd'), 200);
      return () => clearTimeout(t);
    }
    if (step === 'done') {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
    }
  }, [step]);

  const reached = (s: Step) => ORDER.indexOf(step) >= ORDER.indexOf(s);
  const showStatic = step === 'done';
  const advance = () => setStep((s) => nextStep(s));

  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <Reveal>
          <pre className="hero__banner" aria-label="alex.platreta">{`
   █████╗ ██╗     ███████╗██╗  ██╗
  ██╔══██╗██║     ██╔════╝╚██╗██╔╝
  ███████║██║     █████╗   ╚███╔╝
  ██╔══██║██║     ██╔══╝   ██╔██╗
  ██║  ██║███████╗███████╗██╔╝ ██╗
  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
`}</pre>
        </Reveal>

        {/* whoami */}
        {reached('whoami_cmd') && (
          <div className="hero__line">
            <span className="prompt" />
            {showStatic ? (
              <span className="cmd">whoami</span>
            ) : (
              <Typewriter text="whoami" className="cmd" onDone={advance} />
            )}
          </div>
        )}

        {reached('whoami_out') && (
          <div className="hero__out">
            {showStatic ? (
              <>
                <span className="text-bright">alex.platreta</span>
                <span className="text-faint"> — developer · </span>
                <span className="text-cyan">Zürich, CH</span>
              </>
            ) : (
              <Typewriter
                text="alex.platreta — developer · Zürich, CH"
                speed={18}
                onDone={advance}
              />
            )}
          </div>
        )}

        {/* cat readme.md */}
        {reached('cat_cmd') && (
          <div className="hero__line">
            <span className="prompt" />
            {showStatic ? (
              <>
                <span className="cmd">cat</span>{' '}
                <span className="arg">readme.md</span>
              </>
            ) : (
              <Typewriter text="cat readme.md" className="cmd" onDone={advance} />
            )}
          </div>
        )}

        {reached('cat_out') && (
          <p className="hero__out">
            {showStatic ? (
              <>
                I build things on the web — clean interfaces, reliable backends, and the
                occasional weekend experiment.
              </>
            ) : (
              <Typewriter
                text="I build things on the web — clean interfaces, reliable backends, and the occasional weekend experiment."
                speed={12}
                onDone={advance}
              />
            )}
          </p>
        )}

        {/* help + caret */}
        {reached('help_cmd') && (
          <div className="hero__line">
            <span className="prompt" />
            {showStatic ? (
              <span className="cmd">help</span>
            ) : (
              <Typewriter text="help" className="cmd" onDone={advance} />
            )}
            <span className="caret" aria-hidden="true" />
          </div>
        )}

        {/* CTAs only appear once all typing finishes (or instantly on revisit) */}
        {reached('done') && (
          <Reveal>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#projects">
                ./view-work
              </a>
              <a className="btn" href="#contact">
                ./say-hi
              </a>
              <a className="btn" href="#terminal">
                ./launch-shell
              </a>
            </div>
          </Reveal>
        )}
      </div>
      <style>{`
        .hero {
          padding-top: clamp(40px, 8vh, 80px);
          padding-bottom: clamp(40px, 8vw, 80px);
        }
        .hero__inner {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 760px;
          min-height: 60vh;
        }
        .hero__banner {
          font-family: inherit;
          color: var(--accent);
          margin: 0 0 22px;
          font-size: clamp(0.5rem, 1.1vw + 0.3rem, 0.85rem);
          line-height: 1.05;
          white-space: pre;
          text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent);
          overflow-x: auto;
          position: relative;
          background: linear-gradient(
            90deg,
            var(--accent) 0%,
            var(--accent) 40%,
            var(--text-bright) 50%,
            var(--accent) 60%,
            var(--accent) 100%
          );
          background-size: 220% 100%;
          background-position: 100% 0;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero__banner {
            animation: banner-sheen 2.4s ease-out 0.2s 1 forwards;
          }
        }
        @keyframes banner-sheen {
          0%   { background-position: 100% 0; }
          100% { background-position: 0    0; }
        }
        [data-theme='light'] .hero__banner {
          text-shadow: none;
        }
        .hero__line {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 6px;
          margin-top: 6px;
          color: var(--text-bright);
          font-size: 0.95rem;
        }
        .hero__line .cmd { color: var(--text-bright); }
        .hero__line .arg { color: var(--amber); }
        .hero__out {
          color: var(--text);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 60ch;
        }
        .hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
      `}</style>
    </section>
  );
}
