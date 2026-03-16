# v-auto-poll

Automatically poll an async handler at a fixed interval. The handler receives an `AbortSignal` that is aborted when the element is unmounted, enabling safe fetch cancellation. The timer is cleaned up automatically on unmount.

## Usage

```vue
<template>
  <div v-auto-poll="{ handler: fetchData, interval: 5000 }">
    <p>{{ status }}</p>
  </div>
</template>

<script setup>
import { vAutoPoll } from "vue-directives-pro";
import { ref } from "vue";

const status = ref("Loading...");

async function fetchData(signal: AbortSignal) {
  const res = await fetch("/api/status", { signal });
  const data = await res.json();
  status.value = data.message;
}
</script>
```

## Options / Binding

The binding value is an **`AutoPollBinding`** object:

| Property    | Type                                     | Default | Description                                                                   |
| ----------- | ---------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| `handler`   | `(signal: AbortSignal) => Promise<void>` | —       | **(required)** Async function called on each poll tick.                       |
| `interval`  | `number`                                 | `5000`  | Polling interval in milliseconds.                                             |
| `immediate` | `boolean`                                | `true`  | Whether to invoke the handler immediately on mount before the first interval. |

## Examples

### Poll Every 10 Seconds

```vue
<template>
  <div v-auto-poll="{ handler: loadMessages, interval: 10000 }">
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.text }}</li>
    </ul>
  </div>
</template>

<script setup>
import { vAutoPoll } from "vue-directives-pro";
import { ref } from "vue";

const messages = ref<{ id: number; text: string }[]>([]);

async function loadMessages(signal: AbortSignal) {
  const res = await fetch("/api/messages", { signal });
  messages.value = await res.json();
}
</script>
```

### Deferred First Poll

```vue
<template>
  <div
    v-auto-poll="{ handler: checkHealth, interval: 30000, immediate: false }"
  >
    <span>Server: {{ serverStatus }}</span>
  </div>
</template>

<script setup>
import { vAutoPoll } from "vue-directives-pro";
import { ref } from "vue";

const serverStatus = ref("unknown");

async function checkHealth(signal: AbortSignal) {
  try {
    const res = await fetch("/api/health", { signal });
    serverStatus.value = res.ok ? "healthy" : "degraded";
  } catch {
    serverStatus.value = "offline";
  }
}
</script>
```
