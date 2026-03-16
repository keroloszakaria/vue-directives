# v-stagger

Animate child elements with a staggered delay when the parent scrolls into view. Each child transitions from an `initial` state to an `enter` state one after another, producing a cascading animation effect.

## Usage

```vue
<template>
  <ul v-stagger="{ staggerDelay: 100 }">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { vStagger } from "vue-directives-pro";

const items = ref(["First", "Second", "Third", "Fourth"]);
</script>
```

## Options / Binding

| Property       | Type                           | Default                                           | Description                                                 |
| -------------- | ------------------------------ | ------------------------------------------------- | ----------------------------------------------------------- |
| `selector`     | `string`                       | `':scope > *'`                                    | CSS selector to choose which children to animate.           |
| `initial`      | `Partial<CSSStyleDeclaration>` | `{ opacity: '0', transform: 'translateY(15px)' }` | Styles applied to children before the animation.            |
| `enter`        | `Partial<CSSStyleDeclaration>` | `{ opacity: '1', transform: 'translateY(0)' }`    | Styles transitioned to when the parent enters the viewport. |
| `staggerDelay` | `number`                       | `80`                                              | Delay in milliseconds between each child's animation start. |
| `duration`     | `number`                       | `400`                                             | Transition duration for each child in milliseconds.         |
| `easing`       | `string`                       | `'ease-out'`                                      | CSS easing function for the transition.                     |

## Examples

### Simple List Stagger

```vue
<template>
  <ul v-stagger class="feature-list">
    <li v-for="feature in features" :key="feature">{{ feature }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { vStagger } from "vue-directives-pro";

const features = ref([
  "Fast rendering",
  "Type-safe directives",
  "Tree-shakeable",
  "SSR compatible",
]);
</script>
```

### Card Grid with Custom Animation

```vue
<template>
  <div
    v-stagger="{
      selector: '.card',
      initial: { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
      enter: { opacity: '1', transform: 'scale(1) translateY(0)' },
      staggerDelay: 120,
      duration: 500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    }"
    class="card-grid"
  >
    <div v-for="card in cards" :key="card.id" class="card">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vStagger } from "vue-directives-pro";

const cards = ref([
  { id: 1, title: "Analytics", description: "Track user behavior" },
  { id: 2, title: "Reports", description: "Generate insights" },
  { id: 3, title: "Alerts", description: "Stay notified" },
  { id: 4, title: "Integrations", description: "Connect your tools" },
]);
</script>
```
