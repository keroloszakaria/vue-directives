import type { ObjectDirective } from "vue";

/**
 * v-select-all - Select all text content on focus
 *
 * Usage: <input v-select-all />
 */
export const vSelectAll: ObjectDirective<
  HTMLInputElement | HTMLTextAreaElement
> = {
  mounted(el) {
    el.addEventListener("focus", () => {
      el.select();
    });
  },
};
