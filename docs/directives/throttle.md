# v-throttle

Throttles an event handler on an element — the handler is invoked at most once per specified delay interval, even if the event fires continuously. Ideal for scroll, resize, and rapid click handlers.

## Usage

```vue
<template>
  <button v-throttle="{ handler: onSubmit, delay: 1000 }">Submit</button>
</template>

<script setup>
import { vThrottle } from "vue-directives-pro";

function onSubmit() {
  console.log("Submitted!");
}
</script>
```

## Options / Binding

The binding value is a **`ThrottleBinding`** object:

| Property  | Type                       | Default      | Description                                               |
| --------- | -------------------------- | ------------ | --------------------------------------------------------- |
| `handler` | `(...args: any[]) => void` | _(required)_ | The function to throttle                                  |
| `delay`   | `number`                   | `300`        | Throttle interval in milliseconds                         |
| `event`   | `string`                   | `'click'`    | DOM event name to listen for (e.g. `'scroll'`, `'click'`) |

When the binding value updates, the old listener is removed, any pending timer is cleared, and a new throttled listener is attached.

## Examples

### Throttled Button Click

```vue
<template>
  <div>
    <button v-throttle="{ handler: onClick, delay: 2000 }">
      Click me (max once per 2 s)
    </button>
    <p>Click count: {{ count }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vThrottle } from "vue-directives-pro";

const count = ref(0);

function onClick() {
  count.value++;
}
</script>
```

### Throttled Scroll Handler

```vue
<template>
  <div
    v-throttle="{ handler: onScroll, delay: 200, event: 'scroll' }"
    style="height: 300px; overflow-y: auto;"
  >
    <div style="height: 2000px; padding: 1rem;">
      <p>Scroll position: {{ scrollY }}px</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vThrottle } from "vue-directives-pro";

const scrollY = ref(0);

function onScroll(e) {
  scrollY.value = e.target.scrollTop;
}
</script>
```
