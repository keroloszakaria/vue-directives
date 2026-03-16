# v-hover-class

Adds one or more CSS classes to an element on `mouseenter` and removes them on `mouseleave`. A simple declarative alternative to `:class` bindings with manual hover state tracking.

## Usage

```vue
<template>
  <div v-hover-class="'shadow-lg'" class="card">Hover over me</div>
</template>

<script setup>
import { vHoverClass } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value    | Type       | Description                              |
| ---------------- | ---------- | ---------------------------------------- |
| `value` (string) | `string`   | A single class name to toggle on hover.  |
| `value` (array)  | `string[]` | Multiple class names to toggle on hover. |

The directive supports **reactive updates** — when the bound value changes, old classes are cleaned up and new listeners are attached.

## Examples

### Single Class

```vue
<template>
  <button v-hover-class="'btn-hover'" class="btn">Hover me</button>
</template>

<script setup>
import { vHoverClass } from "vue-directives-pro";
</script>
```

### Multiple Classes

```vue
<template>
  <div
    v-hover-class="['shadow-xl', 'scale-105', 'border-blue-500']"
    class="card transition-all"
  >
    Product Card
  </div>
</template>

<script setup>
import { vHoverClass } from "vue-directives-pro";
</script>
```

### Interactive List Items

```vue
<template>
  <ul>
    <li
      v-for="item in items"
      :key="item"
      v-hover-class="'bg-gray-100'"
      class="px-4 py-2 cursor-pointer"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script setup>
import { vHoverClass } from "vue-directives-pro";

const items = ["Dashboard", "Settings", "Profile", "Logout"];
</script>
```

### Dynamic Hover Classes

```vue
<template>
  <div v-hover-class="hoverClasses" class="p-4 border rounded">
    Theme-aware hover
  </div>
</template>

<script setup>
import { computed } from "vue";
import { vHoverClass } from "vue-directives-pro";

const isDark = true;
const hoverClasses = computed(() =>
  isDark ? ["bg-gray-700", "text-white"] : ["bg-gray-100", "text-black"],
);
</script>
```
