import type { ObjectDirective } from "vue";

interface PreventDoubleClickElement extends HTMLElement {
  _pdcHandler?: (event: Event) => void;
}

/**
 * v-prevent-double-click - Disable button after click for N ms to prevent double submit
 *
 * Usage:
 *   <button v-prevent-double-click @click="onSubmit">Submit</button>
 *   <button v-prevent-double-click="2000" @click="onSubmit">Submit</button>
 */
export const vPreventDoubleClick: ObjectDirective<
  PreventDoubleClickElement,
  number | undefined
> = {
  mounted(el, binding) {
    const duration = binding.value ?? 1000;

    el._pdcHandler = () => {
      el.style.pointerEvents = "none";
      el.setAttribute("aria-disabled", "true");

      if (el instanceof HTMLButtonElement) {
        el.disabled = true;
      }

      setTimeout(() => {
        el.style.pointerEvents = "";
        el.removeAttribute("aria-disabled");
        if (el instanceof HTMLButtonElement) {
          el.disabled = false;
        }
      }, duration);
    };

    el.addEventListener("click", el._pdcHandler);
  },

  unmounted(el) {
    if (el._pdcHandler) {
      el.removeEventListener("click", el._pdcHandler);
      delete el._pdcHandler;
    }
  },
};
