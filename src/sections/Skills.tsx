import { Reveal } from '../components/Reveal';
import { BentoGrid } from '../components/BentoGrid';
import { BentoTile } from '../components/BentoTile';
import { AchievementTile } from '../components/AchievementTile';
import { ChipCloud } from '../components/SkillChip';

const LANGUAGES = ['TypeScript', 'Java', 'Python', 'JavaScript', 'HTML / CSS', 'SQL', 'C', 'C#'];
const FRAMEWORKS = ['React', 'Thymeleaf', 'Bootstrap'];
const TOOLS = ['Vite', 'Bun', 'NPM', 'Rollup', 'Node.js', 'Git'];
const DATABASES = ['MySQL', 'MariaDB', 'MongoDB'];

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <Reveal>
          <header className="skills__head">
            <span className="skills__label mono">Stack &amp; recognition</span>
            <h2>Things I build with — and what I&rsquo;ve done with them.</h2>
          </header>
        </Reveal>

        <Reveal delay={80}>
          <BentoGrid>
            <AchievementTile />

            <BentoTile label="Location" colSpan={2} rowSpan={1}>
              <div className="loc">
                <div className="loc__pin" aria-hidden="true">
                  <span className="loc__pulse" />
                </div>
                <div>
                  <div className="loc__city">Zürich</div>
                  <div className="loc__country text-dim">Switzerland 🇨🇭</div>
                </div>
              </div>
            </BentoTile>

            <BentoTile label="Languages" colSpan={3} rowSpan={2}>
              <ChipCloud items={LANGUAGES} />
            </BentoTile>

            <BentoTile label="Frameworks" colSpan={3} rowSpan={1}>
              <ChipCloud items={FRAMEWORKS} />
            </BentoTile>

            <BentoTile label="Tooling" colSpan={3} rowSpan={1}>
              <ChipCloud items={TOOLS} />
            </BentoTile>

            <BentoTile label="Databases" colSpan={3} rowSpan={1}>
              <ChipCloud items={DATABASES} />
            </BentoTile>
          </BentoGrid>
        </Reveal>
      </div>
      <style>{`
        .skills__head {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
          max-width: 720px;
        }
        .skills__label {
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .loc {
          display: flex;
          align-items: center;
          gap: 14px;
          height: 100%;
        }
        .loc__pin {
          position: relative;
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: var(--accent-2);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-2) 18%, transparent);
        }
        @media (prefers-reduced-motion: no-preference) {
          .loc__pulse {
            position: absolute;
            inset: -8px;
            border-radius: 999px;
            border: 1px solid var(--accent-2);
            animation: pulse 2.4s ease-out infinite;
          }
        }
        @keyframes pulse {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .loc__city {
          font-size: 1.4rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .loc__country {
          font-size: 0.9rem;
        }
      `}</style>
    </section>
  );
}
