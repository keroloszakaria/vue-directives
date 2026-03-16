import type { ObjectDirective } from "vue";

interface FpsMonitorElement extends HTMLElement {
  _fpsOverlay?: HTMLElement;
  _fpsRaf?: number;
  _fpsFrames?: number;
  _fpsLastTime?: number;
}

/**
 * v-fps-monitor - Display FPS monitoring overlay
 *
 * Usage:
 *   <div v-fps-monitor>App content</div>
 *   <div v-fps-monitor="{ position: 'bottom-right' }">App content</div>
 */
export const vFpsMonitor: ObjectDirective<
  FpsMonitorElement,
  { position?: string } | boolean | undefined
> = {
  mounted(el, binding) {
    if (binding.value === false) return;

    const position =
      (typeof binding.value === "object" ? binding.value?.position : null) ||
      "top-right";

    const overlay = document.createElement("div");
    overlay.className = "v-fps-monitor";
    const posStyles: Record<string, string> = {};
    if (position.includes("top")) posStyles.top = "8px";
    if (position.includes("bottom")) posStyles.bottom = "8px";
    if (position.includes("left")) posStyles.left = "8px";
    if (position.includes("right")) posStyles.right = "8px";

    Object.assign(overlay.style, {
      position: "fixed",
      zIndex: "99999",
      background: "rgba(0,0,0,0.7)",
      color: "#0f0",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontFamily: "monospace",
      pointerEvents: "none",
      ...posStyles,
    });

    document.body.appendChild(overlay);
    el._fpsOverlay = overlay;
    el._fpsFrames = 0;
    el._fpsLastTime = performance.now();

    const loop = () => {
      el._fpsFrames = (el._fpsFrames || 0) + 1;
      const now = performance.now();
      const elapsed = now - (el._fpsLastTime || now);

      if (elapsed >= 1000) {
        const fps = Math.round((el._fpsFrames * 1000) / elapsed);
        overlay.textContent = `${fps} FPS`;
        overlay.style.color = fps >= 55 ? "#0f0" : fps >= 30 ? "#ff0" : "#f00";
        el._fpsFrames = 0;
        el._fpsLastTime = now;
      }

      el._fpsRaf = requestAnimationFrame(loop);
    };

    el._fpsRaf = requestAnimationFrame(loop);
  },

  unmounted(el) {
    if (el._fpsRaf) cancelAnimationFrame(el._fpsRaf);
    if (el._fpsOverlay) el._fpsOverlay.remove();
    delete el._fpsOverlay;
    delete el._fpsRaf;
    delete el._fpsFrames;
    delete el._fpsLastTime;
  },
};
