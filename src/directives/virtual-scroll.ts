import type { ObjectDirective } from "vue";

interface VirtualScrollElement extends HTMLElement {
  _vsCleanup?: () => void;
}

interface VirtualScrollBinding {
  items: any[];
  itemHeight: number;
  renderItem: (item: any, index: number) => string;
  buffer?: number;
  containerHeight?: number;
}

/**
 * v-virtual-scroll - Efficiently render large lists by only rendering visible items
 *
 * Usage:
 *   <div v-virtual-scroll="{ items: list, itemHeight: 40, renderItem: renderFn }"></div>
 */
export const vVirtualScroll: ObjectDirective<
  VirtualScrollElement,
  VirtualScrollBinding
> = {
  mounted(el, binding) {
    const {
      items,
      itemHeight,
      renderItem,
      buffer = 5,
      containerHeight,
    } = binding.value;

    const height = containerHeight ?? el.clientHeight;
    el.style.overflow = "auto";
    el.style.position = "relative";
    if (containerHeight) el.style.height = `${containerHeight}px`;

    const totalHeight = items.length * itemHeight;

    const spacer = document.createElement("div");
    spacer.style.height = `${totalHeight}px`;
    spacer.style.position = "relative";
    el.appendChild(spacer);

    const content = document.createElement("div");
    content.style.position = "absolute";
    content.style.left = "0";
    content.style.right = "0";
    content.style.top = "0";
    spacer.appendChild(content);

    const render = () => {
      const scrollTop = el.scrollTop;
      const startIdx = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
      const visibleCount = Math.ceil(height / itemHeight) + buffer * 2;
      const endIdx = Math.min(items.length, startIdx + visibleCount);

      content.style.top = `${startIdx * itemHeight}px`;
      content.innerHTML = "";

      for (let i = startIdx; i < endIdx; i++) {
        const itemEl = document.createElement("div");
        itemEl.style.height = `${itemHeight}px`;
        itemEl.innerHTML = renderItem(items[i], i);
        content.appendChild(itemEl);
      }
    };

    render();
    el.addEventListener("scroll", render, { passive: true });

    el._vsCleanup = () => {
      el.removeEventListener("scroll", render);
    };
  },

  updated(el, binding) {
    el._vsCleanup?.();
    el.innerHTML = "";
    vVirtualScroll.mounted!(el, binding as any, null as any, null as any);
  },

  unmounted(el) {
    el._vsCleanup?.();
    delete el._vsCleanup;
  },
};
