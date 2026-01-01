# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains the application code (React + TypeScript). Key areas: `src/app/` for layout-level UI, `src/components/` for reusable UI, `src/pages/` for route screens, `src/routers/` for React Router setup, `src/store/` for Redux Toolkit + RTK Query services, and `src/styles/` for global styling.
- `public/` hosts static assets served as-is (favicon, index template).
- `src/images/` and `src/data/` hold in-app static assets and mock/static data.
- `build/` is the production output from `npm run build`.
- Config lives at the repo root (`tailwind.config.js`, `postcss.config.js`, `tsconfig.json`).

## Build, Test, and Development Commands
- `npm start` / `yarn start`: run the app in dev mode at `http://localhost:3000`.
- `npm run build` / `yarn build`: create a production build in `build/`.
- `npm test` / `yarn test`: run the React Scripts test runner (watch mode).
- `npm run format` / `yarn format`: format the codebase with Prettier.
- `docker build -t podcatalk-ui .`: optional container build (see `Dockerfile`).

## Coding Style & Naming Conventions
- TypeScript + React; prefer functional components and hooks.
- Indentation and formatting are enforced by Prettier (`.prettierrc.mjs`) via `npm run format`.
- Tailwind CSS is used heavily; keep class lists readable and grouped by layout/spacing/visuals.
- Naming: components in `PascalCase` (e.g., `PodcastCard.tsx`), hooks in `useCamelCase` (e.g., `usePlayer.ts`), utilities in `camelCase`.

## Testing Guidelines
- Tests use Jest via React Scripts with Testing Library packages.
- Tests live in `src/` and follow `*.test.tsx` naming (example: `src/App.test.tsx`).
- Run the full suite with `npm test` and keep tests focused on user-visible behavior.

## Commit & Pull Request Guidelines
- Commit history favors short, sentence-style messages (e.g., “add guidelines for AI assistants”). Keep commits concise and scoped.
- PRs should describe intent, list major changes, and include screenshots for UI updates. Link related issues if applicable.

## Configuration & Environment
- Copy `.env.example` to `.env` and set `REACT_APP_API_URL` and `REACT_APP_AI_AGENT_API_URL` for local development.
- Do not commit secrets; keep environment-specific values out of version control.
