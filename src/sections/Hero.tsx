import { Reveal } from '../components/Reveal';

export function Hero() {
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

        <Reveal delay={80}>
          <div className="hero__line">
            <span className="prompt" />
            <span className="cmd">whoami</span>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="hero__out">
            <span className="text-bright">alex.platreta</span>
            <span className="text-faint"> — developer · </span>
            <span className="text-cyan">Zürich, CH</span>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="hero__line">
            <span className="prompt" />
            <span className="cmd">cat</span> <span className="arg">readme.md</span>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <p className="hero__out">
            I build things on the web — clean interfaces, reliable backends, and the
            occasional weekend experiment.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div className="hero__line">
            <span className="prompt" />
            <span className="cmd">help</span>
            <span className="caret" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={420}>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#projects">
              ./view-work
            </a>
            <a className="btn" href="#contact">
              ./say-hi
            </a>
          </div>
        </Reveal>
      </div>
      <style>{`
        .hero {
          padding-top: clamp(40px, 8vh, 80px);
          padding-bottom: clamp(40px, 8vw, 80px);
        }
        .hero__inner {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 760px;
        }
        .hero__banner {
          font-family: inherit;
          color: var(--accent);
          margin: 0 0 18px;
          font-size: clamp(0.5rem, 1.1vw + 0.3rem, 0.85rem);
          line-height: 1.05;
          white-space: pre;
          text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent);
          overflow-x: auto;
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
        .hero__line .cmd {
          color: var(--text-bright);
        }
        .hero__line .arg {
          color: var(--amber);
        }
        .hero__out {
          padding-left: 0;
          color: var(--text);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 60ch;
        }
        .hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }
      `}</style>
    </section>
  );
}
