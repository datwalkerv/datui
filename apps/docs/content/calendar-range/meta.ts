import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "CalendarRange",
  category: "Forms",
  description:
    "Range picker: first click sets the start, second the end, with a hover preview of the pending range. Two months on wide screens.",
  components: ["CalendarRange"],
  examples: [{ file: "basic", title: "Basic", clientOnly: true }],
  a11y: [
    'Each month is a `role="grid"` with `aria-multiselectable`; days in the range have `aria-selected`.',
    "Keyboard navigation is the same as Calendar; Enter/Space set the start, then the end (an earlier end becomes the start).",
    "The chosen range is announced through a polite status region.",
  ],
  playground: {
    weekStartsOn: { type: "number", default: 1, min: 0, max: 6 },
    numberOfMonths: { type: "number", default: 2, min: 1, max: 3 },
    disablePast: { type: "boolean" },
    disableFuture: { type: "boolean" },
  },
};
