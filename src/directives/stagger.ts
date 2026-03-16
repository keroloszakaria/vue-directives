import type { ObjectDirective } from "vue";

interface StaggerElement extends HTMLElement {
  _staggerObserver?: IntersectionObserver;
}

interface StaggerBinding {
  selector?: string;
  initial?: Partial<CSSStyleDeclaration>;
  enter?: Partial<CSSStyleDeclaration>;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
}

/**
 * v-stagger - Staggered child element animations
 *
 * Usage:
 *   <ul v-stagger="{ staggerDelay: 100 }"><li>...</li></ul>
 */
export const vStagger: ObjectDirective<StaggerElement, StaggerBinding> = {
  mounted(el, binding) {
    const {
      selector = ":scope > *",
      initial = { opacity: "0", transform: "translateY(15px)" },
      enter = { opacity: "1", transform: "translateY(0)" },
      staggerDelay = 80,
      duration = 400,
      easing = "ease-out",
    } = binding.value || {};

    const children = el.querySelectorAll<HTMLElement>(selector);
    children.forEach((child) => {
      Object.assign(child.style, initial);
    });

    el._staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              child.style.transition = `all ${duration}ms ${easing} ${i * staggerDelay}ms`;
              requestAnimationFrame(() => {
                Object.assign(child.style, enter);
              });
            });
            el._staggerObserver?.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    el._staggerObserver.observe(el);
  },

  unmounted(el) {
    el._staggerObserver?.disconnect();
    delete el._staggerObserver;
  },
};
