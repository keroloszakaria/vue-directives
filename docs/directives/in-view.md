# v-in-view

Fires callbacks when an element enters or leaves the viewport using `IntersectionObserver`. Useful for triggering animations, lazy initialisation, or analytics tracking.

## Usage

```vue
<template>
  <div v-in-view="{ enter: onEnter, leave: onLeave }">Watch me</div>
</template>

<script setup>
import { vInView } from "vue-directives-pro";

function onEnter(el) {
  console.log("Element entered viewport", el);
}
function onLeave(el) {
  console.log("Element left viewport", el);
}
</script>
```

## Options / Binding

The binding value is an **`InViewBinding`** object:

| Property     | Type                        | Default | Description                                                            |
| ------------ | --------------------------- | ------- | ---------------------------------------------------------------------- |
| `enter`      | `(el: HTMLElement) => void` | —       | Called when the element enters the viewport                            |
| `leave`      | `(el: HTMLElement) => void` | —       | Called when the element leaves the viewport                            |
| `once`       | `boolean`                   | `false` | If `true`, the observer disconnects after the first enter callback     |
| `rootMargin` | `string`                    | `'0px'` | Margin around the root (same syntax as CSS margin, e.g. `'100px 0px'`) |
| `threshold`  | `number \| number[]`        | `0`     | Visibility ratio(s) that trigger the callback (0–1)                    |

## Examples

### Animate on Enter

```vue
<template>
  <div style="padding-top: 120vh;">
    <div
      v-in-view="{ enter: onEnter, once: true }"
      :class="{ 'fade-in': visible }"
      style="opacity: 0; transition: opacity 0.6s ease;"
    >
      I fade in once when scrolled into view.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vInView } from "vue-directives-pro";

const visible = ref(false);

function onEnter(el) {
  visible.value = true;
  el.style.opacity = "1";
}
</script>
```

### Track Section Visibility

```vue
<template>
  <div>
    <p>Currently visible: {{ activeSection }}</p>

    <section
      v-for="section in sections"
      :key="section"
      v-in-view="{
        enter: () => onSectionEnter(section),
        leave: () => onSectionLeave(section),
        threshold: 0.5,
      }"
      style="height: 80vh; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e5e7eb;"
    >
      <h2>{{ section }}</h2>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vInView } from "vue-directives-pro";

const sections = ["Introduction", "Features", "Pricing", "Contact"];
const activeSection = ref("");

function onSectionEnter(name) {
  activeSection.value = name;
}
function onSectionLeave(name) {
  if (activeSection.value === name) activeSection.value = "";
}
</script>
```
