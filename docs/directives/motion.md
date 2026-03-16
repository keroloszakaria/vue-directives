# v-motion

Apply enter animations with inline CSS transitions when an element scrolls into view. Define `initial` and `enter` style states — the directive transitions between them automatically via the Intersection Observer API.

## Usage

```vue
<template>
  <div
    v-motion="{
      initial: { opacity: '0', transform: 'translateY(20px)' },
      enter: { opacity: '1', transform: 'translateY(0)' },
      duration: 600,
    }"
  >
    Animated content
  </div>
</template>

<script setup>
import { vMotion } from "vue-directives";
</script>
```

## Options / Binding

| Property   | Type                           | Default            | Description                                                                                         |
| ---------- | ------------------------------ | ------------------ | --------------------------------------------------------------------------------------------------- |
| `initial`  | `Partial<CSSStyleDeclaration>` | `{ opacity: '0' }` | CSS styles applied immediately (the "before" state).                                                |
| `enter`    | `Partial<CSSStyleDeclaration>` | `{ opacity: '1' }` | CSS styles transitioned to when the element enters the viewport.                                    |
| `duration` | `number`                       | `400`              | Transition duration in milliseconds.                                                                |
| `delay`    | `number`                       | `0`                | Delay before the transition starts, in milliseconds.                                                |
| `easing`   | `string`                       | `'ease-out'`       | CSS easing function.                                                                                |
| `once`     | `boolean`                      | `true`             | If `true`, animates only the first time. If `false`, resets to `initial` when leaving the viewport. |

## Examples

### Fade and Slide Up

```vue
<template>
  <div
    v-motion="{
      initial: { opacity: '0', transform: 'translateY(30px)' },
      enter: { opacity: '1', transform: 'translateY(0)' },
      duration: 500,
      easing: 'ease-out',
    }"
  >
    Hello World
  </div>
</template>

<script setup>
import { vMotion } from "vue-directives";
</script>
```

### Scale-In with Delay (Repeating)

```vue
<template>
  <div
    v-for="(card, i) in cards"
    :key="card.id"
    v-motion="{
      initial: { opacity: '0', transform: 'scale(0.8)' },
      enter: { opacity: '1', transform: 'scale(1)' },
      duration: 700,
      delay: i * 100,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: false,
    }"
    class="card"
  >
    {{ card.title }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vMotion } from "vue-directives";

const cards = ref([
  { id: 1, title: "Design" },
  { id: 2, title: "Develop" },
  { id: 3, title: "Deploy" },
]);
</script>
```
