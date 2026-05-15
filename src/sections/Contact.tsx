import { Reveal } from '../components/Reveal';

const EMAIL = 'platret.alex@gmail.com';
const GITHUB = 'https://github.com/ia24b-platreta';
// const LINKEDIN = 'https://www.linkedin.com/in/your-handle'; // TODO: uncomment when ready

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <Reveal>
          <span className="contact__label mono">Contact</span>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="contact__title">
            Let&rsquo;s build something together.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="contact__lede text-dim">
            Have a project, a question, or just want to say hi? My inbox is open.
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="contact__actions">
            <a className="btn btn--primary" href={`mailto:${EMAIL}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
              {EMAIL}
            </a>
            <a className="btn" href={GITHUB} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.27.73-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.14 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub
            </a>
          </div>
        </Reveal>
      </div>
      <style>{`
        .contact__inner {
          display: flex;
          flex-direction: column;
          gap: 18px;
          max-width: 680px;
        }
        .contact__label {
          font-size: 0.74rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-faint);
        }
        .contact__title {
          font-size: clamp(1.75rem, 3vw + 1rem, 2.75rem);
          letter-spacing: -0.025em;
        }
        .contact__lede {
          font-size: 1.05rem;
          max-width: 520px;
        }
        .contact__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 12px;
        }
      `}</style>
    </section>
  );
}
