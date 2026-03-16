# v-safe-link

Automatically secures external anchor links by adding `rel="noopener noreferrer"` and defaulting `target="_blank"`. Internal links (same origin) are left untouched. Apply it to any `<a>` element to harden outbound navigation without manual attribute management.

## Usage

```vue
<template>
  <a v-safe-link href="https://example.com">Visit Example</a>
</template>

<script setup>
import { vSafeLink } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type | Description                                                                                            |
| ------------- | ---- | ------------------------------------------------------------------------------------------------------ |
| —             | —    | No binding value required. The directive inspects the element's `href` to determine if it is external. |

**Behaviour:**

- If `href` starts with `http://` or `https://` and does **not** match `window.location.origin`, the link is treated as external.
- External links receive `rel="noopener noreferrer"`.
- If no `target` attribute is already set, `target="_blank"` is added.

## Examples

### External Link

```vue
<template>
  <a v-safe-link href="https://vuejs.org">Vue.js Docs</a>
  <!-- Rendered: <a href="https://vuejs.org" rel="noopener noreferrer" target="_blank">Vue.js Docs</a> -->
</template>

<script setup>
import { vSafeLink } from "vue-directives-pro";
</script>
```

### Internal Link Stays Untouched

```vue
<template>
  <a v-safe-link href="/about">About Us</a>
  <!-- No rel or target added because href is relative / same-origin -->
</template>

<script setup>
import { vSafeLink } from "vue-directives-pro";
</script>
```

### List of Mixed Links

```vue
<template>
  <ul>
    <li><a v-safe-link href="https://github.com">GitHub</a></li>
    <li><a v-safe-link href="/docs">Documentation</a></li>
    <li><a v-safe-link href="https://npmjs.com">npm</a></li>
  </ul>
</template>

<script setup>
import { vSafeLink } from "vue-directives-pro";
</script>
```
