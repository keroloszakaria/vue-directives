import type { ObjectDirective } from "vue";

interface ElementQueryElement extends HTMLElement {
  _elementQueryObserver?: ResizeObserver;
}

interface ElementQueryBreakpoint {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  class: string;
}

/**
 * v-element-query - Container query-like behavior using ResizeObserver
 *
 * Usage:
 *   <div v-element-query="[
 *     { maxWidth: 400, class: 'compact' },
 *     { minWidth: 401, maxWidth: 800, class: 'medium' },
 *     { minWidth: 801, class: 'large' }
 *   ]">
 */
export const vElementQuery: ObjectDirective<
  ElementQueryElement,
  ElementQueryBreakpoint[]
> = {
  mounted(el, binding) {
    const breakpoints = binding.value;

    el._elementQueryObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;

      breakpoints.forEach((bp) => {
        const matchWidth =
          (bp.minWidth === undefined || width >= bp.minWidth) &&
          (bp.maxWidth === undefined || width <= bp.maxWidth);
        const matchHeight =
          (bp.minHeight === undefined || height >= bp.minHeight) &&
          (bp.maxHeight === undefined || height <= bp.maxHeight);

        if (matchWidth && matchHeight) {
          el.classList.add(bp.class);
        } else {
          el.classList.remove(bp.class);
        }
      });
    });

    el._elementQueryObserver.observe(el);
  },

  unmounted(el) {
    el._elementQueryObserver?.disconnect();
    delete el._elementQueryObserver;
  },
};
