import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "NativeSelect",
  category: "Forms",
  description: "Styled native `<select>` with placeholder and select types.",
  components: ["NativeSelect"],
  examples: [{ file: "basic", title: "Select types" }],
  a11y: [
    "Native `<select>` semantics and picker; the placeholder is a disabled, hidden first option.",
    "Labelling and `aria-invalid` come from FormItem or your own props.",
  ],
  playgroundProps: { "aria-label": "Fruit" },
  playground: {
    placeholder: { type: "text", default: "Choose\u2026" },
    selectType: { type: "select", options: ["default", "plain", "accent"], default: "default" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    disabled: { type: "boolean" },
  },
};
