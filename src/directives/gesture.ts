import type { ObjectDirective } from "vue";

interface GestureElement extends HTMLElement {
  _gestureHandlers?: {
    touchstart: (e: TouchEvent) => void;
    touchmove: (e: TouchEvent) => void;
    touchend: (e: TouchEvent) => void;
  };
  _gestureState?: {
    startTouches: { x: number; y: number }[];
    startDist?: number;
    startAngle?: number;
  };
}

interface GestureBinding {
  onPinch?: (scale: number) => void;
  onRotate?: (angle: number) => void;
  onPan?: (dx: number, dy: number) => void;
}

function getTouchList(touches: TouchList): { x: number; y: number }[] {
  return Array.from(touches).map((t) => ({ x: t.clientX, y: t.clientY }));
}

function getDistance(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function getAngle(
  a: { x: number; y: number },
  b: { x: number; y: number },
): number {
  return Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
}

/**
 * v-gesture - Multi-touch gesture recognition (pinch, rotate, pan)
 */
export const vGesture: ObjectDirective<GestureElement, GestureBinding> = {
  mounted(el, binding) {
    const { onPinch, onRotate, onPan } = binding.value;

    const handlers = {
      touchstart: (e: TouchEvent) => {
        const touches = getTouchList(e.touches);
        el._gestureState = { startTouches: touches };
        if (touches.length >= 2) {
          el._gestureState.startDist = getDistance(touches[0], touches[1]);
          el._gestureState.startAngle = getAngle(touches[0], touches[1]);
        }
      },
      touchmove: (e: TouchEvent) => {
        if (!el._gestureState) return;
        const touches = getTouchList(e.touches);

        if (touches.length >= 2 && el._gestureState.startDist !== undefined) {
          const dist = getDistance(touches[0], touches[1]);
          const scale = dist / el._gestureState.startDist;
          onPinch?.(scale);

          if (el._gestureState.startAngle !== undefined) {
            const angle = getAngle(touches[0], touches[1]);
            onRotate?.(angle - el._gestureState.startAngle);
          }
          e.preventDefault();
        } else if (touches.length === 1 && onPan) {
          const dx = touches[0].x - el._gestureState.startTouches[0].x;
          const dy = touches[0].y - el._gestureState.startTouches[0].y;
          onPan(dx, dy);
        }
      },
      touchend: () => {
        el._gestureState = undefined;
      },
    };

    el._gestureHandlers = handlers;
    el.addEventListener("touchstart", handlers.touchstart, { passive: false });
    el.addEventListener("touchmove", handlers.touchmove, { passive: false });
    el.addEventListener("touchend", handlers.touchend);
  },

  unmounted(el) {
    if (el._gestureHandlers) {
      el.removeEventListener("touchstart", el._gestureHandlers.touchstart);
      el.removeEventListener("touchmove", el._gestureHandlers.touchmove);
      el.removeEventListener("touchend", el._gestureHandlers.touchend);
      delete el._gestureHandlers;
    }
  },
};
