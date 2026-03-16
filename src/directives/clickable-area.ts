import type { ObjectDirective } from "vue";

/**
 * v-clickable-area - Expand clickable area beyond element bounds
 *
 * Usage:
 *   <button v-clickable-area="20">Small button</button>
 *   <button v-clickable-area="{ top: 10, right: 20, bottom: 10, left: 20 }">Button</button>
 */
export const vClickableArea: ObjectDirective<
  HTMLElement,
  number | { top?: number; right?: number; bottom?: number; left?: number }
> = {
  mounted(el, binding) {
    const value = binding.value;
    let top: number, right: number, bottom: number, left: number;

    if (typeof value === "number") {
      top = right = bottom = left = value;
    } else {
      top = value.top ?? 0;
      right = value.right ?? 0;
      bottom = value.bottom ?? 0;
      left = value.left ?? 0;
    }

    el.style.position = el.style.position || "relative";

    // Use ::after pseudo-element approach via inline style workaround
    const existingPadding = {
      top: parseInt(getComputedStyle(el).paddingTop) || 0,
      right: parseInt(getComputedStyle(el).paddingRight) || 0,
      bottom: parseInt(getComputedStyle(el).paddingBottom) || 0,
      left: parseInt(getComputedStyle(el).paddingLeft) || 0,
    };

    el.style.margin = `-${top}px -${right}px -${bottom}px -${left}px`;
    el.style.padding = `${existingPadding.top + top}px ${existingPadding.right + right}px ${existingPadding.bottom + bottom}px ${existingPadding.left + left}px`;
  },
};
