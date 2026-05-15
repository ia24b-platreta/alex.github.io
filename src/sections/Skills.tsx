import { Reveal } from '../components/Reveal';
import { AchievementTile } from '../components/AchievementTile';
import { DirRow } from '../components/BentoTile';
import { ChipCloud } from '../components/SkillChip';

const LANGUAGES = ['TypeScript', 'Java', 'Python', 'JavaScript', 'HTML/CSS', 'SQL', 'C', 'C#'];
const FRAMEWORKS = ['React', 'Thymeleaf', 'Bootstrap'];
const TOOLS = ['Vite', 'Bun', 'NPM', 'Rollup', 'Node.js', 'Git'];
const DATABASES = ['MySQL', 'MariaDB', 'MongoDB'];

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <Reveal>
          <div className="prompt-line">
            <span className="prompt" />
            <span className="cmd">cat</span>
            <span className="arg">./achievements.log</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="skills__ach">
            <AchievementTile />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="prompt-line skills__cmd2">
            <span className="prompt" />
            <span className="cmd">ls</span>
            <span className="flag">-la</span>
            <span className="arg">stack/</span>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="skills__listing">
            <div className="text-faint listing__total">total 4</div>
            <DirRow size="8" name="languages/" meta={<ChipCloud items={LANGUAGES} />} />
            <DirRow size="3" name="frameworks/" meta={<ChipCloud items={FRAMEWORKS} />} />
            <DirRow size="6" name="tools/" meta={<ChipCloud items={TOOLS} />} />
            <DirRow size="3" name="databases/" meta={<ChipCloud items={DATABASES} />} />
          </div>
        </Reveal>
      </div>
      <style>{`
        .skills__ach {
          margin-top: 14px;
          margin-bottom: 18px;
        }
        .skills__cmd2 {
          margin-top: 28px;
        }
        .skills__listing {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .listing__total {
          font-size: 0.85rem;
          margin-bottom: 4px;
        }
      `}</style>
    </section>
  );
}
