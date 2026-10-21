import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "RadioGroup",
  category: "Forms",
  description: "Single choice between labelled `Radio` options with roving arrow-key focus.",
  components: ["RadioGroup", "Radio", "RadioInput"],
  examples: [
    { file: "basic", title: "Options" },
    { file: "horizontal", title: "Horizontal" },
  ],
  a11y: [
    'Radix RadioGroup: `role="radiogroup"`; Tab enters at the selected option, arrow keys move focus and select, disabled options are skipped.',
    "Each `Radio` row is a `<label>`; `description` is linked with `aria-describedby`. Label the group with `aria-label`/`aria-labelledby`.",
  ],
  playground: {
    mode: { type: "select", options: ["vertical", "horizontal"], default: "vertical" },
    disabled: { type: "boolean" },
  },
};
