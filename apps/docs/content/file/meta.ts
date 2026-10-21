import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "File",
  category: "Forms",
  description: "Button that opens the native file picker.",
  components: ["File"],
  examples: [{ file: "basic", title: "Variants" }],
  a11y: [
    'The real `<input type="file">` stays focusable (visually hidden); the button text is its label and shows the focus ring.',
    "Enter/Space on the input open the picker natively; `onChange(event)` is the input's.",
  ],
  playground: {
    children: { type: "text", default: "Choose file" },
    variant: { type: "select", options: ["primary", "secondary", "tertiary", "outline"], default: "primary" },
    size: { type: "select", options: ["s", "m", "l"], default: "m" },
    stretched: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
