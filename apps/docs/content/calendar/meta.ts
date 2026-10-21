import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Calendar",
  category: "Forms",
  description:
    "Month grid date picker with month/year pickers, disabled dates, locale-aware labels and optional time. CalendarHeader is its navigation bar.",
  components: ["Calendar", "CalendarHeader"],
  examples: [
    { file: "basic", title: "Basic", clientOnly: true },
    {
      file: "limits",
      title: "Limits",
      clientOnly: true,
      description: "`disablePast`, `maxDateTime` and `shouldDisableDate`.",
    },
    {
      file: "time",
      title: "With time",
      clientOnly: true,
      description: "`enableTime` adds hour and minute pickers and a Done button.",
    },
    { file: "header", title: "CalendarHeader on its own", clientOnly: true },
  ],
  a11y: [
    'Each month is a `role="grid"` named by its month and year; days are buttons named with the full localized date, today has `aria-current="date"`, the selected cell `aria-selected`.',
    "One day is in the tab order. Arrow keys move by day (crossing into the next or previous month), PageUp/PageDown by month, Home/End to the week edges, Enter/Space select.",
    "Previous/next month are labelled icon buttons; month and year are labelled native selects (type-ahead and Up/Down work).",
    "Weekday names, month names and day labels come from `LocaleProvider` via `Intl`; all built-in strings are props.",
  ],
  playground: {
    size: { type: "select", options: ["m", "s"], default: "m" },
    weekStartsOn: { type: "number", default: 1, min: 0, max: 6 },
    disablePast: { type: "boolean" },
    disableFuture: { type: "boolean" },
    disablePickers: { type: "boolean" },
    showNeighboringMonth: { type: "boolean" },
    enableTime: { type: "boolean" },
  },
};
