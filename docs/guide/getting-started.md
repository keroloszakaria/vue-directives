# Getting Started

**vue-directives-pro** is a comprehensive library of **86+ custom directives** for Vue 3 and Nuxt 3, covering UI interactions, form handling, animations, accessibility, performance, security, and more.

## Why?

Custom directives allow you to attach reusable DOM behavior to elements without creating wrapper components. This library provides production-ready, fully typed directives for the most common (and advanced) use cases.

## Features

- **86+ directives** — from simple `v-click-outside` to advanced `v-virtual-scroll`, `v-gesture`, `v-motion`, and more
- **Tree-shakable** — import only what you need, bundlers will remove the rest
- **Fully typed** — first-class TypeScript support with generics and IntelliSense
- **Vue 3 & Nuxt 3** — works as a Vue plugin, a Nuxt module, or individual imports
- **Zero dependencies** — only `vue` as a peer dependency

## Quick Example

```vue
<template>
  <div v-click-outside="closeMenu">
    <button @click="open = true">Open Menu</button>
    <ul v-if="open">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vClickOutside } from "vue-directives-pro";

const open = ref(false);
const closeMenu = () => {
  open.value = false;
};
</script>
```

Next, head to [Installation](/guide/installation) to add the package to your project.
