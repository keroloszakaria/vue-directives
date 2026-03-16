# v-csp-nonce

Injects a Content Security Policy nonce into all `<script>` and `<style>` elements found inside the directive's host element. This is useful when you dynamically insert inline scripts or styles and need them to comply with a strict CSP that requires a `nonce` attribute.

## Usage

```vue
<template>
  <div v-csp-nonce="nonce">
    <style>
      body {
        margin: 0;
      }
    </style>
  </div>
</template>

<script setup>
import { vCspNonce } from "vue-directives-pro";

const nonce = "abc123serverNonce";
</script>
```

## Options / Binding

| Binding Value | Type     | Description                                                                                   |
| ------------- | -------- | --------------------------------------------------------------------------------------------- |
| `value`       | `string` | The CSP nonce string. Applied as a `nonce` attribute to every `<script>` and `<style>` child. |

The directive re-applies the nonce on updates only when the value changes.

## Examples

### Inline Style with Nonce

```vue
<template>
  <div v-csp-nonce="nonce">
    <style>
      .custom {
        color: red;
      }
    </style>
    <p class="custom">Styled with a nonce-protected inline style.</p>
  </div>
</template>

<script setup>
import { vCspNonce } from "vue-directives-pro";

const nonce = window.__CSP_NONCE__ || "";
</script>
```

### Multiple Script and Style Tags

```vue
<template>
  <div v-csp-nonce="serverNonce">
    <script>
      console.log("analytics init");
    </script>
    <style>
      .widget {
        display: flex;
      }
    </style>
    <script>
      console.log("tracking loaded");
    </script>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vCspNonce } from "vue-directives-pro";

const serverNonce = ref("nonceFromSSR");
</script>
```
