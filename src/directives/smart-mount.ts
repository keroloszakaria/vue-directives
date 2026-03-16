import type { ObjectDirective } from "vue";

interface SmartMountElement extends HTMLElement {
  _smartMountObserver?: IntersectionObserver;
  _smartMountIdleCallback?: number;
}

interface SmartMountBinding {
  onMount: () => void;
  strategy?: "visible" | "idle" | "interaction" | "immediate";
  rootMargin?: string;
}

/**
 * v-smart-mount - Smart mounting strategy based on conditions
 *
 * Usage:
 *   <div v-smart-mount="{ onMount: initComponent, strategy: 'visible' }">
 *   <div v-smart-mount="{ onMount: initComponent, strategy: 'idle' }">
 */
export const vSmartMount: ObjectDirective<
  SmartMountElement,
  SmartMountBinding
> = {
  mounted(el, binding) {
    const {
      onMount,
      strategy = "visible",
      rootMargin = "100px",
    } = binding.value;

    switch (strategy) {
      case "immediate":
        onMount();
        break;

      case "visible":
        el._smartMountObserver = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              onMount();
              el._smartMountObserver?.disconnect();
            }
          },
          { rootMargin },
        );
        el._smartMountObserver.observe(el);
        break;

      case "idle":
        if ("requestIdleCallback" in window) {
          el._smartMountIdleCallback = (window as any).requestIdleCallback(() =>
            onMount(),
          );
        } else {
          setTimeout(onMount, 100);
        }
        break;

      case "interaction": {
        const trigger = () => {
          onMount();
          el.removeEventListener("mouseenter", trigger);
          el.removeEventListener("focusin", trigger);
          el.removeEventListener("touchstart", trigger);
        };
        el.addEventListener("mouseenter", trigger, { once: true });
        el.addEventListener("focusin", trigger, { once: true });
        el.addEventListener("touchstart", trigger, { once: true });
        break;
      }
    }
  },

  unmounted(el) {
    el._smartMountObserver?.disconnect();
    if (el._smartMountIdleCallback && "cancelIdleCallback" in window) {
      (window as any).cancelIdleCallback(el._smartMountIdleCallback);
    }
    delete el._smartMountObserver;
    delete el._smartMountIdleCallback;
  },
};
