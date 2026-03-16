import type { ObjectDirective } from "vue";

interface HydrateOnVisibleElement extends HTMLElement {
  _hydrateObserver?: IntersectionObserver;
}

/**
 * v-hydrate-on-visible - Trigger hydration callback when element enters viewport
 *
 * Usage:
 *   <div v-hydrate-on-visible="hydrateComponent">Lazy hydrated component</div>
 */
export const vHydrateOnVisible: ObjectDirective<
  HydrateOnVisibleElement,
  () => void
> = {
  mounted(el, binding) {
    const callback = binding.value;

    el._hydrateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            el._hydrateObserver?.disconnect();
          }
        });
      },
      { rootMargin: "100px" },
    );

    el._hydrateObserver.observe(el);
  },

  unmounted(el) {
    el._hydrateObserver?.disconnect();
    delete el._hydrateObserver;
  },
};
