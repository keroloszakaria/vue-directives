# v-cursor-follow

Makes an element follow the mouse cursor. Useful for custom cursors, tooltips, floating labels, and decorative effects. Supports smooth easing and offset positioning.

## Usage

```vue
<template>
  <div v-cursor-follow>I follow your cursor</div>
</template>

<script setup>
import { vCursorFollow } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **boolean**, an **object**, or omitted entirely:

| Binding Value    | Type                  | Description                                 |
| ---------------- | --------------------- | ------------------------------------------- |
| _(none)_         | —                     | Cursor follow enabled with default settings |
| `true` / `false` | `boolean`             | Enable or disable cursor following          |
| `value` (object) | `CursorFollowBinding` | Fine-tune offset, smoothing, and duration   |

**`CursorFollowBinding` Object:**

| Property   | Type                         | Default          | Description                                               |
| ---------- | ---------------------------- | ---------------- | --------------------------------------------------------- |
| `offset`   | `{ x?: number; y?: number }` | `{ x: 0, y: 0 }` | Pixel offset from the cursor position                     |
| `smooth`   | `boolean`                    | `false`          | Enable smooth transition when following                   |
| `duration` | `number`                     | `150`            | Transition duration in milliseconds (when `smooth: true`) |

The directive sets `position: fixed`, `pointer-events: none`, and `z-index: 9999` on the element so it floats above the page without interfering with clicks.

## Examples

### Custom Cursor Dot

```vue
<template>
  <div
    v-cursor-follow
    style="
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #3b82f6;
      margin: -8px 0 0 -8px;
    "
  />
</template>

<script setup>
import { vCursorFollow } from "vue-directives-pro";
</script>
```

### Smooth Floating Label with Offset

```vue
<template>
  <div
    v-cursor-follow="{ smooth: true, duration: 200, offset: { x: 16, y: 16 } }"
    style="
      background: rgba(0, 0, 0, 0.75);
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 13px;
      white-space: nowrap;
    "
  >
    Following you smoothly ✨
  </div>
</template>

<script setup>
import { vCursorFollow } from "vue-directives-pro";
</script>
```
