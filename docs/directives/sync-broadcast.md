# v-sync-broadcast

Sync data across browser tabs in real time using the BroadcastChannel API. On input elements, the value is automatically broadcast to all other tabs listening on the same channel. For non-input elements, a custom `onMessage` callback can handle incoming messages.

## Usage

```vue
<template>
  <input v-sync-broadcast="{ channel: 'shared-input' }" />
</template>

<script setup>
import { vSyncBroadcast } from "vue-directives";
</script>
```

## Options / Binding

The binding value is a **`SyncBroadcastBinding`** object:

| Property    | Type                  | Default     | Description                                                                                   |
| ----------- | --------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| `channel`   | `string`              | —           | **(required)** Name of the BroadcastChannel to use.                                           |
| `onMessage` | `(data: any) => void` | `undefined` | Custom handler for incoming messages. If omitted on an input, the value is set automatically. |

For `<input>` and `<textarea>` elements, the directive automatically sends the current value on every `input` event and receives values from other tabs. For other elements, provide `onMessage` to handle incoming data.

## Examples

### Synced Input Across Tabs

```vue
<template>
  <input
    v-sync-broadcast="{ channel: 'form-name' }"
    placeholder="Type here..."
  />
  <p class="hint">Open this page in another tab — both inputs stay in sync.</p>
</template>

<script setup>
import { vSyncBroadcast } from "vue-directives";
</script>
```

### Custom Message Handler

```vue
<template>
  <div
    v-sync-broadcast="{
      channel: 'notifications',
      onMessage: handleNotification,
    }"
  >
    <p>{{ latestNotification }}</p>
  </div>
</template>

<script setup>
import { vSyncBroadcast } from "vue-directives";
import { ref } from "vue";

const latestNotification = ref("Waiting for messages...");

function handleNotification(data: any) {
  latestNotification.value = String(data);
}
</script>
```
