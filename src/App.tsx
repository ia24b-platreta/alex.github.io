import { Nav } from './components/Nav';
import { BootSequence } from './components/BootSequence';
import { IdleScreensaver } from './components/IdleScreensaver';
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
      <BootSequence />
      <IdleScreensaver />

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
            <span className="text-faint">{'// '}</span>
            © {new Date().getFullYear()} alex.platreta &nbsp; build:&nbsp;
            <span className="text-dim">react + vite</span>
            &nbsp; deploy:&nbsp;
            <span className="text-dim">github-pages</span>
          </span>
          <span className="text-faint">EOF</span>
        </div>
        <style>{`
          .footer {
            padding-block: 24px;
            border-top: 1px dashed var(--border);
            font-size: 0.78rem;
          }
          .footer__inner {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
      </footer>
    </div>
  );
}
