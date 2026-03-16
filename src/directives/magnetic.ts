import type { ObjectDirective } from "vue";

interface MagneticElement extends HTMLElement {
  _magneticHandlers?: {
    mousemove: (e: MouseEvent) => void;
    mouseleave: () => void;
  };
}

interface MagneticBinding {
  strength?: number;
  distance?: number;
}

/**
 * v-magnetic - Magnetic attraction effect when cursor is near element
 *
 * Usage:
 *   <button v-magnetic>Click me</button>
 *   <button v-magnetic="{ strength: 0.5, distance: 100 }">Click me</button>
 */
export const vMagnetic: ObjectDirective<
  MagneticElement,
  MagneticBinding | undefined
> = {
  mounted(el, binding) {
    const { strength = 0.3, distance = 80 } = binding.value || {};

    el.style.transition = "transform 0.2s ease-out";

    const handlers = {
      mousemove: (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        if (dist < distance) {
          const pull = (1 - dist / distance) * strength;
          el.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        } else {
          el.style.transform = "";
        }
      },
      mouseleave: () => {
        el.style.transform = "";
      },
    };

    el._magneticHandlers = handlers;
    document.addEventListener("mousemove", handlers.mousemove, {
      passive: true,
    });
    el.addEventListener("mouseleave", handlers.mouseleave);
  },

  unmounted(el) {
    if (el._magneticHandlers) {
      document.removeEventListener("mousemove", el._magneticHandlers.mousemove);
      el.removeEventListener("mouseleave", el._magneticHandlers.mouseleave);
      delete el._magneticHandlers;
    }
    el.style.transform = "";
  },
};
