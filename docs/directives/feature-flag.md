# v-feature-flag

Shows or hides elements based on feature flag state. Flags are managed globally via `setFeatureFlags` / `setFeatureFlag` and the directive reactively checks them on mount and update.

## Usage

```vue
<template>
  <div v-feature-flag="'new-dashboard'">Welcome to the new dashboard!</div>
</template>

<script setup>
import { vFeatureFlag } from "vue-directives-pro";
</script>
```

### Setup (once, at app init)

```ts
import { setFeatureFlags } from "vue-directives-pro";

setFeatureFlags({
  "new-dashboard": true,
  "beta-search": false,
  "dark-mode": true,
});
```

## Options / Binding

| Binding Value | Type       | Description                                                             |
| ------------- | ---------- | ----------------------------------------------------------------------- |
| `string`      | `string`   | A single feature flag name. Element is shown if the flag is `true`.     |
| `string[]`    | `string[]` | Multiple flag names. Element is shown only if **all** flags are `true`. |

When the condition is not met, the element's `display` is set to `none`. When it passes, `display` is cleared to its default.

**Helper functions:**

| Function          | Signature                                  | Description                        |
| ----------------- | ------------------------------------------ | ---------------------------------- |
| `setFeatureFlags` | `(flags: Record<string, boolean>) => void` | Replace all feature flags at once. |
| `setFeatureFlag`  | `(key: string, value: boolean) => void`    | Set a single feature flag.         |
| `getFeatureFlags` | `() => Record<string, boolean>`            | Get a copy of all current flags.   |

## Examples

### Single Feature Flag

```vue
<template>
  <section v-feature-flag="'beta-search'">
    <h2>Beta Search</h2>
    <input type="search" placeholder="Try the new search..." />
  </section>
</template>

<script setup>
import { vFeatureFlag } from "vue-directives-pro";
</script>
```

### Multiple Flags (AND Logic)

```vue
<template>
  <div v-feature-flag="['new-dashboard', 'dark-mode']">
    This panel only shows when BOTH new-dashboard and dark-mode are enabled.
  </div>
</template>

<script setup>
import { vFeatureFlag } from "vue-directives-pro";
</script>
```

### Dynamic Flag Toggle

```vue
<template>
  <div>
    <button @click="toggleExperiment">Toggle Experiment</button>
    <div v-feature-flag="'experiment-x'" :key="flagVersion">
      <p>Experimental feature is active!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  vFeatureFlag,
  setFeatureFlag,
  getFeatureFlags,
} from "vue-directives-pro";

const flagVersion = ref(0);

function toggleExperiment() {
  const current = getFeatureFlags()["experiment-x"] ?? false;
  setFeatureFlag("experiment-x", !current);
  flagVersion.value++; // force re-render to trigger updated hook
}
</script>
```
