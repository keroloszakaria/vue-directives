# v-count-up

Animate a number counting up from 0 (or a previous value) to a target value with an ease-out cubic curve. Supports decimals, thousand separators, and prefix/suffix formatting.

## Usage

```vue
<template>
  <span v-count-up="1000" />
</template>

<script setup>
import { vCountUp } from "vue-directives-pro";
</script>
```

## Options / Binding

The binding value can be a **number** (shorthand) or an **object**:

| Property    | Type     | Default | Description                                                   |
| ----------- | -------- | ------- | ------------------------------------------------------------- |
| `value`     | `number` | —       | **Required (object form).** The target number to count up to. |
| `duration`  | `number` | `1500`  | Animation duration in milliseconds.                           |
| `decimals`  | `number` | `0`     | Number of decimal places to display.                          |
| `prefix`    | `string` | `''`    | Text prepended to the number (e.g. `'$'`).                    |
| `suffix`    | `string` | `''`    | Text appended to the number (e.g. `'%'`).                     |
| `separator` | `string` | `''`    | Thousand separator character (e.g. `','`).                    |

**Shorthand:** `v-count-up="500"` is equivalent to `{ value: 500 }`.

When the binding value updates, the animation runs from the old value to the new value.

## Examples

### Simple Counter

```vue
<template>
  <div class="stats">
    <h2><span v-count-up="4200" /> Users</h2>
  </div>
</template>

<script setup>
import { vCountUp } from "vue-directives-pro";
</script>
```

### Formatted Currency with Reactive Value

```vue
<template>
  <div>
    <p class="price">
      <span
        v-count-up="{
          value: revenue,
          duration: 2000,
          decimals: 2,
          prefix: '$',
          separator: ',',
        }"
      />
    </p>
    <button @click="revenue += 1500.5">Add Revenue</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vCountUp } from "vue-directives-pro";

const revenue = ref(12450.75);
</script>
```

### Percentage with Suffix

```vue
<template>
  <span
    v-count-up="{
      value: completion,
      duration: 1000,
      decimals: 1,
      suffix: '%',
    }"
  />
</template>

<script setup>
import { ref } from "vue";
import { vCountUp } from "vue-directives-pro";

const completion = ref(87.5);
</script>
```
