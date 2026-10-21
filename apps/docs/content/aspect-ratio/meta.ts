import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "AspectRatio",
  category: "Layout",
  description: "Box locked to an aspect ratio; children stretch to fill.",
  components: ["AspectRatio"],
  examples: [
    {
      file: "basic",
      title: "Ratios",
    },
  ],
  a11y: ["Layout only; semantics come from the children."],
};
