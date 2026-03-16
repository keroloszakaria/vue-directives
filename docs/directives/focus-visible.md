# v-focus-visible

Adds a CSS class to the element only when it receives focus via keyboard navigation (Tab, Enter, Space). Mouse-initiated focus does not apply the class, giving you precise control over focus-ring styling without relying on the native `:focus-visible` pseudo-class.

## Usage

```vue
<template>
  <button v-focus-visible>Click me</button>
</template>

<script setup>
import { vFocusVisible } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type                  | Description                                                                |
| ------------- | --------------------- | -------------------------------------------------------------------------- |
| `value`       | `string \| undefined` | CSS class name to toggle. Defaults to `"focus-visible"` when not provided. |

The class is added on `focus` if the last interaction was a keyboard event, and removed on `blur`.

## Examples

### Default Class Name

```vue
<template>
  <button v-focus-visible class="btn">Save</button>
</template>

<script setup>
import { vFocusVisible } from "vue-directives-pro";
</script>

<style>
.btn.focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
</style>
```

### Custom Class Name

```vue
<template>
  <input v-focus-visible="'kbd-focus'" type="text" placeholder="Tab here" />
</template>

<script setup>
import { vFocusVisible } from "vue-directives-pro";
</script>

<style>
.kbd-focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>
```

### Multiple Elements with Shared Style

```vue
<template>
  <nav>
    <a v-focus-visible href="/home">Home</a>
    <a v-focus-visible href="/about">About</a>
    <a v-focus-visible href="/contact">Contact</a>
  </nav>
</template>

<script setup>
import { vFocusVisible } from "vue-directives-pro";
</script>

<style>
a.focus-visible {
  outline: 2px dashed #10b981;
  outline-offset: 4px;
}
</style>
```
