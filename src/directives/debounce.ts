import type { ObjectDirective } from "vue";

interface DebounceElement extends HTMLElement {
  _debounceHandler?: (event: Event) => void;
  _debounceTimer?: ReturnType<typeof setTimeout>;
}

interface DebounceBinding {
  handler: (...args: any[]) => void;
  delay?: number;
  event?: string;
}

/**
 * v-debounce - Debounce an event handler
 *
 * Usage:
 *   <input v-debounce="{ handler: onSearch, delay: 300 }" />
 *   <input v-debounce="{ handler: onSearch, delay: 500, event: 'keyup' }" />
 */
export const vDebounce: ObjectDirective<DebounceElement, DebounceBinding> = {
  mounted(el, binding) {
    const { handler, delay = 300, event = "input" } = binding.value;

    el._debounceHandler = (...args: any[]) => {
      if (el._debounceTimer) {
        clearTimeout(el._debounceTimer);
      }
      el._debounceTimer = setTimeout(() => {
        handler(...args);
      }, delay);
    };

    el.addEventListener(event, el._debounceHandler);
  },

  updated(el, binding) {
    const oldEvent = binding.oldValue?.event || "input";
    const { handler, delay = 300, event = "input" } = binding.value;

    if (el._debounceHandler) {
      el.removeEventListener(oldEvent, el._debounceHandler);
    }
    if (el._debounceTimer) {
      clearTimeout(el._debounceTimer);
    }

    el._debounceHandler = (...args: any[]) => {
      if (el._debounceTimer) {
        clearTimeout(el._debounceTimer);
      }
      el._debounceTimer = setTimeout(() => {
        handler(...args);
      }, delay);
    };

    el.addEventListener(event, el._debounceHandler);
  },

  unmounted(el) {
    const event = "input";
    if (el._debounceHandler) {
      el.removeEventListener(event, el._debounceHandler);
      delete el._debounceHandler;
    }
    if (el._debounceTimer) {
      clearTimeout(el._debounceTimer);
      delete el._debounceTimer;
    }
  },
};
