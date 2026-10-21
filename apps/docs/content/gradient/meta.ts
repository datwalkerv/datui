import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Gradient",
  category: "Layout",
  description: "Background fade block toward the top or bottom.",
  components: ["Gradient"],
  examples: [
    {
      file: "basic",
      title: "Variants",
    },
  ],
  a11y: ["Purely decorative, no role. Text on the `overlay` variant must keep sufficient contrast."],
  playground: {
    variant: {
      type: "select",
      options: ["default", "tint", "overlay"],
      default: "default",
    },
    to: {
      type: "select",
      options: ["top", "bottom"],
      default: "top",
    },
  },
};
