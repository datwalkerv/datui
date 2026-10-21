import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Card",
  category: "Data display",
  description: "Plain surface for grouping content.",
  components: ["Card"],
  examples: [
    {
      file: "variants",
      title: "Variants",
    },
  ],
  a11y: ["A generic `<div>`; use `asChild` to render a semantic element such as `<li>` or a link."],
  playground: {
    children: {
      type: "text",
      default: "Card content",
    },
    variant: {
      type: "select",
      options: ["tint", "shadow", "outline", "outline-tint", "plain"],
      default: "tint",
    },
  },
};
