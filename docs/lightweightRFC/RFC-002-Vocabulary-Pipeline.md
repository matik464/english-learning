# RFC-002: Vocabulary Pipeline

## Status

Draft

## Goal

Convert Oxford PDF files into structured vocabulary datasets.

## Source Data

- Oxford 3000 - The_Oxford_3000_by_CEFR_level
- Oxford 5000 - The_Oxford_5000_by_CEFR_level

## Processing Flow

```txt
PDF
↓
Parser
↓
Final JSON
```

## Raw Vocabulary Format

```json
{
  "word": "abandon",
  "pos": "abandon",
  "raw": "verb"
}
```

## Scripts

```txt
scripts/
├── update-oxford-data.ts
```
