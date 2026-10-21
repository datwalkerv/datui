import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Footer",
  category: "Layout",
  description: "Centered secondary text at the end of a list or section.",
  components: ["Footer"],
  examples: [
    {
      file: "basic",
      title: "Footer",
    },
  ],
  a11y: ['Renders `<footer>` without forcing `role="contentinfo"` (only page-level footers are landmarks).'],
  playground: {
    children: {
      type: "text",
      default: "12 items",
    },
  },
};
