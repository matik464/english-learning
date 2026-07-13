# RFC-008: Frontend Architecture

## Status

Draft

## Context

English Words is expected to grow into an English Words Learning Platform.

To keep the codebase scalable, the frontend architecture must separate:

- application setup,
- route-level pages,
- domain features,
- reusable UI components,
- business logic,
- infrastructure services.

The project will use a feature-based architecture combined with Atomic Design for reusable UI components.
SQLite will own durable application data, while Local Storage will own lightweight client-side state.

## Goals

- Scalability
- Maintainability
- Feature isolation
- Reusability
- Testability
- Predictable state management
- Clear UI component hierarchy

## Architectural Style

The application will use:

- Feature-Based Architecture for business domains
- Atomic Design for reusable UI components
- Service Layer for API and persistence logic
- SQLite for durable storage
- Local Storage for client-side persistence

Features are organized around business domains, while shared UI components are organized by Atomic Design levels.

## Project Structure

```txt
src/
├── app/
├── pages/
├── features/
├── shared/
└── assets/
```

## Layer Responsibilities

## app

The `app` layer is responsible for application bootstrap.

Responsibilities:

- Router configuration
- Global providers
- Theme configuration
- Global state initialization
- Application-level configuration
- Shared persistence wiring

Example:

```txt
app/
├── providers/
│   ├── AppProviders.tsx
│   ├── QueryProvider.tsx
│   └── ThemeProvider.tsx
├── router/
│   └── AppRouter.tsx
├── store/
└── config/
```

## pages

The `pages` layer contains route-level views.

Pages should compose features and templates, but should not contain complex business logic.

Example:

```txt
pages/
└── FlashcardsPage/
    ├── FlashcardsPage.tsx
    └── index.ts
```

## features

The `features` layer contains domain-specific business functionality.

Each feature may own:

- components
- hooks
- services
- state
- types
- tests

Example:

```txt
features/
└── flashcards/
    ├── components/
    ├── hooks/
    ├── services/
    ├── store/
    ├── types/
    └── tests/
```

## shared

The `shared` layer contains reusable, domain-independent code.

It should not depend on feature modules.

Examples:

- reusable UI components
- shared hooks
- utility functions
- generic services
- common types
- infrastructure adapters for SQLite and Local Storage

# Persistence Ownership

Storage responsibilities are split by scope:

- `shared/services` contains infrastructure adapters for SQLite, Local Storage, and external APIs
- `features/*/services` contains domain-specific persistence logic
- `features/*/store` owns feature state that may read from or write to persistence
- `app/` wires storage providers and bootstrap dependencies

# Atomic Design

Reusable UI components will be organized using Atomic Design.

Atomic Design helps keep the UI system consistent, composable, and easy to scale.

## atoms

Atoms are the smallest reusable UI elements.

Examples:

```txt
shared/ui/atoms/
├── Button/
├── Input/
├── Label/
├── Icon/
├── Badge/
├── Spinner/
└── Typography/
```

Rules:

- no business logic
- no API calls
- no feature-specific knowledge
- highly reusable
- easy to test visually and behaviorally

Example:

```tsx
<Button variant="primary">Start learning</Button>
```

## molecules

Molecules combine multiple atoms into small reusable UI patterns.

Examples:

```txt
shared/ui/molecules/
├── SearchInput/
├── FormField/
├── ProgressBar/
├── StatCard/
├── EmptyState/
└── ConfirmDialog/
```

Rules:

- may contain simple UI logic
- should remain domain-independent
- should not call feature services directly

Example:

```tsx
<SearchInput value={query} onChange={setQuery} />
```

## organisms

Organisms are larger reusable interface sections composed of atoms and molecules.

Examples:

```txt
shared/ui/organisms/
├── Header/
├── Sidebar/
├── DataTable/
├── AppShell/
├── FilterPanel/
└── DashboardGrid/
```

Rules:

- can manage layout-level UI state
- should remain reusable across pages
- should avoid domain-specific business rules

Example:

```tsx
<AppShell>
  <Outlet />
</AppShell>
```

## templates

Templates define reusable page layouts.

Examples:

```txt
shared/ui/templates/
├── DashboardTemplate/
├── AdminTemplate/
├── LearningTemplate/
└── CenteredPageTemplate/
```

Rules:

- define layout structure
- compose organisms
- receive content through props or children
- should not fetch data directly

Example:

```tsx
<LearningTemplate sidebar={<FlashcardProgress />}>
  <FlashcardSession />
</LearningTemplate>
```

# Feature Components vs Shared UI Components

Feature components may use shared UI components, but shared UI components must not import from features.

Allowed:

```txt
features/flashcards/components/Flashcard.tsx
↓ imports
shared/ui/atoms/Button
shared/ui/molecules/ProgressBar
```

Not allowed:

```txt
shared/ui/molecules/StatCard.tsx
↓ imports
features/statistics/services/statisticsService
```

## Feature Component Example

```txt
features/flashcards/components/
├── Flashcard.tsx
├── FlashcardAnswerActions.tsx
├── FlashcardSession.tsx
└── FlashcardSummary.tsx
```

These components can contain flashcard-specific logic and terminology.

## Shared UI Example

```txt
shared/ui/molecules/ProgressBar/
├── ProgressBar.tsx
├── ProgressBar.test.tsx
└── index.ts
```

This component should know nothing about flashcards, vocabulary, or CEFR levels.

# State Management

## Local State

Use React state for:

- forms
- modal visibility
- temporary UI state
- component-only interactions

## Global State

Use Zustand for:

- user progress
- flashcard session state
- application preferences
- UI settings

Reasons:

- lightweight
- TypeScript friendly
- less boilerplate than Redux
- easy to split into domain stores

Example:

```txt
features/flashcards/store/useFlashcardStore.ts
features/progress/store/useProgressStore.ts
```

# Data Fetching

Use TanStack Query for server/cache-aware data fetching.

Responsibilities:

- caching
- request deduplication
- loading states
- retry logic
- background refetching where appropriate

Example:

```ts
const { data } = useQuery({
  queryKey: ["translation", word, language],
  queryFn: () => translationService.getTranslation(word, language),
});
```

# API Layer

All external communication must go through service modules.

Bad:

```ts
fetch(...)
```

inside components.

Good:

```ts
translationService.getTranslation(word, language);
```

Service examples:

```txt
shared/services/httpClient.ts
features/translations/services/translationService.ts
features/vocabulary/services/vocabularyService.ts
```

# Component Design Rules

## Presentational Components

Responsible only for rendering.

Examples:

- FlashcardView
- VocabularyCard
- StatisticsCard

## Container Components

Responsible for orchestration and data loading.

Examples:

- FlashcardSession
- VocabularyBrowser
- AdminTranslationReview

## Rule

Business logic should live in:

- hooks
- services
- stores
- pure utility functions

It should not be hidden inside large UI components.

# Routing

React Router will be used.

Routes:

```txt
/
├── vocabulary
├── flashcards
├── statistics
├── settings
└── admin
```

# Styling

Preferred solution:

- CSS Modules

Reasons:

- styles stay colocated with components
- scope stays explicit
- fits lightweight component structure
- avoids introducing a new styling runtime

# Accessibility

Requirements:

- keyboard navigation
- semantic HTML
- ARIA attributes where necessary
- sufficient color contrast
- focus states for interactive elements

# Testing Implications

Atomic Design supports testing at multiple levels:

- atoms: visual and interaction basics
- molecules: simple interaction patterns
- organisms: layout and composition behavior
- features: domain workflows
- pages: route-level integration

# Decision

The frontend will follow a feature-based architecture combined with Atomic Design.

Business features will live under `features/`, while reusable UI components will live under `shared/ui/atoms`, `shared/ui/molecules`, `shared/ui/organisms`, and `shared/ui/templates`.

The project will use React, TypeScript, Zustand, TanStack Query, React Router, and CSS Modules.
