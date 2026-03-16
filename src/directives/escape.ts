import type { ObjectDirective } from "vue";

interface EscapeElement extends HTMLElement {
  _escapeHandler?: (event: KeyboardEvent) => void;
}

/**
 * v-escape - Fire callback when Escape key is pressed
 *
 * Usage:
 *   <div v-escape="handleClose">Modal content</div>
 */
export const vEscape: ObjectDirective<
  EscapeElement,
  (event: KeyboardEvent) => void
> = {
  mounted(el, binding) {
    el._escapeHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        binding.value(event);
      }
    };
    document.addEventListener("keydown", el._escapeHandler);
  },

  updated(el, binding) {
    if (el._escapeHandler) {
      document.removeEventListener("keydown", el._escapeHandler);
    }
    el._escapeHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        binding.value(event);
      }
    };
    document.addEventListener("keydown", el._escapeHandler);
  },

  unmounted(el) {
    if (el._escapeHandler) {
      document.removeEventListener("keydown", el._escapeHandler);
      delete el._escapeHandler;
    }
  },
};
