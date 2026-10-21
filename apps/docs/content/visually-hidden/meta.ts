import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "VisuallyHidden",
  category: "Primitives",
  description: "Hides content visually while keeping it available to assistive technology.",
  components: ["VisuallyHidden"],
  examples: [{ file: "basic", title: "Labeling an icon button" }],
  a11y: [
    "Uses the standard `sr-only` clip technique, so the text stays in the accessibility tree and in reading order.",
  ],
};
