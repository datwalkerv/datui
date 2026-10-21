import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "FormLayoutGroup",
  category: "Forms",
  description: "Groups FormItems vertically or side by side, optionally joined into one segmented field.",
  components: ["FormLayoutGroup"],
  examples: [{ file: "basic", title: "Horizontal and segmented" }],
  a11y: [
    'With `aria-label` or `aria-labelledby` the group gets `role="group"`.',
    "Horizontal groups stack below the tablet breakpoint; each field keeps its own label.",
  ],
  playground: {
    mode: { type: "select", options: ["vertical", "horizontal"], default: "vertical" },
    segmented: { type: "boolean" },
  },
};
