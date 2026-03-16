import type { ObjectDirective } from "vue";

interface ThrottleElement extends HTMLElement {
  _throttleHandler?: (event: Event) => void;
  _throttleLastCall?: number;
  _throttleTimer?: ReturnType<typeof setTimeout>;
}

interface ThrottleBinding {
  handler: (...args: any[]) => void;
  delay?: number;
  event?: string;
}

/**
 * v-throttle - Throttle an event handler
 *
 * Usage:
 *   <button v-throttle="{ handler: onSubmit, delay: 1000 }">Submit</button>
 *   <div v-throttle="{ handler: onScroll, delay: 200, event: 'scroll' }">...</div>
 */
export const vThrottle: ObjectDirective<ThrottleElement, ThrottleBinding> = {
  mounted(el, binding) {
    const { handler, delay = 300, event = "click" } = binding.value;

    el._throttleLastCall = 0;

    el._throttleHandler = (...args: any[]) => {
      const now = Date.now();
      const remaining = delay - (now - (el._throttleLastCall || 0));

      if (remaining <= 0) {
        el._throttleLastCall = now;
        handler(...args);
      } else if (!el._throttleTimer) {
        el._throttleTimer = setTimeout(() => {
          el._throttleLastCall = Date.now();
          el._throttleTimer = undefined;
          handler(...args);
        }, remaining);
      }
    };

    el.addEventListener(event, el._throttleHandler);
  },

  updated(el, binding) {
    const oldEvent = binding.oldValue?.event || "click";
    const { handler, delay = 300, event = "click" } = binding.value;

    if (el._throttleHandler) {
      el.removeEventListener(oldEvent, el._throttleHandler);
    }
    if (el._throttleTimer) {
      clearTimeout(el._throttleTimer);
      el._throttleTimer = undefined;
    }

    el._throttleLastCall = 0;

    el._throttleHandler = (...args: any[]) => {
      const now = Date.now();
      const remaining = delay - (now - (el._throttleLastCall || 0));

      if (remaining <= 0) {
        el._throttleLastCall = now;
        handler(...args);
      } else if (!el._throttleTimer) {
        el._throttleTimer = setTimeout(() => {
          el._throttleLastCall = Date.now();
          el._throttleTimer = undefined;
          handler(...args);
        }, remaining);
      }
    };

    el.addEventListener(event, el._throttleHandler);
  },

  unmounted(el) {
    if (el._throttleHandler) {
      el.removeEventListener("click", el._throttleHandler);
      delete el._throttleHandler;
    }
    if (el._throttleTimer) {
      clearTimeout(el._throttleTimer);
      delete el._throttleTimer;
    }
    delete el._throttleLastCall;
  },
};
