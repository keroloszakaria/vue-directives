# v-loading

Show a loading overlay with an animated spinner on top of an element. Useful for indicating async operations on cards, tables, or sections without blocking the whole page.

## Usage

```vue
<template>
  <div v-loading="isLoading">Content that is loading</div>
</template>

<script setup>
import { ref } from "vue";
import { vLoading } from "vue-directives-pro";

const isLoading = ref(true);
</script>
```

## Options / Binding

The binding value can be a **boolean** (shorthand) or an **object**:

| Property     | Type      | Default                      | Description                                                       |
| ------------ | --------- | ---------------------------- | ----------------------------------------------------------------- |
| `active`     | `boolean` | —                            | **Required (object form).** Whether the loading overlay is shown. |
| `text`       | `string`  | `''`                         | Optional text displayed below the spinner.                        |
| `spinner`    | `boolean` | `true`                       | Show the animated spinner. Set `false` for text-only.             |
| `background` | `string`  | `'rgba(255, 255, 255, 0.8)'` | Overlay background color/gradient.                                |
| `color`      | `string`  | `'#333'`                     | Spinner and text color.                                           |

**Shorthand:** `v-loading="true"` shows the overlay with default spinner and no text.

## Examples

### Simple Boolean Toggle

```vue
<template>
  <div>
    <button @click="fetchData">Load Data</button>
    <div v-loading="loading" class="data-container">
      <p v-for="item in items" :key="item">{{ item }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vLoading } from 'vue-directives-pro'

const loading = ref(false)
const items = ref<string[]>([])

async function fetchData() {
  loading.value = true
  // simulate API call
  await new Promise((r) => setTimeout(r, 2000))
  items.value = ['Alpha', 'Beta', 'Gamma']
  loading.value = false
}
</script>
```

### Custom Text, Color, and Background

```vue
<template>
  <div
    v-loading="{
      active: saving,
      text: 'Saving changes…',
      background: 'rgba(0, 0, 0, 0.6)',
      color: '#fff',
    }"
    class="editor-panel"
  >
    <textarea v-model="content" rows="10" />
    <button @click="save">Save</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vLoading } from "vue-directives-pro";

const saving = ref(false);
const content = ref("");

async function save() {
  saving.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  saving.value = false;
}
</script>
```
