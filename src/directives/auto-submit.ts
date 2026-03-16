import type { ObjectDirective } from "vue";

interface AutoSubmitElement extends HTMLFormElement {
  _autoSubmitObserver?: MutationObserver;
  _autoSubmitListeners?: Array<{ el: HTMLElement; handler: () => void }>;
  _autoSubmitTimer?: ReturnType<typeof setTimeout>;
}

/**
 * v-auto-submit - Auto-submit form when inputs change
 *
 * Usage:
 *   <form v-auto-submit="{ delay: 500 }" @submit.prevent="onSubmit">
 */
export const vAutoSubmit: ObjectDirective<
  AutoSubmitElement,
  { delay?: number } | undefined
> = {
  mounted(el, binding) {
    const delay = binding.value?.delay ?? 300;
    el._autoSubmitListeners = [];

    const scheduleSubmit = () => {
      if (el._autoSubmitTimer) clearTimeout(el._autoSubmitTimer);
      el._autoSubmitTimer = setTimeout(() => {
        el.requestSubmit();
      }, delay);
    };

    const inputs = el.querySelectorAll<HTMLElement>("input, select, textarea");
    inputs.forEach((input) => {
      const handler = () => scheduleSubmit();
      input.addEventListener("input", handler);
      input.addEventListener("change", handler);
      el._autoSubmitListeners!.push({ el: input, handler });
    });
  },

  unmounted(el) {
    if (el._autoSubmitTimer) clearTimeout(el._autoSubmitTimer);
    el._autoSubmitListeners?.forEach(({ el: input, handler }) => {
      input.removeEventListener("input", handler);
      input.removeEventListener("change", handler);
    });
    delete el._autoSubmitListeners;
    delete el._autoSubmitTimer;
  },
};
