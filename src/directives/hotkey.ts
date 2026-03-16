import type { ObjectDirective } from "vue";

interface HotkeyElement extends HTMLElement {
  _hotkeyHandler?: (event: KeyboardEvent) => void;
}

type HotkeyMap = Record<string, (event: KeyboardEvent) => void>;

/**
 * v-hotkey - Bind keyboard shortcuts to element
 *
 * Usage:
 *   <div v-hotkey="{ 'ctrl+s': onSave, 'ctrl+z': onUndo, 'escape': onClose }">...</div>
 *   <input v-hotkey.stop.prevent="{ 'enter': onSubmit }" />
 *
 * Key format: modifier+key (e.g., 'ctrl+s', 'ctrl+shift+a', 'escape', 'f1')
 * Modifiers: ctrl, alt, shift, meta (cmd on Mac)
 */
export const vHotkey: ObjectDirective<HotkeyElement, HotkeyMap> = {
  mounted(el, binding) {
    const keyMap = binding.value;

    el._hotkeyHandler = (event: KeyboardEvent) => {
      for (const [combo, handler] of Object.entries(keyMap)) {
        if (matchesCombo(event, combo)) {
          if (binding.modifiers.prevent) event.preventDefault();
          if (binding.modifiers.stop) event.stopPropagation();
          handler(event);
        }
      }
    };

    // Listen on document for global shortcuts
    document.addEventListener("keydown", el._hotkeyHandler);
  },

  updated(el, binding) {
    if (el._hotkeyHandler) {
      document.removeEventListener("keydown", el._hotkeyHandler);
    }

    const keyMap = binding.value;

    el._hotkeyHandler = (event: KeyboardEvent) => {
      for (const [combo, handler] of Object.entries(keyMap)) {
        if (matchesCombo(event, combo)) {
          if (binding.modifiers.prevent) event.preventDefault();
          if (binding.modifiers.stop) event.stopPropagation();
          handler(event);
        }
      }
    };

    document.addEventListener("keydown", el._hotkeyHandler);
  },

  unmounted(el) {
    if (el._hotkeyHandler) {
      document.removeEventListener("keydown", el._hotkeyHandler);
      delete el._hotkeyHandler;
    }
  },
};

function matchesCombo(event: KeyboardEvent, combo: string): boolean {
  const parts = combo
    .toLowerCase()
    .split("+")
    .map((p) => p.trim());

  const modifiers = {
    ctrl: parts.includes("ctrl"),
    alt: parts.includes("alt"),
    shift: parts.includes("shift"),
    meta: parts.includes("meta") || parts.includes("cmd"),
  };

  const key = parts.filter(
    (p) => !["ctrl", "alt", "shift", "meta", "cmd"].includes(p),
  )[0];

  if (modifiers.ctrl !== (event.ctrlKey || event.metaKey)) return false;
  if (modifiers.alt !== event.altKey) return false;
  if (modifiers.shift !== event.shiftKey) return false;
  if (modifiers.meta !== event.metaKey) return false;

  return event.key.toLowerCase() === key || event.code.toLowerCase() === key;
}
