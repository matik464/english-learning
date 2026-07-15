# Select

`Select` is styled wrapper around native `<select>`.

## Usage

```tsx
import { Select } from "./components/atoms/Select";

<Select
  value={documentType}
  onChange={(event) => setDocumentType(event.target.value)}
  aria-label="Document type"
>
  <option value="id">ID</option>
  <option value="proof_of_income">Proof of income</option>
  <option value="other">Other</option>
</Select>;
```

## Props

- Supports all native `SelectHTMLAttributes<HTMLSelectElement>` props.
- `className` merges with component base styles.

## Accessibility

- Provide accessible label via `<label htmlFor>` or `aria-label`.
- Prefer wrapping with `FormField` for `hint` and `error` wiring.
