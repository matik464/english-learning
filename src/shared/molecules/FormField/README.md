# FormField

`FormField` wraps single form control and wires accessibility automatically:

- connects `label` with control (`htmlFor` + `id`),
- links `hint` and `error` with `aria-describedby`,
- sets `aria-invalid` only when `error` exists.

## Usage

```tsx
import { FormField } from "./components/molecules/FormField";
import { Input } from "./components/atoms/Input";

<FormField
  label="Email"
  hint="Use address we should reply to."
  error={emailError}
>
  <Input value={email} onChange={(e) => setEmail(e.target.value)} />
</FormField>;
```

## Rules

- Pass exactly one child control (`input`, `textarea`, `select`, or component rendering one of them).
- If child already has `id`, `FormField` reuses it and points `label` to it.
- If child has no `id`, `FormField` generates one.
- `error` renders alert message and marks control as invalid.
