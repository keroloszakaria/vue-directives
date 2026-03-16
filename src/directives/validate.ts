import type { ObjectDirective } from "vue";

interface ValidateElement extends HTMLInputElement {
  _validateHandler?: () => void;
  _validateStyle?: HTMLStyleElement;
}

interface ValidateRule {
  test: (value: string) => boolean;
  message: string;
}

interface ValidateBinding {
  rules: ValidateRule[];
  errorClass?: string;
  onError?: (errors: string[]) => void;
  onValid?: () => void;
  trigger?: "input" | "blur" | "change";
}

/**
 * v-validate - Input validation with custom rules
 *
 * Usage:
 *   <input v-validate="{ rules: [{ test: v => v.length >= 3, message: 'Min 3 chars' }] }" />
 */
export const vValidate: ObjectDirective<ValidateElement, ValidateBinding> = {
  mounted(el, binding) {
    const {
      rules,
      errorClass = "v-validate-error",
      onError,
      onValid,
      trigger = "blur",
    } = binding.value;

    el._validateHandler = () => {
      const val = el.value;
      const errors = rules.filter((r) => !r.test(val)).map((r) => r.message);

      if (errors.length > 0) {
        el.classList.add(errorClass);
        el.setCustomValidity(errors[0]);
        onError?.(errors);
      } else {
        el.classList.remove(errorClass);
        el.setCustomValidity("");
        onValid?.();
      }
    };

    el.addEventListener(trigger, el._validateHandler);
  },

  updated(el, binding) {
    if (el._validateHandler && binding.value !== binding.oldValue) {
      el.removeEventListener(
        binding.oldValue?.trigger ?? "blur",
        el._validateHandler,
      );
      // Re-mount with new binding
      vValidate.mounted!(el, binding as any, null as any, null as any);
    }
  },

  unmounted(el, binding) {
    if (el._validateHandler) {
      el.removeEventListener(
        binding.value?.trigger ?? "blur",
        el._validateHandler,
      );
      delete el._validateHandler;
    }
  },
};
