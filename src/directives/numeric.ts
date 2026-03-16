import type { ObjectDirective } from "vue";

interface NumericElement extends HTMLInputElement {
  _numericHandler?: (event: Event) => void;
}

interface NumericBinding {
  decimal?: boolean;
  negative?: boolean;
  max?: number;
  min?: number;
}

/**
 * v-numeric - Allow only numeric input
 *
 * Usage:
 *   <input v-numeric />
 *   <input v-numeric="{ decimal: true, negative: true, min: 0, max: 100 }" />
 */
export const vNumeric: ObjectDirective<
  NumericElement,
  NumericBinding | boolean | undefined
> = {
  mounted(el, binding) {
    const opts = typeof binding.value === "object" ? binding.value : {};
    const allowDecimal = opts.decimal ?? false;
    const allowNegative = opts.negative ?? false;
    const max = opts.max;
    const min = opts.min;

    el._numericHandler = () => {
      let value = el.value;

      // Build allowed pattern
      let pattern = allowNegative ? "^-?" : "^";
      pattern += allowDecimal ? "\\d*\\.?\\d*" : "\\d*";
      pattern += "$";

      const regex = new RegExp(pattern);

      if (!regex.test(value)) {
        // Remove invalid characters
        let cleaned = "";
        let hasDecimal = false;
        let hasNegative = false;

        for (const char of value) {
          if (
            char === "-" &&
            allowNegative &&
            !hasNegative &&
            cleaned.length === 0
          ) {
            cleaned += char;
            hasNegative = true;
          } else if (char === "." && allowDecimal && !hasDecimal) {
            cleaned += char;
            hasDecimal = true;
          } else if (/\d/.test(char)) {
            cleaned += char;
          }
        }

        el.value = cleaned;
      }

      // Apply min/max constraints on blur
      const numValue = parseFloat(el.value);
      if (!isNaN(numValue)) {
        if (max !== undefined && numValue > max) el.value = String(max);
        if (min !== undefined && numValue < min) el.value = String(min);
      }
    };

    el.addEventListener("input", el._numericHandler);
    el.addEventListener("blur", el._numericHandler);
  },

  unmounted(el) {
    if (el._numericHandler) {
      el.removeEventListener("input", el._numericHandler);
      el.removeEventListener("blur", el._numericHandler);
      delete el._numericHandler;
    }
  },
};
