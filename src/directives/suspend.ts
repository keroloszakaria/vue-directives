import type { ObjectDirective } from "vue";

interface SuspendElement extends HTMLElement {
  _suspendOriginal?: string;
}

/**
 * v-suspend - Show loading placeholder until a promise resolves
 *
 * Usage:
 *   <div v-suspend="fetchDataPromise">Content shown after resolve</div>
 */
export const vSuspend: ObjectDirective<SuspendElement, Promise<any> | boolean> =
  {
    mounted(el, binding) {
      el._suspendOriginal = el.innerHTML;

      if (binding.value instanceof Promise) {
        el.innerHTML = `<div class="v-suspend-loading" style="display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0.5">Loading...</div>`;

        binding.value
          .then(() => {
            el.innerHTML = el._suspendOriginal || "";
          })
          .catch(() => {
            el.innerHTML = `<div class="v-suspend-error" style="color:red;padding:0.5rem">Failed to load</div>`;
          });
      } else if (binding.value === true) {
        el.innerHTML = `<div class="v-suspend-loading" style="display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0.5">Loading...</div>`;
      }
    },

    updated(el, binding) {
      if (binding.value === false && binding.oldValue === true) {
        el.innerHTML = el._suspendOriginal || "";
      }
    },

    unmounted(el) {
      delete el._suspendOriginal;
    },
  };
