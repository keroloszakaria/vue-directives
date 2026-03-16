import type { ObjectDirective } from "vue";

interface FocusVisibleElement extends HTMLElement {
  _focusVisibleHandlers?: {
    focus: () => void;
    blur: () => void;
    keydown: (e: KeyboardEvent) => void;
    mousedown: () => void;
  };
  _focusVisibleViaKeyboard?: boolean;
}

/**
 * v-focus-visible - Add focus-visible class for keyboard navigation only
 *
 * Usage:
 *   <button v-focus-visible>Click me</button>
 *   <button v-focus-visible="'custom-focus-class'">Click me</button>
 */
export const vFocusVisible: ObjectDirective<
  FocusVisibleElement,
  string | undefined
> = {
  mounted(el, binding) {
    const className = binding.value || "focus-visible";
    el._focusVisibleViaKeyboard = false;

    const handlers = {
      keydown: (e: KeyboardEvent) => {
        if (e.key === "Tab" || e.key === "Enter" || e.key === " ") {
          el._focusVisibleViaKeyboard = true;
        }
      },
      mousedown: () => {
        el._focusVisibleViaKeyboard = false;
      },
      focus: () => {
        if (el._focusVisibleViaKeyboard) {
          el.classList.add(className);
        }
      },
      blur: () => {
        el.classList.remove(className);
        el._focusVisibleViaKeyboard = false;
      },
    };

    el._focusVisibleHandlers = handlers;
    document.addEventListener("keydown", handlers.keydown);
    document.addEventListener("mousedown", handlers.mousedown);
    el.addEventListener("focus", handlers.focus);
    el.addEventListener("blur", handlers.blur);
  },

  unmounted(el) {
    if (el._focusVisibleHandlers) {
      document.removeEventListener("keydown", el._focusVisibleHandlers.keydown);
      document.removeEventListener(
        "mousedown",
        el._focusVisibleHandlers.mousedown,
      );
      el.removeEventListener("focus", el._focusVisibleHandlers.focus);
      el.removeEventListener("blur", el._focusVisibleHandlers.blur);
      delete el._focusVisibleHandlers;
    }
  },
};
