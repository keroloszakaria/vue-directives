# v-trim

Automatically trims leading and trailing whitespace from an input's value when the element loses focus (`blur`). After trimming, a synthetic `input` event is dispatched so `v-model` stays in sync.

## Usage

```vue
<template>
  <input v-trim v-model="name" placeholder="Name" />
</template>

<script setup>
import { vTrim } from "vue-directives";
import { ref } from "vue";

const name = ref("");
</script>
```

## Options / Binding

This directive takes **no binding value**. Simply add `v-trim` to any `<input>` or `<textarea>`.

| Trigger | Behavior                                                      |
| ------- | ------------------------------------------------------------- |
| `blur`  | Trims whitespace and dispatches an `input` event that bubbles |

## Examples

### Trimmed Username Field

```vue
<template>
  <div>
    <label>Username</label>
    <input v-trim v-model="username" placeholder="Enter username" />
    <p>Value: "{{ username }}"</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vTrim } from "vue-directives";

const username = ref("");
</script>
```

### Form with Multiple Trimmed Inputs

```vue
<template>
  <form @submit.prevent="submit">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <input v-trim v-model="form.firstName" placeholder="First name" />
      <input v-trim v-model="form.lastName" placeholder="Last name" />
      <input v-trim v-model="form.email" placeholder="Email" />
      <button type="submit">Submit</button>
    </div>
    <pre>{{ form }}</pre>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import { vTrim } from "vue-directives";

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
});

function submit() {
  console.log("Submitted:", { ...form });
}
</script>
```
