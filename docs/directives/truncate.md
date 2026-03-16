# v-truncate

Truncate text content by character count or by CSS line clamping. Supports a customizable ellipsis string.

## Usage

```vue
<template>
  <p v-truncate="100">
    This is a very long paragraph that will be cut off after 100 characters...
  </p>
</template>

<script setup>
import { vTruncate } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **number** or an **object**:

| Binding Value    | Type              | Description                                   |
| ---------------- | ----------------- | --------------------------------------------- |
| `value` (number) | `number`          | Shorthand — truncate at this character count. |
| `value` (object) | `TruncateBinding` | Full options for length, lines, or ellipsis.  |

**`TruncateBinding` Object:**

| Property   | Type     | Default | Description                                              |
| ---------- | -------- | ------- | -------------------------------------------------------- |
| `length`   | `number` | —       | Maximum character count before truncation.               |
| `lines`    | `number` | —       | Number of visible lines (uses CSS `-webkit-line-clamp`). |
| `ellipsis` | `string` | `'...'` | Custom ellipsis string appended after truncation.        |

> **Note:** `lines` and `length` are mutually exclusive. When `lines` is set, CSS line-clamp is applied instead of character slicing.

## Examples

### Character-Based Truncation

```vue
<template>
  <p v-truncate="50">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt.
  </p>
</template>

<script setup>
import { vTruncate } from "vue-directives-pro";
</script>
```

### CSS Line Clamping

```vue
<template>
  <p v-truncate="{ lines: 3 }">
    This paragraph will be clamped to three visible lines using CSS. Any
    overflow content will be hidden and replaced with an ellipsis by the
    browser's line-clamp behavior. Great for card descriptions.
  </p>
</template>

<script setup>
import { vTruncate } from "vue-directives-pro";
</script>
```

### Custom Ellipsis

```vue
<template>
  <p v-truncate="{ length: 80, ellipsis: ' [read more]' }">
    Vue directives are a powerful way to add reusable behavior directly to DOM
    elements without writing extra components or composables.
  </p>
</template>

<script setup>
import { vTruncate } from "vue-directives-pro";
</script>
```
