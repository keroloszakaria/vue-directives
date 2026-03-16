import type { ObjectDirective } from "vue";

/**
 * v-trusted-html - Set innerHTML using Trusted Types API for CSP compliance
 *
 * Usage:
 *   <div v-trusted-html="htmlContent">Fallback content</div>
 */
export const vTrustedHtml: ObjectDirective<HTMLElement, string> = {
  mounted(el, binding) {
    setTrustedHtml(el, binding.value);
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      setTrustedHtml(el, binding.value);
    }
  },
};

function setTrustedHtml(el: HTMLElement, html: string) {
  if (typeof (window as any).trustedTypes !== "undefined") {
    const policy = (window as any).trustedTypes.createPolicy("v-trusted-html", {
      createHTML: (input: string) => input,
    });
    el.innerHTML = policy.createHTML(html);
  } else {
    // Fallback: use DOMParser to sanitize
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    el.innerHTML = "";
    const fragment = document.createDocumentFragment();
    Array.from(doc.body.childNodes).forEach((node) => {
      fragment.appendChild(document.importNode(node, true));
    });
    el.appendChild(fragment);
  }
}
