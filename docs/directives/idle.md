# v-idle

Detects user idle state after a period of inactivity. Listens to configurable DOM events (mouse, keyboard, touch, scroll) and fires a callback when no activity is detected within the timeout.

## Usage

```vue
<template>
  <div v-idle="{ handler: onIdle, timeout: 5000 }">Content area</div>
</template>

<script setup>
import { vIdle } from "vue-directives";

function onIdle() {
  console.log("User is idle!");
}
</script>
```

## Options / Binding

| Property  | Type         | Default                                                         | Description                                                       |
| --------- | ------------ | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| `handler` | `() => void` | —                                                               | **Required.** Callback invoked when the user becomes idle.        |
| `timeout` | `number`     | `5000`                                                          | Idle timeout in milliseconds.                                     |
| `events`  | `string[]`   | `['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']` | DOM events that reset the idle timer.                             |
| `once`    | `boolean`    | `false`                                                         | When `true`, the handler fires only once and does not re-trigger. |

Activity events are listened on `document` level with `{ passive: true }`. The timer resets on each qualifying event.

## Examples

### Auto-Logout After Inactivity

```vue
<template>
  <div v-idle="{ handler: autoLogout, timeout: 300000 }">
    <p>You will be logged out after 5 minutes of inactivity.</p>
  </div>
</template>

<script setup>
import { vIdle } from "vue-directives";

function autoLogout() {
  alert("Session expired due to inactivity.");
  window.location.href = "/login";
}
</script>
```

### Show Idle Prompt (Once)

```vue
<template>
  <div v-idle="{ handler: showPrompt, timeout: 10000, once: true }">
    <p>Interact with the page to stay active.</p>
  </div>
  <div v-if="idle" class="idle-overlay">
    <p>Still there? Click anywhere to continue.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vIdle } from "vue-directives";

const idle = ref(false);

function showPrompt() {
  idle.value = true;
}
</script>
```

### Custom Events

```vue
<template>
  <div
    v-idle="{ handler: onIdle, timeout: 3000, events: ['keydown', 'click'] }"
  >
    <p>Only keyboard and click activity counts — mouse movement is ignored.</p>
  </div>
</template>

<script setup>
import { vIdle } from "vue-directives";

function onIdle() {
  console.log("Idle based on keyboard/click activity only");
}
</script>
```
