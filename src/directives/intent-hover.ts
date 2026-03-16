import type { ObjectDirective } from "vue";

interface IntentHoverElement extends HTMLElement {
  _intentHoverHandlers?: {
    mouseenter: (e: MouseEvent) => void;
    mousemove: (e: MouseEvent) => void;
    mouseleave: () => void;
  };
  _intentHoverTimer?: ReturnType<typeof setTimeout>;
  _intentHoverPoints?: { x: number; y: number; t: number }[];
}

interface IntentHoverBinding {
  onEnter: () => void;
  onLeave?: () => void;
  sensitivity?: number;
  interval?: number;
  timeout?: number;
}

/**
 * v-intent-hover - Hover with intent detection (ignores accidental mouse passes)
 *
 * Usage:
 *   <div v-intent-hover="{ onEnter: showMenu, onLeave: hideMenu, sensitivity: 7 }">
 */
export const vIntentHover: ObjectDirective<
  IntentHoverElement,
  IntentHoverBinding
> = {
  mounted(el, binding) {
    const {
      onEnter,
      onLeave,
      sensitivity = 7,
      interval = 100,
      timeout = 0,
    } = binding.value;
    let isHovering = false;

    const handlers = {
      mouseenter: (_e: MouseEvent) => {
        el._intentHoverPoints = [];
        el._intentHoverTimer = setTimeout(() => {
          checkIntent();
        }, interval);
      },
      mousemove: (e: MouseEvent) => {
        el._intentHoverPoints = el._intentHoverPoints || [];
        el._intentHoverPoints.push({
          x: e.clientX,
          y: e.clientY,
          t: Date.now(),
        });
        if (el._intentHoverPoints.length > 5) {
          el._intentHoverPoints.shift();
        }
      },
      mouseleave: () => {
        if (el._intentHoverTimer) clearTimeout(el._intentHoverTimer);
        el._intentHoverPoints = [];
        if (isHovering) {
          isHovering = false;
          onLeave?.();
        }
      },
    };

    function checkIntent() {
      const points = el._intentHoverPoints || [];
      if (points.length < 2) {
        // Not enough data, assume intent
        isHovering = true;
        onEnter();
        return;
      }

      const last = points[points.length - 1];
      const prev = points[0];
      const speed =
        (Math.hypot(last.x - prev.x, last.y - prev.y) /
          (last.t - prev.t || 1)) *
        100;

      if (speed < sensitivity) {
        isHovering = true;
        onEnter();
      } else {
        // Mouse moving too fast, re-check
        el._intentHoverTimer = setTimeout(() => checkIntent(), interval);
      }
    }

    el._intentHoverHandlers = handlers;
    el.addEventListener("mouseenter", handlers.mouseenter);
    el.addEventListener("mousemove", handlers.mousemove);
    el.addEventListener("mouseleave", handlers.mouseleave);

    if (timeout > 0) {
      setTimeout(() => {
        if (!isHovering) {
          el.removeEventListener("mouseenter", handlers.mouseenter);
          el.removeEventListener("mousemove", handlers.mousemove);
          el.removeEventListener("mouseleave", handlers.mouseleave);
        }
      }, timeout);
    }
  },

  unmounted(el) {
    if (el._intentHoverTimer) clearTimeout(el._intentHoverTimer);
    if (el._intentHoverHandlers) {
      el.removeEventListener("mouseenter", el._intentHoverHandlers.mouseenter);
      el.removeEventListener("mousemove", el._intentHoverHandlers.mousemove);
      el.removeEventListener("mouseleave", el._intentHoverHandlers.mouseleave);
      delete el._intentHoverHandlers;
    }
    delete el._intentHoverPoints;
  },
};
