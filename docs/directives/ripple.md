# v-ripple

Adds a Material Design–style ripple effect that expands from the click position. The ripple animates outward and fades, then is automatically removed from the DOM.

## Usage

```vue
<template>
  <button v-ripple class="btn-primary">Click me</button>
</template>

<script setup>
import { vRipple } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **boolean**, an **object**, or omitted entirely:

| Binding Value    | Type            | Description                                   |
| ---------------- | --------------- | --------------------------------------------- |
| _(none)_         | —               | Ripple enabled with default settings.         |
| `true` / `false` | `boolean`       | Enable or disable the ripple effect.          |
| `value` (object) | `RippleBinding` | Fine-tune color, duration, or disabled state. |

**`RippleBinding` Object:**

| Property   | Type      | Default                      | Description                         |
| ---------- | --------- | ---------------------------- | ----------------------------------- |
| `color`    | `string`  | `'rgba(255, 255, 255, 0.4)'` | CSS color of the ripple circle.     |
| `duration` | `number`  | `500`                        | Animation duration in milliseconds. |
| `disabled` | `boolean` | `false`                      | Disable the ripple effect.          |

The directive automatically sets `position: relative` and `overflow: hidden` on the host element to contain the ripple.

## Examples

### Default Ripple

```vue
<template>
  <button v-ripple class="btn">Save</button>
</template>

<script setup>
import { vRipple } from "vue-directives-pro";
</script>
```

### Custom Color and Duration

```vue
<template>
  <button
    v-ripple="{ color: 'rgba(0, 123, 255, 0.3)', duration: 800 }"
    class="btn-outline"
  >
    Learn More
  </button>
</template>

<script setup>
import { vRipple } from "vue-directives-pro";
</script>
```

### Conditionally Disabled

```vue
<template>
  <button
    v-ripple="{ disabled: isLoading }"
    :disabled="isLoading"
    @click="submit"
    class="btn-primary"
  >
    {{ isLoading ? "Saving..." : "Submit" }}
  </button>
</template>

<script setup>
import { ref } from "vue";
import { vRipple } from "vue-directives-pro";

const isLoading = ref(false);

function submit() {
  isLoading.value = true;
  setTimeout(() => (isLoading.value = false), 2000);
}
</script>
```

### Dark Ripple on a Light Card

```vue
<template>
  <div
    v-ripple="{ color: 'rgba(0, 0, 0, 0.1)', duration: 600 }"
    class="card"
    @click="openDetail"
  >
    <h3>Project Alpha</h3>
    <p>Click anywhere on this card</p>
  </div>
</template>

<script setup>
import { vRipple } from "vue-directives-pro";

function openDetail() {
  console.log("Opening detail view");
}
</script>
```
