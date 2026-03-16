# v-validate

Validates input values against an array of custom rules, applying an error CSS class and reporting errors via callbacks. Each rule provides a `test` function and an error `message`.

## Usage

```vue
<template>
  <input
    v-validate="{
      rules: [{ test: (v) => v.length >= 3, message: 'Min 3 characters' }],
    }"
    placeholder="Enter value"
  />
</template>

<script setup>
import { vValidate } from "vue-directives";
</script>
```

## Options / Binding

The binding value is a **`ValidateBinding`** object:

| Property     | Type                            | Default              | Description                                        |
| ------------ | ------------------------------- | -------------------- | -------------------------------------------------- |
| `rules`      | `ValidateRule[]`                | _(required)_         | Array of validation rules                          |
| `errorClass` | `string`                        | `'v-validate-error'` | CSS class added to the input when validation fails |
| `onError`    | `(errors: string[]) => void`    | —                    | Callback invoked with the array of error messages  |
| `onValid`    | `() => void`                    | —                    | Callback invoked when all rules pass               |
| `trigger`    | `'input' \| 'blur' \| 'change'` | `'blur'`             | DOM event that triggers validation                 |

**`ValidateRule`** shape:

| Property  | Type                         | Description                             |
| --------- | ---------------------------- | --------------------------------------- |
| `test`    | `(value: string) => boolean` | Returns `true` if the value is valid    |
| `message` | `string`                     | Error message shown when the test fails |

When validation fails, the first error message is set via `el.setCustomValidity()` so native form validation can surface it. The error class and custom validity are cleared when all rules pass.

## Examples

### Basic Required + Min Length

```vue
<template>
  <form @submit.prevent>
    <input
      v-validate="{
        rules: [
          { test: (v) => v.length > 0, message: 'Field is required' },
          {
            test: (v) => v.length >= 5,
            message: 'Must be at least 5 characters',
          },
        ],
      }"
      placeholder="Username"
    />
  </form>
</template>

<script setup>
import { vValidate } from "vue-directives";
</script>

<style>
.v-validate-error {
  border-color: red;
  outline-color: red;
}
</style>
```

### Real-Time Validation with Callbacks

```vue
<template>
  <div>
    <input
      v-validate="{
        rules: emailRules,
        trigger: 'input',
        errorClass: 'invalid',
        onError: (errs) => (errors = errs),
        onValid: () => (errors = []),
      }"
      v-model="email"
      placeholder="Email address"
      style="width: 100%;"
    />
    <ul v-if="errors.length" style="color: red; font-size: 0.85rem;">
      <li v-for="err in errors" :key="err">{{ err }}</li>
    </ul>
    <p v-else-if="email" style="color: green; font-size: 0.85rem;">
      Looks good!
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vValidate } from "vue-directives";

const email = ref("");
const errors = ref<string[]>([]);

const emailRules = [
  { test: (v: string) => v.length > 0, message: "Email is required" },
  { test: (v: string) => v.includes("@"), message: "Must contain @" },
  {
    test: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: "Invalid email format",
  },
];
</script>

<style>
.invalid {
  border-color: red;
  background-color: #fff5f5;
}
</style>
```
