# v-swipe

Detects touch swipe gestures in four directions — left, right, up, and down. Provides both a unified callback and individual directional callbacks with configurable distance threshold and time limit.

## Usage

```vue
<template>
  <div v-swipe="{ onSwipe: handleSwipe }">Swipe me</div>
</template>

<script setup>
import { vSwipe } from "vue-directives-pro";

function handleSwipe(direction) {
  console.log("Swiped:", direction);
}
</script>
```

## Options / Binding

The binding value is a **`SwipeBinding`** object:

| Property       | Type                                                       | Default | Description                                        |
| -------------- | ---------------------------------------------------------- | ------- | -------------------------------------------------- |
| `onSwipe`      | `(direction: 'left' \| 'right' \| 'up' \| 'down') => void` | —       | Called with the detected swipe direction           |
| `onSwipeLeft`  | `() => void`                                               | —       | Called on a left swipe                             |
| `onSwipeRight` | `() => void`                                               | —       | Called on a right swipe                            |
| `onSwipeUp`    | `() => void`                                               | —       | Called on an upward swipe                          |
| `onSwipeDown`  | `() => void`                                               | —       | Called on a downward swipe                         |
| `threshold`    | `number`                                                   | `50`    | Minimum distance in pixels to register a swipe     |
| `timeout`      | `number`                                                   | `500`   | Maximum time in milliseconds for the swipe gesture |

The directive listens for `touchstart` and `touchend` events. A swipe is registered when the touch moves beyond the `threshold` distance within the `timeout` window.

## Examples

### Unified Swipe Handler

```vue
<template>
  <div
    v-swipe="{ onSwipe: handleSwipe }"
    class="swipe-area"
    style="padding: 40px; background: #f0f0f0; text-align: center;"
  >
    <p>Swipe in any direction</p>
    <p>Last swipe: {{ lastDirection }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSwipe } from "vue-directives-pro";

const lastDirection = ref("none");

function handleSwipe(direction) {
  lastDirection.value = direction;
}
</script>
```

### Image Carousel Navigation

```vue
<template>
  <div
    v-swipe="{
      onSwipeLeft: next,
      onSwipeRight: prev,
      threshold: 80,
      timeout: 400,
    }"
    class="carousel"
    style="overflow: hidden; width: 100%; max-width: 600px;"
  >
    <img :src="images[currentIndex]" style="width: 100%;" />
    <p style="text-align: center;">
      {{ currentIndex + 1 }} / {{ images.length }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSwipe } from "vue-directives-pro";

const images = [
  "https://picsum.photos/600/300?random=1",
  "https://picsum.photos/600/300?random=2",
  "https://picsum.photos/600/300?random=3",
];

const currentIndex = ref(0);

function next() {
  currentIndex.value = (currentIndex.value + 1) % images.length;
}
function prev() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
}
</script>
```
