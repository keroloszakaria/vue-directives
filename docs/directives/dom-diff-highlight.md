# v-dom-diff-highlight

Visually highlights DOM changes by flashing a background color on mutated elements. Uses `MutationObserver` to watch for child list changes, attribute changes, and character data updates. Ideal for debugging reactive updates.

## Usage

```vue
<template>
  <div v-dom-diff-highlight>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vDomDiffHighlight } from "vue-directives-pro";

const message = ref("Hello");
</script>
```

## Options / Binding

The binding value is optional. When provided, it is an object with:

| Property   | Type     | Default                    | Description                                           |
| ---------- | -------- | -------------------------- | ----------------------------------------------------- |
| `color`    | `string` | `'rgba(255, 255, 0, 0.3)'` | Background color used for the highlight flash.        |
| `duration` | `number` | `800`                      | Duration in milliseconds for the highlight animation. |

The `MutationObserver` is configured with `childList`, `subtree`, `characterData`, and `attributes` all set to `true`, so any DOM change within the subtree triggers the highlight.

## Examples

### Default Highlight on Text Change

```vue
<template>
  <div>
    <button @click="count++">Increment</button>
    <div v-dom-diff-highlight>
      <p>Count: {{ count }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vDomDiffHighlight } from "vue-directives-pro";

const count = ref(0);
</script>
```

### Custom Color and Duration

```vue
<template>
  <div>
    <button @click="addItem">Add Item</button>
    <ul
      v-dom-diff-highlight="{ color: 'rgba(0, 255, 0, 0.2)', duration: 1200 }"
    >
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vDomDiffHighlight } from "vue-directives-pro";

const items = ref(["Apple", "Banana"]);

function addItem() {
  items.value.push(`Item ${items.value.length + 1}`);
}
</script>
```
