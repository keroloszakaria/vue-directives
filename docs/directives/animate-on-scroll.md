# v-animate-on-scroll

Add CSS animation classes to an element when it scrolls into view using the Intersection Observer API. Classes can be applied once or toggled each time the element enters/exits the viewport.

## Usage

```vue
<template>
  <div v-animate-on-scroll="{ class: 'fade-in', once: true }">
    Animated content
  </div>
</template>

<script setup>
import { vAnimateOnScroll } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **string** (shorthand for a single class with defaults) or an **object**:

| Property     | Type                 | Default | Description                                                                                    |
| ------------ | -------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `class`      | `string \| string[]` | —       | **Required.** CSS class(es) to add when the element is in view.                                |
| `threshold`  | `number`             | `0.1`   | Fraction of the element that must be visible (0–1) before triggering.                          |
| `rootMargin` | `string`             | `'0px'` | Margin around the root for intersection calculation (CSS margin syntax).                       |
| `once`       | `boolean`            | `true`  | If `true`, classes are added once and never removed. If `false`, classes toggle on enter/exit. |

**Shorthand:** `v-animate-on-scroll="'fade-in'"` is equivalent to `{ class: 'fade-in', once: true, threshold: 0.1 }`.

## Examples

### Simple Fade-In

```vue
<template>
  <section>
    <div v-animate-on-scroll="'fade-in'" class="card">
      This card fades in when scrolled into view.
    </div>
  </section>
</template>

<script setup>
import { vAnimateOnScroll } from "vue-directives";
</script>

<style>
.fade-in {
  animation: fadeIn 0.6s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
```

### Multiple Classes with Toggle

```vue
<template>
  <div
    v-animate-on-scroll="{
      class: ['slide-up', 'visible'],
      once: false,
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px',
    }"
    class="hero-section"
  >
    This section animates in and out as you scroll.
  </div>
</template>

<script setup>
import { vAnimateOnScroll } from "vue-directives";
</script>

<style>
.hero-section {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.5s ease;
}
.hero-section.slide-up.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
```
