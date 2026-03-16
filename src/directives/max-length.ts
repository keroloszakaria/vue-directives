import type { ObjectDirective } from "vue";

interface MaxLengthElement extends HTMLInputElement {
  _maxLengthHandler?: () => void;
  _counterEl?: HTMLSpanElement;
}

interface MaxLengthBinding {
  max: number;
  warningAt?: number;
  warningClass?: string;
  errorClass?: string;
}

/**
 * v-max-length - Visual character counter with max limit
 *
 * Usage:
 *   <input v-max-length="{ max: 100 }" />
 *   <input v-max-length="{ max: 100, warningAt: 80, warningClass: 'text-yellow', errorClass: 'text-red' }" />
 */
export const vMaxLength: ObjectDirective<
  MaxLengthElement,
  number | MaxLengthBinding
> = {
  mounted(el, binding) {
    const value = binding.value;
    const max = typeof value === "number" ? value : value.max;
    const warningAt =
      typeof value === "object"
        ? (value.warningAt ?? Math.floor(max * 0.8))
        : Math.floor(max * 0.8);
    const warningClass =
      typeof value === "object" ? (value.warningClass ?? "") : "";
    const errorClass =
      typeof value === "object" ? (value.errorClass ?? "") : "";

    // Create counter element
    const counter = document.createElement("span");
    counter.style.cssText =
      "display: block; font-size: 12px; margin-top: 4px; text-align: right; color: #999;";
    el._counterEl = counter;
    el.parentNode?.insertBefore(counter, el.nextSibling);

    const update = () => {
      const len = el.value.length;
      counter.textContent = `${len} / ${max}`;

      // Remove old classes
      if (warningClass) counter.classList.remove(warningClass);
      if (errorClass) counter.classList.remove(errorClass);

      if (len > max) {
        counter.style.color = "#e53e3e";
        if (errorClass) counter.classList.add(errorClass);
      } else if (len >= warningAt) {
        counter.style.color = "#d69e2e";
        if (warningClass) counter.classList.add(warningClass);
      } else {
        counter.style.color = "#999";
      }
    };

    el._maxLengthHandler = update;
    el.addEventListener("input", update);
    update();
  },

  unmounted(el) {
    if (el._maxLengthHandler) {
      el.removeEventListener("input", el._maxLengthHandler);
      delete el._maxLengthHandler;
    }
    if (el._counterEl?.parentNode) {
      el._counterEl.parentNode.removeChild(el._counterEl);
      delete el._counterEl;
    }
  },
};
