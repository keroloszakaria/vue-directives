# v-clickable-area

Expands the clickable (tappable) area of an element beyond its visible bounds by adjusting padding and negative margins. Helpful for improving touch targets on small interactive elements like icon buttons or links.

## Usage

```vue
<template>
  <button v-clickable-area="16" class="icon-btn">✕</button>
</template>

<script setup>
import { vClickableArea } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **number** or an **object**:

| Binding Value    | Type                                                               | Description                                                 |
| ---------------- | ------------------------------------------------------------------ | ----------------------------------------------------------- |
| `value` (number) | `number`                                                           | Uniform expansion in pixels applied to all four sides.      |
| `value` (object) | `{ top?: number; right?: number; bottom?: number; left?: number }` | Per-side expansion in pixels. Omitted sides default to `0`. |

The directive works by:

1. Ensuring the element has `position: relative`.
2. Adding negative margins equal to the expansion values.
3. Increasing existing padding by the expansion values to compensate.

This keeps the element's visual size the same while making the interactive hit area larger.

## Examples

### Uniform Expansion

```vue
<template>
  <button v-clickable-area="20" class="small-icon-btn">
    <span class="icon">⚙️</span>
  </button>
</template>

<script setup>
import { vClickableArea } from "vue-directives-pro";
</script>
```

### Per-Side Expansion

```vue
<template>
  <a
    v-clickable-area="{ top: 8, right: 24, bottom: 8, left: 24 }"
    href="/settings"
    class="nav-link"
  >
    Settings
  </a>
</template>

<script setup>
import { vClickableArea } from "vue-directives-pro";
</script>
```

### Improving Mobile Touch Targets

```vue
<template>
  <div class="toolbar">
    <button
      v-for="action in actions"
      :key="action.icon"
      v-clickable-area="12"
      @click="action.handler"
      class="toolbar-icon"
    >
      {{ action.icon }}
    </button>
  </div>
</template>

<script setup>
import { vClickableArea } from "vue-directives-pro";

const actions = [
  { icon: "🔍", handler: () => console.log("Search") },
  { icon: "🔔", handler: () => console.log("Notifications") },
  { icon: "👤", handler: () => console.log("Profile") },
];
</script>
```
