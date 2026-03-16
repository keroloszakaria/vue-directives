# v-hydrate-on-visible

Triggers a hydration callback when the element enters the viewport. Useful for lazy-hydrating components in SSR scenarios where you want to defer JavaScript execution until the user scrolls to the relevant section.

## Usage

```vue
<template>
  <div v-hydrate-on-visible="hydrateComponent">
    Lazy-hydrated component placeholder
  </div>
</template>

<script setup>
import { vHydrateOnVisible } from "vue-directives";

function hydrateComponent() {
  console.log("Component hydrated!");
}
</script>
```

## Options / Binding

| Binding Value | Type         | Description                                                                                                            |
| ------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `value`       | `() => void` | Callback function invoked once when the element first enters the viewport. The observer disconnects immediately after. |

Uses an `IntersectionObserver` with a `rootMargin` of `100px` to trigger hydration slightly before the element becomes visible.

## Examples

### Lazy-hydrate a Heavy Widget

```vue
<template>
  <div>
    <HeroSection />

    <div v-hydrate-on-visible="initChart">
      <ChartPlaceholder />
    </div>
  </div>
</template>

<script setup>
import { vHydrateOnVisible } from "vue-directives";
import HeroSection from "./HeroSection.vue";
import ChartPlaceholder from "./ChartPlaceholder.vue";

function initChart() {
  console.log("Chart hydrated and interactive");
}
</script>
```

### Deferred Component Registration

```vue
<template>
  <section v-hydrate-on-visible="loadComments">
    <h2>Comments</h2>
    <div id="comments-container"></div>
  </section>
</template>

<script setup>
import { vHydrateOnVisible } from "vue-directives";

async function loadComments() {
  const module = await import("./CommentsWidget.vue");
  // mount the dynamically imported component
  console.log("Comments module loaded:", module);
}
</script>
```
