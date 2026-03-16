# v-tilt

Apply a 3D tilt hover effect to an element (similar to vanilla-tilt). The element rotates toward the mouse cursor with configurable perspective, speed, and optional glare overlay.

## Usage

```vue
<template>
  <div v-tilt class="card">Hover over me</div>
</template>

<script setup>
import { vTilt } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be `undefined`/omitted (use defaults), `false` (disable), or an **object**:

| Property      | Type      | Default | Description                                                    |
| ------------- | --------- | ------- | -------------------------------------------------------------- |
| `maxTilt`     | `number`  | `15`    | Maximum rotation in degrees.                                   |
| `speed`       | `number`  | `300`   | Transition speed in milliseconds when the cursor leaves.       |
| `perspective` | `number`  | `1000`  | CSS perspective value in pixels. Lower = more dramatic.        |
| `scale`       | `number`  | `1`     | Scale factor applied during tilt.                              |
| `glare`       | `boolean` | `false` | Enable a light-glare overlay that follows the cursor.          |
| `maxGlare`    | `number`  | `0.5`   | Maximum glare opacity (0–1). Only used when `glare` is `true`. |
| `disabled`    | `boolean` | `false` | Disable the tilt effect without removing the directive.        |

## Examples

### Default Tilt

```vue
<template>
  <div v-tilt class="tilt-card">
    <h3>Hover Me</h3>
    <p>Subtle 3D tilt effect on mouse move.</p>
  </div>
</template>

<script setup>
import { vTilt } from "vue-directives-pro";
</script>

<style scoped>
.tilt-card {
  width: 300px;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
}
</style>
```

### Dramatic Tilt with Glare and Scale

```vue
<template>
  <div
    v-tilt="{
      maxTilt: 25,
      speed: 400,
      perspective: 800,
      scale: 1.05,
      glare: true,
      maxGlare: 0.35,
    }"
    class="premium-card"
  >
    <h2>Premium Plan</h2>
    <p>$49/month</p>
  </div>
</template>

<script setup>
import { vTilt } from "vue-directives-pro";
</script>

<style scoped>
.premium-card {
  position: relative;
  width: 320px;
  padding: 2.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
  border-radius: 16px;
}
</style>
```
