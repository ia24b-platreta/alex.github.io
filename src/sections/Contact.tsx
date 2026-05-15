import { Reveal } from '../components/Reveal';

const EMAIL = 'platret.alex@gmail.com';
const GITHUB = 'https://github.com/ia24b-platreta';
// const LINKEDIN = 'https://www.linkedin.com/in/your-handle'; // TODO: uncomment when ready

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <Reveal>
          <div className="prompt-line">
            <span className="prompt" />
            <span className="cmd">contact</span>
            <span className="flag">--help</span>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <pre className="contact__usage">{`Usage: reach out to alex.

Channels:
  email     mail to a human, expect a reply
  github    follow the work in progress
`}</pre>
        </Reveal>

        <Reveal delay={140}>
          <div className="contact__rows">
            <div className="contact__row">
              <span className="contact__key text-faint">email&nbsp;&nbsp;</span>
              <a href={`mailto:${EMAIL}`} className="contact__val">{EMAIL}</a>
            </div>
            <div className="contact__row">
              <span className="contact__key text-faint">github&nbsp;</span>
              <a href={GITHUB} target="_blank" rel="noreferrer" className="contact__val">
                {GITHUB.replace('https://', '')}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="prompt-line contact__cursor">
            <span className="prompt" />
            <span className="caret" aria-hidden="true" />
          </div>
        </Reveal>
      </div>
      <style>{`
        .contact__inner {
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 680px;
        }
        .contact__usage {
          font-family: inherit;
          color: var(--text);
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0;
          white-space: pre-wrap;
        }
        .contact__rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 0.95rem;
        }
        .contact__row {
          display: flex;
          gap: 8px;
          align-items: baseline;
        }
        .contact__key {
          letter-spacing: 0.04em;
          font-size: 0.85rem;
        }
        .contact__val {
          color: var(--accent);
        }
        .contact__cursor {
          margin-top: 12px;
        }
      `}</style>
    </section>
  );
}
