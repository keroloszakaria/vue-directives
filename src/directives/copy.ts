import type { ObjectDirective } from "vue";

interface CopyElement extends HTMLElement {
  _copyHandler?: () => void;
}

interface CopyBinding {
  text?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * v-copy - Copy text to clipboard on click
 *
 * Usage:
 *   <button v-copy="'Hello World'">Copy</button>
 *   <button v-copy="{ text: msg, onSuccess: onCopied }">Copy</button>
 */
export const vCopy: ObjectDirective<CopyElement, string | CopyBinding> = {
  mounted(el, binding) {
    el._copyHandler = async () => {
      const value = binding.value;
      const text = typeof value === "string" ? value : (value?.text ?? "");
      const onSuccess =
        typeof value === "object" ? value?.onSuccess : undefined;
      const onError = typeof value === "object" ? value?.onError : undefined;

      try {
        await navigator.clipboard.writeText(text);
        onSuccess?.();
      } catch (err) {
        onError?.(err as Error);
      }
    };
    el.addEventListener("click", el._copyHandler);
  },

  updated(el, binding) {
    if (el._copyHandler) {
      el.removeEventListener("click", el._copyHandler);
    }
    el._copyHandler = async () => {
      const value = binding.value;
      const text = typeof value === "string" ? value : (value?.text ?? "");
      const onSuccess =
        typeof value === "object" ? value?.onSuccess : undefined;
      const onError = typeof value === "object" ? value?.onError : undefined;

      try {
        await navigator.clipboard.writeText(text);
        onSuccess?.();
      } catch (err) {
        onError?.(err as Error);
      }
    };
    el.addEventListener("click", el._copyHandler);
  },

  unmounted(el) {
    if (el._copyHandler) {
      el.removeEventListener("click", el._copyHandler);
      delete el._copyHandler;
    }
  },
};
