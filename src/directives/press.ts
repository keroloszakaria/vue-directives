import type { ObjectDirective } from "vue";

interface PressElement extends HTMLElement {
  _pressHandlers?: {
    pointerdown: (e: PointerEvent) => void;
    pointerup: (e: PointerEvent) => void;
    pointercancel: (e: PointerEvent) => void;
  };
  _pressTimer?: ReturnType<typeof setTimeout>;
}

interface PressBinding {
  onPress?: () => void;
  onRelease?: () => void;
  onLong?: () => void;
  longDelay?: number;
}

/**
 * v-press - Generic press handler with press/release/long-press events
 */
export const vPress: ObjectDirective<PressElement, PressBinding> = {
  mounted(el, binding) {
    const { onPress, onRelease, onLong, longDelay = 500 } = binding.value;

    const handlers = {
      pointerdown: (_e: PointerEvent) => {
        onPress?.();
        if (onLong) {
          el._pressTimer = setTimeout(() => {
            onLong();
          }, longDelay);
        }
      },
      pointerup: (_e: PointerEvent) => {
        if (el._pressTimer) clearTimeout(el._pressTimer);
        onRelease?.();
      },
      pointercancel: (_e: PointerEvent) => {
        if (el._pressTimer) clearTimeout(el._pressTimer);
      },
    };

    el._pressHandlers = handlers;
    el.addEventListener("pointerdown", handlers.pointerdown);
    el.addEventListener("pointerup", handlers.pointerup);
    el.addEventListener("pointercancel", handlers.pointercancel);
  },

  unmounted(el) {
    if (el._pressTimer) clearTimeout(el._pressTimer);
    if (el._pressHandlers) {
      el.removeEventListener("pointerdown", el._pressHandlers.pointerdown);
      el.removeEventListener("pointerup", el._pressHandlers.pointerup);
      el.removeEventListener("pointercancel", el._pressHandlers.pointercancel);
      delete el._pressHandlers;
    }
  },
};
