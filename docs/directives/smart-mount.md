# v-smart-mount

Provides intelligent mounting strategies for components. Instead of mounting immediately, you can defer initialization until the element is visible, the browser is idle, or the user interacts with it.

## Usage

```vue
<template>
  <div v-smart-mount="{ onMount: initComponent, strategy: 'visible' }">
    Content mounts when scrolled into view.
  </div>
</template>

<script setup>
import { vSmartMount } from "vue-directives-pro";

function initComponent() {
  console.log("Component initialized!");
}
</script>
```

## Options / Binding

| Property     | Type                                                  | Default      | Description                                                                |
| ------------ | ----------------------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| `onMount`    | `() => void`                                          | _(required)_ | Callback invoked when the mount condition is met.                          |
| `strategy`   | `'visible' \| 'idle' \| 'interaction' \| 'immediate'` | `'visible'`  | Determines when `onMount` is called.                                       |
| `rootMargin` | `string`                                              | `'100px'`    | IntersectionObserver root margin (only applies to the `visible` strategy). |

### Strategy Details

| Strategy      | Behavior                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------- |
| `immediate`   | Calls `onMount` synchronously during the `mounted` hook.                                            |
| `visible`     | Uses `IntersectionObserver` to call `onMount` when the element enters the viewport.                 |
| `idle`        | Uses `requestIdleCallback` (falls back to `setTimeout`) to call `onMount` when the browser is idle. |
| `interaction` | Listens for `mouseenter`, `focusin`, or `touchstart` and calls `onMount` on the first interaction.  |

## Examples

### Idle Mounting

```vue
<template>
  <div v-smart-mount="{ onMount: loadAnalytics, strategy: 'idle' }">
    <AnalyticsDashboard />
  </div>
</template>

<script setup>
import { vSmartMount } from "vue-directives-pro";

function loadAnalytics() {
  console.log("Analytics loaded during idle time");
}
</script>
```

### Interaction-based Mounting

```vue
<template>
  <div v-smart-mount="{ onMount: initEditor, strategy: 'interaction' }">
    <p>Hover or tap to initialize the rich text editor.</p>
    <RichTextEditor />
  </div>
</template>

<script setup>
import { vSmartMount } from "vue-directives-pro";

function initEditor() {
  console.log("Editor initialized on first interaction");
}
</script>
```
