import type { ObjectDirective } from "vue";

interface NetworkAwareElement extends HTMLElement {
  _networkAwareHandler?: () => void;
}

interface NetworkAwareBinding {
  onOnline?: () => void;
  onOffline?: () => void;
  onSlow?: () => void;
  slowThreshold?: number; // In Mbps
  hideOnOffline?: boolean;
  showClass?: string;
  offlineClass?: string;
}

/**
 * v-network-aware - Adapt behavior based on network conditions
 *
 * Usage:
 *   <div v-network-aware="{ hideOnOffline: true }">Online content</div>
 *   <img v-network-aware="{ onSlow: loadLowRes, slowThreshold: 1 }" />
 */
export const vNetworkAware: ObjectDirective<
  NetworkAwareElement,
  NetworkAwareBinding
> = {
  mounted(el, binding) {
    const {
      onOnline,
      onOffline,
      onSlow,
      slowThreshold = 1.5,
      hideOnOffline = false,
      offlineClass = "v-network-offline",
    } = binding.value;

    const check = () => {
      if (!navigator.onLine) {
        if (hideOnOffline) el.style.display = "none";
        el.classList.add(offlineClass);
        onOffline?.();
        return;
      }

      el.style.removeProperty("display");
      el.classList.remove(offlineClass);
      onOnline?.();

      // Check connection speed
      const conn = (navigator as any).connection;
      if (conn && onSlow) {
        const speed = conn.downlink; // Mbps
        if (speed < slowThreshold) {
          onSlow();
        }
      }
    };

    el._networkAwareHandler = check;
    window.addEventListener("online", check);
    window.addEventListener("offline", check);

    // Initial check
    check();
  },

  unmounted(el) {
    if (el._networkAwareHandler) {
      window.removeEventListener("online", el._networkAwareHandler);
      window.removeEventListener("offline", el._networkAwareHandler);
      delete el._networkAwareHandler;
    }
  },
};
