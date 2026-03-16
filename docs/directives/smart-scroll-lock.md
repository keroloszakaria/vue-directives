# v-smart-scroll-lock

Intelligent scroll locking that prevents background page scrolling (e.g. when a modal is open) while preserving and restoring the user's scroll position. Scrolling within the directive's element is still allowed.

## Usage

```vue
<template>
  <div v-smart-scroll-lock="isModalOpen">Modal content here</div>
</template>

<script setup>
import { ref } from "vue";
import { vSmartScrollLock } from "vue-directives-pro";

const isModalOpen = ref(false);
</script>
```

## Options / Binding

| Property  | Type      | Default | Description                                                                                                  |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| _(value)_ | `boolean` | —       | **Required.** When `true`, body scroll is locked. When `false`, scroll is restored to its previous position. |

## Examples

### Modal Dialog

```vue
<template>
  <button @click="showModal = true">Open Modal</button>

  <div v-if="showModal" class="modal-backdrop">
    <div v-smart-scroll-lock="showModal" class="modal-content">
      <h2>Locked Scroll Modal</h2>
      <p>The page behind this modal cannot scroll.</p>
      <div style="height: 600px; overflow: auto">
        <p v-for="n in 50" :key="n">Scrollable inner content {{ n }}</p>
      </div>
      <button @click="showModal = false">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSmartScrollLock } from "vue-directives-pro";

const showModal = ref(false);
</script>
```

### Sidebar Drawer

```vue
<template>
  <button @click="drawerOpen = !drawerOpen">Toggle Drawer</button>

  <aside
    v-smart-scroll-lock="drawerOpen"
    :class="['drawer', { open: drawerOpen }]"
  >
    <nav>
      <a v-for="n in 30" :key="n" href="#">Menu item {{ n }}</a>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { vSmartScrollLock } from "vue-directives-pro";

const drawerOpen = ref(false);
</script>
```
