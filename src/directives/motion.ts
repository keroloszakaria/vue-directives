import type { ObjectDirective } from "vue";

interface MotionElement extends HTMLElement {
  _motionObserver?: IntersectionObserver;
}

interface MotionBinding {
  initial?: Partial<CSSStyleDeclaration>;
  enter?: Partial<CSSStyleDeclaration>;
  duration?: number;
  delay?: number;
  easing?: string;
  once?: boolean;
}

/**
 * v-motion - Animation/motion effects on enter
 *
 * Usage:
 *   <div v-motion="{ initial: { opacity: '0', transform: 'translateY(20px)' }, enter: { opacity: '1', transform: 'translateY(0)' }, duration: 600 }">
 */
export const vMotion: ObjectDirective<MotionElement, MotionBinding> = {
  mounted(el, binding) {
    const {
      initial = { opacity: "0" },
      enter = { opacity: "1" },
      duration = 400,
      delay = 0,
      easing = "ease-out",
      once = true,
    } = binding.value;

    // Apply initial styles
    Object.assign(el.style, initial);
    el.style.transition = `all ${duration}ms ${easing} ${delay}ms`;

    el._motionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              Object.assign(el.style, enter);
            });
            if (once) el._motionObserver?.unobserve(el);
          } else if (!once) {
            Object.assign(el.style, initial);
          }
        });
      },
      { threshold: 0.1 },
    );

    el._motionObserver.observe(el);
  },

  unmounted(el) {
    el._motionObserver?.disconnect();
    delete el._motionObserver;
  },
};
