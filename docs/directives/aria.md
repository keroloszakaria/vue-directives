# v-aria

Auto-apply ARIA attributes to any element declaratively. Pass an object of ARIA properties and the directive sets the corresponding `role` and `aria-*` attributes, keeping them reactive on updates.

## Usage

```vue
<template>
  <div v-aria="{ role: 'button', label: 'Close dialog' }">X</div>
</template>

<script setup>
import { vAria } from "vue-directives";
</script>
```

## Options / Binding

| Property      | Type                               | Description                                     |
| ------------- | ---------------------------------- | ----------------------------------------------- |
| `role`        | `string`                           | Sets the `role` attribute on the element.       |
| `label`       | `string`                           | Sets `aria-label`.                              |
| `describedby` | `string`                           | Sets `aria-describedby`.                        |
| `expanded`    | `boolean`                          | Sets `aria-expanded`.                           |
| `hidden`      | `boolean`                          | Sets `aria-hidden`.                             |
| `live`        | `'polite' \| 'assertive' \| 'off'` | Sets `aria-live` for live-region announcements. |
| `controls`    | `string`                           | Sets `aria-controls`.                           |
| `current`     | `string \| boolean`                | Sets `aria-current`.                            |
| `[key]`       | `string \| boolean`                | Any additional key is mapped to `aria-{key}`.   |

Properties set to `undefined` are skipped. The `role` key maps directly to the `role` attribute; every other key is prefixed with `aria-`.

## Examples

### Accessible Toggle Button

```vue
<template>
  <button
    v-aria="{ role: 'switch', checked: isOn, label: 'Dark mode' }"
    @click="isOn = !isOn"
  >
    {{ isOn ? "ON" : "OFF" }}
  </button>
</template>

<script setup>
import { ref } from "vue";
import { vAria } from "vue-directives";

const isOn = ref(false);
</script>
```

### Expandable Section

```vue
<template>
  <div>
    <button
      v-aria="{ expanded: open, controls: 'details-panel' }"
      @click="open = !open"
    >
      Show Details
    </button>
    <div v-if="open" id="details-panel">
      <p>Extra information revealed on expand.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAria } from "vue-directives";

const open = ref(false);
</script>
```

### Live Region Announcements

```vue
<template>
  <div v-aria="{ live: 'polite', role: 'status' }">
    {{ statusMessage }}
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAria } from "vue-directives";

const statusMessage = ref("All changes saved.");
</script>
```
