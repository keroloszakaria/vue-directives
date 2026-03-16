# v-auto-submit

Automatically submits a `<form>` when any of its `<input>`, `<select>`, or `<textarea>` elements change, with a configurable debounce delay. Great for filter forms, live settings panels, and auto-save UIs.

## Usage

```vue
<template>
  <form v-auto-submit="{ delay: 500 }" @submit.prevent="onSubmit">
    <input v-model="search" placeholder="Type to search…" />
  </form>
</template>

<script setup>
import { ref } from "vue";
import { vAutoSubmit } from "vue-directives-pro";

const search = ref("");

function onSubmit() {
  console.log("Auto-submitted with:", search.value);
}
</script>
```

## Options / Binding

The binding value is an optional **object**:

| Property | Type     | Default | Description                                            |
| -------- | -------- | ------- | ------------------------------------------------------ |
| `delay`  | `number` | `300`   | Debounce delay in milliseconds before the form submits |

The directive listens to both `input` and `change` events on every `<input>`, `<select>`, and `<textarea>` inside the form. The submit timer resets on each event so only one submission fires after the user stops interacting.

## Examples

### Filter Form

```vue
<template>
  <form v-auto-submit="{ delay: 400 }" @submit.prevent="applyFilters">
    <select v-model="category">
      <option value="">All Categories</option>
      <option value="books">Books</option>
      <option value="electronics">Electronics</option>
    </select>
    <input v-model="minPrice" type="number" placeholder="Min price" />
    <input v-model="maxPrice" type="number" placeholder="Max price" />
    <p>
      Active filters: {{ category || "none" }}, ${{ minPrice }}–${{ maxPrice }}
    </p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { vAutoSubmit } from "vue-directives-pro";

const category = ref("");
const minPrice = ref(0);
const maxPrice = ref(1000);

function applyFilters() {
  console.log("Filters applied:", {
    category: category.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  });
}
</script>
```

### Instant Settings Panel

```vue
<template>
  <form v-auto-submit @submit.prevent="saveSettings">
    <label> <input type="checkbox" v-model="darkMode" /> Dark Mode </label>
    <label>
      Font Size
      <select v-model="fontSize">
        <option>14</option>
        <option>16</option>
        <option>18</option>
      </select>
    </label>
    <p v-if="saved">Settings saved ✓</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { vAutoSubmit } from "vue-directives-pro";

const darkMode = ref(false);
const fontSize = ref("16");
const saved = ref(false);

function saveSettings() {
  saved.value = true;
  setTimeout(() => (saved.value = false), 2000);
  console.log("Settings:", {
    darkMode: darkMode.value,
    fontSize: fontSize.value,
  });
}
</script>
```
