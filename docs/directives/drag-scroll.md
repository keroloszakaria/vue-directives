# v-drag-scroll

Enables click-and-drag scrolling on an overflowing container. Users can grab the content area and drag to scroll horizontally and vertically, similar to touch scrolling on a trackpad.

## Usage

```vue
<template>
  <div v-drag-scroll class="scrollable-container">
    <!-- overflowing content -->
  </div>
</template>

<script setup>
import { vDragScroll } from "vue-directives";
</script>
```

## Options / Binding

| Binding Value | Type                   | Description                                 |
| ------------- | ---------------------- | ------------------------------------------- |
| _(none)_      | —                      | Drag-scroll enabled with default settings   |
| `true`        | `boolean \| undefined` | Enable drag-scroll (same as omitting value) |

The directive sets `cursor: grab` on the element and switches to `cursor: grabbing` while actively dragging. User selection is disabled during a drag to prevent text highlighting.

## Examples

### Horizontal Image Gallery

```vue
<template>
  <div
    v-drag-scroll
    style="display: flex; gap: 16px; overflow: hidden; width: 600px;"
  >
    <img
      v-for="n in 10"
      :key="n"
      :src="`https://picsum.photos/300/200?random=${n}`"
      style="flex-shrink: 0; border-radius: 8px;"
    />
  </div>
</template>

<script setup>
import { vDragScroll } from "vue-directives";
</script>
```

### Scrollable Data Table

```vue
<template>
  <div
    v-drag-scroll
    style="overflow: auto; max-width: 500px; max-height: 300px; border: 1px solid #ddd;"
  >
    <table style="width: 1200px;">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col">{{ col }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="col in columns" :key="col">{{ row[col] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { vDragScroll } from "vue-directives";

const columns = ["ID", "Name", "Email", "Phone", "City", "Country", "Status"];
const rows = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  ID: i + 1,
  Name: `User ${i + 1}`,
  Email: `user${i + 1}@example.com`,
  Phone: "555-0100",
  City: "Metro",
  Country: "US",
  Status: "Active",
}));
</script>
```
