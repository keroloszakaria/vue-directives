import type { ObjectDirective } from "vue";

interface AriaBinding {
  role?: string;
  label?: string;
  describedby?: string;
  expanded?: boolean;
  hidden?: boolean;
  live?: "polite" | "assertive" | "off";
  controls?: string;
  current?: string | boolean;
  [key: string]: string | boolean | undefined;
}

/**
 * v-aria - Auto-apply ARIA attributes
 *
 * Usage:
 *   <div v-aria="{ role: 'button', label: 'Close dialog' }">X</div>
 */
export const vAria: ObjectDirective<HTMLElement, AriaBinding> = {
  mounted(el, binding) {
    applyAria(el, binding.value);
  },
  updated(el, binding) {
    applyAria(el, binding.value);
  },
};

function applyAria(el: HTMLElement, attrs: AriaBinding) {
  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined) continue;
    if (key === "role") {
      el.setAttribute("role", String(value));
    } else {
      el.setAttribute(`aria-${key}`, String(value));
    }
  }
}
