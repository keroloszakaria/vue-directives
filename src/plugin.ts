import type { App } from "vue";
import {
  vAnimateOnScroll,
  vAria,
  vAutoAriaLabel,
  vAutoLayout,
  vAutoPoll,
  vAutoSubmit,
  vAutogrow,
  vClickOutside,
  vClickableArea,
  vColorMode,
  vCopy,
  vCountUp,
  vCpuAware,
  vCspNonce,
  vCursorFollow,
  vDebounce,
  vDomDiffHighlight,
  vDragScroll,
  vDragSort,
  vDraggable,
  vElementQuery,
  vEnterSubmit,
  vEscape,
  vFeatureFlag,
  vFocus,
  vFocusTrap,
  vFocusVisible,
  vFormatNumber,
  vFpsMonitor,
  vGesture,
  vHighlight,
  vHotkey,
  vHoverClass,
  vHydrateOnVisible,
  vIdle,
  vInView,
  vIntentHover,
  vIntersection,
  vLazyLoad,
  vLoading,
  vLongpress,
  vLowercase,
  vMagnetic,
  vMask,
  vMaxLength,
  vMeasureRender,
  vMotion,
  vNetworkAware,
  vNumeric,
  vOutsideFocus,
  vParallax,
  vPermission,
  vPersist,
  vPrefetch,
  vPreloadImage,
  vPress,
  vPreventDoubleClick,
  vRenderIfVisible,
  vRenderOnIdle,
  vResizeObserver,
  vRipple,
  vSafeLink,
  vSanitize,
  vScrollProgress,
  vScrollTo,
  vSelectAll,
  vSkeleton,
  vSmartClick,
  vSmartMount,
  vSmartPrefetch,
  vSmartScrollLock,
  vStagger,
  vSticky,
  vSuspend,
  vSwipe,
  vSyncBroadcast,
  vSyncQuery,
  vSyncStorage,
  vTabGuard,
  vThrottle,
  vTilt,
  vTimeago,
  vTooltip,
  vTrim,
  vTruncate,
  vTrustedHtml,
  vUppercase,
  vValidate,
  vVirtualScroll,
  vVisible,
} from "./directives";

export type DirectiveName =
  | "animate-on-scroll"
  | "aria"
  | "auto-aria-label"
  | "auto-layout"
  | "auto-poll"
  | "auto-submit"
  | "autogrow"
  | "clickable-area"
  | "click-outside"
  | "color-mode"
  | "copy"
  | "count-up"
  | "cpu-aware"
  | "csp-nonce"
  | "cursor-follow"
  | "debounce"
  | "dom-diff-highlight"
  | "drag-scroll"
  | "drag-sort"
  | "draggable"
  | "element-query"
  | "enter-submit"
  | "escape"
  | "feature-flag"
  | "focus"
  | "focus-trap"
  | "focus-visible"
  | "format-number"
  | "fps-monitor"
  | "gesture"
  | "highlight"
  | "hotkey"
  | "hover-class"
  | "hydrate-on-visible"
  | "idle"
  | "in-view"
  | "intent-hover"
  | "intersection"
  | "lazy-load"
  | "loading"
  | "longpress"
  | "lowercase"
  | "magnetic"
  | "mask"
  | "max-length"
  | "measure-render"
  | "motion"
  | "network-aware"
  | "numeric"
  | "outside-focus"
  | "parallax"
  | "permission"
  | "persist"
  | "prefetch"
  | "preload-image"
  | "press"
  | "prevent-double-click"
  | "render-if-visible"
  | "render-on-idle"
  | "resize-observer"
  | "ripple"
  | "safe-link"
  | "sanitize"
  | "scroll-progress"
  | "scroll-to"
  | "select-all"
  | "skeleton"
  | "smart-click"
  | "smart-mount"
  | "smart-prefetch"
  | "smart-scroll-lock"
  | "stagger"
  | "sticky"
  | "suspend"
  | "swipe"
  | "sync-broadcast"
  | "sync-query"
  | "sync-storage"
  | "tab-guard"
  | "throttle"
  | "tilt"
  | "timeago"
  | "tooltip"
  | "trim"
  | "truncate"
  | "trusted-html"
  | "uppercase"
  | "validate"
  | "virtual-scroll"
  | "visible";

export interface VueDirectivesPluginOptions {
  /** Register only specific directives by name */
  directives?: DirectiveName[];
}

const allDirectives: Record<string, any> = {
  "animate-on-scroll": vAnimateOnScroll,
  aria: vAria,
  "auto-aria-label": vAutoAriaLabel,
  "auto-layout": vAutoLayout,
  "auto-poll": vAutoPoll,
  "auto-submit": vAutoSubmit,
  autogrow: vAutogrow,
  "clickable-area": vClickableArea,
  "click-outside": vClickOutside,
  "color-mode": vColorMode,
  copy: vCopy,
  "count-up": vCountUp,
  "cpu-aware": vCpuAware,
  "csp-nonce": vCspNonce,
  "cursor-follow": vCursorFollow,
  debounce: vDebounce,
  "dom-diff-highlight": vDomDiffHighlight,
  "drag-scroll": vDragScroll,
  "drag-sort": vDragSort,
  draggable: vDraggable,
  "element-query": vElementQuery,
  "enter-submit": vEnterSubmit,
  escape: vEscape,
  "feature-flag": vFeatureFlag,
  focus: vFocus,
  "focus-trap": vFocusTrap,
  "focus-visible": vFocusVisible,
  "format-number": vFormatNumber,
  "fps-monitor": vFpsMonitor,
  gesture: vGesture,
  highlight: vHighlight,
  hotkey: vHotkey,
  "hover-class": vHoverClass,
  "hydrate-on-visible": vHydrateOnVisible,
  idle: vIdle,
  "in-view": vInView,
  "intent-hover": vIntentHover,
  intersection: vIntersection,
  "lazy-load": vLazyLoad,
  loading: vLoading,
  longpress: vLongpress,
  lowercase: vLowercase,
  magnetic: vMagnetic,
  mask: vMask,
  "max-length": vMaxLength,
  "measure-render": vMeasureRender,
  motion: vMotion,
  "network-aware": vNetworkAware,
  numeric: vNumeric,
  "outside-focus": vOutsideFocus,
  parallax: vParallax,
  permission: vPermission,
  persist: vPersist,
  prefetch: vPrefetch,
  "preload-image": vPreloadImage,
  press: vPress,
  "prevent-double-click": vPreventDoubleClick,
  "render-if-visible": vRenderIfVisible,
  "render-on-idle": vRenderOnIdle,
  "resize-observer": vResizeObserver,
  ripple: vRipple,
  "safe-link": vSafeLink,
  sanitize: vSanitize,
  "scroll-progress": vScrollProgress,
  "scroll-to": vScrollTo,
  "select-all": vSelectAll,
  skeleton: vSkeleton,
  "smart-click": vSmartClick,
  "smart-mount": vSmartMount,
  "smart-prefetch": vSmartPrefetch,
  "smart-scroll-lock": vSmartScrollLock,
  stagger: vStagger,
  sticky: vSticky,
  suspend: vSuspend,
  swipe: vSwipe,
  "sync-broadcast": vSyncBroadcast,
  "sync-query": vSyncQuery,
  "sync-storage": vSyncStorage,
  "tab-guard": vTabGuard,
  throttle: vThrottle,
  tilt: vTilt,
  timeago: vTimeago,
  tooltip: vTooltip,
  trim: vTrim,
  truncate: vTruncate,
  "trusted-html": vTrustedHtml,
  uppercase: vUppercase,
  validate: vValidate,
  "virtual-scroll": vVirtualScroll,
  visible: vVisible,
};

export const VueDirectivesPlugin = {
  install(app: App, options?: VueDirectivesPluginOptions) {
    const selected = options?.directives;

    for (const [name, directive] of Object.entries(allDirectives)) {
      if (!selected || selected.includes(name as DirectiveName)) {
        app.directive(name, directive);
      }
    }
  },
};
