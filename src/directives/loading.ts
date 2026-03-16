import type { ObjectDirective } from "vue";

interface LoadingElement extends HTMLElement {
  _loadingOverlay?: HTMLDivElement;
}

interface LoadingBinding {
  active: boolean;
  text?: string;
  spinner?: boolean;
  background?: string;
  color?: string;
}

/**
 * v-loading - Show loading overlay/spinner on element
 *
 * Usage:
 *   <div v-loading="isLoading">Content</div>
 *   <div v-loading="{ active: isLoading, text: 'Loading...', background: 'rgba(0,0,0,0.5)' }">Content</div>
 */
export const vLoading: ObjectDirective<
  LoadingElement,
  boolean | LoadingBinding
> = {
  mounted(el, binding) {
    el.style.position = el.style.position || "relative";
    createOverlay(el, binding.value);
  },

  updated(el, binding) {
    removeOverlay(el);
    createOverlay(el, binding.value);
  },

  unmounted(el) {
    removeOverlay(el);
  },
};

function createOverlay(el: LoadingElement, value: boolean | LoadingBinding) {
  const active = typeof value === "boolean" ? value : value.active;
  if (!active) return;

  const text = typeof value === "object" ? (value.text ?? "") : "";
  const showSpinner =
    typeof value === "object" ? value.spinner !== false : true;
  const background =
    typeof value === "object"
      ? (value.background ?? "rgba(255, 255, 255, 0.8)")
      : "rgba(255, 255, 255, 0.8)";
  const color = typeof value === "object" ? (value.color ?? "#333") : "#333";

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${background};
    z-index: 9999;
    gap: 8px;
  `;

  if (showSpinner) {
    const spinner = document.createElement("div");
    spinner.style.cssText = `
      width: 32px;
      height: 32px;
      border: 3px solid ${color}33;
      border-top-color: ${color};
      border-radius: 50%;
      animation: v-loading-spin 0.8s linear infinite;
    `;

    // Inject spinner keyframes if not already done
    if (!document.getElementById("v-loading-style")) {
      const style = document.createElement("style");
      style.id = "v-loading-style";
      style.textContent = `@keyframes v-loading-spin { to { transform: rotate(360deg); } }`;
      document.head.appendChild(style);
    }

    overlay.appendChild(spinner);
  }

  if (text) {
    const label = document.createElement("span");
    label.textContent = text;
    label.style.cssText = `font-size: 14px; color: ${color};`;
    overlay.appendChild(label);
  }

  el._loadingOverlay = overlay;
  el.appendChild(overlay);
}

function removeOverlay(el: LoadingElement) {
  if (el._loadingOverlay?.parentNode) {
    el._loadingOverlay.parentNode.removeChild(el._loadingOverlay);
  }
  delete el._loadingOverlay;
}
