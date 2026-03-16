import type { ObjectDirective } from "vue";

interface DomDiffHighlightElement extends HTMLElement {
  _domDiffObserver?: MutationObserver;
}

interface DomDiffHighlightBinding {
  color?: string;
  duration?: number;
}

/**
 * v-dom-diff-highlight - Highlight DOM changes visually (useful for debugging)
 *
 * Usage:
 *   <div v-dom-diff-highlight>Content that changes</div>
 *   <div v-dom-diff-highlight="{ color: 'rgba(0,255,0,0.2)', duration: 1000 }">
 */
export const vDomDiffHighlight: ObjectDirective<
  DomDiffHighlightElement,
  DomDiffHighlightBinding | undefined
> = {
  mounted(el, binding) {
    const { color = "rgba(255, 255, 0, 0.3)", duration = 800 } =
      binding.value || {};

    el._domDiffObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as HTMLElement;
        if (target.nodeType !== Node.ELEMENT_NODE) return;

        const originalBg = target.style.backgroundColor;
        const originalTransition = target.style.transition;

        target.style.transition = `background-color ${duration}ms ease`;
        target.style.backgroundColor = color;

        setTimeout(() => {
          target.style.backgroundColor = originalBg;
          setTimeout(() => {
            target.style.transition = originalTransition;
          }, duration);
        }, duration);
      });
    });

    el._domDiffObserver.observe(el, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
  },

  unmounted(el) {
    el._domDiffObserver?.disconnect();
    delete el._domDiffObserver;
  },
};
