# alex.github.io

Personal portfolio for **Alex Platreta** — developer based in Zürich.

Live site: `https://ia24b-platreta.github.io/alex.github.io/`

## Stack

React 19 · TypeScript · Vite · vanilla CSS (no framework) · deployed to GitHub Pages via GitHub Actions.

## Local development

```bash
bun install
bun run dev      # http://localhost:5173/alex.github.io/
bun run build    # production build → dist/
bun run preview  # preview the production build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Bun + Vite and publishes `dist/` to GitHub Pages.

**One-time setup on GitHub:**
Settings → Pages → Source → **GitHub Actions**.

## Where to edit content

| What | File |
| --- | --- |
| Hero copy / name / tagline | `src/sections/Hero.tsx` |
| About bio | `src/sections/About.tsx` |
| Skills (languages / frameworks / tools / databases) | `src/sections/Skills.tsx` |
| Projects (3 placeholder cards) | `src/sections/Projects.tsx` |
| Contact links | `src/sections/Contact.tsx` |
| Color tokens / theme | `src/index.css` (`:root` and `[data-theme="light"]`) |
