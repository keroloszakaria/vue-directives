# v-focus-trap

Traps keyboard focus within an element so that pressing <kbd>Tab</kbd> or <kbd>Shift+Tab</kbd> cycles through its focusable children. Ideal for modals and dialogs that must meet WCAG focus-management requirements. On mount the first focusable child receives focus; on unmount focus is restored to the previously active element.

## Usage

```vue
<template>
  <div v-if="showDialog" v-focus-trap class="dialog">
    <input placeholder="Name" />
    <input placeholder="Email" />
    <button @click="showDialog = false">Close</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vFocusTrap } from "vue-directives";

const showDialog = ref(true);
</script>
```

## Options / Binding

| Binding Value | Type                   | Description                                                                                |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| `value`       | `boolean \| undefined` | Pass `false` to disable the trap. Defaults to enabled when no value or `true` is provided. |

Focusable elements matched inside the container: `a[href]`, `button:not([disabled])`, `input:not([disabled])`, `select:not([disabled])`, `textarea:not([disabled])`, `[tabindex]:not([tabindex="-1"])`.

## Examples

### Modal Dialog

```vue
<template>
  <div v-if="open" class="overlay">
    <div v-focus-trap class="modal">
      <h2>Confirm Action</h2>
      <p>Are you sure you want to proceed?</p>
      <button @click="open = false">Cancel</button>
      <button @click="confirm">OK</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vFocusTrap } from "vue-directives";

const open = ref(true);

function confirm() {
  // handle confirmation
  open.value = false;
}
</script>
```

### Conditionally Disabled Trap

```vue
<template>
  <div v-focus-trap="trapActive" class="sidebar">
    <a href="/home">Home</a>
    <a href="/settings">Settings</a>
    <button @click="trapActive = !trapActive">
      {{ trapActive ? "Unlock" : "Lock" }} Focus
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vFocusTrap } from "vue-directives";

const trapActive = ref(true);
</script>
```
