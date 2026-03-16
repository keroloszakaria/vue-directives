import type { ObjectDirective } from "vue";

interface FormatNumberBinding {
  locale?: string;
  options?: Intl.NumberFormatOptions;
}

/**
 * v-format-number - Format number display using Intl.NumberFormat
 *
 * Usage:
 *   <span v-format-number="1234567.89">1234567.89</span>
 *   <span v-format-number="{ locale: 'de-DE', options: { style: 'currency', currency: 'EUR' } }">1234</span>
 */
export const vFormatNumber: ObjectDirective<
  HTMLElement,
  number | FormatNumberBinding
> = {
  mounted(el, binding) {
    format(el, binding.value);
  },
  updated(el, binding) {
    format(el, binding.value);
  },
};

function format(el: HTMLElement, value: number | FormatNumberBinding) {
  if (typeof value === "number") {
    el.textContent = new Intl.NumberFormat().format(value);
  } else {
    const num = parseFloat(el.textContent || "0");
    el.textContent = new Intl.NumberFormat(value.locale, value.options).format(
      num,
    );
  }
}
