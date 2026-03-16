import type { ObjectDirective } from "vue";

interface CpuAwareElement extends HTMLElement {
  _cpuAwareApplied?: boolean;
}

interface CpuAwareBinding {
  onLowEnd?: () => void;
  onHighEnd?: () => void;
  lowEndThreshold?: number;
  reduceAnimations?: boolean;
  reducedClass?: string;
}

/**
 * v-cpu-aware - Adapt rendering based on device CPU capabilities
 *
 * Usage:
 *   <div v-cpu-aware="{ reduceAnimations: true }">Animated content</div>
 *   <div v-cpu-aware="{ onLowEnd: disableEffects, lowEndThreshold: 4 }">
 */
export const vCpuAware: ObjectDirective<CpuAwareElement, CpuAwareBinding> = {
  mounted(el, binding) {
    const {
      onLowEnd,
      onHighEnd,
      lowEndThreshold = 4,
      reduceAnimations = false,
      reducedClass = "v-cpu-reduced",
    } = binding.value;

    const cores = navigator.hardwareConcurrency || 2;
    const isLowEnd = cores <= lowEndThreshold;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isLowEnd || prefersReducedMotion) {
      onLowEnd?.();
      if (reduceAnimations) {
        el.classList.add(reducedClass);
        el.style.setProperty("--v-transition-duration", "0ms");
        el.style.setProperty("--v-animation-duration", "0ms");
      }
    } else {
      onHighEnd?.();
    }

    el._cpuAwareApplied = true;
  },
};
