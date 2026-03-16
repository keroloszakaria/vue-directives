# v-sync-storage

Two-way sync an input element's value with `localStorage` or `sessionStorage`. Restores the saved value on mount and writes back on every input event. For `localStorage`, it also listens to the `storage` event so changes in other browser tabs are reflected in real time.

## Usage

```vue
<template>
  <input v-sync-storage="{ key: 'my-value' }" />
</template>

<script setup>
import { vSyncStorage } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **string** or an **object**:

| Binding Value    | Type                 | Description                            |
| ---------------- | -------------------- | -------------------------------------- |
| `value` (string) | `string`             | Shorthand — used as the storage key.   |
| `value` (object) | `SyncStorageBinding` | Full options for key and storage type. |

**`SyncStorageBinding` Object:**

| Property  | Type                   | Default   | Description                                   |
| --------- | ---------------------- | --------- | --------------------------------------------- |
| `key`     | `string`               | —         | **(required)** The storage key to read/write. |
| `storage` | `'local' \| 'session'` | `'local'` | Which storage backend to use.                 |

## Examples

### Basic Local Storage Sync

```vue
<template>
  <input v-sync-storage="'username'" placeholder="Enter username..." />
</template>

<script setup>
import { vSyncStorage } from "vue-directives-pro";
</script>
```

The value persists across page reloads and syncs across tabs automatically.

### Session Storage Sync

```vue
<template>
  <textarea
    v-sync-storage="{ key: 'draft-note', storage: 'session' }"
    placeholder="Write a note..."
  ></textarea>
</template>

<script setup>
import { vSyncStorage } from "vue-directives-pro";
</script>
```

### Cross-Tab Sync (Local Storage)

```vue
<template>
  <div>
    <label>Shared preference (synced across tabs):</label>
    <input v-sync-storage="{ key: 'shared-theme' }" placeholder="e.g. dark" />
    <p class="hint">
      Open this page in another tab and type — both inputs stay in sync.
    </p>
  </div>
</template>

<script setup>
import { vSyncStorage } from "vue-directives-pro";
</script>
```
