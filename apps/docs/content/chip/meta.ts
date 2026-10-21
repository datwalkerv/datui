import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Chip",
  category: "Forms",
  description: "Compact token with optional slots and a remove button. Used by ChipsInput and ChipsSelect.",
  components: ["Chip"],
  examples: [{ file: "basic", title: "Modes and states" }],
  a11y: [
    'The remove button is a native `<button>` named `removeLabel` plus the chip text ("Remove Design").',
    "`disabled` sets `aria-disabled` and hides the remove button; `readOnly` hides it too.",
  ],
  playground: {
    children: { type: "text", default: "Design" },
    mode: { type: "select", options: ["primary", "secondary"], default: "primary" },
    removable: { type: "boolean", default: true },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
  },
};
