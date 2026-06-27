# Ridam Agrawal — Portfolio

Personal portfolio of **Ridam Agrawal** — Full-Stack Developer · Backend & AI Engineer.

Built with the "Engineered Dark" aesthetic: premium, near-black, one accent, tasteful motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS v3 + CSS variables for design tokens
- **Animation:** Framer Motion, GSAP, Lenis (smooth scroll)
- **Icons:** Lucide
- **Forms:** React Hook Form + Zod
- **Utilities:** clsx + tailwind-merge (`cn` helper)
- **Tooling:** ESLint + Prettier
- **Deploy:** Vercel

## Getting Started

Requires Node.js 18.18+ (Node 22 recommended).

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
```

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the local dev server              |
| `npm run build`        | Production build                        |
| `npm run start`        | Serve the production build              |
| `npm run lint`         | ESLint (Next.js config + Prettier-safe) |
| `npm run typecheck`    | TypeScript type-check (`tsc --noEmit`)  |
| `npm run format`       | Format the codebase with Prettier       |
| `npm run format:check` | Check formatting without writing        |

## Project Structure

```
src/
├── app/          # App Router routes, layout, global styles
├── components/   # UI components
├── content/      # Type-safe content/data files
├── lib/          # Utilities and hooks (e.g. cn())
└── styles/       # Shared style modules / tokens
```

Path alias `@/` maps to `src/` (e.g. `import { cn } from "@/lib/utils"`).

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` triggers a production deploy
once the repository is connected to a Vercel project.
