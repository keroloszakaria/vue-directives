# v-mask

Applies an input mask to format user input in real time. The mask enforces a fixed pattern using token characters, automatically inserting literal separator characters as the user types.

## Mask Tokens

| Token | Matches                    |
| ----- | -------------------------- |
| `#`   | Digit (`0-9`)              |
| `A`   | Letter (`a-zA-Z`)          |
| `X`   | Alphanumeric (`a-zA-Z0-9`) |

Any other character in the mask string is treated as a literal and inserted automatically.

## Usage

```vue
<template>
  <input v-mask="'###-###-####'" placeholder="Phone number" />
</template>

<script setup>
import { vMask } from "vue-directives";
</script>
```

## Options / Binding

The binding value is a **mask pattern string**:

| Value  | Type     | Description                                                        |
| ------ | -------- | ------------------------------------------------------------------ |
| `mask` | `string` | A pattern string using `#`, `A`, `X` tokens and literal characters |

The mask is applied on every `input` event. Cursor position is preserved. When the binding value changes, the existing value is re-masked.

## Examples

### Phone Number

```vue
<template>
  <div>
    <label>Phone</label>
    <input v-mask="'(###) ###-####'" placeholder="(555) 123-4567" />
  </div>
</template>

<script setup>
import { vMask } from "vue-directives";
</script>
```

### Credit Card & Date

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div>
      <label>Credit Card</label>
      <input v-mask="'####-####-####-####'" placeholder="0000-0000-0000-0000" />
    </div>
    <div>
      <label>Expiry Date</label>
      <input v-mask="'##/##'" placeholder="MM/YY" />
    </div>
    <div>
      <label>Product Key</label>
      <input v-mask="'XXXXX-XXXXX-XXXXX'" placeholder="A1B2C-D3E4F-G5H6I" />
    </div>
  </div>
</template>

<script setup>
import { vMask } from "vue-directives";
</script>
```
