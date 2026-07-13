# AGENTS.md

## Project context

This is a React project "English Learning Platform" built with Vite, TypeScript, Vitest, React Testing Library, ESLint, Prettier and CSS Modules.

The goal is to keep the implementation small, readable, accessible and production-minded without overengineering.

## Code simplicity

Extract a helper only when duplication becomes meaningful, and the abstraction clearly simplifies the code.

## Engineering principles

- Prefer simple, explicit code over clever abstractions.
- Keep components small and focused.
- Do not introduce new dependencies unless there is a clear and documented reason.
- Do not add global state management unless the current scope clearly requires it.
- Preserve the lightweight Atomic Design-inspired structure.
- Keep business/domain logic inside `features`.
- Keep reusable UI primitives inside `atoms`, `molecules` and `organisms`.
- Keep route-level views inside `pages`.
- For business logic check `docs` catalog and if there is a clear instruction, update the documentation.

## TypeScript rules

- Never use `any`.
- Prefer precise types and discriminated unions where useful.
- Avoid type assertions unless they are necessary and safe.
- Do not silence TypeScript errors with comments.
- Keep public component props explicitly typed.
- Prefer `type` for object shapes unless an interface is clearly more appropriate for extension.
- Avoid unnecessary generics.

## React rules

- Use function components.
- Prefer controlled components for form inputs where appropriate.
- Keep derived values derived instead of duplicated in state.
- Do not use effects for logic that can be calculated during render.
- Keep `useEffect` usage minimal and justified.
- Avoid premature memoization with `useMemo` or `useCallback`.
- Use semantic HTML before custom ARIA.
- Do not create abstraction layers for one-off use cases.

## Accessibility

- Interactive elements must be keyboard-accessible.
- Prefer native elements such as `button`, `input`, `label`, `fieldset` and `form`.
- Inputs must have accessible labels.
- Buttons must have clear accessible names.
- Do not use clickable `div` or `span` elements.
- Use ARIA only when semantic HTML is not enough.
- Preserve visible focus states.
- Avoid accessibility regressions when changing markup.

## Styling

- Use CSS Modules.
- Use only CSS custom properties already defined in `src/index.css`.
- Do not invent new CSS variables such as `--color-text-label` unless they are also added to `:root` in `src/index.css`.
- Every `var(...)` usage must reference an existing variable from `src/index.css` or include a fallback value.
- For labels and secondary text, prefer `--color-text-subtle`.
- Keep styles colocated with components.
- Use clear, component-oriented class names.
- A lightweight BEM-inspired naming convention is acceptable for component parts and variants.
- Do not enforce a full BEM ceremony when simple local names are clearer.
- Prefer names that describe UI purpose, not visual appearance.
- Do not introduce CSS-in-JS, Tailwind, Sass or UI component libraries.
- Avoid deeply nested selectors.
- Avoid overly generic global styles.
- Keep responsive behavior simple and intentional.

## Custom hooks

- Keep simple local logic inside components.
- Extract custom hooks only when they clearly improve readability, reusability or testability.
- Use custom hooks for non-trivial behavior such as filtering, sorting, pagination, debouncing, data fetching or local storage state.
- Avoid hooks that only wrap a single `useState` without meaningful behavior.
- Keep hook APIs small, explicit and predictable.

## Error handling

Use `ErrorBoundary` for protecting larger UI sections or the whole application from render-time crashes.
Keep it reusable and UI-focused, preferably under `components/organisms/ErrorBoundary`.
Do not use it as a replacement for local `try/catch` in event handlers or async logic.

## Testing

- Use Vitest and React Testing Library.
- Test user-visible behavior, not implementation details.
- Prefer queries such as `getByRole`, `getByLabelText`, `getByText` and `findBy...`.
- Avoid testing private functions through component internals.
- Use `user-event` for user interactions.
- Add or update tests when behavior changes.
- Do not add snapshot tests unless explicitly requested.

## Performance

- Keep the initial bundle small.
- Do not add heavy libraries for simple UI behavior.
- Do not add route-level lazy loading or manual chunk splitting unless the app grows enough to justify it.
- Lighthouse should be run against the production build, not the Vite dev server.

## SEO note

Indexing is intentionally disabled for this project via `robots.txt`.

Do not remove or bypass this only to improve the Lighthouse SEO score unless explicitly requested. The Lighthouse warning "Page is blocked from indexing" is expected for this project.

## Commands

Use these commands to verify changes:

```bash
npm install
npm run lint
npm run test
npm run typecheck
npm run build
npm run prettier:check
```

## Definition of done

A change is complete when:

- TypeScript passes.
- ESLint passes.
- Tests pass.
- Production build passes.
- Formatting is valid.
- Accessibility has not regressed.
- No unnecessary dependencies or architectural layers were added.
