import type { ObjectDirective } from "vue";

/**
 * v-focus - Auto-focus an element when mounted
 *
 * Usage:
 *   <input v-focus />
 *   <input v-focus="true" />
 *   <input v-focus="shouldFocus" />
 */
export const vFocus: ObjectDirective<HTMLElement, boolean | undefined> = {
  mounted(el, binding) {
    const shouldFocus = binding.value !== false;
    if (shouldFocus) {
      // nextTick equivalent to ensure DOM is ready
      setTimeout(() => el.focus(), 0);
    }
  },

  updated(el, binding) {
    if (binding.value && !binding.oldValue) {
      setTimeout(() => el.focus(), 0);
    }
  },
};
