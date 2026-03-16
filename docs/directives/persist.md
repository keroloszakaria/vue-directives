# v-persist

Persist an input element's value to `localStorage` or `sessionStorage` and automatically restore it on mount. Values are stored under the key `v-persist:<key>`. Supports text inputs and checkboxes.

## Usage

```vue
<template>
  <input v-persist="{ key: 'search-query' }" />
</template>

<script setup>
import { vPersist } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **string** or an **object**:

| Binding Value    | Type             | Description                            |
| ---------------- | ---------------- | -------------------------------------- |
| `value` (string) | `string`         | Shorthand — used as the storage key.   |
| `value` (object) | `PersistBinding` | Full options for key and storage type. |

**`PersistBinding` Object:**

| Property  | Type                   | Default   | Description                                              |
| --------- | ---------------------- | --------- | -------------------------------------------------------- |
| `key`     | `string`               | —         | **(required)** Storage key (prefixed with `v-persist:`). |
| `storage` | `'local' \| 'session'` | `'local'` | Which storage backend to use.                            |

## Examples

### Persist a Search Input

```vue
<template>
  <input v-persist="'search'" placeholder="Search..." />
</template>

<script setup>
import { vPersist } from "vue-directives-pro";
</script>
```

### Persist to Session Storage

```vue
<template>
  <input
    v-persist="{ key: 'temp-filter', storage: 'session' }"
    placeholder="Filter..."
  />
</template>

<script setup>
import { vPersist } from "vue-directives-pro";
</script>
```

### Persist a Checkbox

```vue
<template>
  <label>
    <input
      type="checkbox"
      v-persist="{ key: 'dark-mode' }"
      v-model="darkMode"
    />
    Enable dark mode
  </label>
</template>

<script setup>
import { vPersist } from "vue-directives-pro";
import { ref } from "vue";

const darkMode = ref(false);
</script>
```
