import type { ObjectDirective } from "vue";

/**
 * v-feature-flag - Show/hide element based on feature flag
 *
 * Usage:
 *   <div v-feature-flag="'new-dashboard'">New Dashboard</div>
 *   <div v-feature-flag="['feature-a', 'feature-b']">Needs both</div>
 *
 * Setup:
 *   import { setFeatureFlags } from 'vue-directives-pro';
 *   setFeatureFlags({ 'new-dashboard': true, 'beta-feature': false });
 */

let flags: Record<string, boolean> = {};

export function setFeatureFlags(newFlags: Record<string, boolean>) {
  flags = { ...newFlags };
}

export function getFeatureFlags(): Record<string, boolean> {
  return { ...flags };
}

export function setFeatureFlag(key: string, value: boolean) {
  flags[key] = value;
}

export const vFeatureFlag: ObjectDirective<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    checkFlag(el, binding.value);
  },
  updated(el, binding) {
    checkFlag(el, binding.value);
  },
};

function checkFlag(el: HTMLElement, value: string | string[]) {
  const requiredFlags = Array.isArray(value) ? value : [value];
  const allEnabled = requiredFlags.every((flag) => flags[flag] === true);

  if (allEnabled) {
    el.style.display = "";
  } else {
    el.style.display = "none";
  }
}
