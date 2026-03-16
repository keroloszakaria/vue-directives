import type { ObjectDirective } from "vue";

interface DragSortElement extends HTMLElement {
  _dragSortHandlers?: {
    dragstart: (e: DragEvent) => void;
    dragover: (e: DragEvent) => void;
    drop: (e: DragEvent) => void;
    dragend: () => void;
  };
}

interface DragSortBinding {
  onSort: (fromIndex: number, toIndex: number) => void;
  handle?: string;
  itemSelector?: string;
}

/**
 * v-drag-sort - Drag-to-sort list items
 *
 * Usage:
 *   <ul v-drag-sort="{ onSort: handleSort }"><li>...</li></ul>
 */
export const vDragSort: ObjectDirective<DragSortElement, DragSortBinding> = {
  mounted(el, binding) {
    const { onSort, itemSelector = ":scope > *" } = binding.value;
    let draggedIndex = -1;

    const getItems = () =>
      Array.from(el.querySelectorAll<HTMLElement>(itemSelector));

    const handlers = {
      dragstart: (e: DragEvent) => {
        const target = (e.target as HTMLElement).closest(
          itemSelector,
        ) as HTMLElement | null;
        if (!target) return;
        const items = getItems();
        draggedIndex = items.indexOf(target);
        target.style.opacity = "0.5";
        e.dataTransfer?.setData("text/plain", "");
      },
      dragover: (e: DragEvent) => {
        e.preventDefault();
        const target = (e.target as HTMLElement).closest(
          itemSelector,
        ) as HTMLElement | null;
        if (!target) return;
        const items = getItems();
        const overIndex = items.indexOf(target);
        items.forEach((item) => item.classList.remove("v-drag-sort-over"));
        if (overIndex !== draggedIndex) {
          target.classList.add("v-drag-sort-over");
        }
      },
      drop: (e: DragEvent) => {
        e.preventDefault();
        const target = (e.target as HTMLElement).closest(
          itemSelector,
        ) as HTMLElement | null;
        if (!target) return;
        const items = getItems();
        const toIndex = items.indexOf(target);
        items.forEach((item) => item.classList.remove("v-drag-sort-over"));
        if (draggedIndex !== -1 && draggedIndex !== toIndex) {
          onSort(draggedIndex, toIndex);
        }
      },
      dragend: () => {
        getItems().forEach((item) => {
          item.style.opacity = "";
          item.classList.remove("v-drag-sort-over");
        });
        draggedIndex = -1;
      },
    };

    el._dragSortHandlers = handlers;

    // Make children draggable
    getItems().forEach((item) => {
      item.draggable = true;
    });

    el.addEventListener("dragstart", handlers.dragstart);
    el.addEventListener("dragover", handlers.dragover);
    el.addEventListener("drop", handlers.drop);
    el.addEventListener("dragend", handlers.dragend);
  },

  unmounted(el) {
    if (el._dragSortHandlers) {
      el.removeEventListener("dragstart", el._dragSortHandlers.dragstart);
      el.removeEventListener("dragover", el._dragSortHandlers.dragover);
      el.removeEventListener("drop", el._dragSortHandlers.drop);
      el.removeEventListener("dragend", el._dragSortHandlers.dragend);
      delete el._dragSortHandlers;
    }
  },
};
