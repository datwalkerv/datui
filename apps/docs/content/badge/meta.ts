import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Badge",
  category: "Data display",
  description: "Tiny dot indicator placed next to a title or icon.",
  components: ["Badge"],
  examples: [
    {
      file: "basic",
      title: "Appearances",
    },
  ],
  a11y: ["The dot is decorative; `children` are rendered visually hidden as its accessible text."],
  playground: {
    appearance: {
      type: "select",
      options: ["accent", "negative"],
      default: "accent",
    },
  },
};
