# v-magnetic

Applies a magnetic attraction effect — the element subtly shifts toward the cursor when the mouse is within range. Creates a playful, interactive feel for buttons, icons, and call-to-action elements.

## Usage

```vue
<template>
  <button v-magnetic>Hover near me</button>
</template>

<script setup>
import { vMagnetic } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be an **object** or omitted entirely:

| Binding Value    | Type              | Description                                |
| ---------------- | ----------------- | ------------------------------------------ |
| _(none)_         | —                 | Magnetic effect with default settings      |
| `value` (object) | `MagneticBinding` | Customize strength and activation distance |

**`MagneticBinding` Object:**

| Property   | Type     | Default | Description                                                    |
| ---------- | -------- | ------- | -------------------------------------------------------------- |
| `strength` | `number` | `0.3`   | Pull intensity (0–1). Higher values create stronger attraction |
| `distance` | `number` | `80`    | Activation radius in pixels from the element center            |

The directive adds a `transform` transition (`0.2s ease-out`) and resets the transform when the cursor leaves the element.

## Examples

### Default Magnetic Button

```vue
<template>
  <button v-magnetic class="btn">Hover near me</button>
</template>

<script setup>
import { vMagnetic } from "vue-directives-pro";
</script>

<style scoped>
.btn {
  padding: 12px 24px;
  font-size: 16px;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  background: transparent;
  color: #3b82f6;
  cursor: pointer;
}
</style>
```

### Strong Magnetic Icon with Large Range

```vue
<template>
  <div
    style="display: flex; gap: 40px; padding: 60px; justify-content: center;"
  >
    <span
      v-for="icon in icons"
      :key="icon"
      v-magnetic="{ strength: 0.6, distance: 120 }"
      style="font-size: 32px; display: inline-block; cursor: pointer;"
    >
      {{ icon }}
    </span>
  </div>
</template>

<script setup>
import { vMagnetic } from "vue-directives-pro";

const icons = ["🏠", "🔍", "⚙️", "👤"];
</script>
```
