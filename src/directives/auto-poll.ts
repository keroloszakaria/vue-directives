import type { ObjectDirective } from "vue";

interface AutoPollElement extends HTMLElement {
  _autoPollTimer?: ReturnType<typeof setInterval>;
  _autoPollAbort?: AbortController;
}

interface AutoPollBinding {
  handler: (signal: AbortSignal) => Promise<void>;
  interval?: number;
  immediate?: boolean;
}

/**
 * v-auto-poll - Auto-polling data at intervals
 *
 * Usage:
 *   <div v-auto-poll="{ handler: fetchData, interval: 5000 }">...</div>
 */
export const vAutoPoll: ObjectDirective<AutoPollElement, AutoPollBinding> = {
  mounted(el, binding) {
    const { handler, interval = 5000, immediate = true } = binding.value;

    el._autoPollAbort = new AbortController();

    const poll = () => {
      if (el._autoPollAbort?.signal.aborted) return;
      handler(el._autoPollAbort!.signal).catch(() => {
        // Silently handle errors during polling
      });
    };

    if (immediate) poll();
    el._autoPollTimer = setInterval(poll, interval);
  },

  unmounted(el) {
    if (el._autoPollTimer) clearInterval(el._autoPollTimer);
    el._autoPollAbort?.abort();
    delete el._autoPollTimer;
    delete el._autoPollAbort;
  },
};
