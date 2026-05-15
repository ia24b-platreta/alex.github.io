import { Nav } from './components/Nav';
import { BootSequence } from './components/BootSequence';
import { IdleScreensaver } from './components/IdleScreensaver';
import { CursorFX } from './components/CursorFX';
import { Konami } from './components/Konami';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Terminal } from './components/Terminal';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <div className="app">
      <div className="bg-vignette" aria-hidden="true" />
      <div className="bg-scanlines" aria-hidden="true" />
      <div className="bg-sweep" aria-hidden="true" />
      <BootSequence />
      <IdleScreensaver />
      <CursorFX />
      <Konami />

      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span className="text-faint">
            © {new Date().getFullYear()} alex.platreta
          </span>
          <span className="text-faint">
            built with{' '}
            <span className="text-dim">react · vite</span>
          </span>
          <span className="text-faint">
            <span className="text-dim">↑↑↓↓←→←→ba</span>{' '}
            <span className="text-faint">// try it</span>
          </span>
        </div>
        <style>{`
          .footer {
            padding-block: 28px;
            border-top: 1px dashed var(--border);
            font-size: 0.78rem;
          }
          .footer__inner {
            display: flex;
            flex-wrap: wrap;
            gap: 14px;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
      </footer>
    </div>
  );
}
