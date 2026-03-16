# v-click-outside

Detects clicks outside the element and fires a callback. Useful for closing dropdowns, modals, and popovers when the user clicks elsewhere on the page.

## Usage

```vue
<template>
  <div v-click-outside="handleClose" class="dropdown">
    <p>Dropdown content</p>
  </div>
</template>

<script setup>
import { vClickOutside } from 'vue-directives'

function handleClose(event: MouseEvent) {
  console.log('Clicked outside!', event)
}
</script>
```

## Options / Binding

| Binding Value | Type                          | Description                                                                                                           |
| ------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `value`       | `(event: MouseEvent) => void` | Callback function invoked when a click occurs outside the element. The native `MouseEvent` is passed as the argument. |

The directive uses a `setTimeout` internally to avoid catching the initial click that may have opened the element (e.g., a toggle button).

## Examples

### Closing a Dropdown Menu

```vue
<template>
  <div class="relative">
    <button @click="open = !open">Toggle Menu</button>
    <ul
      v-if="open"
      v-click-outside="() => (open = false)"
      class="dropdown-menu"
    >
      <li>Option A</li>
      <li>Option B</li>
      <li>Option C</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vClickOutside } from "vue-directives";

const open = ref(false);
</script>
```

### Closing a Modal Dialog

```vue
<template>
  <div v-if="showModal" class="modal-overlay">
    <div v-click-outside="closeModal" class="modal-content">
      <h2>Settings</h2>
      <p>Click outside this box to close.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vClickOutside } from "vue-directives";

const showModal = ref(true);

function closeModal() {
  showModal.value = false;
}
</script>
```
