import type { ObjectDirective } from "vue";

interface CaseElement extends HTMLInputElement {
  _caseHandler?: (event: Event) => void;
}

/**
 * v-uppercase - Auto-transform input text to uppercase
 *
 * Usage: <input v-uppercase />
 */
export const vUppercase: ObjectDirective<CaseElement> = {
  mounted(el) {
    el._caseHandler = () => {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      el.value = el.value.toUpperCase();
      el.setSelectionRange(start, end);
    };
    el.addEventListener("input", el._caseHandler);
  },
  unmounted(el) {
    if (el._caseHandler) {
      el.removeEventListener("input", el._caseHandler);
      delete el._caseHandler;
    }
  },
};

/**
 * v-lowercase - Auto-transform input text to lowercase
 *
 * Usage: <input v-lowercase />
 */
export const vLowercase: ObjectDirective<CaseElement> = {
  mounted(el) {
    el._caseHandler = () => {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      el.value = el.value.toLowerCase();
      el.setSelectionRange(start, end);
    };
    el.addEventListener("input", el._caseHandler);
  },
  unmounted(el) {
    if (el._caseHandler) {
      el.removeEventListener("input", el._caseHandler);
      delete el._caseHandler;
    }
  },
};
