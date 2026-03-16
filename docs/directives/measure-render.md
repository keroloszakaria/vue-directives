# v-measure-render

Measures the render performance of an element using the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance). Places a mark before mount, another after the first animation frame post-mount, and logs or reports the duration.

## Usage

```vue
<template>
  <div v-measure-render="'my-widget'">
    <HeavyWidget />
  </div>
</template>

<script setup>
import { vMeasureRender } from "vue-directives";
</script>
```

## Options / Binding

| Binding Value | Type                                     | Default              | Description                                                                                                                         |
| ------------- | ---------------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string \| ((duration: number) => void)` | `'v-measure-render'` | A string label to identify the measurement in `console.debug`, **or** a callback that receives the render duration in milliseconds. |

When a string is provided, the directive logs to `console.debug` in the format:  
`[v-measure-render] <label>: <duration>ms`

## Examples

### Log Render Time to Console

```vue
<template>
  <ul v-measure-render="'user-list'">
    <li v-for="user in users" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { vMeasureRender } from "vue-directives";

const users = ref([
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
]);
</script>
```

### Report Duration via Callback

```vue
<template>
  <div v-measure-render="reportRender">
    <DataGrid :rows="rows" :columns="columns" />
  </div>
</template>

<script setup>
import { vMeasureRender } from 'vue-directives'

function reportRender(duration: number) {
  if (duration > 16) {
    console.warn(`Slow render detected: ${duration.toFixed(2)}ms`)
  }
  // Send to analytics
  analytics.track('render_time', { component: 'DataGrid', duration })
}
</script>
```
