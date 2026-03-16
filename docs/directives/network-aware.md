# v-network-aware

Adapts element behavior based on the user's network conditions. Reacts to online/offline state changes and optionally detects slow connections via the Network Information API.

## Usage

```vue
<template>
  <div v-network-aware="{ hideOnOffline: true }">
    This content is hidden when offline.
  </div>
</template>

<script setup>
import { vNetworkAware } from "vue-directives-pro";
</script>
```

## Options / Binding

| Property        | Type         | Default               | Description                                                             |
| --------------- | ------------ | --------------------- | ----------------------------------------------------------------------- |
| `onOnline`      | `() => void` | —                     | Callback fired when the browser goes online.                            |
| `onOffline`     | `() => void` | —                     | Callback fired when the browser goes offline.                           |
| `onSlow`        | `() => void` | —                     | Callback fired when connection speed is below `slowThreshold`.          |
| `slowThreshold` | `number`     | `1.5`                 | Speed threshold in Mbps. Connections slower than this trigger `onSlow`. |
| `hideOnOffline` | `boolean`    | `false`               | When `true`, sets `display: none` on the element while offline.         |
| `offlineClass`  | `string`     | `'v-network-offline'` | CSS class added to the element when offline.                            |

The directive listens to the global `online` and `offline` events and runs an initial check on mount. Connection speed is read from `navigator.connection.downlink` (Network Information API).

## Examples

### Hide Content When Offline

```vue
<template>
  <div v-network-aware="{ hideOnOffline: true }" class="live-feed">
    <p>Live data stream — requires internet.</p>
  </div>
</template>

<script setup>
import { vNetworkAware } from "vue-directives-pro";
</script>
```

### React to Online / Offline / Slow States

```vue
<template>
  <img
    v-network-aware="{
      onOnline: loadHiRes,
      onOffline: showPlaceholder,
      onSlow: loadLowRes,
      slowThreshold: 2,
    }"
    :src="imageSrc"
    alt="Adaptive image"
  />
</template>

<script setup>
import { ref } from "vue";
import { vNetworkAware } from "vue-directives-pro";

const imageSrc = ref("/images/photo-hd.jpg");

function loadHiRes() {
  imageSrc.value = "/images/photo-hd.jpg";
}

function loadLowRes() {
  imageSrc.value = "/images/photo-low.jpg";
}

function showPlaceholder() {
  imageSrc.value = "/images/offline-placeholder.svg";
}
</script>
```

### Offline Class Styling

```vue
<template>
  <div v-network-aware="{ offlineClass: 'grayscale' }">
    <p>This section turns grayscale when offline.</p>
  </div>
</template>

<script setup>
import { vNetworkAware } from "vue-directives-pro";
</script>

<style>
.grayscale {
  filter: grayscale(100%);
  opacity: 0.6;
}
</style>
```
