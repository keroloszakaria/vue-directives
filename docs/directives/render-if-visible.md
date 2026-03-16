# v-render-if-visible

Defers rendering of an element's content until the element scrolls into the viewport, powered by `IntersectionObserver`. This dramatically reduces initial DOM size for pages with many off-screen sections. By default the content stays rendered after the first intersection (`once: true`); set `once: false` to unmount content when the element scrolls back out of view.

## Usage

```vue
<template>
  <div v-render-if-visible>
    <HeavyComponent />
  </div>
</template>

<script setup>
import { vRenderIfVisible } from "vue-directives-pro";
</script>
```

## Options / Binding

| Property     | Type      | Default   | Description                                                                                                                                             |
| ------------ | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rootMargin` | `string`  | `'100px'` | Margin around the root to start loading content before it enters the viewport.                                                                          |
| `once`       | `boolean` | `true`    | When `true`, content is rendered permanently after the first intersection. When `false`, content is removed again when the element leaves the viewport. |

Pass an options object or omit the value entirely to use the defaults.

## Examples

### Basic Deferred Rendering

```vue
<template>
  <div v-render-if-visible>
    <p>This content is only rendered when scrolled into view.</p>
  </div>
</template>

<script setup>
import { vRenderIfVisible } from "vue-directives-pro";
</script>
```

### Custom Root Margin

```vue
<template>
  <div v-render-if-visible="{ rootMargin: '300px' }">
    <img src="/hero.jpg" alt="Hero" />
    <p>Loads 300px before entering the viewport.</p>
  </div>
</template>

<script setup>
import { vRenderIfVisible } from "vue-directives-pro";
</script>
```

### Toggle Content on Visibility

```vue
<template>
  <div class="long-page">
    <section v-for="i in 20" :key="i" v-render-if-visible="{ once: false }">
      <h3>Section {{ i }}</h3>
      <p>Content is mounted and unmounted as you scroll past.</p>
    </section>
  </div>
</template>

<script setup>
import { vRenderIfVisible } from "vue-directives-pro";
</script>
```
