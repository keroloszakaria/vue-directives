import type { ObjectDirective } from "vue";

interface IdleElement extends HTMLElement {
  _idleTimer?: ReturnType<typeof setTimeout>;
  _idleEvents?: string[];
  _idleReset?: () => void;
}

interface IdleBinding {
  handler: () => void;
  timeout?: number;
  events?: string[];
  once?: boolean;
}

const DEFAULT_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
];

/**
 * v-idle - Detect user idle state after inactivity
 *
 * Usage:
 *   <div v-idle="{ handler: onIdle, timeout: 5000 }">Content</div>
 */
export const vIdle: ObjectDirective<IdleElement, IdleBinding> = {
  mounted(el, binding) {
    const {
      handler,
      timeout = 5000,
      events = DEFAULT_EVENTS,
      once = false,
    } = binding.value;
    el._idleEvents = events;

    let fired = false;

    const startTimer = () => {
      if (el._idleTimer) clearTimeout(el._idleTimer);
      if (once && fired) return;
      el._idleTimer = setTimeout(() => {
        fired = true;
        handler();
      }, timeout);
    };

    el._idleReset = () => {
      startTimer();
    };

    events.forEach((event) => {
      document.addEventListener(event, el._idleReset!, { passive: true });
    });

    startTimer();
  },

  unmounted(el) {
    if (el._idleTimer) clearTimeout(el._idleTimer);
    if (el._idleEvents && el._idleReset) {
      el._idleEvents.forEach((event) => {
        document.removeEventListener(event, el._idleReset!);
      });
    }
    delete el._idleTimer;
    delete el._idleEvents;
    delete el._idleReset;
  },
};
