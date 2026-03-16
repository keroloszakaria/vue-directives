# v-timeago

Display a date as auto-updating relative time text (e.g. "5 minutes ago", "in 3 days"). Supports English and Arabic locales and both past and future dates.

## Usage

```vue
<template>
  <span v-timeago="createdAt" />
</template>

<script setup>
import { vTimeago } from "vue-directives";
import { ref } from "vue";

const createdAt = ref(new Date("2024-01-15"));
</script>
```

## Options / Binding

The binding value can be a **`Date`**, **`string`**, **`number`**, or an **object**:

| Binding Value    | Type             | Description                                     |
| ---------------- | ---------------- | ----------------------------------------------- |
| `value` (Date)   | `Date`           | A date object to display as relative time.      |
| `value` (string) | `string`         | A date string parseable by `new Date()`.        |
| `value` (number) | `number`         | A timestamp in milliseconds.                    |
| `value` (object) | `TimeagoBinding` | Full options for date, locale, and auto-update. |

**`TimeagoBinding` Object:**

| Property     | Type                       | Default | Description                                          |
| ------------ | -------------------------- | ------- | ---------------------------------------------------- |
| `date`       | `Date \| string \| number` | —       | **(required)** The date to display as relative time. |
| `locale`     | `'en' \| 'ar'`             | `'en'`  | Display language — English or Arabic.                |
| `autoUpdate` | `boolean`                  | `true`  | Automatically refresh the text on a timer.           |
| `interval`   | `number`                   | `30000` | Auto-update interval in milliseconds.                |

**Output examples:** `just now`, `5 seconds ago`, `3 minutes ago`, `2 hours ago`, `4 days ago`, `in 1 week`.

## Examples

### Simple Relative Time

```vue
<template>
  <p>Posted <span v-timeago="post.createdAt" /></p>
</template>

<script setup>
import { vTimeago } from "vue-directives";

const post = { createdAt: new Date(Date.now() - 3600000) }; // 1 hour ago
</script>
```

### Arabic Locale with Custom Interval

```vue
<template>
  <span v-timeago="{ date: post.createdAt, locale: 'ar', interval: 10000 }" />
</template>

<script setup>
import { vTimeago } from "vue-directives";

const post = { createdAt: new Date("2024-06-01T12:00:00") };
</script>
```

### Disabled Auto-Update

```vue
<template>
  <ul>
    <li v-for="event in events" :key="event.id">
      {{ event.name }} —
      <span v-timeago="{ date: event.timestamp, autoUpdate: false }" />
    </li>
  </ul>
</template>

<script setup>
import { vTimeago } from "vue-directives";

const events = [
  { id: 1, name: "Deploy", timestamp: Date.now() - 86400000 },
  { id: 2, name: "Rollback", timestamp: Date.now() - 7200000 },
];
</script>
```
