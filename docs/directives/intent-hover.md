# v-intent-hover

Detects intentional hover by analyzing mouse movement speed, ignoring accidental fly-overs. Only triggers the callback when the cursor slows down over the element, making it ideal for mega-menus, preview panels, or any hover UI where false activations are disruptive.

## Usage

```vue
<template>
  <div v-intent-hover="{ onEnter: showPreview, onLeave: hidePreview }">
    Hover with intent
  </div>
</template>

<script setup>
import { vIntentHover } from "vue-directives-pro";

function showPreview() {
  console.log("User intends to hover — show content");
}
function hidePreview() {
  console.log("User left — hide content");
}
</script>
```

## Options / Binding

The binding value is an `IntentHoverBinding` object:

| Property      | Type         | Default | Description                                                                                                                       |
| ------------- | ------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `onEnter`     | `() => void` | —       | **Required.** Callback fired when intentional hover is detected.                                                                  |
| `onLeave`     | `() => void` | —       | Callback fired when the mouse leaves the element after an intentional hover.                                                      |
| `sensitivity` | `number`     | `7`     | Mouse speed threshold. Lower values require slower movement to trigger. The value represents pixels per 100ms.                    |
| `interval`    | `number`     | `100`   | Polling interval in milliseconds for checking mouse intent.                                                                       |
| `timeout`     | `number`     | `0`     | Maximum time in milliseconds the directive stays active. After this period the hover listeners are removed. `0` means no timeout. |

### How It Works

The directive tracks recent mouse positions on `mousemove`. On each `interval` tick it calculates the average speed of the cursor. If the speed is below the `sensitivity` threshold, the hover is considered intentional and `onEnter` fires. If the mouse is moving too fast, it re-checks on the next interval.

## Examples

### Mega Menu

```vue
<template>
  <nav class="navbar">
    <div
      v-for="category in categories"
      :key="category.name"
      v-intent-hover="{
        onEnter: () => (activeMenu = category.name),
        onLeave: () => (activeMenu = ''),
        sensitivity: 6,
      }"
      class="nav-item"
    >
      {{ category.name }}
      <div v-if="activeMenu === category.name" class="mega-menu">
        <a v-for="link in category.links" :key="link" :href="'#' + link">
          {{ link }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { vIntentHover } from "vue-directives-pro";

const activeMenu = ref("");
const categories = [
  { name: "Products", links: ["Laptops", "Phones", "Tablets"] },
  { name: "Services", links: ["Cloud", "Support", "Training"] },
];
</script>
```

### Card Preview on Hover

```vue
<template>
  <div
    v-intent-hover="{
      onEnter: () => (showPreview = true),
      onLeave: () => (showPreview = false),
      sensitivity: 5,
      interval: 80,
    }"
    class="user-card"
  >
    <img :src="user.avatar" :alt="user.name" />
    <span>{{ user.name }}</span>

    <div v-if="showPreview" class="preview-popup">
      <p>{{ user.bio }}</p>
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vIntentHover } from "vue-directives-pro";

const showPreview = ref(false);
const user = {
  name: "Jane Doe",
  avatar: "/avatars/jane.jpg",
  bio: "Full-stack developer",
  email: "jane@example.com",
};
</script>
```
