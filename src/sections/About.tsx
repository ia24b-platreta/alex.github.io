import { Reveal } from '../components/Reveal';
import { PromptLine } from '../components/PromptLine';

export function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <PromptLine cmd="cat" arg="about.md" />
        <Reveal delay={60}>
          {/* TODO: personalize bio — replace with your own voice */}
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
          gap: 16px;
          max-width: 720px;
        }
        .about__body {
          color: var(--text);
          font-size: 0.96rem;
          line-height: 1.7;
          max-width: 65ch;
        }
      `}</style>
    </section>
  );
}
