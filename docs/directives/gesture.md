# v-gesture

Recognizes multi-touch gestures — pinch-to-zoom, two-finger rotation, and single-finger panning. Ideal for interactive canvases, image viewers, and map-like interfaces on touch devices.

## Usage

```vue
<template>
  <div v-gesture="{ onPinch: handlePinch, onRotate: handleRotate }">
    Touch content
  </div>
</template>

<script setup>
import { vGesture } from "vue-directives";

function handlePinch(scale) {
  console.log("Pinch scale:", scale);
}
function handleRotate(angle) {
  console.log("Rotation angle:", angle);
}
</script>
```

## Options / Binding

The binding value is a **`GestureBinding`** object:

| Property   | Type                               | Default | Description                                                         |
| ---------- | ---------------------------------- | ------- | ------------------------------------------------------------------- |
| `onPinch`  | `(scale: number) => void`          | —       | Called during a two-finger pinch with the current scale factor      |
| `onRotate` | `(angle: number) => void`          | —       | Called during a two-finger rotation with the delta angle in degrees |
| `onPan`    | `(dx: number, dy: number) => void` | —       | Called during a single-finger pan with delta x / y in pixels        |

- **Pinch**: Scale is relative to the initial two-finger distance (1.0 = no change, >1 = zoom in, <1 = zoom out).
- **Rotate**: Angle is the delta in degrees from the initial two-finger angle.
- **Pan**: Reports pixel delta from the initial single-touch position.

## Examples

### Interactive Image Viewer

```vue
<template>
  <div
    v-gesture="{
      onPinch: handlePinch,
      onRotate: handleRotate,
      onPan: handlePan,
    }"
    class="viewer"
    style="touch-action: none; overflow: hidden; width: 400px; height: 400px;"
  >
    <img
      :style="{
        transform: `scale(${scale}) rotate(${rotation}deg) translate(${panX}px, ${panY}px)`,
        transformOrigin: 'center center',
      }"
      src="https://picsum.photos/400/400"
      style="width: 100%; pointer-events: none;"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vGesture } from "vue-directives";

const scale = ref(1);
const rotation = ref(0);
const panX = ref(0);
const panY = ref(0);

function handlePinch(s) {
  scale.value = Math.min(Math.max(s, 0.5), 3);
}
function handleRotate(angle) {
  rotation.value = angle;
}
function handlePan(dx, dy) {
  panX.value = dx;
  panY.value = dy;
}
</script>
```

### Pinch-to-Zoom Card

```vue
<template>
  <div
    v-gesture="{ onPinch: handlePinch }"
    class="zoom-card"
    style="touch-action: none; padding: 24px; border: 1px solid #ccc; border-radius: 12px;"
  >
    <div :style="{ transform: `scale(${zoom})`, transformOrigin: 'center' }">
      <h2>Pinch to Zoom</h2>
      <p>Current zoom: {{ zoom.toFixed(2) }}x</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vGesture } from "vue-directives";

const zoom = ref(1);

function handlePinch(scale) {
  zoom.value = Math.min(Math.max(scale, 0.25), 4);
}
</script>
```
