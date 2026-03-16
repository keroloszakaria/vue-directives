import type { ObjectDirective } from "vue";

interface ClickOutsideElement extends HTMLElement {
  _clickOutsideHandler?: (event: MouseEvent) => void;
}

/**
 * v-click-outside - Detects clicks outside the element
 *
 * Usage: <div v-click-outside="handleClose">...</div>
 */
export const vClickOutside: ObjectDirective<
  ClickOutsideElement,
  (event: MouseEvent) => void
> = {
  mounted(el, binding) {
    el._clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!el.contains(target) && el !== target) {
        binding.value(event);
      }
    };
    // Use setTimeout to avoid catching the initial click that opened the element
    setTimeout(() => {
      document.addEventListener("click", el._clickOutsideHandler!);
    }, 0);
  },

  unmounted(el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener("click", el._clickOutsideHandler);
      delete el._clickOutsideHandler;
    }
  },
};
