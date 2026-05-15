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
      const t = setTimeout(() => setStep('whoami_cmd'), 1200);
      return () => clearTimeout(t);
    }
    if (step === 'done') {
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* ignore */ }
    }
  }, [step]);

  const reached = (s: Step) => ORDER.indexOf(step) >= ORDER.indexOf(s);
  const showStatic = step === 'done';
  const advance = () => setStep((s) => nextStep(s));

  const banner = `   █████╗ ██╗     ███████╗██╗  ██╗
  ██╔══██╗██║     ██╔════╝╚██╗██╔╝
  ███████║██║     █████╗   ╚███╔╝
  ██╔══██║██║     ██╔══╝   ██╔██╗
  ██║  ██║███████╗███████╗██╔╝ ██╗
  ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝`;

  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__crt" aria-label="alex.platreta">
          <pre className="hero__banner hero__banner--main" aria-hidden="false">{banner}</pre>
          <pre className="hero__banner hero__banner--r" aria-hidden="true">{banner}</pre>
          <pre className="hero__banner hero__banner--b" aria-hidden="true">{banner}</pre>
          <div className="hero__crt-scan" aria-hidden="true" />
          <div className="hero__crt-line" aria-hidden="true" />
        </div>

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

        {reached('done') && (
          <Reveal>
            <div className="hero__ctas">
              <a className="btn btn--primary hero__cta-pulse" href="#projects">
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

        /* ---------- CRT BANNER ---------- */
        .hero__crt {
          position: relative;
          margin: 0 0 28px;
          overflow: hidden;
          isolation: isolate;
        }
        .hero__banner {
          font-family: inherit;
          margin: 0;
          font-size: clamp(0.5rem, 1.1vw + 0.3rem, 0.85rem);
          line-height: 1.05;
          white-space: pre;
          letter-spacing: 0;
          font-variant-ligatures: none;
          font-feature-settings: 'liga' 0, 'calt' 0;
        }
        .hero__banner--main {
          color: var(--accent);
          text-shadow:
            0 0 4px color-mix(in srgb, var(--accent) 65%, transparent),
            0 0 18px color-mix(in srgb, var(--accent) 50%, transparent),
            0 0 36px color-mix(in srgb, var(--accent) 25%, transparent);
          position: relative;
          z-index: 3;
        }
        .hero__banner--r,
        .hero__banner--b {
          position: absolute;
          inset: 0;
          mix-blend-mode: screen;
          pointer-events: none;
          opacity: 0.55;
        }
        .hero__banner--r {
          color: #ff2e63;
          transform: translateX(-1.5px);
          z-index: 2;
        }
        .hero__banner--b {
          color: #00e5ff;
          transform: translateX(1.5px);
          z-index: 1;
        }
        [data-theme='light'] .hero__banner--main {
          text-shadow: none;
        }
        [data-theme='light'] .hero__banner--r,
        [data-theme='light'] .hero__banner--b {
          display: none;
        }

        /* Scanline overlay sweeping through the banner */
        .hero__crt-scan {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent 2px,
            rgba(0, 0, 0, 0.18) 2px,
            rgba(0, 0, 0, 0.18) 3px
          );
          pointer-events: none;
          z-index: 4;
          opacity: 0.6;
        }
        [data-theme='light'] .hero__crt-scan { display: none; }

        /* Bright horizontal line that rolls down through the banner */
        .hero__crt-line {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 45%,
            color-mix(in srgb, var(--accent) 35%, transparent) 49%,
            color-mix(in srgb, #ffffff 60%, transparent) 50%,
            color-mix(in srgb, var(--accent) 35%, transparent) 51%,
            transparent 55%,
            transparent 100%
          );
          background-size: 100% 250%;
          background-position: 0 -150%;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 5;
        }
        [data-theme='light'] .hero__crt-line { display: none; }

        @media (prefers-reduced-motion: no-preference) {
          .hero__crt {
            animation: crt-power-on 1.0s cubic-bezier(0.2, 0.7, 0.2, 1) 0s 1 backwards;
          }
          .hero__banner--main {
            animation:
              banner-breathe 3.4s ease-in-out 1.0s infinite,
              banner-flicker 9s steps(1) 1.0s infinite;
          }
          .hero__banner--r {
            animation: aberration-r 2.6s ease-in-out 1.0s infinite;
          }
          .hero__banner--b {
            animation: aberration-b 2.6s ease-in-out 1.0s infinite;
          }
          .hero__crt-line {
            animation: scanline-roll 4.4s linear 1.0s infinite;
          }
        }

        @keyframes crt-power-on {
          0%   { transform: scaleY(0.02); opacity: 0; filter: brightness(1.8); }
          18%  { transform: scaleY(0.02); opacity: 1; filter: brightness(2.5); }
          22%  { transform: scaleY(0.05); opacity: 1; filter: brightness(2.0); }
          100% { transform: scaleY(1);    opacity: 1; filter: brightness(1.0); }
        }
        @keyframes banner-breathe {
          0%, 100% {
            text-shadow:
              0 0 4px  color-mix(in srgb, var(--accent) 60%, transparent),
              0 0 14px color-mix(in srgb, var(--accent) 40%, transparent),
              0 0 28px color-mix(in srgb, var(--accent) 18%, transparent);
          }
          50% {
            text-shadow:
              0 0 6px  color-mix(in srgb, var(--accent) 80%, transparent),
              0 0 22px color-mix(in srgb, var(--accent) 60%, transparent),
              0 0 44px color-mix(in srgb, var(--accent) 35%, transparent);
          }
        }
        @keyframes banner-flicker {
          0%, 100%             { opacity: 1; }
          93%                  { opacity: 1; }
          93.5%                { opacity: 0.6; }
          94%                  { opacity: 1; }
          97%                  { opacity: 1; }
          97.5%                { opacity: 0.85; }
          98%                  { opacity: 1; }
        }
        @keyframes aberration-r {
          0%, 100% { transform: translateX(-1.5px); opacity: 0.55; }
          25%      { transform: translateX(-2.4px); opacity: 0.7;  }
          50%      { transform: translateX(-1px);   opacity: 0.4;  }
          75%      { transform: translateX(-2px);   opacity: 0.6;  }
        }
        @keyframes aberration-b {
          0%, 100% { transform: translateX(1.5px);  opacity: 0.55; }
          25%      { transform: translateX(2.4px);  opacity: 0.7;  }
          50%      { transform: translateX(1px);    opacity: 0.4;  }
          75%      { transform: translateX(2px);    opacity: 0.6;  }
        }
        @keyframes scanline-roll {
          0%   { background-position: 0 -150%; }
          100% { background-position: 0  150%; }
        }

        /* ---------- Lines ---------- */
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
        @media (prefers-reduced-motion: no-preference) {
          .hero__cta-pulse {
            animation: cta-pulse 2.2s ease-in-out infinite;
          }
        }
        @keyframes cta-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 0%, transparent);
          }
          50% {
            box-shadow: 0 0 0 6px color-mix(in srgb, var(--accent) 0%, transparent),
                        0 0 22px color-mix(in srgb, var(--accent) 45%, transparent);
          }
        }
      `}</style>
    </section>
  );
}
