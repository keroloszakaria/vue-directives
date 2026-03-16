# Usage with Nuxt 4

## Module Registration

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["vue-directives-pro/nuxt"],
});
```

All directives are automatically registered globally — no imports needed in any page or component.

## Usage in Templates

```vue
<template>
  <div v-click-outside="closeDropdown">
    <button v-ripple v-tooltip="'Actions'">Menu</button>
  </div>

  <img v-lazy-load="'/images/hero.webp'" alt="Hero" />

  <textarea v-autogrow v-trim />
</template>
```

## Selective Registration

To register only specific directives and reduce bundle size, pass options in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    [
      "vue-directives-pro/nuxt",
      {
        directives: ["click-outside", "tooltip", "ripple", "lazy-load"],
      },
    ],
  ],
});
```

## Compatibility with Nuxt 4

Nuxt 4 introduces several changes including the new `app/` directory structure and updated defaults. The `vue-directives-pro` module is fully compatible:

- **New directory structure** — Works with both `app/` (Nuxt 4 default) and `src/` layouts.
- **Client-only execution** — Directives are registered in **client mode only**, so they are safe with SSR and the new rendering pipeline.
- **Auto-imports** — All directives are available globally in templates without manual imports.
- **Vue 3.5+** — Fully compatible with the Vue version shipped in Nuxt 4.

## TypeScript

Full type support works out of the box. No extra type configuration is needed in your `tsconfig.json`.

```vue
<script setup lang="ts">
const handleOutsideClick = () => {
  console.log("clicked outside");
};
</script>

<template>
  <div v-click-outside="handleOutsideClick">
    <p>Click outside to trigger</p>
  </div>
</template>
```
