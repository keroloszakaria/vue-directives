import type { ObjectDirective } from "vue";

interface SmartClickElement extends HTMLElement {
  _smartClickHandler?: (e: MouseEvent) => void;
  _smartClickTimer?: ReturnType<typeof setTimeout>;
  _smartClickCount?: number;
}

interface SmartClickBinding {
  onClick?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
  delay?: number;
}

/**
 * v-smart-click - Intelligent click handling (distinguishes single vs double click)
 *
 * Usage:
 *   <div v-smart-click="{ onClick: handleSingle, onDoubleClick: handleDouble }">
 */
export const vSmartClick: ObjectDirective<
  SmartClickElement,
  SmartClickBinding
> = {
  mounted(el, binding) {
    const { onClick, onDoubleClick, delay = 250 } = binding.value;
    el._smartClickCount = 0;

    el._smartClickHandler = (e: MouseEvent) => {
      el._smartClickCount = (el._smartClickCount || 0) + 1;

      if (el._smartClickCount === 1) {
        el._smartClickTimer = setTimeout(() => {
          if (el._smartClickCount === 1) {
            onClick?.(e);
          }
          el._smartClickCount = 0;
        }, delay);
      } else if (el._smartClickCount === 2) {
        if (el._smartClickTimer) clearTimeout(el._smartClickTimer);
        el._smartClickCount = 0;
        onDoubleClick?.(e);
      }
    };

    el.addEventListener("click", el._smartClickHandler);
  },

  unmounted(el) {
    if (el._smartClickHandler) {
      el.removeEventListener("click", el._smartClickHandler);
    }
    if (el._smartClickTimer) clearTimeout(el._smartClickTimer);
    delete el._smartClickHandler;
    delete el._smartClickTimer;
    delete el._smartClickCount;
  },
};
