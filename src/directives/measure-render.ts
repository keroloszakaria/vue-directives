import type { ObjectDirective } from "vue";

interface MeasureRenderElement extends HTMLElement {
  _measureRenderObserver?: PerformanceObserver;
  _measureRenderMark?: string;
}

/**
 * v-measure-render - Measure render performance of an element
 *
 * Usage:
 *   <div v-measure-render="'component-name'">Heavy component</div>
 */
export const vMeasureRender: ObjectDirective<
  MeasureRenderElement,
  string | ((duration: number) => void)
> = {
  beforeMount(el, binding) {
    const label =
      typeof binding.value === "string" ? binding.value : "v-measure-render";
    el._measureRenderMark = `${label}-start`;
    performance.mark(el._measureRenderMark);
  },

  mounted(el, binding) {
    const label =
      typeof binding.value === "string" ? binding.value : "v-measure-render";
    const startMark = el._measureRenderMark!;
    const endMark = `${label}-end`;

    requestAnimationFrame(() => {
      performance.mark(endMark);
      const measure = performance.measure(label, startMark, endMark);

      if (typeof binding.value === "function") {
        binding.value(measure.duration);
      } else {
        console.debug(
          `[v-measure-render] ${label}: ${measure.duration.toFixed(2)}ms`,
        );
      }

      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(label);
    });
  },
};
