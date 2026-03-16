import type { ObjectDirective } from "vue";

interface MaskElement extends HTMLInputElement {
  _maskHandler?: (event: Event) => void;
}

/**
 * v-mask - Input mask for formatted input
 *
 * Mask tokens:
 *   # = digit (0-9)
 *   A = letter (a-zA-Z)
 *   X = alphanumeric (a-zA-Z0-9)
 *
 * Usage:
 *   <input v-mask="'###-###-####'" />       <!-- Phone -->
 *   <input v-mask="'##/##/####'" />          <!-- Date -->
 *   <input v-mask="'####-####-####-####'" /> <!-- Credit card -->
 */
export const vMask: ObjectDirective<MaskElement, string> = {
  mounted(el, binding) {
    const mask = binding.value;

    const applyMask = (value: string): string => {
      const raw = value.replace(/[^a-zA-Z0-9]/g, "");
      let result = "";
      let rawIndex = 0;

      for (let i = 0; i < mask.length && rawIndex < raw.length; i++) {
        const maskChar = mask[i];
        const inputChar = raw[rawIndex];

        if (maskChar === "#") {
          if (/\d/.test(inputChar)) {
            result += inputChar;
            rawIndex++;
          } else {
            rawIndex++;
            i--;
          }
        } else if (maskChar === "A") {
          if (/[a-zA-Z]/.test(inputChar)) {
            result += inputChar;
            rawIndex++;
          } else {
            rawIndex++;
            i--;
          }
        } else if (maskChar === "X") {
          result += inputChar;
          rawIndex++;
        } else {
          result += maskChar;
        }
      }

      return result;
    };

    el._maskHandler = () => {
      const cursorPos = el.selectionStart || 0;
      const oldLength = el.value.length;
      el.value = applyMask(el.value);
      const newLength = el.value.length;
      const newCursor = cursorPos + (newLength - oldLength);
      el.setSelectionRange(newCursor, newCursor);
    };

    el.addEventListener("input", el._maskHandler);

    // Apply mask to initial value
    if (el.value) {
      el.value = applyMask(el.value);
    }
  },

  updated(el, binding) {
    if (binding.value !== binding.oldValue && el.value) {
      const mask = binding.value;
      const raw = el.value.replace(/[^a-zA-Z0-9]/g, "");
      let result = "";
      let rawIndex = 0;

      for (let i = 0; i < mask.length && rawIndex < raw.length; i++) {
        const maskChar = mask[i];
        const inputChar = raw[rawIndex];

        if (maskChar === "#") {
          if (/\d/.test(inputChar)) {
            result += inputChar;
            rawIndex++;
          } else {
            rawIndex++;
            i--;
          }
        } else if (maskChar === "A") {
          if (/[a-zA-Z]/.test(inputChar)) {
            result += inputChar;
            rawIndex++;
          } else {
            rawIndex++;
            i--;
          }
        } else if (maskChar === "X") {
          result += inputChar;
          rawIndex++;
        } else {
          result += maskChar;
        }
      }

      el.value = result;
    }
  },

  unmounted(el) {
    if (el._maskHandler) {
      el.removeEventListener("input", el._maskHandler);
      delete el._maskHandler;
    }
  },
};
