import type { ObjectDirective } from "vue";

interface RenderOnIdleElement extends HTMLElement {
  _renderOnIdleContent?: string;
  _renderOnIdleCallback?: number;
}

/**
 * v-render-on-idle - Defer rendering until browser is idle (requestIdleCallback)
 *
 * Usage:
 *   <div v-render-on-idle>Non-critical content</div>
 */
export const vRenderOnIdle: ObjectDirective<
  RenderOnIdleElement,
  { timeout?: number } | undefined
> = {
  mounted(el, binding) {
    const timeout = binding.value?.timeout ?? 2000;

    el._renderOnIdleContent = el.innerHTML;
    el.innerHTML = "";

    if ("requestIdleCallback" in window) {
      el._renderOnIdleCallback = (window as any).requestIdleCallback(
        () => {
          el.innerHTML = el._renderOnIdleContent || "";
        },
        { timeout },
      );
    } else {
      // Fallback for browsers without requestIdleCallback
      el._renderOnIdleCallback = setTimeout(() => {
        el.innerHTML = el._renderOnIdleContent || "";
      }, 50) as unknown as number;
    }
  },

  unmounted(el) {
    if (el._renderOnIdleCallback) {
      if ("cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(el._renderOnIdleCallback);
      } else {
        clearTimeout(el._renderOnIdleCallback);
      }
    }
    delete el._renderOnIdleContent;
    delete el._renderOnIdleCallback;
  },
};
