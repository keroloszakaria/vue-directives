import type { ObjectDirective } from "vue";

interface IntersectionElement extends HTMLElement {
  _intersectionObserver?: IntersectionObserver;
}

interface IntersectionBinding {
  handler: (entry: IntersectionObserverEntry) => void;
  options?: IntersectionObserverInit;
  once?: boolean;
}

/**
 * v-intersection - Generic IntersectionObserver wrapper
 */
export const vIntersection: ObjectDirective<
  IntersectionElement,
  IntersectionBinding
> = {
  mounted(el, binding) {
    const { handler, options = {}, once = false } = binding.value;

    el._intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        handler(entry);
        if (once && entry.isIntersecting) {
          el._intersectionObserver?.disconnect();
        }
      });
    }, options);

    el._intersectionObserver.observe(el);
  },

  unmounted(el) {
    el._intersectionObserver?.disconnect();
    delete el._intersectionObserver;
  },
};
