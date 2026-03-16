# v-drag-sort

Enables drag-and-drop sorting of list items using the native HTML Drag and Drop API. Attach the directive to a container and provide a sort callback to reorder your data.

## Usage

```vue
<template>
  <ul v-drag-sort="{ onSort: handleSort }">
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { vDragSort } from "vue-directives-pro";

const items = ref([
  { id: 1, name: "Item A" },
  { id: 2, name: "Item B" },
  { id: 3, name: "Item C" },
]);

function handleSort(fromIndex, toIndex) {
  const moved = items.value.splice(fromIndex, 1)[0];
  items.value.splice(toIndex, 0, moved);
}
</script>
```

## Options / Binding

The binding value is a **`DragSortBinding`** object:

| Property       | Type                                           | Default        | Description                                              |
| -------------- | ---------------------------------------------- | -------------- | -------------------------------------------------------- |
| `onSort`       | `(fromIndex: number, toIndex: number) => void` | _(required)_   | Callback fired when an item is dropped in a new position |
| `handle`       | `string`                                       | —              | CSS selector for drag handle within each item            |
| `itemSelector` | `string`                                       | `':scope > *'` | CSS selector for sortable children                       |

The directive automatically sets `draggable="true"` on each child matching `itemSelector`. During a drag, the dragged item receives `opacity: 0.5` and the target item receives the CSS class `v-drag-sort-over`.

## Examples

### Simple Sortable List

```vue
<template>
  <ul v-drag-sort="{ onSort: handleSort }" class="list">
    <li v-for="item in items" :key="item.id" class="list-item">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { vDragSort } from "vue-directives-pro";

const items = ref([
  { id: 1, name: "Learn Vue" },
  { id: 2, name: "Build app" },
  { id: 3, name: "Ship it" },
]);

function handleSort(from, to) {
  const moved = items.value.splice(from, 1)[0];
  items.value.splice(to, 0, moved);
}
</script>
```

### Custom Item Selector with Styling

```vue
<template>
  <div
    v-drag-sort="{ onSort: handleSort, itemSelector: '.card' }"
    class="card-grid"
  >
    <div v-for="card in cards" :key="card.id" class="card">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vDragSort } from "vue-directives-pro";

const cards = ref([
  { id: 1, title: "Design", description: "Create mockups" },
  { id: 2, title: "Develop", description: "Write code" },
  { id: 3, title: "Test", description: "Run QA" },
  { id: 4, title: "Deploy", description: "Ship to production" },
]);

function handleSort(from, to) {
  const moved = cards.value.splice(from, 1)[0];
  cards.value.splice(to, 0, moved);
}
</script>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: grab;
}
.v-drag-sort-over {
  border-color: #3b82f6;
  background: #eff6ff;
}
</style>
```
