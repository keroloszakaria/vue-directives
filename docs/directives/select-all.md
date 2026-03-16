# v-select-all

Automatically selects all text content inside an `<input>` or `<textarea>` when the element receives focus. Useful for fields where users typically replace the entire value.

## Usage

```vue
<template>
  <input v-select-all value="Select me on focus" />
</template>

<script setup>
import { vSelectAll } from "vue-directives-pro";
</script>
```

## Options / Binding

This directive takes **no binding value**. Simply add `v-select-all` to any `<input>` or `<textarea>`.

| Supported Elements | Behavior                  |
| ------------------ | ------------------------- |
| `<input>`          | Selects all text on focus |
| `<textarea>`       | Selects all text on focus |

## Examples

### Pre-filled Input

```vue
<template>
  <div>
    <label>API Key (click to select all)</label>
    <input v-select-all :value="apiKey" readonly style="width: 100%;" />
  </div>
</template>

<script setup>
import { vSelectAll } from "vue-directives-pro";

const apiKey = "sk-abc123def456ghi789jkl012mno345";
</script>
```

### Editable URL Field

```vue
<template>
  <div>
    <label>Website URL</label>
    <input
      v-select-all
      v-model="url"
      placeholder="https://example.com"
      style="width: 100%;"
    />
    <p>Current value: {{ url }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vSelectAll } from "vue-directives-pro";

const url = ref("https://example.com");
</script>
```
