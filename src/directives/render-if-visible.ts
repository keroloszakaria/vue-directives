import type { ObjectDirective } from "vue";

interface RenderIfVisibleElement extends HTMLElement {
  _renderIfVisibleObserver?: IntersectionObserver;
  _renderIfVisibleContent?: string;
}

/**
 * v-render-if-visible - Only render content when element is visible in viewport
 *
 * Usage:
 *   <div v-render-if-visible>Heavy content here</div>
 *   <div v-render-if-visible="{ rootMargin: '200px' }">Content</div>
 */
export const vRenderIfVisible: ObjectDirective<
  RenderIfVisibleElement,
  { rootMargin?: string; once?: boolean } | undefined
> = {
  mounted(el, binding) {
    const { rootMargin = "100px", once = true } = binding.value || {};

    el._renderIfVisibleContent = el.innerHTML;
    el.innerHTML = "";
    el.style.minHeight = el.style.minHeight || "1px";

    el._renderIfVisibleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.innerHTML = el._renderIfVisibleContent || "";
            if (once) {
              el._renderIfVisibleObserver?.disconnect();
            }
          } else if (!once) {
            el.innerHTML = "";
          }
        });
      },
      { rootMargin },
    );

    el._renderIfVisibleObserver.observe(el);
  },

  unmounted(el) {
    el._renderIfVisibleObserver?.disconnect();
    delete el._renderIfVisibleObserver;
    delete el._renderIfVisibleContent;
  },
};
