# v-longpress

Triggers a callback when the user presses and holds an element for a specified duration. Works with both mouse and touch events.

## Usage

```vue
<template>
  <button v-longpress="{ handler: onLongPress, duration: 800 }">Hold me</button>
</template>

<script setup>
import { vLongpress } from 'vue-directives-pro'

function onLongPress(event: MouseEvent | TouchEvent) {
  console.log('Long press detected!', event)
}
</script>
```

## Options / Binding

The binding value can be a **function** or an **object**:

| Binding Value      | Type                                        | Description                                                      |
| ------------------ | ------------------------------------------- | ---------------------------------------------------------------- |
| `value` (function) | `(event: MouseEvent \| TouchEvent) => void` | Shorthand — the function is called after the default 500ms hold. |
| `value` (object)   | `LongpressBinding`                          | Object with `handler` and optional `duration`.                   |

**`LongpressBinding` Object:**

| Property   | Type                                        | Default | Description                                                    |
| ---------- | ------------------------------------------- | ------- | -------------------------------------------------------------- |
| `handler`  | `(event: MouseEvent \| TouchEvent) => void` | —       | **Required.** Callback fired after the long press duration.    |
| `duration` | `number`                                    | `500`   | Hold duration in milliseconds before the handler is triggered. |

The timer is cancelled if the user releases (`mouseup` / `touchend`) or leaves (`mouseleave` / `touchcancel`) the element before the duration elapses.

## Examples

### Simple Function Shorthand

```vue
<template>
  <button v-longpress="onHold">Hold to delete</button>
</template>

<script setup>
import { vLongpress } from "vue-directives-pro";

function onHold() {
  alert("Item deleted!");
}
</script>
```

### Custom Duration

```vue
<template>
  <button v-longpress="{ handler: onConfirm, duration: 1500 }">
    Hold 1.5s to confirm
  </button>
</template>

<script setup>
import { vLongpress } from "vue-directives-pro";

function onConfirm() {
  console.log("Action confirmed after 1.5 seconds");
}
</script>
```

### Mobile-Friendly Context Menu

```vue
<template>
  <div
    v-longpress="{ handler: showContextMenu, duration: 600 }"
    class="list-item"
  >
    {{ item.name }}
  </div>
</template>

<script setup>
import { vLongpress } from 'vue-directives-pro'

const item = { name: 'Document.pdf' }

function showContextMenu(event: MouseEvent | TouchEvent) {
  // Open a custom context menu at the event position
  console.log('Context menu for', item.name)
}
</script>
```
