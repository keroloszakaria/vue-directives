# v-draggable

Makes any element draggable via mouse or touch. Supports constrained axes, boundary clamping, custom drag handles, and lifecycle callbacks.

## Usage

```vue
<template>
  <div v-draggable>Drag me anywhere</div>
</template>

<script setup>
import { vDraggable } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **boolean**, an **object**, or omitted entirely:

| Binding Value    | Type               | Description                             |
| ---------------- | ------------------ | --------------------------------------- |
| _(none)_         | —                  | Draggable enabled with default settings |
| `true` / `false` | `boolean`          | Enable or disable dragging              |
| `value` (object) | `DraggableBinding` | Fine-tune drag behavior                 |

**`DraggableBinding` Object:**

| Property      | Type                                      | Default  | Description                                                                |
| ------------- | ----------------------------------------- | -------- | -------------------------------------------------------------------------- |
| `handle`      | `string`                                  | —        | CSS selector for the drag handle inside the element                        |
| `bounds`      | `'parent'` \| `'window'` \| `string`      | —        | Constrain movement to a parent, the window, or a CSS-selector bounding box |
| `axis`        | `'x'` \| `'y'` \| `'both'`                | `'both'` | Lock movement to a single axis                                             |
| `onDragStart` | `(pos: { x: number; y: number }) => void` | —        | Called when dragging begins                                                |
| `onDrag`      | `(pos: { x: number; y: number }) => void` | —        | Called on every move while dragging                                        |
| `onDragEnd`   | `(pos: { x: number; y: number }) => void` | —        | Called when dragging ends                                                  |
| `disabled`    | `boolean`                                 | `false`  | Disable dragging                                                           |

The directive automatically sets `position: relative` and `cursor: grab` on the element.

## Examples

### Simple Draggable Box

```vue
<template>
  <div v-draggable class="box">Drag me</div>
</template>

<script setup>
import { vDraggable } from "vue-directives-pro";
</script>
```

### Constrained to Parent with Handle

```vue
<template>
  <div
    class="container"
    style="position: relative; width: 400px; height: 400px; border: 1px solid #ccc;"
  >
    <div v-draggable="{ handle: '.header', bounds: 'parent' }" class="card">
      <div class="header" style="cursor: grab; padding: 8px; background: #eee;">
        Drag here
      </div>
      <div class="body" style="padding: 8px;">Card content</div>
    </div>
  </div>
</template>

<script setup>
import { vDraggable } from "vue-directives-pro";
</script>
```

### Horizontal Slider with Callbacks

```vue
<template>
  <div
    v-draggable="{
      axis: 'x',
      bounds: 'parent',
      onDragStart: handleStart,
      onDrag: handleDrag,
      onDragEnd: handleEnd,
    }"
    class="slider-thumb"
  />
  <p>Position: {{ pos.x }}</p>
</template>

<script setup>
import { reactive } from "vue";
import { vDraggable } from "vue-directives-pro";

const pos = reactive({ x: 0 });

function handleStart(p) {
  console.log("started at", p.x);
}
function handleDrag(p) {
  pos.x = p.x;
}
function handleEnd(p) {
  console.log("ended at", p.x);
}
</script>
```
