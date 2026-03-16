# v-skeleton

Display skeleton placeholder lines over an element while content is loading. Supports pulse and wave animations, configurable line counts, and sizing — providing a polished loading state without layout shift.

## Usage

```vue
<template>
  <div v-skeleton="isLoading">Actual content shown after loading</div>
</template>

<script setup>
import { ref } from "vue";
import { vSkeleton } from "vue-directives-pro";

const isLoading = ref(true);
</script>
```

## Options / Binding

The binding value can be a **boolean** (shorthand) or an **object**:

| Property       | Type                          | Default   | Description                                                                            |
| -------------- | ----------------------------- | --------- | -------------------------------------------------------------------------------------- |
| `active`       | `boolean`                     | —         | **Required (object form).** Whether the skeleton overlay is shown.                     |
| `lines`        | `number`                      | `3`       | Number of skeleton lines to display.                                                   |
| `width`        | `string`                      | `'100%'`  | Width of each skeleton line (last line is always `60%`).                               |
| `height`       | `string`                      | `'16px'`  | Height of each skeleton line.                                                          |
| `borderRadius` | `string`                      | `'4px'`   | Border radius of each line.                                                            |
| `animation`    | `'pulse' \| 'wave' \| 'none'` | `'pulse'` | Animation style. `pulse` fades in/out, `wave` shows a shimmer sweep, `none` is static. |

**Shorthand:** `v-skeleton="true"` shows 3 pulsing lines with defaults.

## Examples

### Simple Skeleton

```vue
<template>
  <div v-skeleton="loading" class="card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { vSkeleton } from "vue-directives-pro";

const loading = ref(true);
const title = ref("");
const description = ref("");

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 2000));
  title.value = "Hello World";
  description.value = "Content loaded successfully.";
  loading.value = false;
});
</script>
```

### Wave Animation with Custom Lines

```vue
<template>
  <div
    v-skeleton="{
      active: loading,
      lines: 5,
      height: '14px',
      borderRadius: '6px',
      animation: 'wave',
    }"
    class="article-preview"
  >
    <h2>{{ article.title }}</h2>
    <p>{{ article.body }}</p>
    <span>{{ article.date }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { vSkeleton } from "vue-directives-pro";

const loading = ref(true);
const article = ref({ title: "", body: "", date: "" });

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 3000));
  article.value = {
    title: "Getting Started with Vue Directives",
    body: "Custom directives let you encapsulate reusable DOM behavior…",
    date: "2025-01-15",
  };
  loading.value = false;
});
</script>
```
