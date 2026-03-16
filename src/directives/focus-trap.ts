import type { ObjectDirective } from "vue";

interface FocusTrapElement extends HTMLElement {
  _focusTrapHandler?: (e: KeyboardEvent) => void;
  _previousFocus?: Element | null;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * v-focus-trap - Trap focus within element (for modals/dialogs)
 */
export const vFocusTrap: ObjectDirective<
  FocusTrapElement,
  boolean | undefined
> = {
  mounted(el, binding) {
    if (binding.value === false) return;

    el._previousFocus = document.activeElement;

    el._focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    el.addEventListener("keydown", el._focusTrapHandler);

    // Auto-focus first focusable element
    const firstFocusable = el.querySelector<HTMLElement>(FOCUSABLE);
    if (firstFocusable) {
      requestAnimationFrame(() => firstFocusable.focus());
    }
  },

  unmounted(el) {
    if (el._focusTrapHandler) {
      el.removeEventListener("keydown", el._focusTrapHandler);
      delete el._focusTrapHandler;
    }
    if (el._previousFocus && el._previousFocus instanceof HTMLElement) {
      el._previousFocus.focus();
    }
    delete el._previousFocus;
  },
};
