import type { ObjectDirective } from "vue";

interface HoverClassElement extends HTMLElement {
  _hoverEnter?: () => void;
  _hoverLeave?: () => void;
}

/**
 * v-hover-class - Add/remove CSS class on hover
 *
 * Usage:
 *   <div v-hover-class="'is-hovered'">Hover me</div>
 *   <div v-hover-class="['shadow-lg', 'scale-105']">Card</div>
 */
export const vHoverClass: ObjectDirective<
  HoverClassElement,
  string | string[]
> = {
  mounted(el, binding) {
    const classes = Array.isArray(binding.value)
      ? binding.value
      : [binding.value];

    el._hoverEnter = () => el.classList.add(...classes);
    el._hoverLeave = () => el.classList.remove(...classes);

    el.addEventListener("mouseenter", el._hoverEnter);
    el.addEventListener("mouseleave", el._hoverLeave);
  },

  updated(el, binding) {
    const oldClasses = Array.isArray(binding.oldValue)
      ? binding.oldValue
      : binding.oldValue
        ? [binding.oldValue]
        : [];
    const newClasses = Array.isArray(binding.value)
      ? binding.value
      : [binding.value];

    // Remove old event listeners
    if (el._hoverEnter) el.removeEventListener("mouseenter", el._hoverEnter);
    if (el._hoverLeave) el.removeEventListener("mouseleave", el._hoverLeave);

    // Clean up old classes
    el.classList.remove(...oldClasses);

    el._hoverEnter = () => el.classList.add(...newClasses);
    el._hoverLeave = () => el.classList.remove(...newClasses);

    el.addEventListener("mouseenter", el._hoverEnter);
    el.addEventListener("mouseleave", el._hoverLeave);
  },

  unmounted(el) {
    if (el._hoverEnter) el.removeEventListener("mouseenter", el._hoverEnter);
    if (el._hoverLeave) el.removeEventListener("mouseleave", el._hoverLeave);
    delete el._hoverEnter;
    delete el._hoverLeave;
  },
};
