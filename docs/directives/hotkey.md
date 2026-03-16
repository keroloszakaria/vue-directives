# v-hotkey

Binds global keyboard shortcuts to handler functions. Supports modifier keys (`ctrl`, `alt`, `shift`, `meta`/`cmd`) and accepts `.stop` and `.prevent` directive modifiers.

## Usage

```vue
<template>
  <div v-hotkey="{ 'ctrl+s': onSave }">Press Ctrl+S to save</div>
</template>

<script setup>
import { vHotkey } from "vue-directives";

function onSave(e) {
  e.preventDefault();
  console.log("Saved!");
}
</script>
```

## Options / Binding

The binding value is a **`HotkeyMap`** — a plain object mapping key-combo strings to handler functions:

```ts
type HotkeyMap = Record<string, (event: KeyboardEvent) => void>;
```

| Key          | Value                            | Description                        |
| ------------ | -------------------------------- | ---------------------------------- |
| combo string | `(event: KeyboardEvent) => void` | Handler invoked when combo matches |

**Key combo format:** `modifier+modifier+key` (case-insensitive, `+` separated).

| Modifier | Description                 |
| -------- | --------------------------- |
| `ctrl`   | Control key (or Cmd on Mac) |
| `alt`    | Alt / Option key            |
| `shift`  | Shift key                   |
| `meta`   | Meta / Cmd key              |

**Directive modifiers:**

| Modifier   | Description                              |
| ---------- | ---------------------------------------- |
| `.stop`    | Calls `event.stopPropagation()` on match |
| `.prevent` | Calls `event.preventDefault()` on match  |

Shortcuts are registered on `document`, so they work globally regardless of focus.

## Examples

### Multiple Shortcuts

```vue
<template>
  <div v-hotkey="shortcuts">
    <p>Ctrl+S — Save</p>
    <p>Ctrl+Z — Undo</p>
    <p>Escape — Close</p>
    <p>Last action: {{ lastAction }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vHotkey } from "vue-directives";

const lastAction = ref("none");

const shortcuts = {
  "ctrl+s": (e) => {
    e.preventDefault();
    lastAction.value = "save";
  },
  "ctrl+z": (e) => {
    e.preventDefault();
    lastAction.value = "undo";
  },
  escape: () => {
    lastAction.value = "close";
  },
};
</script>
```

### Form Submit with Stop and Prevent

```vue
<template>
  <form @submit.prevent>
    <input
      v-hotkey.stop.prevent="{ enter: submitForm }"
      v-model="query"
      placeholder="Type and press Enter"
    />
    <p>Submitted: {{ submitted }}</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { vHotkey } from "vue-directives";

const query = ref("");
const submitted = ref("");

function submitForm() {
  submitted.value = query.value;
  query.value = "";
}
</script>
```
