import type { ObjectDirective } from "vue";

/**
 * v-color-mode - Apply styles/classes based on dark/light mode
 *
 * Usage:
 *   <div v-color-mode="{ dark: 'bg-dark text-white', light: 'bg-white text-black' }">Content</div>
 */

interface ColorModeElement extends HTMLElement {
  _colorModeQuery?: MediaQueryList;
  _colorModeHandler?: (e: MediaQueryListEvent | MediaQueryList) => void;
}

interface ColorModeBinding {
  dark: string | string[];
  light: string | string[];
}

export const vColorMode: ObjectDirective<ColorModeElement, ColorModeBinding> = {
  mounted(el, binding) {
    const { dark, light } = binding.value;
    const darkClasses = Array.isArray(dark)
      ? dark
      : dark.split(" ").filter(Boolean);
    const lightClasses = Array.isArray(light)
      ? light
      : light.split(" ").filter(Boolean);

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    el._colorModeQuery = query;

    const apply = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        el.classList.remove(...lightClasses);
        el.classList.add(...darkClasses);
      } else {
        el.classList.remove(...darkClasses);
        el.classList.add(...lightClasses);
      }
    };

    el._colorModeHandler = apply;
    apply(query);
    query.addEventListener("change", apply);
  },

  unmounted(el) {
    if (el._colorModeQuery && el._colorModeHandler) {
      el._colorModeQuery.removeEventListener(
        "change",
        el._colorModeHandler as any,
      );
    }
    delete el._colorModeQuery;
    delete el._colorModeHandler;
  },
};
