import type { ObjectDirective } from "vue";

interface TooltipElement extends HTMLElement {
  _tooltipEl?: HTMLDivElement;
  _showTooltip?: () => void;
  _hideTooltip?: () => void;
}

interface TooltipBinding {
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

const TOOLTIP_STYLES = `
  position: fixed;
  padding: 6px 12px;
  background: #333;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 99999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

function positionTooltip(
  tooltip: HTMLDivElement,
  el: HTMLElement,
  position: string,
) {
  const rect = el.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const gap = 8;

  switch (position) {
    case "bottom":
      tooltip.style.top = `${rect.bottom + gap}px`;
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
      break;
    case "left":
      tooltip.style.top = `${rect.top + rect.height / 2 - tooltipRect.height / 2}px`;
      tooltip.style.left = `${rect.left - tooltipRect.width - gap}px`;
      break;
    case "right":
      tooltip.style.top = `${rect.top + rect.height / 2 - tooltipRect.height / 2}px`;
      tooltip.style.left = `${rect.right + gap}px`;
      break;
    case "top":
    default:
      tooltip.style.top = `${rect.top - tooltipRect.height - gap}px`;
      tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
      break;
  }
}

/**
 * v-tooltip - Show tooltip on hover
 *
 * Usage:
 *   <button v-tooltip="'Save changes'">Save</button>
 *   <button v-tooltip="{ text: 'Save', position: 'bottom' }">Save</button>
 */
export const vTooltip: ObjectDirective<
  TooltipElement,
  string | TooltipBinding
> = {
  mounted(el, binding) {
    const value = binding.value;
    const text = typeof value === "string" ? value : value.text;
    const position =
      typeof value === "object" ? (value.position ?? "top") : "top";
    const delay = typeof value === "object" ? (value.delay ?? 0) : 0;

    const tooltipEl = document.createElement("div");
    tooltipEl.setAttribute("style", TOOLTIP_STYLES);
    tooltipEl.setAttribute("role", "tooltip");
    tooltipEl.textContent = text;
    el._tooltipEl = tooltipEl;

    let timer: ReturnType<typeof setTimeout> | undefined;

    el._showTooltip = () => {
      timer = setTimeout(() => {
        document.body.appendChild(tooltipEl);
        // Force reflow to get correct dimensions
        tooltipEl.offsetHeight;
        positionTooltip(tooltipEl, el, position);
        tooltipEl.style.opacity = "1";
      }, delay);
    };

    el._hideTooltip = () => {
      if (timer) clearTimeout(timer);
      tooltipEl.style.opacity = "0";
      setTimeout(() => {
        if (tooltipEl.parentNode) {
          tooltipEl.parentNode.removeChild(tooltipEl);
        }
      }, 200);
    };

    el.addEventListener("mouseenter", el._showTooltip);
    el.addEventListener("mouseleave", el._hideTooltip);
  },

  updated(el, binding) {
    const value = binding.value;
    const text = typeof value === "string" ? value : value.text;

    if (el._tooltipEl) {
      el._tooltipEl.textContent = text;
    }
  },

  unmounted(el) {
    if (el._showTooltip) el.removeEventListener("mouseenter", el._showTooltip);
    if (el._hideTooltip) el.removeEventListener("mouseleave", el._hideTooltip);
    if (el._tooltipEl?.parentNode) {
      el._tooltipEl.parentNode.removeChild(el._tooltipEl);
    }
    delete el._tooltipEl;
    delete el._showTooltip;
    delete el._hideTooltip;
  },
};
