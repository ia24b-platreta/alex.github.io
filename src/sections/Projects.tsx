import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';

// TODO: replace these placeholders with your real projects.
//       Add `href` to link out (e.g. live demo or GitHub repo).
const PROJECTS = [
  {
    slug: 'project_one',
    description:
      'A short, punchy description — what it does, why it matters, what was interesting to solve.',
    tags: ['TypeScript', 'React', 'Vite'],
    year: '2026',
    status: 'WIP',
    // href: 'https://github.com/ia24b-platreta/your-repo',
  },
  {
    slug: 'project_two',
    description:
      'Another standout build. Keep this to one or two sentences so the card stays scannable.',
    tags: ['Java', 'Thymeleaf', 'MySQL'],
    year: '2025',
    // href: 'https://github.com/ia24b-platreta/your-repo',
  },
  {
    slug: 'project_three',
    description:
      'Something small but well-crafted — a tool, a script, a weekend experiment.',
    tags: ['Python', 'MongoDB'],
    year: '2025',
    // href: 'https://github.com/ia24b-platreta/your-repo',
  },
];

export function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <Reveal>
          <div className="prompt-line">
            <span className="prompt" />
            <span className="cmd">ls</span>
            <span className="arg">projects/</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="text-faint projects__total">total {PROJECTS.length}</div>
        </Reveal>

        <div className="projects__list">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={120 + i * 70}>
              <ProjectCard index={i + 1} {...p} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .projects__total {
          margin-top: 8px;
          margin-bottom: 14px;
          font-size: 0.85rem;
        }
        .projects__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </section>
  );
}
