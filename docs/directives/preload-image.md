# v-preload-image

Preloads images before the element enters the viewport by creating `Image` objects in the background. Supports explicit URLs via the binding value and automatic collection of `data-src` attributes from the element and its children.

## Usage

```vue
<template>
  <img v-preload-image src="placeholder.jpg" data-src="real-image.jpg" />
</template>

<script setup>
import { vPreloadImage } from "vue-directives";
</script>
```

## Options / Binding

| Binding Value | Type                              | Description                                                                                                                                                     |
| ------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`       | `string \| string[] \| undefined` | Optional. A single image URL or array of URLs to preload. In addition, the directive also collects any `data-src` attributes from the element and its children. |

The directive uses an `IntersectionObserver` with a `rootMargin` of `300px` to begin preloading well before the element enters the viewport. The observer disconnects after the first intersection.

## Examples

### Preload via Binding Value

```vue
<template>
  <div v-preload-image="'https://example.com/hero-bg.jpg'" class="hero">
    <h1>Welcome</h1>
  </div>
</template>

<script setup>
import { vPreloadImage } from "vue-directives";
</script>
```

### Preload Multiple Images with data-src

```vue
<template>
  <div v-preload-image="['/images/banner.webp']" class="gallery">
    <img data-src="/images/photo1.jpg" src="/images/placeholder.svg" />
    <img data-src="/images/photo2.jpg" src="/images/placeholder.svg" />
    <img data-src="/images/photo3.jpg" src="/images/placeholder.svg" />
  </div>
</template>

<script setup>
import { vPreloadImage } from "vue-directives";
</script>
```
