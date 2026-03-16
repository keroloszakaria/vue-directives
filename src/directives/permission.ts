import type { ObjectDirective } from "vue";

/**
 * v-permission - Show/remove element based on user roles/permissions
 *
 * Usage:
 *   <button v-permission="'admin'">Delete User</button>
 *   <button v-permission="['admin', 'moderator']">Edit Post</button>
 *   <button v-permission="{ roles: ['admin'], action: 'hide' }">Secret</button>
 *
 * You must set the current user roles globally:
 *   import { setPermissionRoles } from 'vue-directives';
 *   setPermissionRoles(['admin', 'user']);
 */

let currentRoles: string[] = [];

export function setPermissionRoles(roles: string[]) {
  currentRoles = [...roles];
}

export function getPermissionRoles(): string[] {
  return [...currentRoles];
}

interface PermissionBinding {
  roles: string | string[];
  action?: "hide" | "remove" | "disable";
}

export const vPermission: ObjectDirective<
  HTMLElement,
  string | string[] | PermissionBinding
> = {
  mounted(el, binding) {
    checkPermission(el, binding.value);
  },
  updated(el, binding) {
    checkPermission(el, binding.value);
  },
};

function checkPermission(
  el: HTMLElement,
  value: string | string[] | PermissionBinding,
) {
  let requiredRoles: string[];
  let action: "hide" | "remove" | "disable" = "remove";

  if (typeof value === "string") {
    requiredRoles = [value];
  } else if (Array.isArray(value)) {
    requiredRoles = value;
  } else {
    requiredRoles = Array.isArray(value.roles) ? value.roles : [value.roles];
    action = value.action ?? "remove";
  }

  const hasPermission = requiredRoles.some((role) =>
    currentRoles.includes(role),
  );

  if (hasPermission) {
    el.style.display = "";
    el.style.visibility = "";
    if (el instanceof HTMLButtonElement || el instanceof HTMLInputElement) {
      el.disabled = false;
    }
    el.removeAttribute("aria-disabled");
  } else {
    switch (action) {
      case "hide":
        el.style.display = "none";
        break;
      case "disable":
        if (el instanceof HTMLButtonElement || el instanceof HTMLInputElement) {
          el.disabled = true;
        }
        el.setAttribute("aria-disabled", "true");
        el.style.opacity = "0.5";
        el.style.pointerEvents = "none";
        break;
      case "remove":
      default:
        el.parentNode?.removeChild(el);
        break;
    }
  }
}
