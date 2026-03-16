# v-sync-query

Two-way sync an input element's value with a URL query parameter. On mount, the input is populated from the current URL. On input, the URL is updated via `history.replaceState` without a page reload.

## Usage

```vue
<template>
  <input v-sync-query="'search'" placeholder="Search..." />
</template>

<script setup>
import { vSyncQuery } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value    | Type     | Description                                                                           |
| ---------------- | -------- | ------------------------------------------------------------------------------------- |
| `value` (string) | `string` | The URL query parameter name to sync with (e.g. `'search'` syncs with `?search=...`). |

When the input is cleared, the query parameter is removed from the URL.

## Examples

### Sync a Search Field

```vue
<template>
  <input v-sync-query="'q'" placeholder="Search articles..." />
</template>

<script setup>
import { vSyncQuery } from "vue-directives-pro";
</script>
```

Typing "vue directives" updates the URL to `?q=vue+directives`. Refreshing the page restores the input value from the URL.

### Filter and Sort Parameters

```vue
<template>
  <div class="filters">
    <input v-sync-query="'search'" placeholder="Search..." />
    <input v-sync-query="'category'" placeholder="Category..." />
  </div>
</template>

<script setup>
import { vSyncQuery } from "vue-directives-pro";
</script>
```

Each input independently syncs its value to a separate query parameter, e.g. `?search=vue&category=directives`.
