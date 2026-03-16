import type { ObjectDirective } from "vue";

interface TruncateElement extends HTMLElement {
  _truncateOriginal?: string;
}

interface TruncateBinding {
  length?: number;
  lines?: number;
  ellipsis?: string;
}

/**
 * v-truncate - Truncate text with ellipsis
 *
 * Usage:
 *   <p v-truncate="100">Long text...</p>              <!-- by character count -->
 *   <p v-truncate="{ lines: 3 }">Multi-line text</p>  <!-- by line count (CSS) -->
 *   <p v-truncate="{ length: 50, ellipsis: '...' }">Text</p>
 */
export const vTruncate: ObjectDirective<
  TruncateElement,
  number | TruncateBinding
> = {
  mounted(el, binding) {
    applyTruncate(el, binding.value);
  },

  updated(el, binding) {
    // Restore original text if doing character truncation
    if (el._truncateOriginal !== undefined) {
      el.textContent = el._truncateOriginal;
    }
    applyTruncate(el, binding.value);
  },

  unmounted(el) {
    if (el._truncateOriginal !== undefined) {
      el.textContent = el._truncateOriginal;
    }
    delete el._truncateOriginal;
  },
};

function applyTruncate(el: TruncateElement, value: number | TruncateBinding) {
  if (typeof value === "number") {
    // Character-based truncation
    const original = el.textContent ?? "";
    el._truncateOriginal = original;
    if (original.length > value) {
      el.textContent = original.slice(0, value) + "...";
    }
    return;
  }

  if (value.lines) {
    // CSS line-clamp truncation
    el.style.display = "-webkit-box";
    el.style.webkitLineClamp = String(value.lines);
    (el.style as any)["-webkit-box-orient"] = "vertical";
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    return;
  }

  if (value.length) {
    const original = el.textContent ?? "";
    el._truncateOriginal = original;
    const ellipsis = value.ellipsis ?? "...";
    if (original.length > value.length) {
      el.textContent = original.slice(0, value.length) + ellipsis;
    }
  }
}
