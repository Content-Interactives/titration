# Titration

React simulation of acid–base (or generic) titration: titrant volume, reaction progress, and equivalence-point concepts. Vite + Tailwind.

**Live:** https://content-interactives.github.io/titration/

**Curriculum and standards:** [Standards.md](Standards.md)

## Stack

- React 19, Vite 6, JavaScript (JSX)
- Tailwind CSS 3, `lucide-react`

## Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Build → `dist/` |
| `npm run preview` | Preview `dist/` |
| `npm run lint` | ESLint |
| `npm run deploy` | Build + `gh-pages -d dist` |

## Configuration

`vite.config.js`: `base: '/titration/'`.

## Layout

`src/main.jsx` entry; UI under `src/`.
