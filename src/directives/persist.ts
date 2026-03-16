import type { ObjectDirective } from "vue";

interface PersistElement extends HTMLInputElement {
  _persistHandler?: () => void;
  _persistKey?: string;
}

interface PersistBinding {
  key: string;
  storage?: "local" | "session";
}

/**
 * v-persist - Persist input/element state to localStorage/sessionStorage
 *
 * Usage:
 *   <input v-persist="{ key: 'search-query' }" />
 *   <input v-persist="{ key: 'filter', storage: 'session' }" />
 */
export const vPersist: ObjectDirective<
  PersistElement,
  PersistBinding | string
> = {
  mounted(el, binding) {
    const config =
      typeof binding.value === "string"
        ? { key: binding.value }
        : binding.value;
    const { key, storage = "local" } = config;
    const store = storage === "session" ? sessionStorage : localStorage;

    el._persistKey = key;

    // Restore saved value
    const saved = store.getItem(`v-persist:${key}`);
    if (saved !== null) {
      if (el.type === "checkbox") {
        el.checked = saved === "true";
      } else {
        el.value = saved;
      }
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Save on change
    el._persistHandler = () => {
      const val = el.type === "checkbox" ? String(el.checked) : el.value;
      store.setItem(`v-persist:${key}`, val);
    };

    el.addEventListener("input", el._persistHandler);
    el.addEventListener("change", el._persistHandler);
  },

  unmounted(el) {
    if (el._persistHandler) {
      el.removeEventListener("input", el._persistHandler);
      el.removeEventListener("change", el._persistHandler);
      delete el._persistHandler;
    }
  },
};
