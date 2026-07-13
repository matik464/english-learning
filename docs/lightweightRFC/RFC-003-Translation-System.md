# RFC-003: Translation System

## Status

Draft

## Goal

Provide translations while minimizing API usage and costs.

## Supported Providers

- Google Translate
- PONS

## Translation Flow

```txt
Request Translation
↓
Check SQLite Cache
↓
Found?
├─ YES → Return
└─ NO
    ↓
    Provider Available?
    ├─ YES → Fetch + Cache
    └─ NO → Manual Translation
```

## Translation Status

```ts
type TranslationStatus =
  | "missing"
  | "api_generated"
  | "manual"
  | "corrected"
  | "reported"
  | "approved"
  | "rejected"
  | "api_limit_exceeded";
```

## Reporting

Users may report incorrect translations.

Reports are stored and reviewed by administrators.

## Manual Translations

Manual translations are allowed whenever:

- provider limit exceeded
- translation quality insufficient
- provider unavailable
