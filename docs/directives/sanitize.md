# v-sanitize

A safe alternative to `v-html` that sanitizes HTML content before inserting it into the DOM. Dangerous tags (`<script>`, `<iframe>`, `<object>`, `<embed>`, `<form>`, `<style>`, `<link>`, `<meta>`, `<base>`, `<applet>`) are stripped, `on*` event attributes are removed, and `javascript:` / `data:` / `vbscript:` URLs are eliminated.

## Usage

```vue
<template>
  <div v-sanitize="userHtml" />
</template>

<script setup>
import { ref } from "vue";
import { vSanitize } from "vue-directives-pro";

const userHtml = ref("<p>Hello <b>world</b></p>");
</script>
```

## Options / Binding

The binding value can be a plain `string` or an options object:

| Property            | Type       | Description                                                                              |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------- |
| `html`              | `string`   | The raw HTML string to sanitize (required when using the object form).                   |
| `allowedTags`       | `string[]` | Whitelist of tag names to keep. Tags not in the list are replaced by their text content. |
| `allowedAttributes` | `string[]` | Whitelist of attribute names to keep. Attributes not in the list are removed.            |

When a plain string is passed it is sanitized with default rules (block dangerous tags, remove event handlers and dangerous URLs).

## Examples

### Simple Sanitization

```vue
<template>
  <div v-sanitize="content" />
</template>

<script setup>
import { ref } from 'vue'
import { vSanitize } from 'vue-directives-pro'

const content = ref('<b>Safe</b><script>alert("xss")</script>')
// Renders: <b>Safe</b>
</script>
```

### Allowed Tags Whitelist

```vue
<template>
  <div v-sanitize="{ html: richText, allowedTags: ['b', 'i', 'a', 'p'] }" />
</template>

<script setup>
import { ref } from "vue";
import { vSanitize } from "vue-directives-pro";

const richText = ref("<p>Hello <b>bold</b> and <div>block</div></p>");
// <div> is not in allowedTags so its content becomes plain text
</script>
```

### Allowed Attributes Whitelist

```vue
<template>
  <div
    v-sanitize="{
      html: htmlWithAttrs,
      allowedTags: ['a', 'p'],
      allowedAttributes: ['href'],
    }"
  />
</template>

<script setup>
import { ref } from "vue";
import { vSanitize } from "vue-directives-pro";

const htmlWithAttrs = ref(
  '<p><a href="/safe" class="link" onclick="steal()">Click</a></p>',
);
// Only href is kept; class and onclick are removed
</script>
```
