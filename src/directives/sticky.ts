import type { ObjectDirective } from "vue";

interface StickyElement extends HTMLElement {
  _stickyObserver?: IntersectionObserver;
  _stickyPlaceholder?: HTMLDivElement;
  _stickyScrollHandler?: () => void;
}

interface StickyBinding {
  offset?: number;
  zIndex?: number;
  stickyClass?: string;
}

/**
 * v-sticky - Make element sticky with configurable offset
 *
 * Usage:
 *   <div v-sticky>Sticky header</div>
 *   <div v-sticky="{ offset: 80, zIndex: 100, stickyClass: 'is-stuck' }">Header</div>
 */
export const vSticky: ObjectDirective<
  StickyElement,
  number | StickyBinding | undefined
> = {
  mounted(el, binding) {
    const value = binding.value;
    const offset =
      typeof value === "number"
        ? value
        : typeof value === "object"
          ? (value.offset ?? 0)
          : 0;
    const zIndex = typeof value === "object" ? (value.zIndex ?? 100) : 100;
    const stickyClass =
      typeof value === "object" ? value.stickyClass : undefined;

    el.style.position = "sticky";
    el.style.top = `${offset}px`;
    el.style.zIndex = String(zIndex);

    if (stickyClass) {
      // Use IntersectionObserver to detect when element becomes stuck
      const sentinel = document.createElement("div");
      sentinel.style.cssText = `height: 1px; margin-bottom: -1px; visibility: hidden; pointer-events: none;`;
      el.parentNode?.insertBefore(sentinel, el);

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            el.classList.add(stickyClass);
          } else {
            el.classList.remove(stickyClass);
          }
        },
        { threshold: [1], rootMargin: `-${offset + 1}px 0px 0px 0px` },
      );

      observer.observe(sentinel);
      el._stickyObserver = observer;
      el._stickyPlaceholder = sentinel;
    }
  },

  unmounted(el) {
    if (el._stickyObserver) {
      el._stickyObserver.disconnect();
      delete el._stickyObserver;
    }
    if (el._stickyPlaceholder?.parentNode) {
      el._stickyPlaceholder.parentNode.removeChild(el._stickyPlaceholder);
      delete el._stickyPlaceholder;
    }
  },
};
