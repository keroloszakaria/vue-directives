# v-scroll-progress

Tracks scroll progress as a percentage (0–100) and calls a handler function on every scroll event. Can track the window's scroll position or the element's own scrollable area.

## Usage

```vue
<template>
  <div v-scroll-progress="onProgress">
    <p>Scroll progress: {{ progress.toFixed(1) }}%</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vScrollProgress } from "vue-directives-pro";

const progress = ref(0);

function onProgress(value) {
  progress.value = value;
}
</script>
```

## Options / Binding

The binding value can be a **callback function** or a **`ScrollProgressBinding`** object:

| Binding Type                 | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| `(progress: number) => void` | Callback receiving progress `0–100`, tracks `window` scroll |
| `ScrollProgressBinding`      | Object with handler and target configuration                |

**`ScrollProgressBinding`**

| Property  | Type                         | Default      | Description                                                                 |
| --------- | ---------------------------- | ------------ | --------------------------------------------------------------------------- |
| `handler` | `(progress: number) => void` | _(required)_ | Callback receiving scroll progress (0–100)                                  |
| `target`  | `'self' \| 'window'`         | `'window'`   | `'window'` tracks the page scroll; `'self'` tracks the element's own scroll |

The listener is registered with `{ passive: true }` for optimal scroll performance.

## Examples

### Page Reading Progress Bar

```vue
<template>
  <div v-scroll-progress="onProgress">
    <div
      :style="{
        width: progress + '%',
        height: '4px',
        background: '#3b82f6',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        transition: 'width 0.1s',
      }"
    />
    <article style="max-width: 640px; margin: 0 auto; padding: 2rem;">
      <h1>Long Article</h1>
      <p v-for="n in 20" :key="n">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph
        {{ n }}.
      </p>
    </article>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vScrollProgress } from "vue-directives-pro";

const progress = ref(0);

function onProgress(value) {
  progress.value = value;
}
</script>
```

### Scrollable Container Progress

```vue
<template>
  <div>
    <p>Container scroll: {{ containerProgress.toFixed(0) }}%</p>
    <div
      v-scroll-progress="{ handler: onContainerScroll, target: 'self' }"
      style="height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 1rem;"
    >
      <div v-for="n in 50" :key="n" style="padding: 0.5rem 0;">
        Item {{ n }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vScrollProgress } from "vue-directives-pro";

const containerProgress = ref(0);

function onContainerScroll(value) {
  containerProgress.value = value;
}
</script>
```
