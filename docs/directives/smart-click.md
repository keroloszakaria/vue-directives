# v-smart-click

Intelligently distinguishes between single clicks and double clicks on the same element. Instead of firing the single-click handler immediately, it waits a short delay to see if a second click follows — then dispatches the appropriate callback.

## Usage

```vue
<template>
  <div v-smart-click="{ onClick: handleSingle, onDoubleClick: handleDouble }">
    Click or double-click me
  </div>
</template>

<script setup>
import { vSmartClick } from 'vue-directives-pro'

function handleSingle(e: MouseEvent) {
  console.log('Single click', e)
}
function handleDouble(e: MouseEvent) {
  console.log('Double click', e)
}
</script>
```

## Options / Binding

The binding value is a `SmartClickBinding` object:

| Property        | Type                      | Default | Description                                                                                                             |
| --------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `onClick`       | `(e: MouseEvent) => void` | —       | Callback fired on a confirmed single click.                                                                             |
| `onDoubleClick` | `(e: MouseEvent) => void` | —       | Callback fired on a double click.                                                                                       |
| `delay`         | `number`                  | `250`   | Time in milliseconds to wait before confirming a single click. Lower values feel snappier but increase false positives. |

## Examples

### File Browser — Select vs. Open

```vue
<template>
  <div
    v-for="file in files"
    :key="file.name"
    v-smart-click="{
      onClick: () => selectFile(file),
      onDoubleClick: () => openFile(file),
    }"
    :class="{ selected: file.name === selectedFile }"
    class="file-item"
  >
    📄 {{ file.name }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vSmartClick } from 'vue-directives-pro'

const files = [
  { name: 'report.pdf' },
  { name: 'photo.png' },
  { name: 'notes.txt' },
]

const selectedFile = ref('')

function selectFile(file: { name: string }) {
  selectedFile.value = file.name
}
function openFile(file: { name: string }) {
  console.log('Opening', file.name)
}
</script>
```

### List Item — Preview vs. Edit

```vue
<template>
  <li
    v-smart-click="{
      onClick: () => preview(item),
      onDoubleClick: () => edit(item),
      delay: 300,
    }"
  >
    {{ item.title }}
  </li>
</template>

<script setup>
import { vSmartClick } from 'vue-directives-pro'

const item = { id: 1, title: 'Meeting Notes' }

function preview(item: { id: number; title: string }) {
  console.log('Previewing', item.title)
}
function edit(item: { id: number; title: string }) {
  console.log('Editing', item.title)
}
</script>
```
