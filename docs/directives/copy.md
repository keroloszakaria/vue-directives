# v-copy

Copy text to the clipboard when the element is clicked. Uses the Clipboard API (`navigator.clipboard.writeText`) and supports success/error callbacks.

## Usage

```vue
<template>
  <button v-copy="'Hello World'">Copy</button>
</template>

<script setup>
import { vCopy } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **string** or an **object**:

| Binding Value    | Type          | Description                                          |
| ---------------- | ------------- | ---------------------------------------------------- |
| `value` (string) | `string`      | Shorthand — the text to copy.                        |
| `value` (object) | `CopyBinding` | Full options for text, success, and error callbacks. |

**`CopyBinding` Object:**

| Property    | Type                     | Default     | Description                               |
| ----------- | ------------------------ | ----------- | ----------------------------------------- |
| `text`      | `string`                 | `''`        | The text to copy to the clipboard.        |
| `onSuccess` | `() => void`             | `undefined` | Callback invoked after a successful copy. |
| `onError`   | `(error: Error) => void` | `undefined` | Callback invoked when the copy fails.     |

## Examples

### Copy a Static String

```vue
<template>
  <button v-copy="'npm install vue-directives'">
    📋 Copy Install Command
  </button>
</template>

<script setup>
import { vCopy } from "vue-directives";
</script>
```

### Copy Reactive Value with Callbacks

```vue
<template>
  <input v-model="message" placeholder="Type something..." />
  <button
    v-copy="{ text: message, onSuccess: onCopied, onError: onCopyFailed }"
  >
    Copy Message
  </button>
  <p v-if="copied">✅ Copied!</p>
</template>

<script setup>
import { vCopy } from "vue-directives";
import { ref } from "vue";

const message = ref("");
const copied = ref(false);

function onCopied() {
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

function onCopyFailed(error: Error) {
  console.error("Copy failed:", error);
}
</script>
```
