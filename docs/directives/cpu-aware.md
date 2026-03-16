# v-cpu-aware

Adapts rendering based on the device's CPU capabilities. Detects low-end hardware via `navigator.hardwareConcurrency` and the `prefers-reduced-motion` media query, then optionally reduces animations or fires callbacks.

## Usage

```vue
<template>
  <div v-cpu-aware="{ reduceAnimations: true }">
    Animated content — animations are stripped on low-end devices.
  </div>
</template>

<script setup>
import { vCpuAware } from "vue-directives";
</script>
```

## Options / Binding

| Property           | Type         | Default           | Description                                                                           |
| ------------------ | ------------ | ----------------- | ------------------------------------------------------------------------------------- |
| `onLowEnd`         | `() => void` | —                 | Callback fired when the device is classified as low-end.                              |
| `onHighEnd`        | `() => void` | —                 | Callback fired when the device is classified as high-end.                             |
| `lowEndThreshold`  | `number`     | `4`               | Core count at or below which the device is considered low-end.                        |
| `reduceAnimations` | `boolean`    | `false`           | When `true`, adds `reducedClass` and sets CSS custom properties to `0ms`.             |
| `reducedClass`     | `string`     | `'v-cpu-reduced'` | CSS class added to the element on low-end devices when `reduceAnimations` is enabled. |

A device is considered low-end when `navigator.hardwareConcurrency <= lowEndThreshold` **or** the user has enabled `prefers-reduced-motion: reduce`.

When `reduceAnimations` is `true`, the directive sets `--v-transition-duration` and `--v-animation-duration` to `0ms` on the element.

## Examples

### Disable Animations on Low-End Devices

```vue
<template>
  <div v-cpu-aware="{ reduceAnimations: true, reducedClass: 'no-anim' }">
    <div class="fancy-animation">
      Smooth on powerful devices, static otherwise.
    </div>
  </div>
</template>

<script setup>
import { vCpuAware } from "vue-directives";
</script>

<style>
.fancy-animation {
  transition: transform var(--v-transition-duration, 300ms) ease;
}
.no-anim * {
  animation: none !important;
}
</style>
```

### Callbacks for Adaptive Loading

```vue
<template>
  <div
    v-cpu-aware="{
      onLowEnd: disableParticles,
      onHighEnd: enableParticles,
      lowEndThreshold: 4,
    }"
  >
    <canvas ref="canvas" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vCpuAware } from 'vue-directives'

const canvas = ref<HTMLCanvasElement>()

function enableParticles() {
  console.log('High-end device: enabling particle effects')
}

function disableParticles() {
  console.log('Low-end device: disabling particle effects')
}
</script>
```
