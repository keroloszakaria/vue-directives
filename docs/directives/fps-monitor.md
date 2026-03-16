# v-fps-monitor

Displays a real-time FPS (frames per second) monitoring overlay on the page. The overlay color changes based on performance: green (≥ 55 FPS), yellow (≥ 30 FPS), or red (< 30 FPS). Useful during development to identify performance bottlenecks.

## Usage

```vue
<template>
  <div v-fps-monitor>
    <App />
  </div>
</template>

<script setup>
import { vFpsMonitor } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type                                            | Default       | Description                                                                                       |
| ------------- | ----------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `value`       | `{ position?: string } \| boolean \| undefined` | —             | Configuration object, `false` to disable, or omit/`undefined` to enable with defaults.            |
| `position`    | `string`                                        | `'top-right'` | Position of the overlay. Supports `'top-right'`, `'top-left'`, `'bottom-right'`, `'bottom-left'`. |

Set the binding to `false` to completely disable the monitor without removing the directive from the template.

## Examples

### Default Position (Top-Right)

```vue
<template>
  <div v-fps-monitor>
    <main>
      <h1>My App</h1>
      <HeavyAnimationComponent />
    </main>
  </div>
</template>

<script setup>
import { vFpsMonitor } from "vue-directives-pro";
</script>
```

### Custom Position with Conditional Toggle

```vue
<template>
  <div v-fps-monitor="showFps ? { position: 'bottom-left' } : false">
    <button @click="showFps = !showFps">Toggle FPS Monitor</button>
    <GameCanvas />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vFpsMonitor } from "vue-directives-pro";

const showFps = ref(true);
</script>
```
