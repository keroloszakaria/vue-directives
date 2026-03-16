# v-intersection

A lightweight, generic wrapper around the native `IntersectionObserver` API. Gives you full access to the raw `IntersectionObserverEntry` for maximum flexibility.

## Usage

```vue
<template>
  <div v-intersection="{ handler: onIntersect }">Observed element</div>
</template>

<script setup>
import { vIntersection } from "vue-directives";

function onIntersect(entry) {
  console.log("Is intersecting:", entry.isIntersecting);
  console.log("Ratio:", entry.intersectionRatio);
}
</script>
```

## Options / Binding

The binding value is an **`IntersectionBinding`** object:

| Property  | Type                                         | Default      | Description                                                            |
| --------- | -------------------------------------------- | ------------ | ---------------------------------------------------------------------- |
| `handler` | `(entry: IntersectionObserverEntry) => void` | _(required)_ | Callback receiving the raw `IntersectionObserverEntry`                 |
| `options` | `IntersectionObserverInit`                   | `{}`         | Standard observer options: `root`, `rootMargin`, `threshold`           |
| `once`    | `boolean`                                    | `false`      | If `true`, disconnects the observer after the element first intersects |

**`IntersectionObserverInit` reference**

| Property     | Type                 | Default | Description                                   |
| ------------ | -------------------- | ------- | --------------------------------------------- |
| `root`       | `Element \| null`    | `null`  | Scrollable ancestor to use as the viewport    |
| `rootMargin` | `string`             | `'0px'` | Margin around the root                        |
| `threshold`  | `number \| number[]` | `0`     | Visibility ratio(s) that trigger the callback |

## Examples

### Fade-in on First Intersection

```vue
<template>
  <div style="padding-top: 120vh;">
    <div
      v-intersection="{
        handler: onIntersect,
        once: true,
        options: { threshold: 0.2 },
      }"
      ref="box"
      style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease;"
    >
      I appear once when 20 % visible.
    </div>
  </div>
</template>

<script setup>
import { vIntersection } from "vue-directives";

function onIntersect(entry) {
  if (entry.isIntersecting) {
    const el = entry.target;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }
}
</script>
```

### Multi-threshold Progress Tracker

```vue
<template>
  <div>
    <p>Visibility: {{ ratio }}%</p>
    <div style="height: 150vh;" />
    <div
      v-intersection="{
        handler: onIntersect,
        options: { threshold: [0, 0.25, 0.5, 0.75, 1] },
      }"
      style="height: 300px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px;"
    />
    <div style="height: 150vh;" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vIntersection } from "vue-directives";

const ratio = ref(0);

function onIntersect(entry) {
  ratio.value = Math.round(entry.intersectionRatio * 100);
}
</script>
```
