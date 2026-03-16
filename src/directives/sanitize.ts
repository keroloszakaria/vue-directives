import type { ObjectDirective } from "vue";

/**
 * v-sanitize - Sanitize HTML content to prevent XSS (safe v-html alternative)
 *
 * Removes: script, iframe, object, embed, form, style tags
 * Removes: on* event attributes, javascript: URLs, data: URLs
 *
 * Usage:
 *   <div v-sanitize="userHtml" />
 *   <div v-sanitize="{ html: userHtml, allowedTags: ['b', 'i', 'a', 'p'] }" />
 */

interface SanitizeBinding {
  html: string;
  allowedTags?: string[];
  allowedAttributes?: string[];
}

const DEFAULT_BLOCKED_TAGS = new Set([
  "script",
  "iframe",
  "object",
  "embed",
  "form",
  "style",
  "link",
  "meta",
  "base",
  "applet",
]);

const DANGEROUS_ATTR_PATTERN = /^on/i;
const DANGEROUS_URL_PATTERN = /^\s*(javascript|data|vbscript)\s*:/i;

function sanitizeHtml(
  html: string,
  allowedTags?: string[],
  allowedAttributes?: string[],
): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function cleanNode(node: Node): void {
    const children = Array.from(node.childNodes);

    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        const tagName = el.tagName.toLowerCase();

        // Remove blocked tags entirely
        if (DEFAULT_BLOCKED_TAGS.has(tagName)) {
          node.removeChild(child);
          continue;
        }

        // If allowedTags specified, only keep those
        if (allowedTags && !allowedTags.includes(tagName)) {
          // Replace with text content
          const text = document.createTextNode(el.textContent ?? "");
          node.replaceChild(text, child);
          continue;
        }

        // Clean attributes
        const attrs = Array.from(el.attributes);
        for (const attr of attrs) {
          const name = attr.name.toLowerCase();

          // Remove event handlers
          if (DANGEROUS_ATTR_PATTERN.test(name)) {
            el.removeAttribute(attr.name);
            continue;
          }

          // Remove dangerous URLs
          if (
            ["href", "src", "action", "formaction", "xlink:href"].includes(name)
          ) {
            if (DANGEROUS_URL_PATTERN.test(attr.value)) {
              el.removeAttribute(attr.name);
              continue;
            }
          }

          // If allowedAttributes specified, remove non-allowed
          if (allowedAttributes && !allowedAttributes.includes(name)) {
            el.removeAttribute(attr.name);
          }
        }

        // Recurse into children
        cleanNode(child);
      }
    }
  }

  cleanNode(doc.body);
  return doc.body.innerHTML;
}

export const vSanitize: ObjectDirective<HTMLElement, string | SanitizeBinding> =
  {
    mounted(el, binding) {
      apply(el, binding.value);
    },
    updated(el, binding) {
      apply(el, binding.value);
    },
  };

function apply(el: HTMLElement, value: string | SanitizeBinding) {
  if (typeof value === "string") {
    el.innerHTML = sanitizeHtml(value);
  } else {
    el.innerHTML = sanitizeHtml(
      value.html,
      value.allowedTags,
      value.allowedAttributes,
    );
  }
}
