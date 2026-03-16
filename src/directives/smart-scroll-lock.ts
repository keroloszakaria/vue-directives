import type { ObjectDirective } from "vue";

interface SmartScrollLockElement extends HTMLElement {
  _scrollLockHandler?: (e: Event) => void;
  _scrollLockPrevOverflow?: string;
}

/**
 * v-smart-scroll-lock - Intelligent scroll locking that preserves scroll position
 *
 * Usage:
 *   <div v-smart-scroll-lock="isModalOpen">Modal content</div>
 */
export const vSmartScrollLock: ObjectDirective<
  SmartScrollLockElement,
  boolean
> = {
  mounted(el, binding) {
    if (binding.value) {
      lockScroll(el);
    }
  },

  updated(el, binding) {
    if (binding.value && !binding.oldValue) {
      lockScroll(el);
    } else if (!binding.value && binding.oldValue) {
      unlockScroll(el);
    }
  },

  unmounted(el) {
    unlockScroll(el);
  },
};

function lockScroll(el: SmartScrollLockElement) {
  const scrollY = window.scrollY;
  el._scrollLockPrevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.dataset.scrollLockY = String(scrollY);

  // Allow scrolling within the element
  el._scrollLockHandler = (e: Event) => {
    e.stopPropagation();
  };
  el.addEventListener("wheel", el._scrollLockHandler);
  el.addEventListener("touchmove", el._scrollLockHandler);
}

function unlockScroll(el: SmartScrollLockElement) {
  const scrollY = parseInt(document.body.dataset.scrollLockY || "0", 10);
  document.body.style.overflow = el._scrollLockPrevOverflow || "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  delete document.body.dataset.scrollLockY;
  window.scrollTo(0, scrollY);

  if (el._scrollLockHandler) {
    el.removeEventListener("wheel", el._scrollLockHandler);
    el.removeEventListener("touchmove", el._scrollLockHandler);
    delete el._scrollLockHandler;
  }
  delete el._scrollLockPrevOverflow;
}
