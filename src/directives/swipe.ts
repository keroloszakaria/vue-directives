import type { ObjectDirective } from "vue";

interface SwipeElement extends HTMLElement {
  _swipeTouchStart?: (event: TouchEvent) => void;
  _swipeTouchEnd?: (event: TouchEvent) => void;
  _swipeStartX?: number;
  _swipeStartY?: number;
  _swipeStartTime?: number;
}

type SwipeDirection = "left" | "right" | "up" | "down";

interface SwipeBinding {
  onSwipe?: (direction: SwipeDirection) => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  timeout?: number;
}

/**
 * v-swipe - Detect swipe gestures
 *
 * Usage:
 *   <div v-swipe="{ onSwipe: handleSwipe }" />
 *   <div v-swipe="{ onSwipeLeft: goNext, onSwipeRight: goPrev, threshold: 50 }" />
 */
export const vSwipe: ObjectDirective<SwipeElement, SwipeBinding> = {
  mounted(el, binding) {
    const {
      onSwipe,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
      threshold = 50,
      timeout = 500,
    } = binding.value;

    el._swipeTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      el._swipeStartX = touch.clientX;
      el._swipeStartY = touch.clientY;
      el._swipeStartTime = Date.now();
    };

    el._swipeTouchEnd = (e: TouchEvent) => {
      if (
        el._swipeStartX === undefined ||
        el._swipeStartY === undefined ||
        el._swipeStartTime === undefined
      )
        return;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - el._swipeStartX;
      const dy = touch.clientY - el._swipeStartY;
      const elapsed = Date.now() - el._swipeStartTime;

      if (elapsed > timeout) return;

      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < threshold && absDy < threshold) return;

      let direction: SwipeDirection;

      if (absDx > absDy) {
        direction = dx > 0 ? "right" : "left";
      } else {
        direction = dy > 0 ? "down" : "up";
      }

      onSwipe?.(direction);

      switch (direction) {
        case "left":
          onSwipeLeft?.();
          break;
        case "right":
          onSwipeRight?.();
          break;
        case "up":
          onSwipeUp?.();
          break;
        case "down":
          onSwipeDown?.();
          break;
      }
    };

    el.addEventListener("touchstart", el._swipeTouchStart, { passive: true });
    el.addEventListener("touchend", el._swipeTouchEnd, { passive: true });
  },

  unmounted(el) {
    if (el._swipeTouchStart)
      el.removeEventListener("touchstart", el._swipeTouchStart);
    if (el._swipeTouchEnd)
      el.removeEventListener("touchend", el._swipeTouchEnd);
    delete el._swipeTouchStart;
    delete el._swipeTouchEnd;
    delete el._swipeStartX;
    delete el._swipeStartY;
    delete el._swipeStartTime;
  },
};
