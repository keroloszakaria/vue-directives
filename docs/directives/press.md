# v-press

A generic press handler that provides distinct callbacks for press, release, and long-press events using the Pointer Events API. Useful for building custom press-and-hold interactions, recording buttons, or multi-state press UI.

## Usage

```vue
<template>
  <button v-press="{ onPress: start, onRelease: stop, onLong: held }">
    🎤 Hold to Record
  </button>
</template>

<script setup>
import { vPress } from "vue-directives";

function start() {
  console.log("Press started");
}
function stop() {
  console.log("Released");
}
function held() {
  console.log("Long press triggered!");
}
</script>
```

## Options / Binding

The binding value is a `PressBinding` object:

| Property    | Type         | Default | Description                                                            |
| ----------- | ------------ | ------- | ---------------------------------------------------------------------- |
| `onPress`   | `() => void` | —       | Callback fired immediately when the pointer goes down.                 |
| `onRelease` | `() => void` | —       | Callback fired when the pointer is released.                           |
| `onLong`    | `() => void` | —       | Callback fired after the element is held for `longDelay` milliseconds. |
| `longDelay` | `number`     | `500`   | Duration in milliseconds before `onLong` is triggered.                 |

All callbacks are optional — include only the ones you need.

## Examples

### Record Button

```vue
<template>
  <button
    v-press="{ onPress: startRecording, onRelease: stopRecording }"
    :class="{ recording: isRecording }"
  >
    {{ isRecording ? "⏹ Recording..." : "🎤 Hold to Record" }}
  </button>
</template>

<script setup>
import { ref } from "vue";
import { vPress } from "vue-directives";

const isRecording = ref(false);

function startRecording() {
  isRecording.value = true;
}
function stopRecording() {
  isRecording.value = false;
}
</script>
```

### Long Press Confirmation

```vue
<template>
  <button
    v-press="{
      onPress: () => (holding = true),
      onRelease: () => (holding = false),
      onLong: confirmDelete,
      longDelay: 1000,
    }"
    class="btn-danger"
  >
    {{ holding ? "Keep holding..." : "Hold to Delete" }}
  </button>
</template>

<script setup>
import { ref } from "vue";
import { vPress } from "vue-directives";

const holding = ref(false);

function confirmDelete() {
  holding.value = false;
  alert("Deleted!");
}
</script>
```
