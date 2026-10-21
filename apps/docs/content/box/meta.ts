import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Box",
  category: "Layout",
  description: "Generic layout element with padding, margin and size props on the spacing scale.",
  components: ["Box"],
  examples: [{ file: "basic", title: "Layout props" }],
  a11y: ["Renders a `div` by default; use `as` for semantic elements."],
};
