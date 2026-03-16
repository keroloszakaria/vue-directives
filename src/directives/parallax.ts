import type { ObjectDirective } from "vue";

interface ParallaxElement extends HTMLElement {
  _parallaxHandler?: () => void;
}

interface ParallaxBinding {
  speed?: number;
  direction?: "vertical" | "horizontal";
}

/**
 * v-parallax - Parallax scroll effect on element
 *
 * Usage:
 *   <div v-parallax>Content</div>
 *   <div v-parallax="{ speed: 0.5 }">Slow parallax</div>
 *   <div v-parallax="{ speed: 0.3, direction: 'horizontal' }">Horizontal parallax</div>
 */
export const vParallax: ObjectDirective<
  ParallaxElement,
  number | ParallaxBinding | undefined
> = {
  mounted(el, binding) {
    const value = binding.value;
    const speed =
      typeof value === "number"
        ? value
        : typeof value === "object"
          ? (value.speed ?? 0.5)
          : 0.5;
    const direction =
      typeof value === "object" ? (value.direction ?? "vertical") : "vertical";

    el._parallaxHandler = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only animate when element is in viewport
      if (rect.bottom < 0 || rect.top > windowHeight) return;

      const scrolled = (windowHeight - rect.top) / (windowHeight + rect.height);
      const offset = (scrolled - 0.5) * speed * 100;

      if (direction === "horizontal") {
        el.style.transform = `translate3d(${offset}px, 0, 0)`;
      } else {
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    window.addEventListener("scroll", el._parallaxHandler, { passive: true });
    el._parallaxHandler();
  },

  unmounted(el) {
    if (el._parallaxHandler) {
      window.removeEventListener("scroll", el._parallaxHandler);
      delete el._parallaxHandler;
    }
  },
};
