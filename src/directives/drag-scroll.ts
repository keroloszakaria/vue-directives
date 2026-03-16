import type { ObjectDirective } from "vue";

interface DragScrollElement extends HTMLElement {
  _dragScroll?: {
    onMouseDown: (e: MouseEvent) => void;
    onMouseMove: (e: MouseEvent) => void;
    onMouseUp: () => void;
    isDown: boolean;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  };
}

/**
 * v-drag-scroll - Enable scroll by dragging
 */
export const vDragScroll: ObjectDirective<
  DragScrollElement,
  boolean | undefined
> = {
  mounted(el) {
    const state = {
      isDown: false,
      startX: 0,
      startY: 0,
      scrollLeft: 0,
      scrollTop: 0,
      onMouseDown(e: MouseEvent) {
        state.isDown = true;
        el.style.cursor = "grabbing";
        el.style.userSelect = "none";
        state.startX = e.pageX - el.offsetLeft;
        state.startY = e.pageY - el.offsetTop;
        state.scrollLeft = el.scrollLeft;
        state.scrollTop = el.scrollTop;
      },
      onMouseMove(e: MouseEvent) {
        if (!state.isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const y = e.pageY - el.offsetTop;
        el.scrollLeft = state.scrollLeft - (x - state.startX);
        el.scrollTop = state.scrollTop - (y - state.startY);
      },
      onMouseUp() {
        state.isDown = false;
        el.style.cursor = "grab";
        el.style.removeProperty("user-select");
      },
    };

    el._dragScroll = state;
    el.style.cursor = "grab";
    el.addEventListener("mousedown", state.onMouseDown);
    document.addEventListener("mousemove", state.onMouseMove);
    document.addEventListener("mouseup", state.onMouseUp);
  },

  unmounted(el) {
    if (el._dragScroll) {
      el.removeEventListener("mousedown", el._dragScroll.onMouseDown);
      document.removeEventListener("mousemove", el._dragScroll.onMouseMove);
      document.removeEventListener("mouseup", el._dragScroll.onMouseUp);
      el.style.removeProperty("cursor");
      delete el._dragScroll;
    }
  },
};
