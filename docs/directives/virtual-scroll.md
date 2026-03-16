# v-virtual-scroll

Efficiently render large lists by only rendering the items currently visible in the viewport. This directive virtualizes DOM rendering to maintain smooth performance even with thousands of items.

## Usage

```vue
<template>
  <div
    v-virtual-scroll="{ items: list, itemHeight: 40, renderItem: renderFn }"
  />
</template>

<script setup>
import { ref } from "vue";
import { vVirtualScroll } from "vue-directives";

const list = ref(Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`));

const renderFn = (item, index) => `<span>${item}</span>`;
</script>
```

## Options / Binding

| Property          | Type                                   | Default                  | Description                                                              |
| ----------------- | -------------------------------------- | ------------------------ | ------------------------------------------------------------------------ |
| `items`           | `any[]`                                | —                        | **Required.** The full array of items to render.                         |
| `itemHeight`      | `number`                               | —                        | **Required.** Fixed height (in px) of each item.                         |
| `renderItem`      | `(item: any, index: number) => string` | —                        | **Required.** Function returning an HTML string for each item.           |
| `buffer`          | `number`                               | `5`                      | Number of extra items to render above/below the visible area.            |
| `containerHeight` | `number`                               | Element's `clientHeight` | Explicit container height in pixels. Sets `height` style on the element. |

## Examples

### Simple List

```vue
<template>
  <div
    v-virtual-scroll="{
      items: users,
      itemHeight: 50,
      renderItem: (user) => `<div class='user-row'>${user.name}</div>`,
    }"
    style="height: 400px"
  />
</template>

<script setup>
import { ref } from "vue";
import { vVirtualScroll } from "vue-directives";

const users = ref(
  Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `User ${i + 1}` })),
);
</script>
```

### Custom Container Height with Buffer

```vue
<template>
  <div
    v-virtual-scroll="{
      items: logs,
      itemHeight: 24,
      renderItem: renderLog,
      buffer: 10,
      containerHeight: 600,
    }"
  />
</template>

<script setup>
import { ref } from "vue";
import { vVirtualScroll } from "vue-directives";

const logs = ref(
  Array.from({ length: 100000 }, (_, i) => ({
    ts: new Date(Date.now() - i * 1000).toISOString(),
    msg: `Log entry #${i}`,
  })),
);

const renderLog = (log, index) =>
  `<code style="font-size:12px">[${log.ts}] ${log.msg}</code>`;
</script>
```
