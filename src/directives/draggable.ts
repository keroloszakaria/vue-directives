import type { ObjectDirective } from "vue";

interface DraggableElement extends HTMLElement {
  _dragMouseDown?: (event: MouseEvent) => void;
  _dragTouchStart?: (event: TouchEvent) => void;
  _dragCleanup?: () => void;
}

interface DraggableBinding {
  handle?: string;
  bounds?: "parent" | "window" | string;
  axis?: "x" | "y" | "both";
  onDragStart?: (pos: { x: number; y: number }) => void;
  onDrag?: (pos: { x: number; y: number }) => void;
  onDragEnd?: (pos: { x: number; y: number }) => void;
  disabled?: boolean;
}

/**
 * v-draggable - Make element draggable
 *
 * Usage:
 *   <div v-draggable>Drag me</div>
 *   <div v-draggable="{ handle: '.header', bounds: 'parent', axis: 'x' }">...</div>
 */
export const vDraggable: ObjectDirective<
  DraggableElement,
  DraggableBinding | boolean | undefined
> = {
  mounted(el, binding) {
    const opts = typeof binding.value === "object" ? binding.value : {};
    if (typeof binding.value === "boolean" && !binding.value) return;
    if (opts.disabled) return;

    const axis = opts.axis ?? "both";
    const boundsConfig = opts.bounds;

    el.style.position = el.style.position || "relative";
    el.style.cursor = "grab";

    const handleEl = opts.handle
      ? (el.querySelector<HTMLElement>(opts.handle) ?? el)
      : el;

    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;

    const getBounds = () => {
      if (!boundsConfig) return null;
      if (boundsConfig === "window") {
        return {
          left: 0,
          top: 0,
          right: window.innerWidth,
          bottom: window.innerHeight,
        };
      }
      const boundEl =
        boundsConfig === "parent"
          ? el.parentElement
          : document.querySelector<HTMLElement>(boundsConfig);
      if (boundEl) {
        const rect = boundEl.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
        };
      }
      return null;
    };

    const clamp = (val: number, min: number, max: number) =>
      Math.min(Math.max(val, min), max);

    const onMove = (clientX: number, clientY: number) => {
      let dx = clientX - startX;
      let dy = clientY - startY;

      if (axis === "x") dy = 0;
      if (axis === "y") dx = 0;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      const bounds = getBounds();
      if (bounds) {
        const elRect = el.getBoundingClientRect();
        const parentRect = el.offsetParent?.getBoundingClientRect() ?? {
          left: 0,
          top: 0,
        };
        newLeft = clamp(
          newLeft,
          bounds.left - parentRect.left,
          bounds.right - parentRect.left - elRect.width,
        );
        newTop = clamp(
          newTop,
          bounds.top - parentRect.top,
          bounds.bottom - parentRect.top - elRect.height,
        );
      }

      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
      opts.onDrag?.({ x: newLeft, y: newTop });
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const onEnd = () => {
      el.style.cursor = "grab";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onEnd);
      opts.onDragEnd?.({
        x: parseInt(el.style.left) || 0,
        y: parseInt(el.style.top) || 0,
      });
    };

    el._dragMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = parseInt(el.style.left) || 0;
      initialTop = parseInt(el.style.top) || 0;
      el.style.cursor = "grabbing";
      opts.onDragStart?.({ x: initialLeft, y: initialTop });
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onEnd);
    };

    el._dragTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialLeft = parseInt(el.style.left) || 0;
      initialTop = parseInt(el.style.top) || 0;
      opts.onDragStart?.({ x: initialLeft, y: initialTop });
      document.addEventListener("touchmove", onTouchMove, { passive: false });
      document.addEventListener("touchend", onEnd);
    };

    handleEl.addEventListener("mousedown", el._dragMouseDown);
    handleEl.addEventListener("touchstart", el._dragTouchStart, {
      passive: true,
    });

    el._dragCleanup = () => {
      handleEl.removeEventListener("mousedown", el._dragMouseDown!);
      handleEl.removeEventListener("touchstart", el._dragTouchStart!);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onEnd);
    };
  },

  unmounted(el) {
    el._dragCleanup?.();
    delete el._dragMouseDown;
    delete el._dragTouchStart;
    delete el._dragCleanup;
  },
};
