import type { ObjectDirective } from "vue";

interface InViewElement extends HTMLElement {
  _inViewObserver?: IntersectionObserver;
}

interface InViewBinding {
  enter?: (el: HTMLElement) => void;
  leave?: (el: HTMLElement) => void;
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * v-in-view - Fire callbacks when element enters/leaves viewport
 *
 * Usage:
 *   <div v-in-view="{ enter: onEnter, leave: onLeave }" />
 *   <div v-in-view="{ enter: onEnter, once: true }" />
 */
export const vInView: ObjectDirective<InViewElement, InViewBinding> = {
  mounted(el, binding) {
    const {
      enter,
      leave,
      once = false,
      rootMargin = "0px",
      threshold = 0,
    } = binding.value;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enter?.(el);
            if (once) observer.unobserve(el);
          } else {
            leave?.(el);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    el._inViewObserver = observer;
  },

  unmounted(el) {
    if (el._inViewObserver) {
      el._inViewObserver.disconnect();
      delete el._inViewObserver;
    }
  },
};
