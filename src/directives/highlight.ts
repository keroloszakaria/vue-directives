import type { ObjectDirective } from "vue";

interface HighlightElement extends HTMLElement {
  _highlightOriginal?: string;
}

interface HighlightBinding {
  query: string;
  tag?: string;
  className?: string;
  style?: string;
  caseSensitive?: boolean;
}

/**
 * v-highlight - Highlight search keywords inside text content
 *
 * Usage:
 *   <p v-highlight="{ query: searchTerm }">Some long text content</p>
 *   <p v-highlight="{ query: 'hello', className: 'highlight', caseSensitive: false }">Hello World</p>
 */
export const vHighlight: ObjectDirective<
  HighlightElement,
  string | HighlightBinding
> = {
  mounted(el, binding) {
    el._highlightOriginal = el.innerHTML;
    applyHighlight(el, binding.value);
  },

  updated(el, binding) {
    // Restore original before re-highlighting
    if (el._highlightOriginal !== undefined) {
      el.innerHTML = el._highlightOriginal;
    }
    el._highlightOriginal = el.innerHTML;
    applyHighlight(el, binding.value);
  },

  unmounted(el) {
    if (el._highlightOriginal !== undefined) {
      el.innerHTML = el._highlightOriginal;
    }
    delete el._highlightOriginal;
  },
};

function applyHighlight(el: HTMLElement, value: string | HighlightBinding) {
  const query = typeof value === "string" ? value : value.query;
  if (!query || query.trim() === "") return;

  const tag = typeof value === "object" ? (value.tag ?? "mark") : "mark";
  const className = typeof value === "object" ? (value.className ?? "") : "";
  const style = typeof value === "object" ? (value.style ?? "") : "";
  const caseSensitive =
    typeof value === "object" ? (value.caseSensitive ?? false) : false;

  const flags = caseSensitive ? "g" : "gi";
  // Escape special regex characters
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, flags);

  highlightNode(el, regex, tag, className, style);
}

function highlightNode(
  node: Node,
  regex: RegExp,
  tag: string,
  className: string,
  style: string,
) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!regex.test(text)) return;
    regex.lastIndex = 0;

    const fragment = document.createDocumentFragment();
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex, match.index)),
        );
      }
      const highlight = document.createElement(tag);
      if (className) highlight.className = className;
      if (style) highlight.setAttribute("style", style);
      highlight.textContent = match[1];
      fragment.appendChild(highlight);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    node.parentNode?.replaceChild(fragment, node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Process child nodes in reverse to avoid index shifting
    const children = Array.from(node.childNodes);
    for (const child of children) {
      highlightNode(child, regex, tag, className, style);
    }
  }
}
