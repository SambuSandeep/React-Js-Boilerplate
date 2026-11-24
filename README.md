# React Boilerplate

A starter template for new React projects: Vite, React, TypeScript, Tailwind CSS and a
preconfigured toolchain for code quality. Clone it, rename it and build your app on top.

## Tech stack

| Area            | Tool                                       |
| --------------- | ------------------------------------------ |
| Build tool      | Vite                                       |
| UI              | React, TypeScript (strict)                 |
| Routing         | React Router (lazy-loaded routes)          |
| Styling         | Tailwind CSS with design tokens, dark mode |
| Env validation  | Zod                                        |
| Lint and format | ESLint, Prettier                           |
| Git hooks       | Husky, lint-staged                         |

## Getting started

### Prerequisites

- Node.js 20 or newer (see `.nvmrc`)
- npm 10 or newer

### Setup

```bash
npm install
cp .env.example .env.local   # Windows PowerShell: Copy-Item .env.example .env.local
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the dev server with hot reload                |
| `npm run build`        | Type-check and create a production build in `dist/` |
| `npm run preview`      | Serve the production build locally                  |
| `npm run lint`         | Check code with ESLint                              |
| `npm run lint:fix`     | Fix lint problems automatically where possible      |
| `npm run format`       | Format all files with Prettier                      |
| `npm run format:check` | Check formatting without changing files             |
| `npm run typecheck`    | Run the TypeScript compiler without emitting files  |

## Project structure

```
src/
  app/          App shell: root component, providers, router
  components/
    ui/         Generic, reusable UI (Button, Input, Card, Spinner)
    layout/     Layout pieces (RootLayout, headers, sidebars)
    theme/      Theme provider and toggle
  config/       Env validation, route constants
  features/     One folder per business feature
  hooks/        Shared custom hooks
  lib/          Helpers and wrappers (cn, API client later)
  pages/        Route-level page components
  stores/       Global client state
  styles/       Global CSS, design tokens
  types/        Shared types and declarations
```

Rules of thumb:

- Code used by one feature stays in that feature's folder. Move it to a shared folder only
  when a second feature needs it.
- Import with the `@/` alias (`@/components/ui/Button`), not long relative paths.
- Import files directly. Don't create `index.ts` barrel files.

## Environment variables

Variables are defined in `.env.local` (not committed) and validated at startup in
`src/config/env.ts`. The app fails with a clear error if a required one is missing.

| Variable       | Description                              |
| -------------- | ---------------------------------------- |
| `VITE_API_URL` | Base URL of the backend API              |
| `VITE_APP_ENV` | `development`, `staging` or `production` |

To add one:

1. Add it to `.env.example`.
2. Add its type to `src/types/env.d.ts`.
3. Add it to the schema in `src/config/env.ts`.
4. Read it through `env.YOUR_VARIABLE`, never `import.meta.env` directly.

Only `VITE_`-prefixed variables reach the browser, and everything in the browser is public.
Never put secrets in them.

## Styling

- Colors and radii are tokens defined in `src/styles/index.css` (`bg-primary`,
  `text-muted-foreground`, `border-border`). Use these instead of raw colors.
- Dark mode is handled by a `dark` class on `<html>`, managed by `ThemeProvider`.
- Use `cn()` from `@/lib/utils` to combine class names.

## Code quality

A pre-commit hook (Husky + lint-staged) automatically:

1. Runs ESLint and Prettier on staged files
2. Runs the TypeScript check on the project

If a commit is rejected, read the error, fix it and commit again. Don't bypass the hook.

Recommended VS Code extensions: ESLint and Prettier (format on save is preconfigured in
`.vscode/settings.json`).

## Starting a new project from this template

1. Copy or clone the repo and delete the `.git` folder, then run `git init`.
2. Rename the project in `package.json` and `index.html`.
3. Remove the example content in `src/pages/HomePage.tsx`.
4. Update this README for your project.

## Known gaps and roadmap

- [ ] Testing setup (Vitest, Testing Library)
- [ ] API client and data fetching (TanStack Query)
- [ ] Global state (Zustand)
- [ ] Auth skeleton
