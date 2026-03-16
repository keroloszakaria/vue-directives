# v-parallax

Applies a parallax scrolling effect to an element by translating it relative to the scroll position. Supports configurable speed and horizontal or vertical direction.

## Usage

```vue
<template>
  <div v-parallax>Parallax content</div>
</template>

<script setup>
import { vParallax } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **number**, a **`ParallaxBinding`** object, or omitted:

| Binding Type      | Description                                |
| ----------------- | ------------------------------------------ |
| `undefined`       | Vertical parallax with default speed `0.5` |
| `number`          | Sets the parallax speed directly           |
| `ParallaxBinding` | Full configuration object                  |

**`ParallaxBinding`**

| Property    | Type                         | Default      | Description                                                  |
| ----------- | ---------------------------- | ------------ | ------------------------------------------------------------ |
| `speed`     | `number`                     | `0.5`        | Parallax intensity — higher values produce stronger movement |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Axis of the parallax translation                             |

The directive uses `translate3d` for GPU-accelerated transforms and registers the scroll listener with `{ passive: true }`. Animation is only calculated when the element is within the viewport.

## Examples

### Hero Section Parallax

```vue
<template>
  <div style="position: relative; overflow: hidden; height: 60vh;">
    <div
      v-parallax="0.3"
      style="position: absolute; inset: -20% 0; background: url('/hero-bg.jpg') center/cover;"
    />
    <div
      style="position: relative; display: flex; align-items: center; justify-content: center; height: 100%; color: #fff;"
    >
      <h1>Welcome</h1>
    </div>
  </div>
</template>

<script setup>
import { vParallax } from "vue-directives";
</script>
```

### Multi-layer Parallax

```vue
<template>
  <div style="position: relative; height: 200vh;">
    <div
      v-parallax="{ speed: 0.2 }"
      style="position: absolute; top: 10%; left: 10%; width: 200px; height: 200px; background: #3b82f6; border-radius: 50%; opacity: 0.6;"
    />
    <div
      v-parallax="{ speed: 0.6 }"
      style="position: absolute; top: 30%; right: 15%; width: 150px; height: 150px; background: #ef4444; border-radius: 12px; opacity: 0.6;"
    />
    <div
      v-parallax="{ speed: 0.4, direction: 'horizontal' }"
      style="position: absolute; top: 50%; left: 30%; width: 180px; height: 120px; background: #10b981; opacity: 0.6;"
    />
  </div>
</template>

<script setup>
import { vParallax } from "vue-directives";
</script>
```
