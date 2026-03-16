import type { ObjectDirective } from "vue";

interface ScrollToElement extends HTMLElement {
  _scrollToHandler?: () => void;
}

interface ScrollToBinding {
  target: string; // CSS selector
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  offset?: number;
}

/**
 * v-scroll-to - Smooth scroll to a target element on click
 *
 * Usage:
 *   <button v-scroll-to="'#section-1'">Go to Section 1</button>
 *   <button v-scroll-to="{ target: '#section-1', behavior: 'smooth', offset: -80 }">Go</button>
 */
export const vScrollTo: ObjectDirective<
  ScrollToElement,
  string | ScrollToBinding
> = {
  mounted(el, binding) {
    const value = binding.value;
    const target = typeof value === "string" ? value : value.target;
    const behavior =
      typeof value === "object" ? (value.behavior ?? "smooth") : "smooth";
    const offset = typeof value === "object" ? (value.offset ?? 0) : 0;

    el._scrollToHandler = () => {
      const targetEl = document.querySelector(target);
      if (targetEl) {
        const top =
          targetEl.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    };

    el.addEventListener("click", el._scrollToHandler);
  },

  updated(el, binding) {
    if (el._scrollToHandler) {
      el.removeEventListener("click", el._scrollToHandler);
    }

    const value = binding.value;
    const target = typeof value === "string" ? value : value.target;
    const behavior =
      typeof value === "object" ? (value.behavior ?? "smooth") : "smooth";
    const offset = typeof value === "object" ? (value.offset ?? 0) : 0;

    el._scrollToHandler = () => {
      const targetEl = document.querySelector(target);
      if (targetEl) {
        const top =
          targetEl.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior });
      }
    };

    el.addEventListener("click", el._scrollToHandler);
  },

  unmounted(el) {
    if (el._scrollToHandler) {
      el.removeEventListener("click", el._scrollToHandler);
      delete el._scrollToHandler;
    }
  },
};
