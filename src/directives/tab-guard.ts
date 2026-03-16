import type { ObjectDirective } from "vue";

interface TabGuardElement extends HTMLElement {
  _tabGuardHandler?: (e: KeyboardEvent) => void;
}

/**
 * v-tab-guard - Guard tab navigation to prevent focus from leaving element
 *
 * Usage:
 *   <div v-tab-guard>Focusable content</div>
 */
export const vTabGuard: ObjectDirective<TabGuardElement, boolean | undefined> =
  {
    mounted(el, binding) {
      if (binding.value === false) return;

      if (!el.getAttribute("tabindex")) {
        el.setAttribute("tabindex", "-1");
      }

      el._tabGuardHandler = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        const focusable = el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      el.addEventListener("keydown", el._tabGuardHandler);
    },

    unmounted(el) {
      if (el._tabGuardHandler) {
        el.removeEventListener("keydown", el._tabGuardHandler);
        delete el._tabGuardHandler;
      }
    },
  };
