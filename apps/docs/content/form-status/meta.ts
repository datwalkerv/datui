import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "FormStatus",
  category: "Forms",
  description: "Form-level message such as a submit error.",
  components: ["FormStatus"],
  examples: [{ file: "basic", title: "Modes" }],
  a11y: ['`mode="error"` renders `role="alert"` (announced immediately); default renders `role="status"` (polite).'],
  playground: {
    title: { type: "text", default: "Something happened" },
    children: { type: "text", default: "Details" },
    mode: { type: "select", options: ["default", "error"], default: "default" },
  },
};
