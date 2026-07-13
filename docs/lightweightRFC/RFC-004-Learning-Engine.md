# RFC-004: Learning Engine

## Status

Draft

## Goal

Implement a flashcard-based vocabulary learning system.

## Flashcard States

- Known
- Unknown
- Review Later
- Difficult

## Stored Metrics

```ts
{
  knownCount: number;
  failedCount: number;
  lastReview: string;
  nextReview: string;
}
```

## Future

Spaced repetition system:

- SM-2 inspired scheduling
- adaptive difficulty
- review prioritization

## Statistics

- Daily streak
- Words learned
- Difficult words
- CEFR progress
- Review backlog
