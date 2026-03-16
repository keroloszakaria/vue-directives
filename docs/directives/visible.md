# v-visible

Toggle an element's visibility using CSS `visibility` without affecting layout. Unlike `v-show` (which uses `display: none`), `v-visible` keeps the element in the document flow — it still occupies space but is visually hidden.

## Usage

```vue
<template>
  <div v-visible="isVisible">I take up space even when hidden</div>
</template>

<script setup>
import { ref } from "vue";
import { vVisible } from "vue-directives-pro";

const isVisible = ref(true);
</script>
```

## Options / Binding

| Property  | Type      | Default | Description                                                                         |
| --------- | --------- | ------- | ----------------------------------------------------------------------------------- |
| _(value)_ | `boolean` | —       | **Required.** `true` sets `visibility: visible`, `false` sets `visibility: hidden`. |

## Examples

### Toggle Visibility

```vue
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <div class="layout">
      <div v-visible="show" class="box">I'm here (or invisible)</div>
      <div class="box">I never move</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vVisible } from "vue-directives-pro";

const show = ref(true);
</script>

<style scoped>
.layout {
  display: flex;
  gap: 1rem;
}
.box {
  padding: 1rem;
  background: #e2e8f0;
  border-radius: 8px;
  width: 200px;
  text-align: center;
}
</style>
```

### Placeholder Reservation

```vue
<template>
  <div>
    <p>Tooltip target:</p>
    <div
      class="target"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      Hover me
    </div>
    <div v-visible="hovered" class="tooltip">
      Extra info — layout stays stable because space is reserved.
    </div>
    <p>This paragraph never shifts position.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vVisible } from "vue-directives-pro";

const hovered = ref(false);
</script>
```
