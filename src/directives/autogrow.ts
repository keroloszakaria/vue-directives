import type { ObjectDirective } from "vue";

interface AutogrowElement extends HTMLTextAreaElement {
  _autogrowHandler?: () => void;
}

/**
 * v-autogrow - Auto-resize textarea based on content
 *
 * Usage:
 *   <textarea v-autogrow />
 *   <textarea v-autogrow="{ maxHeight: 300 }" />
 */
export const vAutogrow: ObjectDirective<
  AutogrowElement,
  { maxHeight?: number } | undefined
> = {
  mounted(el, binding) {
    const maxHeight =
      typeof binding.value === "object" ? binding.value.maxHeight : undefined;

    el.style.overflow = "hidden";
    el.style.resize = "none";

    const resize = () => {
      el.style.height = "auto";
      let newHeight = el.scrollHeight;
      if (maxHeight && newHeight > maxHeight) {
        newHeight = maxHeight;
        el.style.overflow = "auto";
      } else {
        el.style.overflow = "hidden";
      }
      el.style.height = `${newHeight}px`;
    };

    el._autogrowHandler = resize;
    el.addEventListener("input", resize);

    // Initial resize
    resize();
  },

  updated(el) {
    // Re-resize when content changes from outside
    el._autogrowHandler?.();
  },

  unmounted(el) {
    if (el._autogrowHandler) {
      el.removeEventListener("input", el._autogrowHandler);
      delete el._autogrowHandler;
    }
  },
};
