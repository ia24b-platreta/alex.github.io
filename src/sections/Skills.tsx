import { Reveal } from '../components/Reveal';
import { AchievementTile } from '../components/AchievementTile';
import { DirRow } from '../components/BentoTile';
import { ChipCloud } from '../components/SkillChip';
import { GitHubGraph } from '../components/GitHubGraph';
import { PromptLine } from '../components/PromptLine';

const LANGUAGES = ['TypeScript', 'Java', 'Python', 'JavaScript', 'HTML/CSS', 'SQL', 'C', 'C#'];
const FRAMEWORKS = ['React', 'Thymeleaf', 'Bootstrap'];
const TOOLS = ['Vite', 'Bun', 'NPM', 'Rollup', 'Node.js', 'Git'];
const DATABASES = ['MySQL', 'MariaDB', 'MongoDB'];

export function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <PromptLine cmd="cat" arg="./achievements.log" />

        <Reveal delay={80}>
          <div className="skills__ach">
            <AchievementTile />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="skills__graph">
            <GitHubGraph />
          </div>
        </Reveal>

        <div className="skills__cmd2">
          <PromptLine cmd="ls" flag="-la" arg="stack/" />
        </div>

        <Reveal delay={120}>
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
          margin-top: 18px;
          margin-bottom: 28px;
        }
        .skills__graph {
          margin-bottom: 32px;
        }
        .skills__cmd2 {
          margin-top: 32px;
        }
        .skills__listing {
          margin-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .listing__total {
          font-size: 0.85rem;
          margin-bottom: 6px;
        }
      `}</style>
    </section>
  );
}
