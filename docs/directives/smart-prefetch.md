# v-smart-prefetch

Intelligently prefetches link targets based on viewport visibility, hover intent, or both. Applies to anchor elements and injects a `<link rel="prefetch">` for the link's `href` so the browser loads the resource in the background.

## Usage

```vue
<template>
  <a v-smart-prefetch href="/dashboard">Dashboard</a>
</template>

<script setup>
import { vSmartPrefetch } from "vue-directives-pro";
</script>
```

## Options / Binding

| Property     | Type                             | Default   | Description                                                                                        |
| ------------ | -------------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `strategy`   | `'visible' \| 'hover' \| 'both'` | `'both'`  | When to trigger the prefetch.                                                                      |
| `rootMargin` | `string`                         | `'200px'` | IntersectionObserver root margin for the `visible` and `both` strategies.                          |
| `hoverDelay` | `number`                         | `65`      | Delay in milliseconds before prefetching on hover. Prevents prefetch on quick mouse pass-throughs. |

The binding value is optional — defaults are used when no value is provided. Links starting with `#` or `javascript:` are ignored.

## Examples

### Default (Visibility + Hover)

```vue
<template>
  <nav>
    <a v-smart-prefetch href="/about">About</a>
    <a v-smart-prefetch href="/pricing">Pricing</a>
    <a v-smart-prefetch href="/docs">Documentation</a>
  </nav>
</template>

<script setup>
import { vSmartPrefetch } from "vue-directives-pro";
</script>
```

### Hover-only with Custom Delay

```vue
<template>
  <ul class="sidebar-nav">
    <li>
      <a
        v-smart-prefetch="{ strategy: 'hover', hoverDelay: 150 }"
        href="/settings"
      >
        Settings
      </a>
    </li>
    <li>
      <a
        v-smart-prefetch="{ strategy: 'hover', hoverDelay: 150 }"
        href="/profile"
      >
        Profile
      </a>
    </li>
  </ul>
</template>

<script setup>
import { vSmartPrefetch } from "vue-directives-pro";
</script>
```
