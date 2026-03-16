import type { ObjectDirective } from "vue";

interface SyncBroadcastElement extends HTMLInputElement {
  _syncBroadcastChannel?: BroadcastChannel;
  _syncBroadcastHandler?: () => void;
}

interface SyncBroadcastBinding {
  channel: string;
  onMessage?: (data: any) => void;
}

/**
 * v-sync-broadcast - Sync data across browser tabs via BroadcastChannel API
 *
 * Usage:
 *   <input v-sync-broadcast="{ channel: 'shared-input' }" />
 *   <div v-sync-broadcast="{ channel: 'notifications', onMessage: handleMsg }">
 */
export const vSyncBroadcast: ObjectDirective<
  SyncBroadcastElement,
  SyncBroadcastBinding
> = {
  mounted(el, binding) {
    const { channel, onMessage } = binding.value;

    if (typeof BroadcastChannel === "undefined") return;

    const bc = new BroadcastChannel(channel);
    el._syncBroadcastChannel = bc;

    // Receive messages
    bc.onmessage = (e) => {
      if (onMessage) {
        onMessage(e.data);
      } else if (el instanceof HTMLInputElement) {
        el.value = String(e.data);
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    // Send on input change
    const tag = (el as HTMLElement).tagName;
    if (tag === "INPUT" || tag === "TEXTAREA") {
      el._syncBroadcastHandler = () => {
        bc.postMessage((el as HTMLInputElement).value);
      };
      el.addEventListener("input", el._syncBroadcastHandler);
    }
  },

  unmounted(el) {
    if (el._syncBroadcastHandler) {
      el.removeEventListener("input", el._syncBroadcastHandler);
    }
    el._syncBroadcastChannel?.close();
    delete el._syncBroadcastChannel;
    delete el._syncBroadcastHandler;
  },
};
