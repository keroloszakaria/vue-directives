import type { ObjectDirective } from "vue";

/**
 * v-safe-link - Make external links safe with rel="noopener noreferrer"
 *
 * Usage:
 *   <a v-safe-link href="https://example.com">Link</a>
 */
export const vSafeLink: ObjectDirective<HTMLAnchorElement> = {
  mounted(el) {
    applySafeLink(el);
  },
  updated(el) {
    applySafeLink(el);
  },
};

function applySafeLink(el: HTMLAnchorElement) {
  const href = el.getAttribute("href") || "";
  const isExternal =
    /^https?:\/\//.test(href) && !href.startsWith(window.location.origin);

  if (isExternal) {
    el.setAttribute("rel", "noopener noreferrer");
    if (!el.getAttribute("target")) {
      el.setAttribute("target", "_blank");
    }
  }
}
