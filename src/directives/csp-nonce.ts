import type { ObjectDirective } from "vue";

/**
 * v-csp-nonce - Inject CSP nonce into inline scripts/styles within element
 *
 * Usage:
 *   <div v-csp-nonce="nonce"><script>...</script></div>
 */
export const vCspNonce: ObjectDirective<HTMLElement, string> = {
  mounted(el, binding) {
    applyNonce(el, binding.value);
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      applyNonce(el, binding.value);
    }
  },
};

function applyNonce(el: HTMLElement, nonce: string) {
  const scripts = el.querySelectorAll("script");
  const styles = el.querySelectorAll("style");

  scripts.forEach((script) => {
    script.setAttribute("nonce", nonce);
  });

  styles.forEach((style) => {
    style.setAttribute("nonce", nonce);
  });
}
