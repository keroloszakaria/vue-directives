# v-color-mode

Reactively apply CSS classes based on the user's system color scheme (dark or light mode). Listens to `prefers-color-scheme` media query changes in real time.

## Usage

```vue
<template>
  <div
    v-color-mode="{ dark: 'bg-dark text-white', light: 'bg-white text-black' }"
  >
    This adapts to the system color scheme.
  </div>
</template>

<script setup>
import { vColorMode } from "vue-directives";
</script>
```

## Options / Binding

The binding value is a **`ColorModeBinding`** object:

| Property | Type                 | Description                                             |
| -------- | -------------------- | ------------------------------------------------------- |
| `dark`   | `string \| string[]` | Class(es) applied when the system is in **dark** mode.  |
| `light`  | `string \| string[]` | Class(es) applied when the system is in **light** mode. |

Classes can be provided as a space-separated string (`'bg-dark text-white'`) or an array (`['bg-dark', 'text-white']`). When the color scheme changes, old classes are removed and new classes are applied automatically.

## Examples

### Simple Dark / Light Classes

```vue
<template>
  <section v-color-mode="{ dark: 'dark-theme', light: 'light-theme' }">
    <h2>Adaptive Card</h2>
    <p>Content adjusts to your OS theme preference automatically.</p>
  </section>
</template>

<script setup>
import { vColorMode } from "vue-directives";
</script>

<style>
.dark-theme {
  background: #1a1a2e;
  color: #eaeaea;
}
.light-theme {
  background: #ffffff;
  color: #333333;
}
</style>
```

### Array Syntax with Tailwind Classes

```vue
<template>
  <div
    v-color-mode="{
      dark: ['bg-gray-900', 'text-gray-100', 'border-gray-700'],
      light: ['bg-white', 'text-gray-800', 'border-gray-200'],
    }"
    class="p-6 rounded-lg border"
  >
    <h3>Dashboard Widget</h3>
    <p>Styled automatically based on system preference.</p>
  </div>
</template>

<script setup>
import { vColorMode } from "vue-directives";
</script>
```
