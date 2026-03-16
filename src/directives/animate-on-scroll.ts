import type { ObjectDirective } from "vue";

interface AnimateOnScrollElement extends HTMLElement {
  _aosObserver?: IntersectionObserver;
}

interface AnimateOnScrollBinding {
  class: string | string[];
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * v-animate-on-scroll - Add CSS animation classes when element scrolls into view
 *
 * Usage:
 *   <div v-animate-on-scroll="{ class: 'fade-in' }" />
 *   <div v-animate-on-scroll="{ class: ['fade-in', 'slide-up'], once: true, threshold: 0.3 }" />
 */
export const vAnimateOnScroll: ObjectDirective<
  AnimateOnScrollElement,
  string | AnimateOnScrollBinding
> = {
  mounted(el, binding) {
    const value = binding.value;
    const classes =
      typeof value === "string"
        ? [value]
        : Array.isArray(value.class)
          ? value.class
          : [value.class];
    const threshold =
      typeof value === "object" ? (value.threshold ?? 0.1) : 0.1;
    const rootMargin =
      typeof value === "object" ? (value.rootMargin ?? "0px") : "0px";
    const once = typeof value === "object" ? (value.once ?? true) : true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add(...classes);
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove(...classes);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    el._aosObserver = observer;
  },

  unmounted(el) {
    if (el._aosObserver) {
      el._aosObserver.disconnect();
      delete el._aosObserver;
    }
  },
};
