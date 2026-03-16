import type { ObjectDirective } from "vue";

interface AutoLayoutElement extends HTMLElement {
  _autoLayoutObserver?: ResizeObserver;
}

interface AutoLayoutBinding {
  columns?: { minWidth: number };
  gap?: string;
  type?: "grid" | "flex";
}

/**
 * v-auto-layout - Auto layout calculation based on container size
 *
 * Usage:
 *   <div v-auto-layout="{ columns: { minWidth: 250 }, gap: '16px' }">
 *     <div>Item 1</div><div>Item 2</div>
 *   </div>
 */
export const vAutoLayout: ObjectDirective<
  AutoLayoutElement,
  AutoLayoutBinding
> = {
  mounted(el, binding) {
    const { columns, gap = "16px", type = "grid" } = binding.value || {};

    if (type === "grid" && columns) {
      el.style.display = "grid";
      el.style.gap = gap;

      el._autoLayoutObserver = new ResizeObserver((entries) => {
        const width = entries[0]?.contentRect.width ?? el.clientWidth;
        const cols = Math.max(1, Math.floor(width / columns.minWidth));
        el.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      });

      el._autoLayoutObserver.observe(el);
    } else if (type === "flex") {
      el.style.display = "flex";
      el.style.flexWrap = "wrap";
      el.style.gap = gap;

      if (columns) {
        const children = el.querySelectorAll<HTMLElement>(":scope > *");
        children.forEach((child) => {
          child.style.flex = `1 1 ${columns.minWidth}px`;
        });
      }
    }
  },

  unmounted(el) {
    el._autoLayoutObserver?.disconnect();
    delete el._autoLayoutObserver;
  },
};
