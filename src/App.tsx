import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <div className="app">
      <div className="bg-grain" aria-hidden="true" />
      <div className="bg-blob bg-blob--violet" aria-hidden="true" />
      <div className="bg-blob bg-blob--cyan" aria-hidden="true" />

      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Alex Platreta</span>
          <span className="text-dim mono">
            Built with React + Vite · Deployed via GitHub Actions
          </span>
        </div>
        <style>{`
          .footer {
            padding-block: 32px;
            border-top: 1px solid var(--border);
            font-size: 0.85rem;
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
