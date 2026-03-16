import type { ObjectDirective } from "vue";

interface ResizeObserverElement extends HTMLElement {
  _resizeObs?: ResizeObserver;
}

interface ResizeObserverBinding {
  handler: (entry: { width: number; height: number; el: HTMLElement }) => void;
  debounce?: number;
}

/**
 * v-resize-observer - Fire callback when element is resized
 *
 * Usage:
 *   <div v-resize-observer="{ handler: onResize }" />
 *   <div v-resize-observer="{ handler: onResize, debounce: 100 }" />
 */
export const vResizeObserver: ObjectDirective<
  ResizeObserverElement,
  | ResizeObserverBinding
  | ((entry: { width: number; height: number; el: HTMLElement }) => void)
> = {
  mounted(el, binding) {
    const value = binding.value;
    const handler = typeof value === "function" ? value : value.handler;
    const debounceMs = typeof value === "object" ? (value.debounce ?? 0) : 0;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const cb = () => handler({ width, height, el });

        if (debounceMs > 0) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(cb, debounceMs);
        } else {
          cb();
        }
      }
    });

    observer.observe(el);
    el._resizeObs = observer;
  },

  unmounted(el) {
    if (el._resizeObs) {
      el._resizeObs.disconnect();
      delete el._resizeObs;
    }
  },
};
