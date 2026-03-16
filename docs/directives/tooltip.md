# v-tooltip

Displays a lightweight tooltip on hover. The tooltip is positioned relative to the element with configurable placement, rendered as a `fixed` overlay appended to `<body>`, and includes a smooth opacity transition.

## Usage

```vue
<template>
  <button v-tooltip="'Save your changes'">💾 Save</button>
</template>

<script setup>
import { vTooltip } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **string** or an **object**:

| Binding Value    | Type             | Description                                              |
| ---------------- | ---------------- | -------------------------------------------------------- |
| `value` (string) | `string`         | Tooltip text. Displayed above the element with no delay. |
| `value` (object) | `TooltipBinding` | Full configuration object.                               |

**`TooltipBinding` Object:**

| Property   | Type                                     | Default | Description                                       |
| ---------- | ---------------------------------------- | ------- | ------------------------------------------------- |
| `text`     | `string`                                 | —       | **Required.** The tooltip text content.           |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Placement of the tooltip relative to the element. |
| `delay`    | `number`                                 | `0`     | Delay in milliseconds before the tooltip appears. |

The tooltip element has `role="tooltip"` for accessibility and is removed from the DOM on `mouseleave` after a 200ms fade-out.

The directive also supports **reactive updates** — if the bound value changes, the tooltip text is updated automatically.

## Examples

### Simple String Tooltip

```vue
<template>
  <button v-tooltip="'Delete this item'">🗑️ Delete</button>
</template>

<script setup>
import { vTooltip } from "vue-directives-pro";
</script>
```

### Positioned Below

```vue
<template>
  <button v-tooltip="{ text: 'Download report', position: 'bottom' }">
    ⬇️ Download
  </button>
</template>

<script setup>
import { vTooltip } from "vue-directives-pro";
</script>
```

### With Delay

```vue
<template>
  <span
    v-tooltip="{ text: 'Copy to clipboard', position: 'right', delay: 500 }"
  >
    📋 Copy
  </span>
</template>

<script setup>
import { vTooltip } from "vue-directives-pro";
</script>
```

### Dynamic Tooltip Text

```vue
<template>
  <button v-tooltip="statusText" @click="toggle">
    {{ isActive ? "🟢 Active" : "🔴 Inactive" }}
  </button>
</template>

<script setup>
import { ref, computed } from "vue";
import { vTooltip } from "vue-directives-pro";

const isActive = ref(true);
const statusText = computed(() =>
  isActive.value ? "Click to deactivate" : "Click to activate",
);

function toggle() {
  isActive.value = !isActive.value;
}
</script>
```
