# v-element-query

Provides container-query-like behavior using `ResizeObserver`. Applies CSS classes to an element based on its own dimensions, allowing component styles to respond to the element's size rather than the viewport.

## Usage

```vue
<template>
  <div
    v-element-query="[
      { maxWidth: 400, class: 'compact' },
      { minWidth: 401, maxWidth: 800, class: 'medium' },
      { minWidth: 801, class: 'large' },
    ]"
  >
    Responsive container content
  </div>
</template>

<script setup>
import { vElementQuery } from "vue-directives";
</script>
```

## Options / Binding

The binding value is an array of breakpoint objects:

| Property    | Type     | Description                                                                              |
| ----------- | -------- | ---------------------------------------------------------------------------------------- |
| `minWidth`  | `number` | Optional. Minimum element width (inclusive) for this breakpoint to match.                |
| `maxWidth`  | `number` | Optional. Maximum element width (inclusive) for this breakpoint to match.                |
| `minHeight` | `number` | Optional. Minimum element height (inclusive) for this breakpoint to match.               |
| `maxHeight` | `number` | Optional. Maximum element height (inclusive) for this breakpoint to match.               |
| `class`     | `string` | **Required.** CSS class name added when the breakpoint matches, removed when it doesn't. |

Width and height conditions are evaluated independently — both must match for the class to be applied. Omitted properties are treated as "any value".

## Examples

### Width-based Responsive Card

```vue
<template>
  <div
    v-element-query="[
      { maxWidth: 300, class: 'card--small' },
      { minWidth: 301, maxWidth: 600, class: 'card--medium' },
      { minWidth: 601, class: 'card--large' },
    ]"
    class="card"
  >
    <h3>Responsive Card</h3>
    <p>This card adapts to its container width.</p>
  </div>
</template>

<script setup>
import { vElementQuery } from "vue-directives";
</script>

<style scoped>
.card--small {
  font-size: 0.875rem;
  padding: 0.5rem;
}
.card--medium {
  font-size: 1rem;
  padding: 1rem;
}
.card--large {
  font-size: 1.125rem;
  padding: 1.5rem;
}
</style>
```

### Width and Height Breakpoints

```vue
<template>
  <div
    v-element-query="[
      { maxWidth: 400, maxHeight: 300, class: 'thumbnail' },
      { minWidth: 401, minHeight: 301, class: 'expanded' },
    ]"
    class="media-container"
  >
    <img src="/images/photo.jpg" alt="Responsive media" />
  </div>
</template>

<script setup>
import { vElementQuery } from "vue-directives";
</script>

<style scoped>
.thumbnail {
  object-fit: cover;
}
.expanded {
  object-fit: contain;
}
</style>
```
