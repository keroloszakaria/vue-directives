# v-lazy-load

Lazy-loads images (or background images) using `IntersectionObserver`. The actual source is only fetched when the element scrolls into (or near) the viewport. Supports optional loading placeholders and error fallbacks.

## Usage

```vue
<template>
  <img v-lazy-load="'https://example.com/photo.jpg'" alt="Lazy photo" />
</template>

<script setup>
import { vLazyLoad } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **string** (image URL) or a **`LazyLoadBinding`** object:

| Binding Type      | Description                                   |
| ----------------- | --------------------------------------------- |
| `string`          | Image URL to load when the element is in view |
| `LazyLoadBinding` | Full configuration object                     |

**`LazyLoadBinding`**

| Property     | Type     | Default               | Description                                                      |
| ------------ | -------- | --------------------- | ---------------------------------------------------------------- |
| `src`        | `string` | _(required)_          | Image URL to load                                                |
| `loading`    | `string` | —                     | Placeholder image shown while the real image loads               |
| `error`      | `string` | —                     | Fallback image shown if the real image fails to load             |
| `rootMargin` | `string` | `'0px 0px 200px 0px'` | How far outside the viewport to start loading (preload distance) |
| `threshold`  | `number` | `0`                   | Visibility ratio that triggers loading                           |

**Behaviour notes:**

- On `<img>` elements the directive sets the `src` attribute.
- On any other element the directive sets `background-image` via inline style.
- The observer automatically disconnects after the image has been loaded.
- When the binding value changes, the image source is updated immediately.

## Examples

### Simple Image Lazy Loading

```vue
<template>
  <div>
    <div v-for="n in 20" :key="n" style="margin-bottom: 1rem;">
      <img
        v-lazy-load="`https://picsum.photos/seed/${n}/600/400`"
        :alt="`Photo ${n}`"
        style="width: 100%; height: auto; border-radius: 8px;"
      />
    </div>
  </div>
</template>

<script setup>
import { vLazyLoad } from "vue-directives";
</script>
```

### Placeholder and Error Fallback

```vue
<template>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
    <img
      v-for="img in images"
      :key="img.id"
      v-lazy-load="{
        src: img.url,
        loading: '/placeholder.svg',
        error: '/broken-image.svg',
        rootMargin: '0px 0px 300px 0px',
      }"
      :alt="img.alt"
      style="width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 8px;"
    />
  </div>
</template>

<script setup>
import { vLazyLoad } from "vue-directives";

const images = [
  { id: 1, url: "https://picsum.photos/seed/a/400/300", alt: "Photo A" },
  { id: 2, url: "https://picsum.photos/seed/b/400/300", alt: "Photo B" },
  { id: 3, url: "https://picsum.photos/seed/c/400/300", alt: "Photo C" },
  {
    id: 4,
    url: "https://invalid-url/broken.jpg",
    alt: "Broken image — shows fallback",
  },
  { id: 5, url: "https://picsum.photos/seed/e/400/300", alt: "Photo E" },
  { id: 6, url: "https://picsum.photos/seed/f/400/300", alt: "Photo F" },
];
</script>
```
