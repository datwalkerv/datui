import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "DateRangeInput",
  category: "Forms",
  description: "Segmented start – end date field with a range calendar popover.",
  components: ["DateRangeInput"],
  examples: [{ file: "basic", title: "Basic" }],
  a11y: [
    'One `role="group"` holding six labelled spinbutton segments ("Start day" … "End year"); name the group with `aria-label` or `aria-labelledby`.',
    "Keys work as in DateInput; Left/Right and Backspace cross between the start and end segments. A typed end before the start is swapped.",
    "The range calendar opens in a focus-trapped dialog and closes once both ends are chosen (with `closeOnChange`); focus returns to the calendar button.",
  ],
  playground: {
    closeOnChange: { type: "boolean", default: true },
    disableCalendar: { type: "boolean" },
    disablePast: { type: "boolean" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    disabled: { type: "boolean" },
  },
  playgroundProps: { "aria-label": "Dates" },
};
