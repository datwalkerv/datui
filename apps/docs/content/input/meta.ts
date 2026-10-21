import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Input",
  category: "Forms",
  description: "Single-line native text input inside a FormField.",
  components: ["Input"],
  examples: [{ file: "basic", title: "Controlled and uncontrolled" }],
  a11y: [
    "A native `<input>`: all keyboard behavior is the browser's.",
    '`status="error"` sets `aria-invalid`; inside FormItem the label and description are linked automatically.',
    "Without a FormItem, pass `aria-label` or your own `<label htmlFor>`.",
  ],
  playground: {
    placeholder: { type: "text", default: "Your name" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    mode: { type: "select", options: ["default", "plain"], default: "default" },
    align: { type: "select", options: ["left", "center", "right"], default: "left" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
  },
};
