# RFC-001: Architecture

## Status

Draft

## Context

The application is intended to serve as:

- an English Words Learning Platform,
- a portfolio project,
- a scalable foundation for future backend features.

## Decision

The project will use:

- Vite
- React
- TypeScript
- SQLite for durable application data
- Local Storage for lightweight client state

## High Level Architecture

```txt
PDF Files
    ↓
Parser Scripts
    ↓
JSON Vocabulary
    ↓
Translation Layer
    ↓
SQLite Persistence
    ↓
React Application
```

## Frontend Structure

```txt
src/
├── app/
├── pages/
├── features/
├── shared/
└── assets/
```

Responsibilities:

- `app/` - application bootstrap, providers, routing, and global configuration
- `pages/` - route-level views
- `features/` - domain-specific business logic
- `shared/` - reusable, domain-independent code and UI primitives
- `assets/` - static files

Persistence ownership:

- SQLite stores durable domain data such as vocabulary, progress, and related content
- Local Storage stores user preferences and other lightweight client-side state

## Consequences

Advantages:

- easy local development
- scalable structure
- separation of concerns
- backend-ready architecture
