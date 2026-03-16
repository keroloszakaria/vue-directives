# v-focus

Auto-focuses an element when it is mounted. Optionally accepts a boolean to conditionally control focus behavior.

## Usage

```vue
<template>
  <input v-focus placeholder="I'm focused on mount" />
</template>

<script setup>
import { vFocus } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value is optional:

| Value    | Type        | Default | Description                             |
| -------- | ----------- | ------- | --------------------------------------- |
| _(none)_ | `undefined` | `true`  | Focuses the element on mount            |
| `true`   | `boolean`   | —       | Focuses the element on mount            |
| `false`  | `boolean`   | —       | Does **not** focus the element on mount |

When the binding value changes from `false` to `true` (via `updated` hook), the element is focused.

## Examples

### Always Focus on Mount

```vue
<template>
  <form>
    <label>Username</label>
    <input v-focus placeholder="Enter username" />
    <label>Password</label>
    <input type="password" placeholder="Enter password" />
  </form>
</template>

<script setup>
import { vFocus } from "vue-directives-pro";
</script>
```

### Conditional Focus

```vue
<template>
  <div>
    <button @click="editing = !editing">
      {{ editing ? "Cancel" : "Edit" }}
    </button>
    <input
      v-if="editing"
      v-focus="editing"
      v-model="name"
      placeholder="Edit name"
    />
    <span v-else>{{ name }}</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vFocus } from "vue-directives-pro";

const editing = ref(false);
const name = ref("John Doe");
</script>
```
