# vue-directives

<p align="center">
  <strong>86+ Vue 3 & Nuxt 3/4 custom directives</strong><br/>
  Fully typed · Tree-shakable · Plugin or individual imports
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-directives"><img src="https://img.shields.io/npm/v/vue-directives.svg?color=42b883" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/vue-directives"><img src="https://img.shields.io/npm/dm/vue-directives.svg?color=42b883" alt="npm downloads"></a>
  <a href="https://github.com/keroloszakaria/vue-directives/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/vue-directives.svg" alt="license"></a>
  <img src="https://img.shields.io/badge/vue-3.2%2B-42b883" alt="vue 3.2+">
  <img src="https://img.shields.io/badge/nuxt-3%20%7C%204-00dc82" alt="nuxt 3 | 4">
  <img src="https://img.shields.io/badge/TypeScript-strict-blue" alt="TypeScript">
</p>

---

## Install

```bash
npm install vue-directives
```

```bash
yarn add vue-directives
```

```bash
pnpm add vue-directives
```

> **Requirements:** Vue 3.2+

---

## Quick Start

### Vue 3 — Register All

```ts
import { createApp } from "vue";
import VueDirectivesPlugin from "vue-directives";

const app = createApp(App);
app.use(VueDirectivesPlugin);
app.mount("#app");
```

### Vue 3 — Register Specific Only

```ts
app.use(VueDirectivesPlugin, {
  directives: ["click-outside", "tooltip", "ripple", "lazy-load"],
});
```

### Vue 3 — Individual (Tree-shakable)

```vue
<script setup>
import { vClickOutside, vTooltip } from "vue-directives";
</script>

<template>
  <div v-click-outside="close">
    <button v-tooltip="'Save'">💾</button>
  </div>
</template>
```

### Nuxt 3 / Nuxt 4

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["vue-directives/nuxt"],
});
```

All directives are registered globally — no imports needed. SSR-safe (client-only).

---

## All Directives

### UI & Interaction

| Directive                | Description                               |
| ------------------------ | ----------------------------------------- |
| `v-click-outside`        | Detect clicks outside an element          |
| `v-longpress`            | Trigger handler on long press / hold      |
| `v-press`                | Unified press event (mouse + touch)       |
| `v-smart-click`          | Debounced click with loading state        |
| `v-prevent-double-click` | Disable button after click for N ms       |
| `v-clickable-area`       | Expand clickable area beyond bounds       |
| `v-ripple`               | Material Design ripple effect             |
| `v-tooltip`              | Show tooltip on hover                     |
| `v-hover-class`          | Add/remove class on hover                 |
| `v-intent-hover`         | Hover with intent delay                   |
| `v-draggable`            | Make element draggable                    |
| `v-drag-scroll`          | Drag to scroll container                  |
| `v-drag-sort`            | Drag-and-drop sorting                     |
| `v-swipe`                | Detect swipe gestures                     |
| `v-gesture`              | Multi-gesture recognition (pinch, rotate) |
| `v-hotkey`               | Keyboard shortcuts                        |
| `v-escape`               | Fire callback on Escape key               |
| `v-cursor-follow`        | Element follows cursor                    |
| `v-magnetic`             | Magnetic attraction to cursor             |

### Form & Input

| Directive                     | Description                  |
| ----------------------------- | ---------------------------- |
| `v-debounce`                  | Debounce an event handler    |
| `v-throttle`                  | Throttle an event handler    |
| `v-focus`                     | Auto-focus on mount          |
| `v-select-all`                | Select all text on focus     |
| `v-mask`                      | Input mask (`###-###-####`)  |
| `v-numeric`                   | Allow only numeric input     |
| `v-uppercase` / `v-lowercase` | Auto-transform text casing   |
| `v-trim`                      | Auto-trim whitespace on blur |
| `v-autogrow`                  | Auto-resize textarea         |
| `v-max-length`                | Visual character counter     |
| `v-validate`                  | Inline validation rules      |
| `v-enter-submit`              | Submit on Enter key          |
| `v-auto-submit`               | Auto-submit after delay      |
| `v-format-number`             | Format numbers with locale   |

### Scroll & Viewport

| Directive             | Description                       |
| --------------------- | --------------------------------- |
| `v-scroll-to`         | Smooth scroll to target on click  |
| `v-scroll-progress`   | Track scroll progress (0–1)       |
| `v-sticky`            | Sticky positioning with offset    |
| `v-parallax`          | Parallax scroll effect            |
| `v-in-view`           | Callbacks on enter/leave viewport |
| `v-intersection`      | IntersectionObserver wrapper      |
| `v-lazy-load`         | Lazy load images                  |
| `v-virtual-scroll`    | Virtual scrolling for large lists |
| `v-smart-scroll-lock` | Smart body scroll locking         |

### Animation & Visual

| Directive             | Description                         |
| --------------------- | ----------------------------------- |
| `v-animate-on-scroll` | CSS animation on scroll into view   |
| `v-motion`            | Declarative enter/leave transitions |
| `v-stagger`           | Staggered children animations       |
| `v-tilt`              | 3D tilt hover effect                |
| `v-count-up`          | Animated number counting            |
| `v-loading`           | Loading overlay / spinner           |
| `v-skeleton`          | Skeleton placeholder                |
| `v-visible`           | Toggle visibility (keeps layout)    |
| `v-highlight`         | Highlight search keywords in text   |
| `v-truncate`          | Truncate text with ellipsis         |
| `v-color-mode`        | Dark/light mode classes             |

### Data & State

| Directive          | Description                           |
| ------------------ | ------------------------------------- |
| `v-copy`           | Copy text to clipboard                |
| `v-persist`        | Persist element state to storage      |
| `v-sync-query`     | Sync input value with URL query       |
| `v-sync-storage`   | Sync with localStorage/sessionStorage |
| `v-sync-broadcast` | Sync across tabs via BroadcastChannel |
| `v-auto-poll`      | Auto-polling with interval            |
| `v-timeago`        | Relative time display (auto-updating) |

### Accessibility

| Directive           | Description                                       |
| ------------------- | ------------------------------------------------- |
| `v-aria`            | Set ARIA attributes declaratively                 |
| `v-auto-aria-label` | Auto-generate aria-label from content             |
| `v-focus-trap`      | Trap focus within element                         |
| `v-focus-visible`   | Add focus-visible class                           |
| `v-tab-guard`       | Guard tab navigation boundaries                   |
| `v-safe-link`       | Add `rel="noopener noreferrer"` to external links |

### Security

| Directive        | Description                              |
| ---------------- | ---------------------------------------- |
| `v-sanitize`     | Sanitize HTML content (XSS protection)   |
| `v-trusted-html` | Render trusted HTML via Trusted Types    |
| `v-csp-nonce`    | Apply CSP nonce to inline styles/scripts |

### Performance

| Directive              | Description                                |
| ---------------------- | ------------------------------------------ |
| `v-render-if-visible`  | Render only when visible                   |
| `v-render-on-idle`     | Defer rendering to idle time               |
| `v-suspend`            | Lazy render with suspense-like behavior    |
| `v-prefetch`           | Prefetch links on hover/visibility         |
| `v-preload-image`      | Preload images before display              |
| `v-smart-mount`        | Mount based on visibility/idle/interaction |
| `v-smart-prefetch`     | Intelligent prefetching strategy           |
| `v-hydrate-on-visible` | Hydrate component when visible             |
| `v-measure-render`     | Measure render performance                 |
| `v-fps-monitor`        | FPS monitoring overlay                     |

### Layout & Responsive

| Directive           | Description                              |
| ------------------- | ---------------------------------------- |
| `v-element-query`   | Element-level responsive breakpoints     |
| `v-auto-layout`     | Auto grid/flex layout via ResizeObserver |
| `v-resize-observer` | Element resize callback                  |

### Device & Environment

| Directive         | Description                          |
| ----------------- | ------------------------------------ |
| `v-network-aware` | Adapt to network conditions          |
| `v-cpu-aware`     | Reduce animations on low-end devices |
| `v-idle`          | Detect user inactivity               |
| `v-outside-focus` | Detect focus leaving element tree    |

### Authorization

| Directive        | Description                  |
| ---------------- | ---------------------------- |
| `v-permission`   | Role-based show/hide/disable |
| `v-feature-flag` | Feature flag toggling        |

### Debug

| Directive              | Description                      |
| ---------------------- | -------------------------------- |
| `v-dom-diff-highlight` | Flash highlight on DOM mutations |

---

## Tree Shaking

All directives are individually exported. Bundlers like Vite and Webpack automatically tree-shake unused directives:

```ts
import { vClickOutside, vCopy } from "vue-directives";
// Only these two are included in the bundle
```

---

## TypeScript

Full TypeScript support. All directives are typed as `ObjectDirective` with proper generics.

```ts
import type { VueDirectivesPluginOptions } from "vue-directives";

const options: VueDirectivesPluginOptions = {
  directives: ["click-outside", "tooltip"],
};
```

---

## Documentation

Full documentation with usage examples for every directive:

**[📖 View Documentation](https://vue-directives.surge.sh)**

---

## License

[MIT](./LICENSE) © [Kerolos Zakaria](https://github.com/keroloszakaria)
