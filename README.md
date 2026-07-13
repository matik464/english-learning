# English Learning Platform

## Tech stack

- React
- TypeScript
- Vite
- Vitest
- React Testing Library
- ESLint
- Prettier
- Typecheck
- SQLite

## Requirements

- Node.js `^20.19.0 || >=22.12.0`
- npm

The required Node.js version is defined in `package.json` via the `engines` field.

If you use `nvm`, run:

```bash
nvm use
```

## Styling

The project uses CSS Modules to keep styling simple, scoped and framework-independent.

Class names follow a clear, component-oriented naming style.
A lightweight BEM-inspired convention is used where it improves readability, especially for component elements and variants, without enforcing a full BEM ceremony.

Because styles are colocated with components and do not depend on a runtime styling library, the components can be more easily adapted to SSR-capable environments such as Next.js.

## Project structure

The project follows a lightweight Atomic Design-inspired structure.

- `app` - application bootstrap, providers, routing, and global configuration
- `shared/atoms` contain small reusable UI elements.
- `shared/molecules` contain simple combinations of atoms.
- `shared/organisms` contain larger UI sections.
- `features` contain domain-specific logic, API calls, hooks and types.
- `pages` contain route-level views.
- `assets` - static files

## Getting started

```bash
nvm use
npm install
npm run dev
```

## Quality checks

```bash
npm run build
npm run preview
npm run test
npm run lint
npm run typecheck
npm run prettier:check
```

## SEO

Indexing is intentionally disabled for this project via `robots.txt`.
As a result, Lighthouse reports: "Page is blocked from indexing".

This is expected and not an implementation bug.

## Agent instructions

This repository includes `AGENTS.md` with project-specific guidance for AI coding agents such as Codex.
It documents the expected engineering conventions, quality checks and project constraints.

## Continuous Integration

The project includes a basic GitHub Actions pipeline that runs linting, tests, formatting checks and the production build on push and pull requests.
