import type { ObjectDirective } from "vue";

/**
 * v-auto-aria-label - Auto-generate ARIA labels from element content or attributes
 *
 * Usage:
 *   <button v-auto-aria-label>Save Document</button>
 *   <input v-auto-aria-label="'Email address'" />
 */
export const vAutoAriaLabel: ObjectDirective<HTMLElement, string | undefined> =
  {
    mounted(el, binding) {
      applyLabel(el, binding.value);
    },
    updated(el, binding) {
      applyLabel(el, binding.value);
    },
  };

function applyLabel(el: HTMLElement, customLabel?: string) {
  if (el.getAttribute("aria-label")) return; // Don't override explicit labels

  if (customLabel) {
    el.setAttribute("aria-label", customLabel);
    return;
  }

  // Try to generate from content
  const text = el.textContent?.trim();
  if (text) {
    el.setAttribute("aria-label", text);
    return;
  }

  // Try title or placeholder
  const title = el.getAttribute("title");
  if (title) {
    el.setAttribute("aria-label", title);
    return;
  }

  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    const placeholder = el.getAttribute("placeholder");
    if (placeholder) {
      el.setAttribute("aria-label", placeholder);
    }
  }
}
