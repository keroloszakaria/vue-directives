import type { ObjectDirective } from "vue";

interface CountUpElement extends HTMLElement {
  _countUpAnimation?: number;
}

interface CountUpBinding {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
}

/**
 * v-count-up - Animate number counting up from 0 to target
 *
 * Usage:
 *   <span v-count-up="1000" />
 *   <span v-count-up="{ value: 99.9, duration: 2000, decimals: 1, prefix: '$' }" />
 */
export const vCountUp: ObjectDirective<
  CountUpElement,
  number | CountUpBinding
> = {
  mounted(el, binding) {
    animate(el, 0, binding.value);
  },

  updated(el, binding) {
    if (el._countUpAnimation) {
      cancelAnimationFrame(el._countUpAnimation);
    }
    const oldTarget =
      typeof binding.oldValue === "number"
        ? binding.oldValue
        : (binding.oldValue?.value ?? 0);
    animate(el, oldTarget, binding.value);
  },

  unmounted(el) {
    if (el._countUpAnimation) {
      cancelAnimationFrame(el._countUpAnimation);
      delete el._countUpAnimation;
    }
  },
};

function animate(
  el: CountUpElement,
  from: number | CountUpBinding,
  to: number | CountUpBinding,
) {
  const fromValue = typeof from === "number" ? from : from.value;
  const opts = typeof to === "number" ? { value: to } : to;
  const {
    value: toValue,
    duration = 1500,
    decimals = 0,
    prefix = "",
    suffix = "",
    separator = "",
  } = opts;

  const startTime = performance.now();

  const format = (num: number): string => {
    let formatted = num.toFixed(decimals);
    if (separator) {
      const parts = formatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
      formatted = parts.join(".");
    }
    return `${prefix}${formatted}${suffix}`;
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = fromValue + (toValue - fromValue) * eased;

    el.textContent = format(current);

    if (progress < 1) {
      el._countUpAnimation = requestAnimationFrame(step);
    } else {
      el.textContent = format(toValue);
    }
  };

  el._countUpAnimation = requestAnimationFrame(step);
}
