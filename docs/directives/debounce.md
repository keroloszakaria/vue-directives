# v-debounce

Debounces an event handler on an element — the handler is only invoked after a specified delay since the last event firing. Perfect for search inputs, resize handlers, and other rapid-fire events.

## Usage

```vue
<template>
  <input v-debounce="{ handler: onSearch, delay: 300 }" placeholder="Search…" />
</template>

<script setup>
import { vDebounce } from "vue-directives-pro";

function onSearch(e) {
  console.log("Search:", e.target.value);
}
</script>
```

## Options / Binding

The binding value is a **`DebounceBinding`** object:

| Property  | Type                       | Default      | Description                                                          |
| --------- | -------------------------- | ------------ | -------------------------------------------------------------------- |
| `handler` | `(...args: any[]) => void` | _(required)_ | The function to debounce                                             |
| `delay`   | `number`                   | `300`        | Debounce delay in milliseconds                                       |
| `event`   | `string`                   | `'input'`    | DOM event name to listen for (e.g. `'keyup'`, `'input'`, `'scroll'`) |

The directive attaches a single event listener. When the binding value updates, the old listener is removed and a new one is attached, and any pending timer is cleared.

## Examples

### Search Input

```vue
<template>
  <div>
    <input
      v-debounce="{ handler: search, delay: 400 }"
      placeholder="Type to search…"
    />
    <ul>
      <li v-for="result in results" :key="result">{{ result }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vDebounce } from "vue-directives-pro";

const results = ref([]);

function search(e) {
  const query = e.target.value.toLowerCase();
  const all = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  results.value = all.filter((item) => item.toLowerCase().includes(query));
}
</script>
```

### Debounced Keyup with Custom Event

```vue
<template>
  <div>
    <textarea
      v-debounce="{ handler: autoSave, delay: 1000, event: 'keyup' }"
      placeholder="Start typing — auto-saves after 1 s of inactivity"
      rows="5"
      style="width: 100%;"
    />
    <p v-if="savedAt">Last saved: {{ savedAt }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vDebounce } from "vue-directives-pro";

const savedAt = ref("");

function autoSave(e) {
  savedAt.value = new Date().toLocaleTimeString();
  console.log("Auto-saved:", e.target.value);
}
</script>
```
