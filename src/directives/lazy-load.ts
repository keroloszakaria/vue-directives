import type { ObjectDirective } from "vue";

interface LazyLoadElement extends HTMLElement {
  _lazyObserver?: IntersectionObserver;
}

interface LazyLoadBinding {
  src: string;
  loading?: string;
  error?: string;
  rootMargin?: string;
  threshold?: number;
}

/**
 * v-lazy-load - Lazy load images using IntersectionObserver
 *
 * Usage:
 *   <img v-lazy-load="'https://example.com/image.jpg'" />
 *   <img v-lazy-load="{ src: imgUrl, loading: placeholder, error: errorImg }" />
 */
export const vLazyLoad: ObjectDirective<
  LazyLoadElement,
  string | LazyLoadBinding
> = {
  mounted(el, binding) {
    const value = binding.value;
    const src = typeof value === "string" ? value : value.src;
    const loadingImg = typeof value === "object" ? value.loading : undefined;
    const errorImg = typeof value === "object" ? value.error : undefined;
    const rootMargin =
      typeof value === "object"
        ? (value.rootMargin ?? "0px 0px 200px 0px")
        : "0px 0px 200px 0px";
    const threshold = typeof value === "object" ? (value.threshold ?? 0) : 0;

    if (loadingImg && el instanceof HTMLImageElement) {
      el.src = loadingImg;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (el instanceof HTMLImageElement) {
              el.src = src;
              el.onerror = () => {
                if (errorImg) el.src = errorImg;
              };
            } else {
              el.style.backgroundImage = `url(${CSS.escape(src)})`;
            }
            observer.unobserve(el);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
    el._lazyObserver = observer;
  },

  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      const value = binding.value;
      const src = typeof value === "string" ? value : value.src;

      if (el instanceof HTMLImageElement) {
        el.src = src;
      }
    }
  },

  unmounted(el) {
    if (el._lazyObserver) {
      el._lazyObserver.disconnect();
      delete el._lazyObserver;
    }
  },
};
