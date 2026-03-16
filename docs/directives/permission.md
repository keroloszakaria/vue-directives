# v-permission

Shows, hides, removes, or disables elements based on user roles/permissions. Requires setting the current user's roles globally via `setPermissionRoles`.

## Usage

```vue
<template>
  <button v-permission="'admin'">Delete User</button>
</template>

<script setup>
import { vPermission } from "vue-directives";
</script>
```

### Setup (once, at app init)

```ts
import { setPermissionRoles } from "vue-directives";

// Set the authenticated user's roles
setPermissionRoles(["admin", "user"]);
```

## Options / Binding

The binding value can be a **string**, **string array**, or an **object**:

| Form       | Type                                                                      | Description                                                  |
| ---------- | ------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `string`   | `string`                                                                  | A single required role.                                      |
| `string[]` | `string[]`                                                                | Multiple roles — the user needs **any one** of them to pass. |
| `object`   | `{ roles: string \| string[]; action?: 'hide' \| 'remove' \| 'disable' }` | Full config with action control.                             |

**Actions:**

| Action    | Behavior                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| `remove`  | **(default)** Removes the element from the DOM via `removeChild`.                    |
| `hide`    | Sets `display: none` on the element.                                                 |
| `disable` | Sets `disabled`, `aria-disabled="true"`, `opacity: 0.5`, and `pointer-events: none`. |

**Helper functions:**

| Function             | Signature                   | Description                   |
| -------------------- | --------------------------- | ----------------------------- |
| `setPermissionRoles` | `(roles: string[]) => void` | Set the current user's roles. |
| `getPermissionRoles` | `() => string[]`            | Get the current user's roles. |

## Examples

### Role-Based Button Visibility

```vue
<template>
  <div>
    <button v-permission="'admin'">Admin Panel</button>
    <button v-permission="['editor', 'admin']">Edit Post</button>
    <button v-permission="'viewer'">View Report</button>
  </div>
</template>

<script setup>
import { vPermission } from "vue-directives";
</script>
```

### Disable Instead of Remove

```vue
<template>
  <button v-permission="{ roles: ['manager'], action: 'disable' }">
    Approve Budget
  </button>
</template>

<script setup>
import { vPermission } from "vue-directives";
</script>
```

### Hide Element for Unauthorized Users

```vue
<template>
  <nav>
    <a href="/dashboard">Dashboard</a>
    <a v-permission="{ roles: 'admin', action: 'hide' }" href="/settings">
      Settings
    </a>
  </nav>
</template>

<script setup>
import { vPermission } from "vue-directives";
</script>
```
