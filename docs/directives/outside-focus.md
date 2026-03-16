# v-outside-focus

Detects when focus leaves the element and all of its descendants. Fires a callback on `focusout` when the new focus target (`relatedTarget`) is outside the element tree. Useful for closing menus, panels, or dialogs when the user tabs away.

## Usage

```vue
<template>
  <div v-outside-focus="onFocusLeave">
    <input placeholder="Tab out of here" />
    <button>Action</button>
  </div>
</template>

<script setup>
import { vOutsideFocus } from "vue-directives-pro";

function onFocusLeave() {
  console.log("Focus left the container!");
}
</script>
```

## Options / Binding

| Binding Value | Type         | Description                                                      |
| ------------- | ------------ | ---------------------------------------------------------------- |
| `value`       | `() => void` | Callback invoked when focus moves outside the element's subtree. |

The directive listens to the `focusout` event on the element. It checks `event.relatedTarget` — if the related target is `null` or not contained within the element, the callback fires.

## Examples

### Close Dropdown on Focus Loss

```vue
<template>
  <div class="dropdown-wrapper">
    <button @click="open = !open">Menu</button>
    <ul v-if="open" v-outside-focus="() => (open = false)" class="menu">
      <li><a href="#">Profile</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vOutsideFocus } from "vue-directives-pro";

const open = ref(false);
</script>
```

### Accessible Form Section

```vue
<template>
  <form>
    <fieldset v-outside-focus="onSectionBlur">
      <legend>Billing Address</legend>
      <input type="text" placeholder="Street" />
      <input type="text" placeholder="City" />
      <input type="text" placeholder="ZIP" />
    </fieldset>
    <p v-if="sectionLeft">You left the billing section.</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { vOutsideFocus } from "vue-directives-pro";

const sectionLeft = ref(false);

function onSectionBlur() {
  sectionLeft.value = true;
}
</script>
```
