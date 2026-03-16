# Usage with Nuxt 3

## Module Registration

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["vue-directives-pro/nuxt"],
});
```

That's it! All directives are now available globally in every page and component — no imports needed.

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

## Server-Side Rendering (SSR)

The Nuxt module registers all directives in **client mode only**, so they won't execute during SSR. This is safe by default — no additional configuration required.
