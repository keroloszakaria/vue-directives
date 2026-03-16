# v-auto-layout

Automatically calculates and applies responsive grid or flex layout to a container based on its size. Uses `ResizeObserver` to dynamically adjust the number of columns as the container resizes.

## Usage

```vue
<template>
  <div v-auto-layout="{ columns: { minWidth: 250 }, gap: '16px' }">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
</template>

<script setup>
import { vAutoLayout } from "vue-directives-pro";
</script>
```

## Options / Binding

| Property           | Type               | Default  | Description                                                                             |
| ------------------ | ------------------ | -------- | --------------------------------------------------------------------------------------- |
| `columns.minWidth` | `number`           | —        | Minimum width (in px) for each column. Used to calculate column count.                  |
| `gap`              | `string`           | `'16px'` | CSS gap value applied between items.                                                    |
| `type`             | `'grid' \| 'flex'` | `'grid'` | Layout mode. `grid` uses CSS Grid with auto columns; `flex` uses flexbox with wrapping. |

When `type` is `'grid'`, a `ResizeObserver` watches the container and recalculates `grid-template-columns` as `repeat(N, 1fr)` where N is derived from `container width / minWidth`.

When `type` is `'flex'`, each direct child gets `flex: 1 1 {minWidth}px` for natural wrapping.

## Examples

### Responsive Grid Cards

```vue
<template>
  <div v-auto-layout="{ columns: { minWidth: 300 }, gap: '24px' }">
    <div class="card" v-for="i in 6" :key="i">Card {{ i }}</div>
  </div>
</template>

<script setup>
import { vAutoLayout } from "vue-directives-pro";
</script>
```

### Flex Layout with Custom Gap

```vue
<template>
  <div
    v-auto-layout="{ columns: { minWidth: 200 }, gap: '12px', type: 'flex' }"
  >
    <div class="tag" v-for="tag in tags" :key="tag">{{ tag }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutoLayout } from "vue-directives-pro";

const tags = ref(["Vue", "React", "Angular", "Svelte", "Solid", "Lit"]);
</script>
```

### Grid Without Column Constraint

```vue
<template>
  <div v-auto-layout="{ gap: '8px' }">
    <p>Simple grid with gap only — no auto column calculation.</p>
  </div>
</template>

<script setup>
import { vAutoLayout } from "vue-directives-pro";
</script>
```
