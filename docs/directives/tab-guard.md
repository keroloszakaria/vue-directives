# v-tab-guard

Guards tab navigation so that focus cycles within the element's focusable children rather than escaping to the rest of the page. Similar to a focus trap but lighter-weight — it simply wraps <kbd>Tab</kbd> and <kbd>Shift+Tab</kbd> at the boundaries. A `tabindex="-1"` is added automatically if the element has no `tabindex`.

## Usage

```vue
<template>
  <div v-tab-guard class="toolbar">
    <button>Bold</button>
    <button>Italic</button>
    <button>Underline</button>
  </div>
</template>

<script setup>
import { vTabGuard } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type                   | Description                                                          |
| ------------- | ---------------------- | -------------------------------------------------------------------- |
| `value`       | `boolean \| undefined` | Pass `false` to disable the guard. Defaults to enabled when omitted. |

When there are no focusable children inside the element the default Tab behaviour is simply prevented.

## Examples

### Toolbar with Guarded Focus

```vue
<template>
  <div v-tab-guard class="editor-toolbar">
    <button>Cut</button>
    <button>Copy</button>
    <button>Paste</button>
    <button>Undo</button>
  </div>
</template>

<script setup>
import { vTabGuard } from "vue-directives-pro";
</script>
```

### Conditionally Disabled Guard

```vue
<template>
  <div v-tab-guard="isLocked" class="panel">
    <input placeholder="First name" />
    <input placeholder="Last name" />
    <button @click="isLocked = !isLocked">
      {{ isLocked ? "Unlock" : "Lock" }} Tab Guard
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vTabGuard } from "vue-directives-pro";

const isLocked = ref(true);
</script>
```
