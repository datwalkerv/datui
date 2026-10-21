import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "SelectMimicry",
  category: "Forms",
  description: "Looks like a select but is a button that opens something else, e.g. a modal picker.",
  components: ["SelectMimicry"],
  examples: [{ file: "basic", title: "Opening a picker" }],
  a11y: [
    "A native `<button>` with `aria-haspopup` (default `dialog`); Enter and Space activate.",
    "Shows `placeholder` while `children` is empty.",
  ],
  playground: {
    placeholder: { type: "text", default: "Choose\u2026" },
    children: { type: "text", default: "" },
    selectType: { type: "select", options: ["default", "plain", "accent"], default: "default" },
    multiline: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
