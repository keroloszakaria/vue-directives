import type { ObjectDirective } from "vue";

/**
 * v-visible - Toggle visibility without affecting layout (uses CSS visibility)
 *
 * Usage:
 *   <div v-visible="isVisible">Content</div>
 */
export const vVisible: ObjectDirective<HTMLElement, boolean> = {
  mounted(el, binding) {
    el.style.visibility = binding.value ? "visible" : "hidden";
  },
  updated(el, binding) {
    el.style.visibility = binding.value ? "visible" : "hidden";
  },
};
