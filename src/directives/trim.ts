import type { ObjectDirective } from "vue";

interface TrimElement extends HTMLInputElement {
  _trimHandler?: () => void;
}

/**
 * v-trim - Auto-trim whitespace from input on blur
 *
 * Usage: <input v-trim />
 */
export const vTrim: ObjectDirective<TrimElement> = {
  mounted(el) {
    el._trimHandler = () => {
      el.value = el.value.trim();
      el.dispatchEvent(new Event("input", { bubbles: true }));
    };
    el.addEventListener("blur", el._trimHandler);
  },
  unmounted(el) {
    if (el._trimHandler) {
      el.removeEventListener("blur", el._trimHandler);
      delete el._trimHandler;
    }
  },
};
