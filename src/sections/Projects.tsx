import { Reveal } from '../components/Reveal';
import { ProjectCard } from '../components/ProjectCard';

// TODO: replace these placeholders with your real projects.
//       Add `href` to link out (e.g. a live demo or GitHub repo).
const PROJECTS = [
  {
    title: 'Project one',
    description:
      'A short, punchy description — what it does, why it matters, what was interesting to solve.',
    tags: ['TypeScript', 'React', 'Vite'],
    year: '2026',
    status: 'WIP',
    // href: 'https://github.com/ia24b-platreta/your-repo',
  },
  {
    title: 'Project two',
    description:
      'Another standout build. Keep this to one or two sentences so the card stays scannable.',
    tags: ['Java', 'Thymeleaf', 'MySQL'],
    year: '2025',
    // href: 'https://github.com/ia24b-platreta/your-repo',
  },
  {
    title: 'Project three',
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
          <header className="projects__head">
            <span className="projects__label mono">Selected work</span>
            <h2>A few things I&rsquo;ve been building.</h2>
          </header>
        </Reveal>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <ProjectCard {...p} />
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        .projects__head {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
          max-width: 720px;
        }
        .projects__label {
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .projects__grid {
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px) {
          .projects__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
        @media (min-width: 1024px) {
          .projects__grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
