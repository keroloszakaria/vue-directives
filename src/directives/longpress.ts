import type { ObjectDirective } from "vue";

interface LongpressElement extends HTMLElement {
  _longpressStart?: (event: MouseEvent | TouchEvent) => void;
  _longpressEnd?: () => void;
  _longpressTimer?: ReturnType<typeof setTimeout>;
}

interface LongpressBinding {
  handler: (event: MouseEvent | TouchEvent) => void;
  duration?: number;
}

/**
 * v-longpress - Trigger a handler on long press
 *
 * Usage:
 *   <button v-longpress="{ handler: onLongPress }">Hold me</button>
 *   <button v-longpress="{ handler: onLongPress, duration: 1000 }">Hold</button>
 */
export const vLongpress: ObjectDirective<
  LongpressElement,
  LongpressBinding | ((event: MouseEvent | TouchEvent) => void)
> = {
  mounted(el, binding) {
    const value = binding.value;
    const handler = typeof value === "function" ? value : value.handler;
    const duration = typeof value === "object" ? (value.duration ?? 500) : 500;

    el._longpressStart = (event: MouseEvent | TouchEvent) => {
      if (el._longpressTimer) clearTimeout(el._longpressTimer);
      el._longpressTimer = setTimeout(() => {
        handler(event);
      }, duration);
    };

    el._longpressEnd = () => {
      if (el._longpressTimer) {
        clearTimeout(el._longpressTimer);
        el._longpressTimer = undefined;
      }
    };

    el.addEventListener("mousedown", el._longpressStart);
    el.addEventListener("touchstart", el._longpressStart, { passive: true });
    el.addEventListener("mouseup", el._longpressEnd);
    el.addEventListener("mouseleave", el._longpressEnd);
    el.addEventListener("touchend", el._longpressEnd);
    el.addEventListener("touchcancel", el._longpressEnd);
  },

  unmounted(el) {
    if (el._longpressStart) {
      el.removeEventListener("mousedown", el._longpressStart);
      el.removeEventListener("touchstart", el._longpressStart);
    }
    if (el._longpressEnd) {
      el.removeEventListener("mouseup", el._longpressEnd);
      el.removeEventListener("mouseleave", el._longpressEnd);
      el.removeEventListener("touchend", el._longpressEnd);
      el.removeEventListener("touchcancel", el._longpressEnd);
    }
    if (el._longpressTimer) {
      clearTimeout(el._longpressTimer);
    }
    delete el._longpressStart;
    delete el._longpressEnd;
    delete el._longpressTimer;
  },
};
