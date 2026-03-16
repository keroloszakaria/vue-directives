# v-resize-observer

Fires a callback whenever the element is resized, powered by the native `ResizeObserver` API. Supports an optional debounce to limit callback frequency.

## Usage

```vue
<template>
  <div v-resize-observer="{ handler: onResize }">Resize me</div>
</template>

<script setup>
import { vResizeObserver } from 'vue-directives-pro'

function onResize({ width, height, el }: { width: number; height: number; el: HTMLElement }) {
  console.log(`New size: ${width}x${height}`)
}
</script>
```

## Options / Binding

The binding value can be a **function** (shorthand) or an **object** with the following properties:

| Property   | Type                                                                  | Default | Description                                            |
| ---------- | --------------------------------------------------------------------- | ------- | ------------------------------------------------------ |
| `handler`  | `(entry: { width: number; height: number; el: HTMLElement }) => void` | —       | **Required.** Callback invoked on each resize.         |
| `debounce` | `number`                                                              | `0`     | Debounce delay in milliseconds. `0` means no debounce. |

When passing a function directly, it is used as the `handler` with no debounce:

```vue
<div v-resize-observer="onResize" />
```

## Examples

### Basic Size Tracking

```vue
<template>
  <div v-resize-observer="onResize" class="resizable-box">
    {{ size.width }} × {{ size.height }}
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { vResizeObserver } from 'vue-directives-pro'

const size = reactive({ width: 0, height: 0 })

function onResize({ width, height }: { width: number; height: number }) {
  size.width = Math.round(width)
  size.height = Math.round(height)
}
</script>
```

### Debounced Resize Handler

```vue
<template>
  <textarea
    v-resize-observer="{ handler: handleResize, debounce: 200 }"
    style="resize: both; overflow: auto; width: 300px; height: 150px;"
  >
    Drag to resize — callback is debounced at 200ms.
  </textarea>
</template>

<script setup>
import { vResizeObserver } from 'vue-directives-pro'

function handleResize({ width, height, el }: { width: number; height: number; el: HTMLElement }) {
  el.dataset.lastSize = `${Math.round(width)}x${Math.round(height)}`
}
</script>
```
