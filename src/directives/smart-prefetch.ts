import type { ObjectDirective } from "vue";

interface SmartPrefetchElement extends HTMLAnchorElement {
  _smartPrefetchObserver?: IntersectionObserver;
  _smartPrefetchHandler?: () => void;
  _smartPrefetchDone?: boolean;
}

interface SmartPrefetchBinding {
  strategy?: "visible" | "hover" | "both";
  rootMargin?: string;
  hoverDelay?: number;
}

/**
 * v-smart-prefetch - Intelligent prefetching based on visibility or hover intent
 *
 * Usage:
 *   <a v-smart-prefetch href="/page">Link</a>
 *   <a v-smart-prefetch="{ strategy: 'hover', hoverDelay: 100 }" href="/page">Link</a>
 */
export const vSmartPrefetch: ObjectDirective<
  SmartPrefetchElement,
  SmartPrefetchBinding | undefined
> = {
  mounted(el, binding) {
    const {
      strategy = "both",
      rootMargin = "200px",
      hoverDelay = 65,
    } = binding.value || {};

    const doPrefetch = () => {
      if (el._smartPrefetchDone) return;
      el._smartPrefetchDone = true;

      const href = el.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:"))
        return;

      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    };

    if (strategy === "visible" || strategy === "both") {
      el._smartPrefetchObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            doPrefetch();
            el._smartPrefetchObserver?.disconnect();
          }
        },
        { rootMargin },
      );
      el._smartPrefetchObserver.observe(el);
    }

    if (strategy === "hover" || strategy === "both") {
      let timer: ReturnType<typeof setTimeout>;
      el._smartPrefetchHandler = () => {
        timer = setTimeout(doPrefetch, hoverDelay);
      };
      const cancel = () => clearTimeout(timer);
      el.addEventListener("mouseenter", el._smartPrefetchHandler);
      el.addEventListener("mouseleave", cancel);
    }
  },

  unmounted(el) {
    el._smartPrefetchObserver?.disconnect();
    if (el._smartPrefetchHandler) {
      el.removeEventListener("mouseenter", el._smartPrefetchHandler);
    }
    delete el._smartPrefetchObserver;
    delete el._smartPrefetchHandler;
    delete el._smartPrefetchDone;
  },
};
