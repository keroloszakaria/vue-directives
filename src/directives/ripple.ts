import type { ObjectDirective } from "vue";

interface RippleElement extends HTMLElement {
  _rippleHandler?: (event: MouseEvent) => void;
}

interface RippleBinding {
  color?: string;
  duration?: number;
  disabled?: boolean;
}

const RIPPLE_KEYFRAMES = `
@keyframes v-ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

let styleInjected = false;

function injectStyles() {
  if (styleInjected) return;
  const style = document.createElement("style");
  style.textContent = RIPPLE_KEYFRAMES;
  document.head.appendChild(style);
  styleInjected = true;
}

/**
 * v-ripple - Material Design ripple effect on click
 *
 * Usage:
 *   <button v-ripple>Click me</button>
 *   <button v-ripple="{ color: 'rgba(255,255,255,0.3)', duration: 600 }">Click</button>
 */
export const vRipple: ObjectDirective<
  RippleElement,
  RippleBinding | boolean | undefined
> = {
  mounted(el, binding) {
    injectStyles();

    const value = typeof binding.value === "object" ? binding.value : {};
    const color = value.color ?? "rgba(255, 255, 255, 0.4)";
    const duration = value.duration ?? 500;
    const disabled =
      typeof binding.value === "boolean"
        ? !binding.value
        : (value.disabled ?? false);

    if (disabled) return;

    el.style.position = el.style.position || "relative";
    el.style.overflow = "hidden";

    el._rippleHandler = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: ${color};
        transform: scale(0);
        animation: v-ripple-effect ${duration}ms ease-out;
        pointer-events: none;
      `;

      el.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, duration);
    };

    el.addEventListener("click", el._rippleHandler);
  },

  unmounted(el) {
    if (el._rippleHandler) {
      el.removeEventListener("click", el._rippleHandler);
      delete el._rippleHandler;
    }
  },
};
