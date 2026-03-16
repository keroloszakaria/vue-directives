import type { ObjectDirective } from "vue";

interface OutsideFocusElement extends HTMLElement {
  _outsideFocusHandler?: (e: FocusEvent) => void;
}

/**
 * v-outside-focus - Detect when focus leaves the element tree
 */
export const vOutsideFocus: ObjectDirective<OutsideFocusElement, () => void> = {
  mounted(el, binding) {
    el._outsideFocusHandler = (e: FocusEvent) => {
      const relatedTarget = e.relatedTarget as Node | null;
      if (relatedTarget && !el.contains(relatedTarget)) {
        binding.value();
      } else if (!relatedTarget) {
        binding.value();
      }
    };
    el.addEventListener("focusout", el._outsideFocusHandler);
  },

  unmounted(el) {
    if (el._outsideFocusHandler) {
      el.removeEventListener("focusout", el._outsideFocusHandler);
      delete el._outsideFocusHandler;
    }
  },
};
