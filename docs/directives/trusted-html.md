# v-trusted-html

Sets an element's `innerHTML` using the browser's [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) for Content Security Policy compliance. When Trusted Types are available a policy named `"v-trusted-html"` is created to produce a `TrustedHTML` value. In browsers without Trusted Types support the directive falls back to parsing the HTML with `DOMParser` and importing the resulting nodes.

## Usage

```vue
<template>
  <div v-trusted-html="htmlContent">Fallback content</div>
</template>

<script setup>
import { ref } from "vue";
import { vTrustedHtml } from "vue-directives";

const htmlContent = ref("<p>Hello from trusted HTML</p>");
</script>
```

## Options / Binding

| Binding Value | Type     | Description                                                                      |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| `value`       | `string` | The HTML string to inject. The directive only re-renders when the value changes. |

The element's content is replaced entirely on each update.

## Examples

### Basic Trusted Rendering

```vue
<template>
  <article v-trusted-html="article" />
</template>

<script setup>
import { ref } from "vue";
import { vTrustedHtml } from "vue-directives";

const article = ref("<h2>Title</h2><p>Paragraph content.</p>");
</script>
```

### Dynamic Content Update

```vue
<template>
  <div>
    <div v-trusted-html="preview" class="preview" />
    <textarea v-model="source" rows="5" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { vTrustedHtml } from "vue-directives";

const source = ref("<p>Edit me</p>");
const preview = computed(() => source.value);
</script>
```
