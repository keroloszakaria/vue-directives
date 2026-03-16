import type { ObjectDirective } from "vue";

interface ScrollProgressElement extends HTMLElement {
  _scrollProgressHandler?: () => void;
  _scrollProgressTarget?: HTMLElement | Window;
}

interface ScrollProgressBinding {
  handler: (progress: number) => void;
  target?: "self" | "window";
}

/**
 * v-scroll-progress - Track scroll progress as percentage (0-100)
 */
export const vScrollProgress: ObjectDirective<
  ScrollProgressElement,
  ScrollProgressBinding | ((progress: number) => void)
> = {
  mounted(el, binding) {
    let handler: (progress: number) => void;
    let target: string;

    if (typeof binding.value === "function") {
      handler = binding.value;
      target = "window";
    } else {
      handler = binding.value.handler;
      target = binding.value.target ?? "window";
    }

    const scrollTarget = target === "self" ? el : window;

    el._scrollProgressHandler = () => {
      let progress: number;
      if (target === "self") {
        const maxScroll = el.scrollHeight - el.clientHeight;
        progress = maxScroll > 0 ? (el.scrollTop / maxScroll) * 100 : 0;
      } else {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      }
      handler(Math.min(100, Math.max(0, progress)));
    };

    el._scrollProgressTarget = scrollTarget as HTMLElement | Window;
    scrollTarget.addEventListener("scroll", el._scrollProgressHandler, {
      passive: true,
    });
  },

  unmounted(el) {
    if (el._scrollProgressHandler && el._scrollProgressTarget) {
      el._scrollProgressTarget.removeEventListener(
        "scroll",
        el._scrollProgressHandler,
      );
      delete el._scrollProgressHandler;
      delete el._scrollProgressTarget;
    }
  },
};
