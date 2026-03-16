# v-render-on-idle

Defers rendering of non-critical content until the browser is idle using `requestIdleCallback`. This improves initial page load performance by delaying content that doesn't need to be visible immediately.

## Usage

```vue
<template>
  <div v-render-on-idle>
    <p>This non-critical content renders when the browser is idle.</p>
  </div>
</template>

<script setup>
import { vRenderOnIdle } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type                                | Default | Description                                                                                                          |
| ------------- | ----------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `value`       | `{ timeout?: number } \| undefined` | —       | Optional configuration object.                                                                                       |
| `timeout`     | `number`                            | `2000`  | Maximum time in milliseconds to wait before forcing render, passed as the `timeout` option to `requestIdleCallback`. |

Falls back to a 50ms `setTimeout` in browsers that do not support `requestIdleCallback`.

## Examples

### Basic Deferred Render

```vue
<template>
  <main>
    <h1>Welcome</h1>
    <div v-render-on-idle>
      <p>Analytics widgets and secondary content load when idle.</p>
    </div>
  </main>
</template>

<script setup>
import { vRenderOnIdle } from "vue-directives-pro";
</script>
```

### Custom Timeout

```vue
<template>
  <div>
    <section class="hero">Above-the-fold content</section>

    <section v-render-on-idle="{ timeout: 5000 }">
      <p>
        This section waits up to 5 seconds for an idle window before rendering.
      </p>
      <HeavyChart />
    </section>
  </div>
</template>

<script setup>
import { vRenderOnIdle } from "vue-directives-pro";
import HeavyChart from "./HeavyChart.vue";
</script>
```
