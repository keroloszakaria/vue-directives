import type { ObjectDirective } from "vue";

interface SyncStorageElement extends HTMLInputElement {
  _syncStorageHandler?: () => void;
  _syncStorageListener?: (e: StorageEvent) => void;
  _syncStorageKey?: string;
}

interface SyncStorageBinding {
  key: string;
  storage?: "local" | "session";
}

/**
 * v-sync-storage - Two-way sync input with localStorage/sessionStorage
 *
 * Usage:
 *   <input v-sync-storage="{ key: 'my-value' }" />
 *   <input v-sync-storage="{ key: 'session-val', storage: 'session' }" />
 */
export const vSyncStorage: ObjectDirective<
  SyncStorageElement,
  SyncStorageBinding | string
> = {
  mounted(el, binding) {
    const config =
      typeof binding.value === "string"
        ? { key: binding.value }
        : binding.value;
    const { key, storage = "local" } = config;
    const store = storage === "session" ? sessionStorage : localStorage;

    el._syncStorageKey = key;

    // Restore
    const saved = store.getItem(key);
    if (saved !== null) {
      el.value = saved;
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }

    // Save on input
    el._syncStorageHandler = () => {
      store.setItem(key, el.value);
    };
    el.addEventListener("input", el._syncStorageHandler);

    // Listen for external changes (other tabs for localStorage)
    if (storage === "local") {
      el._syncStorageListener = (e: StorageEvent) => {
        if (e.key === key && e.newValue !== null) {
          el.value = e.newValue;
          el.dispatchEvent(new Event("input", { bubbles: true }));
        }
      };
      window.addEventListener("storage", el._syncStorageListener);
    }
  },

  unmounted(el) {
    if (el._syncStorageHandler) {
      el.removeEventListener("input", el._syncStorageHandler);
    }
    if (el._syncStorageListener) {
      window.removeEventListener("storage", el._syncStorageListener);
    }
    delete el._syncStorageHandler;
    delete el._syncStorageListener;
    delete el._syncStorageKey;
  },
};
