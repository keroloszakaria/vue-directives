# v-auto-aria-label

Automatically generates an `aria-label` from the element's text content, `title`, or `placeholder` attribute. You can also pass a custom label string. Existing explicit `aria-label` attributes are never overridden.

## Usage

```vue
<template>
  <button v-auto-aria-label>Save Document</button>
</template>

<script setup>
import { vAutoAriaLabel } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type                  | Description                                                                                                                                                                                             |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string \| undefined` | Optional custom label. When provided it is used directly. When omitted the directive tries, in order: element `textContent`, `title` attribute, `placeholder` attribute (for `<input>` / `<textarea>`). |

The directive does **not** override an `aria-label` that is already present on the element.

## Examples

### Auto-Label from Text Content

```vue
<template>
  <button v-auto-aria-label>Delete Item</button>
  <!-- aria-label="Delete Item" is set automatically -->
</template>

<script setup>
import { vAutoAriaLabel } from "vue-directives-pro";
</script>
```

### Custom Explicit Label

```vue
<template>
  <input v-auto-aria-label="'Enter your email address'" type="email" />
</template>

<script setup>
import { vAutoAriaLabel } from "vue-directives-pro";
</script>
```

### Fallback to Placeholder

```vue
<template>
  <input v-auto-aria-label placeholder="Search…" type="search" />
  <!-- aria-label="Search…" derived from placeholder -->
</template>

<script setup>
import { vAutoAriaLabel } from "vue-directives-pro";
</script>
```
