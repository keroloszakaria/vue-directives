# v-format-number

Formats the text content of an element as a locale-aware number using `Intl.NumberFormat`. Supports plain numbers, currencies, percentages, and any `Intl.NumberFormatOptions`.

## Usage

```vue
<template>
  <span v-format-number="1234567.89">1234567.89</span>
</template>

<script setup>
import { vFormatNumber } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **number** or a **`FormatNumberBinding`** object:

| Binding Type          | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `number`              | Formats the number using the default locale                             |
| `FormatNumberBinding` | Object with `locale` and `options` for full `Intl.NumberFormat` control |

**`FormatNumberBinding`**

| Property  | Type                       | Default     | Description                                                                               |
| --------- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `locale`  | `string`                   | `undefined` | BCP 47 locale string (e.g. `'en-US'`, `'de-DE'`). Falls back to browser default.          |
| `options` | `Intl.NumberFormatOptions` | `undefined` | Standard `Intl.NumberFormat` options (`style`, `currency`, `minimumFractionDigits`, etc.) |

When a plain number is passed, the element's text content is replaced with the formatted value. When an object is passed, the existing text content is parsed as a number and then formatted.

## Examples

### Simple Number Formatting

```vue
<template>
  <div>
    <p>Default: <span v-format-number="1234567.89" /></p>
    <p>Dynamic: <span v-format-number="price" /></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vFormatNumber } from "vue-directives";

const price = ref(49999.5);
</script>
```

### Currency Formatting

```vue
<template>
  <div>
    <p>
      USD:
      <span
        v-format-number="{
          locale: 'en-US',
          options: { style: 'currency', currency: 'USD' },
        }"
      >
        1234.5
      </span>
    </p>
    <p>
      EUR:
      <span
        v-format-number="{
          locale: 'de-DE',
          options: { style: 'currency', currency: 'EUR' },
        }"
      >
        1234.5
      </span>
    </p>
    <p>
      Percent:
      <span
        v-format-number="{
          locale: 'en-US',
          options: { style: 'percent', minimumFractionDigits: 1 },
        }"
      >
        0.856
      </span>
    </p>
  </div>
</template>

<script setup>
import { vFormatNumber } from "vue-directives";
</script>
```
