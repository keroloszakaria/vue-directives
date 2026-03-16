import type { ObjectDirective } from "vue";

interface SkeletonElement extends HTMLElement {
  _skeletonOverlay?: HTMLDivElement;
  _skeletonOriginalChildren?: string;
}

interface SkeletonBinding {
  active: boolean;
  lines?: number;
  width?: string;
  height?: string;
  borderRadius?: string;
  animation?: "pulse" | "wave" | "none";
}

/**
 * v-skeleton - Show skeleton placeholder while data is loading
 *
 * Usage:
 *   <div v-skeleton="isLoading">Actual content</div>
 *   <div v-skeleton="{ active: isLoading, lines: 3, animation: 'wave' }">Content</div>
 */
export const vSkeleton: ObjectDirective<
  SkeletonElement,
  boolean | SkeletonBinding
> = {
  mounted(el, binding) {
    applySkeleton(el, binding.value);
  },
  updated(el, binding) {
    removeSkeleton(el);
    applySkeleton(el, binding.value);
  },
  unmounted(el) {
    removeSkeleton(el);
  },
};

function applySkeleton(el: SkeletonElement, value: boolean | SkeletonBinding) {
  const active = typeof value === "boolean" ? value : value.active;
  if (!active) return;

  const lines = typeof value === "object" ? (value.lines ?? 3) : 3;
  const width = typeof value === "object" ? (value.width ?? "100%") : "100%";
  const height = typeof value === "object" ? (value.height ?? "16px") : "16px";
  const borderRadius =
    typeof value === "object" ? (value.borderRadius ?? "4px") : "4px";
  const animation =
    typeof value === "object" ? (value.animation ?? "pulse") : "pulse";

  // Inject skeleton styles if needed
  if (!document.getElementById("v-skeleton-style")) {
    const style = document.createElement("style");
    style.id = "v-skeleton-style";
    style.textContent = `
      @keyframes v-skeleton-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes v-skeleton-wave {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `;
    document.head.appendChild(style);
  }

  el.style.position = el.style.position || "relative";

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: inherit;
    background: inherit;
    z-index: 9999;
  `;

  for (let i = 0; i < lines; i++) {
    const line = document.createElement("div");
    const lineWidth = i === lines - 1 ? "60%" : width;

    if (animation === "wave") {
      line.style.cssText = `
        width: ${lineWidth};
        height: ${height};
        border-radius: ${borderRadius};
        background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
        background-size: 200% 100%;
        animation: v-skeleton-wave 1.5s ease-in-out infinite;
      `;
    } else if (animation === "pulse") {
      line.style.cssText = `
        width: ${lineWidth};
        height: ${height};
        border-radius: ${borderRadius};
        background: #e0e0e0;
        animation: v-skeleton-pulse 1.5s ease-in-out infinite;
      `;
    } else {
      line.style.cssText = `
        width: ${lineWidth};
        height: ${height};
        border-radius: ${borderRadius};
        background: #e0e0e0;
      `;
    }

    overlay.appendChild(line);
  }

  el._skeletonOverlay = overlay;
  el.appendChild(overlay);
}

function removeSkeleton(el: SkeletonElement) {
  if (el._skeletonOverlay?.parentNode) {
    el._skeletonOverlay.parentNode.removeChild(el._skeletonOverlay);
  }
  delete el._skeletonOverlay;
}
