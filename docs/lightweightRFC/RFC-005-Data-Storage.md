# RFC-005: Data Storage

## Status

Draft

## Storage Layers

### Vocabulary Data

Static JSON files.

### Translation Cache

SQLite.

### User Progress

Initial:

```txt
localStorage
```

Future:

```txt
SQLite
↓
PostgreSQL
↓
Cloud Sync
```

## Database Tables

- vocabularies
- translations
- example_sentences
- translation_reports
- provider_usage
