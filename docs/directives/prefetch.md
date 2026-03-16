# v-prefetch

Prefetches resources when the element enters the viewport. Injects `<link rel="prefetch">` tags into the document head, allowing the browser to fetch resources in the background before they are needed.

## Usage

```vue
<template>
  <div v-prefetch="'/api/data'">Scroll here to prefetch the API endpoint.</div>
</template>

<script setup>
import { vPrefetch } from "vue-directives-pro";
</script>
```

## Options / Binding

| Binding Value | Type                 | Description                                                                                                                                             |
| ------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string \| string[]` | A single URL or an array of URLs to prefetch. The resource type (`script`, `style`, `image`, `font`, `fetch`) is auto-detected from the file extension. |

The directive uses an `IntersectionObserver` with a `rootMargin` of `200px`, so resources are prefetched slightly before the element scrolls into view. The observer disconnects after the first intersection.

## Examples

### Single URL Prefetch

```vue
<template>
  <section v-prefetch="'/js/heavy-module.js'">
    <p>
      This section prefetches a JavaScript module when it nears the viewport.
    </p>
  </section>
</template>

<script setup>
import { vPrefetch } from "vue-directives-pro";
</script>
```

### Multiple URLs

```vue
<template>
  <section v-prefetch="['/api/users', '/api/posts', '/css/dashboard.css']">
    <h2>Dashboard</h2>
    <p>
      All required resources are prefetched as you scroll toward this section.
    </p>
  </section>
</template>

<script setup>
import { vPrefetch } from "vue-directives-pro";
</script>
```
