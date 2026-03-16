# Usage with Vue 3

## Register All Directives

The simplest way — register all 86+ directives at once:

```ts
import { createApp } from "vue";
import VueDirectivesPlugin from "vue-directives";
import App from "./App.vue";

const app = createApp(App);
app.use(VueDirectivesPlugin);
app.mount("#app");
```

Now every directive is available globally in all templates:

```vue
<template>
  <button v-copy="'Hello!'" v-ripple v-tooltip="'Copy text'">Copy</button>
</template>
```

## Register Specific Directives Only

To reduce bundle size, register only the directives you need:

```ts
app.use(VueDirectivesPlugin, {
  directives: ["click-outside", "copy", "tooltip", "ripple"],
});
```

## Use Individually (Tree-Shakable)

Import directives directly in components — bundlers will tree-shake the rest:

```vue
<script setup>
import { vClickOutside, vCopy } from "vue-directives";
</script>

<template>
  <div v-click-outside="onClose">
    <button v-copy="text">Copy</button>
  </div>
</template>
```

Or with the Options API:

```ts
import { vClickOutside, vCopy } from "vue-directives";

export default {
  directives: {
    "click-outside": vClickOutside,
    copy: vCopy,
  },
};
```

## TypeScript

All directives are fully typed. You get full IntelliSense for directive values:

```ts
import type { VueDirectivesPluginOptions } from "vue-directives";

// Autocomplete for directive names
const options: VueDirectivesPluginOptions = {
  directives: ["click-outside", "copy"], // ← type-safe
};
```
