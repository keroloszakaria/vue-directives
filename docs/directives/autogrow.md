# v-autogrow

Automatically resizes a `<textarea>` to fit its content as the user types. Optionally caps the height at a maximum value, switching to scrollable overflow when exceeded.

## Usage

```vue
<template>
  <textarea v-autogrow placeholder="Start typing…" />
</template>

<script setup>
import { vAutogrow } from "vue-directives";
</script>
```

## Options / Binding

The binding value is optional — either omit it or pass an object:

| Property    | Type     | Default | Description                                                       |
| ----------- | -------- | ------- | ----------------------------------------------------------------- |
| `maxHeight` | `number` | —       | Maximum height in pixels; overflow becomes scrollable beyond this |

The directive sets `overflow: hidden` and `resize: none` on the textarea. On each `input` event the element height is recalculated from `scrollHeight`. When the bound value updates externally the height is recalculated via the `updated` hook.

## Examples

### Unlimited Growth

```vue
<template>
  <div>
    <label>Notes</label>
    <textarea
      v-autogrow
      v-model="notes"
      placeholder="This textarea grows with content…"
      style="width: 100%;"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutogrow } from "vue-directives";

const notes = ref("");
</script>
```

### Capped Max Height

```vue
<template>
  <div>
    <label>Comment (max 200 px)</label>
    <textarea
      v-autogrow="{ maxHeight: 200 }"
      v-model="comment"
      placeholder="Grows up to 200 px, then scrolls"
      style="width: 100%;"
    />
    <p>Characters: {{ comment.length }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutogrow } from "vue-directives";

const comment = ref("");
</script>
```
