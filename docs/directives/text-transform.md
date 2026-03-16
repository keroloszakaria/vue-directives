# v-uppercase / v-lowercase

Two directives that automatically transform input text to **uppercase** or **lowercase** as the user types. Cursor position is preserved during transformation.

## Usage

```vue
<template>
  <input v-uppercase placeholder="UPPERCASE" />
  <input v-lowercase placeholder="lowercase" />
</template>

<script setup>
import { vUppercase, vLowercase } from "vue-directives-pro";
</script>
```

## Options / Binding

Both directives take **no binding value**. Simply add `v-uppercase` or `v-lowercase` to any `<input>`.

| Directive     | Export Name  | Effect                                                  |
| ------------- | ------------ | ------------------------------------------------------- |
| `v-uppercase` | `vUppercase` | Converts input text to uppercase on every `input` event |
| `v-lowercase` | `vLowercase` | Converts input text to lowercase on every `input` event |

## Examples

### Uppercase Code Input

```vue
<template>
  <div>
    <label>Voucher Code</label>
    <input
      v-uppercase
      v-model="code"
      placeholder="Enter voucher code"
      style="text-transform: uppercase;"
    />
    <p>Code: {{ code }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vUppercase } from "vue-directives-pro";

const code = ref("");
</script>
```

### Lowercase Email Input

```vue
<template>
  <div>
    <label>Email Address</label>
    <input
      v-lowercase
      v-model="email"
      type="email"
      placeholder="user@example.com"
      style="width: 100%;"
    />
    <p>Email: {{ email }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vLowercase } from "vue-directives-pro";

const email = ref("");
</script>
```
