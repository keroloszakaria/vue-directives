import type { ObjectDirective } from "vue";

interface SyncQueryElement extends HTMLInputElement {
  _syncQueryHandler?: () => void;
  _syncQueryParam?: string;
}

/**
 * v-sync-query - Sync input value with URL query parameter
 *
 * Usage:
 *   <input v-sync-query="'search'" />
 */
export const vSyncQuery: ObjectDirective<SyncQueryElement, string> = {
  mounted(el, binding) {
    const paramName = binding.value;
    el._syncQueryParam = paramName;

    // Restore from URL
    const url = new URL(window.location.href);
    const current = url.searchParams.get(paramName);
    if (current !== null) {
      el.value = current;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }

    el._syncQueryHandler = () => {
      const newUrl = new URL(window.location.href);
      if (el.value) {
        newUrl.searchParams.set(paramName, el.value);
      } else {
        newUrl.searchParams.delete(paramName);
      }
      window.history.replaceState({}, "", newUrl.toString());
    };

    el.addEventListener("input", el._syncQueryHandler);
  },

  unmounted(el) {
    if (el._syncQueryHandler) {
      el.removeEventListener("input", el._syncQueryHandler);
      delete el._syncQueryHandler;
    }
  },
};
