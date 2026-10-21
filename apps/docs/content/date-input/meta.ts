import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "DateInput",
  category: "Forms",
  description: "Segmented date (and optional time) field with a calendar popover.",
  components: ["DateInput"],
  examples: [
    { file: "basic", title: "Basic" },
    {
      file: "time",
      title: "Date and time",
      clientOnly: true,
      description: "`enableTime` adds hour and minute segments; Done closes.",
    },
  ],
  a11y: [
    'The field is a `role="group"`; name it with `aria-label` or `aria-labelledby` (FormItem still wires the description and `aria-invalid`).',
    'Each segment is a `role="spinbutton"` with its own label and `aria-valuenow`/`aria-valuetext`. Digits fill it and advance, Up/Down step (wrapping), Left/Right move, Backspace deletes and moves back, Delete clears.',
    "Impossible dates (31.02) are not emitted; `onChange` gets `null` until the segments form a valid date.",
    "The calendar opens in a focus-trapped, labelled dialog with focus on the selected day; Escape or an outside click closes it and focus returns to the calendar button.",
    "With `name`, a hidden input submits the ISO string.",
  ],
  playground: {
    enableTime: { type: "boolean" },
    closeOnChange: { type: "boolean", default: true },
    disableCalendar: { type: "boolean" },
    disablePast: { type: "boolean" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
  },
  playgroundProps: { "aria-label": "Date" },
};
