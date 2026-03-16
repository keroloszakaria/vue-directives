# v-max-length

Adds a live character counter below an input element, visually indicating how many characters have been typed relative to a maximum limit. Supports customizable warning and error thresholds with optional CSS classes.

## Usage

```vue
<template>
  <input v-max-length="{ max: 100 }" placeholder="Type here…" />
</template>

<script setup>
import { vMaxLength } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **number** (shorthand for max) or a **`MaxLengthBinding`** object:

| Property       | Type     | Default      | Description                                               |
| -------------- | -------- | ------------ | --------------------------------------------------------- |
| `max`          | `number` | _(required)_ | Maximum character count                                   |
| `warningAt`    | `number` | `max * 0.8`  | Character count at which the warning style kicks in       |
| `warningClass` | `string` | `''`         | CSS class added to the counter at the warning threshold   |
| `errorClass`   | `string` | `''`         | CSS class added to the counter when the limit is exceeded |

The counter element is a `<span>` inserted after the input. It displays `{current} / {max}` and changes color automatically:

- **Default**: `#999`
- **Warning** (≥ `warningAt`): `#d69e2e`
- **Error** (> `max`): `#e53e3e`

## Examples

### Simple Character Limit

```vue
<template>
  <div>
    <label>Title</label>
    <input v-max-length="60" v-model="title" placeholder="Enter a title" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vMaxLength } from "vue-directives";

const title = ref("");
</script>
```

### Custom Warning & Error Classes

```vue
<template>
  <div>
    <label>Bio</label>
    <input
      v-max-length="{
        max: 150,
        warningAt: 120,
        warningClass: 'counter-warning',
        errorClass: 'counter-error',
      }"
      v-model="bio"
      placeholder="Write a short bio"
      style="width: 100%;"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vMaxLength } from "vue-directives";

const bio = ref("");
</script>

<style>
.counter-warning {
  color: orange !important;
  font-weight: bold;
}
.counter-error {
  color: red !important;
  font-weight: bold;
}
</style>
```
