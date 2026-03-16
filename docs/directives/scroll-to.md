# v-scroll-to

Smooth-scrolls the page to a target element when the directive's host element is clicked. Supports a simple CSS selector string or an options object for fine-grained control over scroll behaviour and offset.

## Usage

```vue
<template>
  <button v-scroll-to="'#features'">Jump to Features</button>

  <!-- … page content … -->
  <section id="features">Features</section>
</template>

<script setup>
import { vScrollTo } from "vue-directives";
</script>
```

## Options / Binding

The binding value can be a **string** (CSS selector) or a **`ScrollToBinding`** object:

| Binding Type      | Description                                    |
| ----------------- | ---------------------------------------------- |
| `string`          | CSS selector of the target element             |
| `ScrollToBinding` | Object with target selector and scroll options |

**`ScrollToBinding`**

| Property   | Type                    | Default      | Description                                                                                                       |
| ---------- | ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `target`   | `string`                | _(required)_ | CSS selector of the element to scroll to                                                                          |
| `behavior` | `ScrollBehavior`        | `'smooth'`   | `'smooth'`, `'instant'`, or `'auto'`                                                                              |
| `block`    | `ScrollLogicalPosition` | —            | Vertical alignment: `'start'`, `'center'`, `'end'`, `'nearest'`                                                   |
| `inline`   | `ScrollLogicalPosition` | —            | Horizontal alignment                                                                                              |
| `offset`   | `number`                | `0`          | Pixel offset added to the scroll position (use negative values to stop above the target, e.g. for a fixed header) |

## Examples

### Simple Anchor Navigation

```vue
<template>
  <nav>
    <button v-scroll-to="'#about'">About</button>
    <button v-scroll-to="'#services'">Services</button>
    <button v-scroll-to="'#contact'">Contact</button>
  </nav>

  <section id="about" style="margin-top: 100vh;">About Us</section>
  <section id="services" style="margin-top: 50vh;">Our Services</section>
  <section id="contact" style="margin-top: 50vh;">Contact</section>
</template>

<script setup>
import { vScrollTo } from "vue-directives";
</script>
```

### Fixed Header Offset

```vue
<template>
  <header
    style="position: fixed; top: 0; height: 64px; width: 100%; background: #fff; z-index: 10;"
  >
    <button
      v-scroll-to="{ target: '#pricing', behavior: 'smooth', offset: -80 }"
    >
      Go to Pricing
    </button>
  </header>

  <main style="padding-top: 64px;">
    <section id="pricing" style="margin-top: 120vh;">
      <h2>Pricing</h2>
      <p>Our plans start at $9/month.</p>
    </section>
  </main>
</template>

<script setup>
import { vScrollTo } from "vue-directives";
</script>
```
