import type { ObjectDirective } from "vue";

interface TiltElement extends HTMLElement {
  _tiltMouseMove?: (event: MouseEvent) => void;
  _tiltMouseLeave?: () => void;
}

interface TiltBinding {
  maxTilt?: number;
  speed?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  maxGlare?: number;
  disabled?: boolean;
}

/**
 * v-tilt - 3D tilt hover effect (like vanilla-tilt)
 *
 * Usage:
 *   <div v-tilt>Tilt me</div>
 *   <div v-tilt="{ maxTilt: 20, speed: 300, perspective: 1000, glare: true }">Card</div>
 */
export const vTilt: ObjectDirective<
  TiltElement,
  TiltBinding | boolean | undefined
> = {
  mounted(el, binding) {
    if (binding.value === false) return;

    const opts = typeof binding.value === "object" ? binding.value : {};
    if (opts.disabled) return;

    const maxTilt = opts.maxTilt ?? 15;
    const speed = opts.speed ?? 300;
    const perspective = opts.perspective ?? 1000;
    const scale = opts.scale ?? 1;
    const glare = opts.glare ?? false;
    const maxGlare = opts.maxGlare ?? 0.5;

    el.style.transition = `transform ${speed}ms ease-out`;
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    let glareEl: HTMLDivElement | undefined;

    if (glare) {
      el.style.overflow = "hidden";
      glareEl = document.createElement("div");
      glareEl.style.cssText = `
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${maxGlare}) 100%);
        opacity: 0;
        transition: opacity ${speed}ms ease-out;
      `;
      el.appendChild(glareEl);
    }

    el._tiltMouseMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const tiltX = (maxTilt - yPercent * maxTilt * 2).toFixed(2);
      const tiltY = (xPercent * maxTilt * 2 - maxTilt).toFixed(2);

      el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`;

      if (glareEl) {
        const angle =
          Math.atan2(x - rect.width / 2, -(y - rect.height / 2)) *
          (180 / Math.PI);
        glareEl.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${maxGlare}) 0%, rgba(255,255,255,0) 80%)`;
        glareEl.style.opacity = String((xPercent + yPercent) / 2);
      }
    };

    el._tiltMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
      if (glareEl) {
        glareEl.style.opacity = "0";
      }
    };

    el.addEventListener("mousemove", el._tiltMouseMove);
    el.addEventListener("mouseleave", el._tiltMouseLeave);
  },

  unmounted(el) {
    if (el._tiltMouseMove)
      el.removeEventListener("mousemove", el._tiltMouseMove);
    if (el._tiltMouseLeave)
      el.removeEventListener("mouseleave", el._tiltMouseLeave);
    delete el._tiltMouseMove;
    delete el._tiltMouseLeave;
  },
};
