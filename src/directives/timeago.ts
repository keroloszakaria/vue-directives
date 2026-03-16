import type { ObjectDirective } from "vue";

interface TimeagoElement extends HTMLElement {
  _timeagoTimer?: ReturnType<typeof setInterval>;
}

interface TimeagoBinding {
  date: Date | string | number;
  locale?: "en" | "ar";
  autoUpdate?: boolean;
  interval?: number;
}

const UNITS_EN: [number, string, string][] = [
  [60, "second", "seconds"],
  [3600, "minute", "minutes"],
  [86400, "hour", "hours"],
  [604800, "day", "days"],
  [2592000, "week", "weeks"],
  [31536000, "month", "months"],
  [Infinity, "year", "years"],
];

const UNITS_AR: [number, string, string][] = [
  [60, "ثانية", "ثواني"],
  [3600, "دقيقة", "دقائق"],
  [86400, "ساعة", "ساعات"],
  [604800, "يوم", "أيام"],
  [2592000, "أسبوع", "أسابيع"],
  [31536000, "شهر", "أشهر"],
  [Infinity, "سنة", "سنوات"],
];

function getTimeago(date: Date | string | number, locale: "en" | "ar"): string {
  const d = date instanceof Date ? date : new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const isFuture = seconds < 0;
  const absSeconds = Math.abs(seconds);

  if (absSeconds < 10) return locale === "ar" ? "الآن" : "just now";

  const units = locale === "ar" ? UNITS_AR : UNITS_EN;
  const dividers = [1, 60, 3600, 86400, 604800, 2592000, 31536000];

  for (let i = 0; i < units.length; i++) {
    const [threshold, singular, plural] = units[i];
    if (absSeconds < threshold) {
      const value = Math.floor(absSeconds / dividers[i]);
      const unit = value === 1 ? singular : plural;

      if (locale === "ar") {
        return isFuture ? `بعد ${value} ${unit}` : `منذ ${value} ${unit}`;
      }
      return isFuture ? `in ${value} ${unit}` : `${value} ${unit} ago`;
    }
  }

  return locale === "ar" ? "منذ وقت طويل" : "a long time ago";
}

/**
 * v-timeago - Auto-updating relative time
 *
 * Usage:
 *   <span v-timeago="new Date('2024-01-01')" />
 *   <span v-timeago="{ date: post.createdAt, locale: 'ar', autoUpdate: true }" />
 */
export const vTimeago: ObjectDirective<
  TimeagoElement,
  Date | string | number | TimeagoBinding
> = {
  mounted(el, binding) {
    const value = binding.value;
    const date = isTimeagoBinding(value) ? value.date : value;
    const locale = isTimeagoBinding(value) ? (value.locale ?? "en") : "en";
    const autoUpdate = isTimeagoBinding(value)
      ? value.autoUpdate !== false
      : true;
    const interval = isTimeagoBinding(value)
      ? (value.interval ?? 30000)
      : 30000;

    el.textContent = getTimeago(date, locale);

    if (autoUpdate) {
      el._timeagoTimer = setInterval(() => {
        el.textContent = getTimeago(date, locale);
      }, interval);
    }
  },

  updated(el, binding) {
    if (el._timeagoTimer) {
      clearInterval(el._timeagoTimer);
    }

    const value = binding.value;
    const date = isTimeagoBinding(value) ? value.date : value;
    const locale = isTimeagoBinding(value) ? (value.locale ?? "en") : "en";
    const autoUpdate = isTimeagoBinding(value)
      ? value.autoUpdate !== false
      : true;
    const interval = isTimeagoBinding(value)
      ? (value.interval ?? 30000)
      : 30000;

    el.textContent = getTimeago(date, locale);

    if (autoUpdate) {
      el._timeagoTimer = setInterval(() => {
        el.textContent = getTimeago(date, locale);
      }, interval);
    }
  },

  unmounted(el) {
    if (el._timeagoTimer) {
      clearInterval(el._timeagoTimer);
      delete el._timeagoTimer;
    }
  },
};

function isTimeagoBinding(value: any): value is TimeagoBinding {
  return (
    typeof value === "object" &&
    value !== null &&
    !(value instanceof Date) &&
    "date" in value
  );
}
