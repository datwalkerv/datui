import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Textarea",
  category: "Forms",
  description: "Multi-line native textarea that grows with its content.",
  components: ["Textarea"],
  examples: [{ file: "basic", title: "Auto-grow", description: "Grows until `maxHeight`, then scrolls." }],
  a11y: ["A native `<textarea>`; labelling and `aria-invalid` work as for Input."],
  playground: {
    placeholder: { type: "text", default: "Message" },
    rows: { type: "number", default: 2, min: 1, max: 8 },
    grow: { type: "boolean", default: true },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    disabled: { type: "boolean" },
  },
};
