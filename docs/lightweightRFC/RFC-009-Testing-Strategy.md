# RFC-009: Testing Strategy

## Status

Draft

## Context

As the project grows, manual testing becomes insufficient.

A testing strategy is required to ensure stability and confidence during development.

The testing approach should support both:

- feature-based architecture,
- Atomic Design UI structure.

## Goals

- Prevent regressions
- Increase confidence during refactoring
- Validate business logic
- Validate user workflows
- Support continuous integration
- Keep UI components reliable and reusable

## Testing Pyramid

```txt
          E2E
         /   \
 Integration
      /       \
    Unit Tests
```

Priority:

1. Unit Tests
2. Integration Tests
3. End-to-End Tests

## Unit Tests

Tools:

- Vitest

Examples:

- spaced repetition calculations
- vocabulary filtering
- statistics calculations
- translation status handling
- provider limit logic
- localStorage serialization

## Component Tests

Tools:

- Vitest
- React Testing Library

Component tests should focus on user behavior, not implementation details.

## Atomic Design Testing

### Atoms

Atoms should have simple rendering and interaction tests.

Examples:

```txt
shared/ui/atoms/Button
shared/ui/atoms/Input
shared/ui/atoms/Badge
shared/ui/atoms/Spinner
```

Test examples:

- renders children correctly
- supports disabled state
- calls event handlers
- exposes accessible labels

### Molecules

Molecules should test small UI patterns.

Examples:

```txt
shared/ui/molecules/SearchInput
shared/ui/molecules/FormField
shared/ui/molecules/ProgressBar
shared/ui/molecules/EmptyState
```

Test examples:

- updates search value
- displays validation message
- renders progress value
- shows empty state message

### Organisms

Organisms should test larger reusable interface sections.

Examples:

```txt
shared/ui/organisms/Header
shared/ui/organisms/Sidebar
shared/ui/organisms/DataTable
shared/ui/organisms/FilterPanel
```

Test examples:

- renders navigation items
- opens and closes sidebar
- sorts table rows
- applies selected filters

### Templates

Templates should be tested lightly.

Examples:

```txt
shared/ui/templates/DashboardTemplate
shared/ui/templates/AdminTemplate
shared/ui/templates/LearningTemplate
```

Test examples:

- renders provided children
- places sidebar/content in expected regions
- exposes accessible landmarks

## Feature Tests

Feature tests should validate domain behavior.

Examples:

```txt
features/flashcards
features/vocabulary
features/translations
features/progress
features/statistics
features/admin
```

Test examples:

- flashcard can be revealed
- word can be marked as known
- progress is updated
- missing translation is detected
- manual translation can be saved
- report can be submitted

## Integration Tests

Purpose:

Verify cooperation between modules.

Examples:

- flashcard session flow
- vocabulary filtering
- translation retrieval
- progress updates
- admin translation review flow

## End-to-End Tests

Tools:

- Playwright

## E2E User Journeys

### Learning Session

```txt
Open Flashcards
↓
Reveal Translation
↓
Mark As Known
↓
Progress Updated
```

### Translation Workflow

```txt
Open Vocabulary
↓
Translation Missing
↓
Fetch Translation
↓
Store Result
↓
Display Translation
```

### Manual Translation Workflow

```txt
Open Vocabulary
↓
API Limit Exceeded
↓
Show Manual Translation Form
↓
Submit Manual Translation
↓
Translation Saved
```

### Admin Review Workflow

```txt
Open Admin Panel
↓
View Reported Translation
↓
Edit Translation
↓
Approve Correction
↓
Status Updated
```

## Mocking Strategy

Always mock external providers:

- Google Translate
- PONS
- future backend endpoints

Reasons:

- predictable tests
- no API costs
- faster execution
- no rate-limit failures

Mock browser APIs where needed:

- localStorage
- IndexedDB
- ResizeObserver
- IntersectionObserver

## Test Coverage

Suggested targets:

```txt
Business Logic      90%+
Services            80%+
Components          70%+
Overall             80%+
```

Coverage is a guide, not the primary objective.

Meaningful tests are preferred over artificial coverage.

## What Must Be Tested

### Critical

- review scheduling
- vocabulary transformations
- statistics calculations
- translation caching
- provider limit handling
- progress persistence
- manual translation status handling

### Important

- routing
- filtering
- sorting
- search
- admin review actions
- report submission

### Optional

- purely visual components
- layout-only wrappers
- static copy

## CI Pipeline

Tests should run on:

- pull requests
- pushes to main

Pipeline:

```txt
Install
↓
Lint
↓
Type Check
↓
Unit Tests
↓
Build
```

GitHub Actions should block merging when tests fail.

## Future Enhancements

Potential additions:

- visual regression testing
- accessibility testing
- Lighthouse CI
- performance budgets
- Storybook interaction tests

## Decision

The project will adopt a testing pyramid approach using Vitest, React Testing Library, and Playwright.

Atomic Design components will be tested according to their responsibility level, while feature tests will focus on business behavior and user workflows.
