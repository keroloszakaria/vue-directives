# v-suspend

Shows a loading placeholder while a `Promise` is pending and reveals the original content once it resolves. Displays an error message if the promise rejects. Can also be driven by a boolean flag.

## Usage

```vue
<template>
  <div v-suspend="fetchData()">
    <p>Content shown after data loads.</p>
  </div>
</template>

<script setup>
import { vSuspend } from "vue-directives-pro";

function fetchData() {
  return fetch("/api/data").then((r) => r.json());
}
</script>
```

## Options / Binding

| Binding Value | Type                      | Description                                                                                                                                                                             |
| ------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `Promise<any> \| boolean` | A `Promise` — the element shows a loading state until the promise settles. If set to `true`, a loading placeholder is shown. When updated to `false`, the original content is restored. |

When a promise rejects, the element displays a red error message ("Failed to load") with the CSS class `v-suspend-error`.

## Examples

### Promise-based Loading

```vue
<template>
  <div v-suspend="userPromise">
    <UserProfile :user="user" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSuspend } from "vue-directives-pro";
import UserProfile from "./UserProfile.vue";

const user = ref(null);
const userPromise = fetch("/api/user")
  .then((r) => r.json())
  .then((data) => {
    user.value = data;
  });
</script>
```

### Boolean Toggle

```vue
<template>
  <div>
    <button @click="loadContent">Load Content</button>
    <div v-suspend="isLoading">
      <p>Loaded content appears here.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSuspend } from "vue-directives-pro";

const isLoading = ref(false);

async function loadContent() {
  isLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  isLoading.value = false;
}
</script>
```
