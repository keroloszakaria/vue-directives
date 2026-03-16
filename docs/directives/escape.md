# v-escape

Fires a callback when the **Escape** key is pressed. Commonly used to close modals, drawers, dropdowns, and other dismissible UI.

## Usage

```vue
<template>
  <div v-escape="handleClose">Press Escape to close</div>
</template>

<script setup>
import { vEscape } from "vue-directives";

function handleClose() {
  console.log("Escape pressed!");
}
</script>
```

## Options / Binding

The binding value is a single **callback function**:

| Binding Value | Type                             | Description                                 |
| ------------- | -------------------------------- | ------------------------------------------- |
| `handler`     | `(event: KeyboardEvent) => void` | Called every time the Escape key is pressed |

The listener is registered on `document`, so it triggers regardless of which element has focus. The handler is re-bound on updates to keep the reference current.

## Examples

### Close a Modal

```vue
<template>
  <div>
    <button @click="open = true">Open Modal</button>

    <div v-if="open" v-escape="close" class="modal-overlay">
      <div class="modal-content">
        <h2>Modal Title</h2>
        <p>Press Escape or click the button to close.</p>
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vEscape } from "vue-directives";

const open = ref(false);

function close() {
  open.value = false;
}
</script>
```

### Dismiss a Search Bar

```vue
<template>
  <div>
    <input
      v-if="searchOpen"
      v-escape="closeSearch"
      v-model="query"
      placeholder="Search…"
      autofocus
    />
    <button v-else @click="searchOpen = true">🔍 Search</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vEscape } from "vue-directives";

const searchOpen = ref(false);
const query = ref("");

function closeSearch() {
  searchOpen.value = false;
  query.value = "";
}
</script>
```
