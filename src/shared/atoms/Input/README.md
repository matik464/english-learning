# Input

`Input` is thin styled wrapper around native `<input>`.

## Usage

```tsx
import { Input } from "./components/atoms/Input";

<Input
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  placeholder="name@example.com"
  aria-label="Email"
/>;
```

## Props

- Supports all native `InputHTMLAttributes<HTMLInputElement>` props.
- `type` defaults to `"text"`.
- `className` merges with component base styles.

## Accessibility

- Provide accessible label via `<label htmlFor>` or `aria-label`.
- Prefer wrapping with `FormField` for `hint` and `error` wiring.
