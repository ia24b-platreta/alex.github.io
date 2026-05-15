import { Reveal } from '../components/Reveal';

export function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <Reveal>
          <span className="about__label mono">About</span>
        </Reveal>
        <Reveal delay={80}>
          {/* TODO: personalize bio — replace this copy with your own voice */}
          <p className="about__body">
            I&rsquo;m a developer based in Zürich, currently sharpening my craft across
            modern web tooling and full-stack work. I enjoy turning fuzzy ideas into
            clean, fast, and accessible interfaces — and I&rsquo;m happiest when the
            details feel intentional.
          </p>
        </Reveal>
      </div>
      <style>{`
        .about__inner {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 720px;
        }
        .about__label {
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .about__body {
          font-size: clamp(1.1rem, 1vw + 0.7rem, 1.35rem);
          line-height: 1.55;
          color: var(--text);
          letter-spacing: -0.005em;
          max-width: 65ch;
        }
      `}</style>
    </section>
  );
}
