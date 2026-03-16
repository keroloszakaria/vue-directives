import type { ObjectDirective } from "vue";

interface PreloadImageElement extends HTMLElement {
  _preloadObserver?: IntersectionObserver;
}

/**
 * v-preload-image - Preload images before they enter the viewport
 *
 * Usage:
 *   <img v-preload-image src="placeholder.jpg" data-src="real-image.jpg" />
 *   <div v-preload-image="'https://example.com/bg.jpg'">...</div>
 */
export const vPreloadImage: ObjectDirective<
  PreloadImageElement,
  string | string[] | undefined
> = {
  mounted(el, binding) {
    const imagesToPreload: string[] = [];

    if (binding.value) {
      const urls = Array.isArray(binding.value)
        ? binding.value
        : [binding.value];
      imagesToPreload.push(...urls);
    }

    // Collect data-src from element and children
    if (el.dataset.src) imagesToPreload.push(el.dataset.src);
    el.querySelectorAll<HTMLElement>("[data-src]").forEach((child) => {
      if (child.dataset.src) imagesToPreload.push(child.dataset.src);
    });

    if (imagesToPreload.length === 0) return;

    el._preloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imagesToPreload.forEach((src) => {
              const img = new Image();
              img.src = src;
            });
            el._preloadObserver?.disconnect();
          }
        });
      },
      { rootMargin: "300px" },
    );

    el._preloadObserver.observe(el);
  },

  unmounted(el) {
    el._preloadObserver?.disconnect();
    delete el._preloadObserver;
  },
};
