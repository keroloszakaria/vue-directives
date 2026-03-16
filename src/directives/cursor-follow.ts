import type { ObjectDirective } from "vue";

interface CursorFollowElement extends HTMLElement {
  _cursorFollowHandler?: (e: MouseEvent) => void;
}

interface CursorFollowBinding {
  offset?: { x?: number; y?: number };
  smooth?: boolean;
  duration?: number;
}

/**
 * v-cursor-follow - Element follows the cursor
 *
 * Usage:
 *   <div v-cursor-follow>Follows cursor</div>
 *   <div v-cursor-follow="{ smooth: true, duration: 200 }">Smooth follow</div>
 */
export const vCursorFollow: ObjectDirective<
  CursorFollowElement,
  CursorFollowBinding | boolean | undefined
> = {
  mounted(el, binding) {
    if (binding.value === false) return;

    const config = typeof binding.value === "object" ? binding.value : {};
    const { offset = {}, smooth = false, duration = 150 } = config;
    const ox = offset.x ?? 0;
    const oy = offset.y ?? 0;

    el.style.position = "fixed";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    if (smooth) {
      el.style.transition = `transform ${duration}ms ease-out`;
    }

    el._cursorFollowHandler = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX + ox}px, ${e.clientY + oy}px)`;
    };

    document.addEventListener("mousemove", el._cursorFollowHandler, {
      passive: true,
    });
  },

  unmounted(el) {
    if (el._cursorFollowHandler) {
      document.removeEventListener("mousemove", el._cursorFollowHandler);
      delete el._cursorFollowHandler;
    }
  },
};
