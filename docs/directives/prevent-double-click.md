# v-prevent-double-click

Disables a button for a specified duration after it is clicked, preventing accidental double submissions. Automatically sets `pointer-events: none`, `aria-disabled="true"`, and (for `<button>` elements) the native `disabled` property, then re-enables after the cooldown.

## Usage

```vue
<template>
  <button v-prevent-double-click @click="submitForm">Submit</button>
</template>

<script setup>
import { vPreventDoubleClick } from "vue-directives";

function submitForm() {
  console.log("Form submitted");
}
</script>
```

## Options / Binding

| Binding Value | Type                  | Default | Description                                                                                  |
| ------------- | --------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `value`       | `number \| undefined` | `1000`  | Cooldown duration in milliseconds. The element is disabled for this period after each click. |

When the cooldown is active the directive:

- Sets `pointer-events: none` on the element style.
- Adds `aria-disabled="true"` for accessibility.
- Sets `el.disabled = true` if the element is a `<button>`.

All three are automatically reversed when the cooldown expires.

## Examples

### Default Cooldown (1 second)

```vue
<template>
  <button v-prevent-double-click @click="save">Save Changes</button>
</template>

<script setup>
import { vPreventDoubleClick } from "vue-directives";

function save() {
  // API call happens once — button is disabled for 1s
}
</script>
```

### Custom Cooldown Duration

```vue
<template>
  <button v-prevent-double-click="3000" @click="placeOrder">Place Order</button>
</template>

<script setup>
import { vPreventDoubleClick } from "vue-directives";

function placeOrder() {
  // Button stays disabled for 3 seconds after click
  console.log("Order placed!");
}
</script>
```

### On a Non-Button Element

```vue
<template>
  <div v-prevent-double-click="2000" @click="processPayment" class="pay-button">
    💳 Pay Now
  </div>
</template>

<script setup>
import { vPreventDoubleClick } from "vue-directives";

function processPayment() {
  console.log("Payment processing...");
}
</script>
```
