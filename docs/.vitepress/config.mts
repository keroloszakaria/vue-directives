import { defineConfig } from "vitepress";

export default defineConfig({
  title: "vue-directives-pro",
  description:
    "A comprehensive collection of 86+ Vue 3 & Nuxt 3 custom directives",
  base: "/",
  head: [["link", { rel: "icon", type: "image/png", href: "/logo.png" }]],
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Directives", link: "/directives/click-outside" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Installation", link: "/guide/installation" },
            { text: "Usage with Vue 3", link: "/guide/vue3" },
            { text: "Usage with Nuxt 3", link: "/guide/nuxt3" },
            { text: "Usage with Nuxt 4", link: "/guide/nuxt4" },
          ],
        },
        {
          text: "Directives Overview",
          items: [
            {
              text: "UI & Interaction",
              collapsed: true,
              items: [
                { text: "v-click-outside", link: "/directives/click-outside" },
                { text: "v-longpress", link: "/directives/longpress" },
                { text: "v-press", link: "/directives/press" },
                { text: "v-smart-click", link: "/directives/smart-click" },
                {
                  text: "v-prevent-double-click",
                  link: "/directives/prevent-double-click",
                },
                {
                  text: "v-clickable-area",
                  link: "/directives/clickable-area",
                },
                { text: "v-ripple", link: "/directives/ripple" },
                { text: "v-tooltip", link: "/directives/tooltip" },
                { text: "v-hover-class", link: "/directives/hover-class" },
                { text: "v-intent-hover", link: "/directives/intent-hover" },
                { text: "v-draggable", link: "/directives/draggable" },
                { text: "v-drag-scroll", link: "/directives/drag-scroll" },
                { text: "v-drag-sort", link: "/directives/drag-sort" },
                { text: "v-swipe", link: "/directives/swipe" },
                { text: "v-gesture", link: "/directives/gesture" },
                { text: "v-hotkey", link: "/directives/hotkey" },
                { text: "v-escape", link: "/directives/escape" },
                { text: "v-cursor-follow", link: "/directives/cursor-follow" },
                { text: "v-magnetic", link: "/directives/magnetic" },
              ],
            },
            {
              text: "Form & Input",
              collapsed: true,
              items: [
                { text: "v-debounce", link: "/directives/debounce" },
                { text: "v-throttle", link: "/directives/throttle" },
                { text: "v-focus", link: "/directives/focus" },
                { text: "v-select-all", link: "/directives/select-all" },
                { text: "v-mask", link: "/directives/mask" },
                { text: "v-numeric", link: "/directives/numeric" },
                {
                  text: "v-uppercase / v-lowercase",
                  link: "/directives/text-transform",
                },
                { text: "v-trim", link: "/directives/trim" },
                { text: "v-autogrow", link: "/directives/autogrow" },
                { text: "v-max-length", link: "/directives/max-length" },
                { text: "v-validate", link: "/directives/validate" },
                { text: "v-enter-submit", link: "/directives/enter-submit" },
                { text: "v-auto-submit", link: "/directives/auto-submit" },
                { text: "v-format-number", link: "/directives/format-number" },
              ],
            },
            {
              text: "Scroll & Viewport",
              collapsed: true,
              items: [
                { text: "v-scroll-to", link: "/directives/scroll-to" },
                {
                  text: "v-scroll-progress",
                  link: "/directives/scroll-progress",
                },
                { text: "v-sticky", link: "/directives/sticky" },
                { text: "v-parallax", link: "/directives/parallax" },
                { text: "v-in-view", link: "/directives/in-view" },
                { text: "v-intersection", link: "/directives/intersection" },
                { text: "v-lazy-load", link: "/directives/lazy-load" },
                {
                  text: "v-virtual-scroll",
                  link: "/directives/virtual-scroll",
                },
                {
                  text: "v-smart-scroll-lock",
                  link: "/directives/smart-scroll-lock",
                },
              ],
            },
            {
              text: "Animation & Visual",
              collapsed: true,
              items: [
                {
                  text: "v-animate-on-scroll",
                  link: "/directives/animate-on-scroll",
                },
                { text: "v-motion", link: "/directives/motion" },
                { text: "v-stagger", link: "/directives/stagger" },
                { text: "v-tilt", link: "/directives/tilt" },
                { text: "v-count-up", link: "/directives/count-up" },
                { text: "v-loading", link: "/directives/loading" },
                { text: "v-skeleton", link: "/directives/skeleton" },
                { text: "v-visible", link: "/directives/visible" },
                { text: "v-highlight", link: "/directives/highlight" },
                { text: "v-truncate", link: "/directives/truncate" },
                { text: "v-color-mode", link: "/directives/color-mode" },
              ],
            },
            {
              text: "Data & State",
              collapsed: true,
              items: [
                { text: "v-copy", link: "/directives/copy" },
                { text: "v-persist", link: "/directives/persist" },
                { text: "v-sync-query", link: "/directives/sync-query" },
                { text: "v-sync-storage", link: "/directives/sync-storage" },
                {
                  text: "v-sync-broadcast",
                  link: "/directives/sync-broadcast",
                },
                { text: "v-auto-poll", link: "/directives/auto-poll" },
                { text: "v-timeago", link: "/directives/timeago" },
              ],
            },
            {
              text: "Accessibility",
              collapsed: true,
              items: [
                { text: "v-aria", link: "/directives/aria" },
                {
                  text: "v-auto-aria-label",
                  link: "/directives/auto-aria-label",
                },
                { text: "v-focus-trap", link: "/directives/focus-trap" },
                { text: "v-focus-visible", link: "/directives/focus-visible" },
                { text: "v-tab-guard", link: "/directives/tab-guard" },
                { text: "v-safe-link", link: "/directives/safe-link" },
              ],
            },
            {
              text: "Security",
              collapsed: true,
              items: [
                { text: "v-sanitize", link: "/directives/sanitize" },
                { text: "v-trusted-html", link: "/directives/trusted-html" },
                { text: "v-csp-nonce", link: "/directives/csp-nonce" },
              ],
            },
            {
              text: "Performance",
              collapsed: true,
              items: [
                {
                  text: "v-render-if-visible",
                  link: "/directives/render-if-visible",
                },
                {
                  text: "v-render-on-idle",
                  link: "/directives/render-on-idle",
                },
                { text: "v-suspend", link: "/directives/suspend" },
                { text: "v-prefetch", link: "/directives/prefetch" },
                { text: "v-preload-image", link: "/directives/preload-image" },
                { text: "v-smart-mount", link: "/directives/smart-mount" },
                {
                  text: "v-smart-prefetch",
                  link: "/directives/smart-prefetch",
                },
                {
                  text: "v-hydrate-on-visible",
                  link: "/directives/hydrate-on-visible",
                },
                {
                  text: "v-measure-render",
                  link: "/directives/measure-render",
                },
                { text: "v-fps-monitor", link: "/directives/fps-monitor" },
              ],
            },
            {
              text: "Layout & Responsive",
              collapsed: true,
              items: [
                { text: "v-element-query", link: "/directives/element-query" },
                { text: "v-auto-layout", link: "/directives/auto-layout" },
                {
                  text: "v-resize-observer",
                  link: "/directives/resize-observer",
                },
              ],
            },
            {
              text: "Device & Environment",
              collapsed: true,
              items: [
                { text: "v-network-aware", link: "/directives/network-aware" },
                { text: "v-cpu-aware", link: "/directives/cpu-aware" },
                { text: "v-idle", link: "/directives/idle" },
                { text: "v-outside-focus", link: "/directives/outside-focus" },
              ],
            },
            {
              text: "Authorization",
              collapsed: true,
              items: [
                { text: "v-permission", link: "/directives/permission" },
                { text: "v-feature-flag", link: "/directives/feature-flag" },
              ],
            },
            {
              text: "Debug",
              collapsed: true,
              items: [
                {
                  text: "v-dom-diff-highlight",
                  link: "/directives/dom-diff-highlight",
                },
              ],
            },
          ],
        },
      ],
      "/directives/": [
        {
          text: "UI & Interaction",
          collapsed: false,
          items: [
            { text: "v-click-outside", link: "/directives/click-outside" },
            { text: "v-longpress", link: "/directives/longpress" },
            { text: "v-press", link: "/directives/press" },
            { text: "v-smart-click", link: "/directives/smart-click" },
            {
              text: "v-prevent-double-click",
              link: "/directives/prevent-double-click",
            },
            { text: "v-clickable-area", link: "/directives/clickable-area" },
            { text: "v-ripple", link: "/directives/ripple" },
            { text: "v-tooltip", link: "/directives/tooltip" },
            { text: "v-hover-class", link: "/directives/hover-class" },
            { text: "v-intent-hover", link: "/directives/intent-hover" },
            { text: "v-draggable", link: "/directives/draggable" },
            { text: "v-drag-scroll", link: "/directives/drag-scroll" },
            { text: "v-drag-sort", link: "/directives/drag-sort" },
            { text: "v-swipe", link: "/directives/swipe" },
            { text: "v-gesture", link: "/directives/gesture" },
            { text: "v-hotkey", link: "/directives/hotkey" },
            { text: "v-escape", link: "/directives/escape" },
            { text: "v-cursor-follow", link: "/directives/cursor-follow" },
            { text: "v-magnetic", link: "/directives/magnetic" },
          ],
        },
        {
          text: "Form & Input",
          collapsed: false,
          items: [
            { text: "v-debounce", link: "/directives/debounce" },
            { text: "v-throttle", link: "/directives/throttle" },
            { text: "v-focus", link: "/directives/focus" },
            { text: "v-select-all", link: "/directives/select-all" },
            { text: "v-mask", link: "/directives/mask" },
            { text: "v-numeric", link: "/directives/numeric" },
            {
              text: "v-uppercase / v-lowercase",
              link: "/directives/text-transform",
            },
            { text: "v-trim", link: "/directives/trim" },
            { text: "v-autogrow", link: "/directives/autogrow" },
            { text: "v-max-length", link: "/directives/max-length" },
            { text: "v-validate", link: "/directives/validate" },
            { text: "v-enter-submit", link: "/directives/enter-submit" },
            { text: "v-auto-submit", link: "/directives/auto-submit" },
            { text: "v-format-number", link: "/directives/format-number" },
          ],
        },
        {
          text: "Scroll & Viewport",
          collapsed: false,
          items: [
            { text: "v-scroll-to", link: "/directives/scroll-to" },
            { text: "v-scroll-progress", link: "/directives/scroll-progress" },
            { text: "v-sticky", link: "/directives/sticky" },
            { text: "v-parallax", link: "/directives/parallax" },
            { text: "v-in-view", link: "/directives/in-view" },
            { text: "v-intersection", link: "/directives/intersection" },
            { text: "v-lazy-load", link: "/directives/lazy-load" },
            { text: "v-virtual-scroll", link: "/directives/virtual-scroll" },
            {
              text: "v-smart-scroll-lock",
              link: "/directives/smart-scroll-lock",
            },
          ],
        },
        {
          text: "Animation & Visual",
          collapsed: false,
          items: [
            {
              text: "v-animate-on-scroll",
              link: "/directives/animate-on-scroll",
            },
            { text: "v-motion", link: "/directives/motion" },
            { text: "v-stagger", link: "/directives/stagger" },
            { text: "v-tilt", link: "/directives/tilt" },
            { text: "v-count-up", link: "/directives/count-up" },
            { text: "v-loading", link: "/directives/loading" },
            { text: "v-skeleton", link: "/directives/skeleton" },
            { text: "v-visible", link: "/directives/visible" },
            { text: "v-highlight", link: "/directives/highlight" },
            { text: "v-truncate", link: "/directives/truncate" },
            { text: "v-color-mode", link: "/directives/color-mode" },
          ],
        },
        {
          text: "Data & State",
          collapsed: false,
          items: [
            { text: "v-copy", link: "/directives/copy" },
            { text: "v-persist", link: "/directives/persist" },
            { text: "v-sync-query", link: "/directives/sync-query" },
            { text: "v-sync-storage", link: "/directives/sync-storage" },
            { text: "v-sync-broadcast", link: "/directives/sync-broadcast" },
            { text: "v-auto-poll", link: "/directives/auto-poll" },
            { text: "v-timeago", link: "/directives/timeago" },
          ],
        },
        {
          text: "Accessibility",
          collapsed: false,
          items: [
            { text: "v-aria", link: "/directives/aria" },
            { text: "v-auto-aria-label", link: "/directives/auto-aria-label" },
            { text: "v-focus-trap", link: "/directives/focus-trap" },
            { text: "v-focus-visible", link: "/directives/focus-visible" },
            { text: "v-tab-guard", link: "/directives/tab-guard" },
            { text: "v-safe-link", link: "/directives/safe-link" },
          ],
        },
        {
          text: "Security",
          collapsed: false,
          items: [
            { text: "v-sanitize", link: "/directives/sanitize" },
            { text: "v-trusted-html", link: "/directives/trusted-html" },
            { text: "v-csp-nonce", link: "/directives/csp-nonce" },
          ],
        },
        {
          text: "Performance",
          collapsed: false,
          items: [
            {
              text: "v-render-if-visible",
              link: "/directives/render-if-visible",
            },
            { text: "v-render-on-idle", link: "/directives/render-on-idle" },
            { text: "v-suspend", link: "/directives/suspend" },
            { text: "v-prefetch", link: "/directives/prefetch" },
            { text: "v-preload-image", link: "/directives/preload-image" },
            { text: "v-smart-mount", link: "/directives/smart-mount" },
            { text: "v-smart-prefetch", link: "/directives/smart-prefetch" },
            {
              text: "v-hydrate-on-visible",
              link: "/directives/hydrate-on-visible",
            },
            { text: "v-measure-render", link: "/directives/measure-render" },
            { text: "v-fps-monitor", link: "/directives/fps-monitor" },
          ],
        },
        {
          text: "Layout & Responsive",
          collapsed: false,
          items: [
            { text: "v-element-query", link: "/directives/element-query" },
            { text: "v-auto-layout", link: "/directives/auto-layout" },
            { text: "v-resize-observer", link: "/directives/resize-observer" },
          ],
        },
        {
          text: "Device & Environment",
          collapsed: false,
          items: [
            { text: "v-network-aware", link: "/directives/network-aware" },
            { text: "v-cpu-aware", link: "/directives/cpu-aware" },
            { text: "v-idle", link: "/directives/idle" },
            { text: "v-outside-focus", link: "/directives/outside-focus" },
          ],
        },
        {
          text: "Authorization",
          collapsed: false,
          items: [
            { text: "v-permission", link: "/directives/permission" },
            { text: "v-feature-flag", link: "/directives/feature-flag" },
          ],
        },
        {
          text: "Debug",
          collapsed: false,
          items: [
            {
              text: "v-dom-diff-highlight",
              link: "/directives/dom-diff-highlight",
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vue-directives-pro" },
      { icon: "npm", link: "https://www.npmjs.com/package/vue-directives-pro" },
    ],
    search: {
      provider: "local",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026 Kerolos Zakaria",
    },
  },
});
