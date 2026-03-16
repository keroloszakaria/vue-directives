# v-numeric

Restricts an input to accept only numeric characters. Optionally allows decimal points, negative values, and enforces min/max constraints.

## Usage

```vue
<template>
  <input v-numeric placeholder="Numbers only" />
</template>

<script setup>
import { vNumeric } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be omitted, a `boolean`, or a **`NumericBinding`** object:

| Property   | Type      | Default | Description                              |
| ---------- | --------- | ------- | ---------------------------------------- |
| `decimal`  | `boolean` | `false` | Allow a single decimal point             |
| `negative` | `boolean` | `false` | Allow a leading negative sign            |
| `min`      | `number`  | —       | Minimum allowed value (enforced on blur) |
| `max`      | `number`  | —       | Maximum allowed value (enforced on blur) |

If no value or `true` is passed, only integer digits (`0-9`) are allowed. Invalid characters are stripped on `input`; min/max clamping occurs on `blur`.

## Examples

### Integer Only

```vue
<template>
  <div>
    <label>Quantity</label>
    <input v-numeric v-model="qty" placeholder="Enter quantity" />
    <p>Value: {{ qty }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vNumeric } from "vue-directives-pro";

const qty = ref("");
</script>
```

### Decimal with Min/Max

```vue
<template>
  <div>
    <label>Price (0 – 9999.99)</label>
    <input
      v-numeric="{ decimal: true, min: 0, max: 9999.99 }"
      v-model="price"
      placeholder="0.00"
    />
    <label>Temperature (−50 – 50)</label>
    <input
      v-numeric="{ decimal: true, negative: true, min: -50, max: 50 }"
      v-model="temp"
      placeholder="e.g. -12.5"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vNumeric } from "vue-directives-pro";

const price = ref("");
const temp = ref("");
</script>
```
