# v-enter-submit

Submit a form or trigger a callback when the user presses the **Enter** key. Automatically skips `<textarea>` elements so multi-line typing is not interrupted.

## Usage

```vue
<template>
  <form v-enter-submit @submit.prevent="onSubmit">
    <input placeholder="Press Enter to submit" />
  </form>
</template>

<script setup>
import { vEnterSubmit } from "vue-directives-pro";

function onSubmit() {
  console.log("Form submitted!");
}
</script>
```

## Options / Binding

The binding value is optional. You can pass a **callback function** or omit it entirely to rely on native form submission.

| Binding Value     | Type         | Default | Description                                                         |
| ----------------- | ------------ | ------- | ------------------------------------------------------------------- |
| _(none)_          | `undefined`  | —       | Finds the closest `<form>` and calls `requestSubmit()` on Enter     |
| callback function | `() => void` | —       | Invokes the function directly on Enter instead of submitting a form |

**Behaviour notes:**

- `Enter` inside a `<textarea>` is always ignored (allows normal line breaks).
- `e.preventDefault()` is called automatically to avoid duplicate submissions.

## Examples

### Form Submit via Native `requestSubmit`

```vue
<template>
  <form v-enter-submit @submit.prevent="save">
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <button type="submit">Save</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { vEnterSubmit } from "vue-directives-pro";

const name = ref("");
const email = ref("");

function save() {
  console.log("Saved:", name.value, email.value);
}
</script>
```

### Direct Callback on Input

```vue
<template>
  <div>
    <input
      v-enter-submit="search"
      v-model="query"
      placeholder="Search and press Enter"
    />
    <p v-if="result">Result: {{ result }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vEnterSubmit } from "vue-directives-pro";

const query = ref("");
const result = ref("");

function search() {
  result.value = `You searched for "${query.value}"`;
}
</script>
```
