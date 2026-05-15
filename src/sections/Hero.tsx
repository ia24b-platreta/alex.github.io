import { Reveal } from '../components/Reveal';

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <Reveal>
          <span className="hero__eyebrow mono">
            <span className="hero__dot" aria-hidden="true" /> Available for collaboration
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="hero__title">
            Alex Platreta.
            <br />
            <span className="hero__gradient">Developer in Zürich.</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="hero__lede text-dim">
            I build things on the web — clean interfaces, reliable backends, and the
            occasional weekend experiment.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#projects">
              View work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a className="btn" href="#contact">Get in touch</a>
          </div>
        </Reveal>
      </div>
      <style>{`
        .hero {
          padding-top: clamp(80px, 14vh, 160px);
          padding-bottom: clamp(40px, 8vw, 80px);
        }
        .hero__inner {
          display: flex;
          flex-direction: column;
          gap: 22px;
          max-width: 880px;
        }
        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim);
          align-self: flex-start;
          padding: 6px 12px;
          border-radius: 999px;
          background: var(--surface-2);
          border: 1px solid var(--border);
        }
        .hero__dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 12px #22c55e;
        }
        .hero__title {
          font-weight: 600;
          letter-spacing: -0.045em;
        }
        .hero__gradient {
          background: linear-gradient(90deg, var(--accent-strong) 0%, var(--accent-2) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero__lede {
          font-size: clamp(1.05rem, 1.4vw + 0.5rem, 1.25rem);
          max-width: 560px;
        }
        .hero__ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 8px;
        }
      `}</style>
    </section>
  );
}
