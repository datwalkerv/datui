import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Checkbox",
  category: "Forms",
  description: "Labelled checkbox row with description and indeterminate state, plus a bare `CheckboxInput`.",
  components: ["Checkbox", "CheckboxInput"],
  examples: [{ file: "basic", title: "Rows and indeterminate" }],
  a11y: [
    'Radix Checkbox: `role="checkbox"`, Space toggles, indeterminate is `aria-checked="mixed"`.',
    "The whole row is a `<label>`; the title names the box and `description` is linked with `aria-describedby`.",
    "`readOnly` keeps the box focusable but ignores toggles. `CheckboxInput` needs `aria-label`/`aria-labelledby`.",
  ],
  playground: {
    children: { type: "text", default: "Remember me" },
    description: { type: "text", default: "" },
    indeterminate: { type: "boolean" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
    noPadding: { type: "boolean" },
  },
};
