# v-sticky

Makes an element sticky with a configurable top offset, z-index, and an optional CSS class that is toggled when the element becomes stuck. Uses CSS `position: sticky` internally and an `IntersectionObserver` sentinel for stuck-state detection.

## Usage

```vue
<template>
  <div v-sticky>Sticky Header</div>
</template>

<script setup>
import { vSticky } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **number**, a **`StickyBinding`** object, or omitted entirely:

| Binding Type    | Description                                      |
| --------------- | ------------------------------------------------ |
| `undefined`     | Sticky with default offset `0` and z-index `100` |
| `number`        | Sets the `top` offset in pixels                  |
| `StickyBinding` | Full configuration object                        |

**`StickyBinding`**

| Property      | Type     | Default | Description                                                                     |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------- |
| `offset`      | `number` | `0`     | Top offset in pixels (`top: {offset}px`)                                        |
| `zIndex`      | `number` | `100`   | CSS `z-index` of the sticky element                                             |
| `stickyClass` | `string` | —       | CSS class added when the element is stuck and removed when it's no longer stuck |

When `stickyClass` is provided, a tiny invisible sentinel `<div>` is inserted before the element and observed with `IntersectionObserver` to detect when the element enters the stuck state.

## Examples

### Simple Sticky Header

```vue
<template>
  <div>
    <div
      v-sticky="60"
      style="background: #fff; padding: 1rem; border-bottom: 1px solid #e5e7eb;"
    >
      Sticky after 60 px
    </div>
    <div v-for="n in 40" :key="n" style="padding: 1rem;">Row {{ n }}</div>
  </div>
</template>

<script setup>
import { vSticky } from "vue-directives";
</script>
```

### Sticky with Class Toggle

```vue
<template>
  <div>
    <div
      v-sticky="{ offset: 0, zIndex: 50, stickyClass: 'is-stuck' }"
      class="header"
    >
      Header — sticks to top
    </div>
    <div v-for="n in 50" :key="n" style="padding: 1rem;">
      Content row {{ n }}
    </div>
  </div>
</template>

<script setup>
import { vSticky } from "vue-directives";
</script>

<style scoped>
.header {
  padding: 1rem;
  background: #f9fafb;
  transition:
    box-shadow 0.2s,
    background 0.2s;
}
.header.is-stuck {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```
