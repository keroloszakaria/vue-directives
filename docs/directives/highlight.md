# v-highlight

Highlight search keywords inside text content by wrapping matches in a configurable HTML tag (default `<mark>`). Supports custom class names, inline styles, and case sensitivity.

## Usage

```vue
<template>
  <p v-highlight="{ query: searchTerm }">
    Some long text content to search through
  </p>
</template>

<script setup>
import { vHighlight } from "vue-directives";
import { ref } from "vue";

const searchTerm = ref("text");
</script>
```

## Options / Binding

The binding value can be a **string** or an **object**:

| Binding Value    | Type               | Description                                     |
| ---------------- | ------------------ | ----------------------------------------------- |
| `value` (string) | `string`           | Shorthand — the search query string.            |
| `value` (object) | `HighlightBinding` | Full options for query, tag, class, style, etc. |

**`HighlightBinding` Object:**

| Property        | Type      | Default  | Description                                          |
| --------------- | --------- | -------- | ---------------------------------------------------- |
| `query`         | `string`  | —        | **(required)** The text to search for and highlight. |
| `tag`           | `string`  | `'mark'` | HTML tag used to wrap matches.                       |
| `className`     | `string`  | `''`     | CSS class applied to the highlight tag.              |
| `style`         | `string`  | `''`     | Inline CSS style applied to the highlight tag.       |
| `caseSensitive` | `boolean` | `false`  | Enable case-sensitive matching.                      |

## Examples

### Simple String Query

```vue
<template>
  <p v-highlight="'hello'">Hello World! Say hello to everyone.</p>
</template>

<script setup>
import { vHighlight } from "vue-directives";
</script>
```

### Custom Class and Case-Sensitive

```vue
<template>
  <input v-model="search" placeholder="Search..." />
  <p
    v-highlight="{ query: search, className: 'bg-yellow', caseSensitive: true }"
  >
    Vue directives make building interactive UIs easier. Highlight important
    keywords in any paragraph.
  </p>
</template>

<script setup>
import { vHighlight } from "vue-directives";
import { ref } from "vue";

const search = ref("");
</script>

<style>
.bg-yellow {
  background-color: yellow;
  padding: 0 2px;
  border-radius: 2px;
}
</style>
```

### Custom Tag and Inline Style

```vue
<template>
  <article
    v-highlight="{
      query: keyword,
      tag: 'span',
      style: 'background: #ffeeba; font-weight: bold;',
    }"
  >
    This article contains several interesting keywords that should stand out
    when the user searches for them.
  </article>
</template>

<script setup>
import { vHighlight } from "vue-directives";
import { ref } from "vue";

const keyword = ref("keywords");
</script>
```
