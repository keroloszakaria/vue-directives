import type { ObjectDirective } from "vue";

interface EnterSubmitElement extends HTMLElement {
  _enterSubmitHandler?: (e: KeyboardEvent) => void;
}

/**
 * v-enter-submit - Submit form on Enter key press
 *
 * Usage:
 *   <form v-enter-submit @submit.prevent="onSubmit">
 *   <input v-enter-submit="onSubmit" />
 */
export const vEnterSubmit: ObjectDirective<
  EnterSubmitElement,
  (() => void) | undefined
> = {
  mounted(el, binding) {
    el._enterSubmitHandler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if ((e.target as HTMLElement).tagName === "TEXTAREA") return;

      e.preventDefault();
      if (typeof binding.value === "function") {
        binding.value();
      } else {
        const form = el.closest("form") || (el.tagName === "FORM" ? el : null);
        if (form && form instanceof HTMLFormElement) {
          form.requestSubmit();
        }
      }
    };
    el.addEventListener("keydown", el._enterSubmitHandler);
  },

  unmounted(el) {
    if (el._enterSubmitHandler) {
      el.removeEventListener("keydown", el._enterSubmitHandler);
      delete el._enterSubmitHandler;
    }
  },
};
