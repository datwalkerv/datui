import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Skeleton",
  category: "Feedback",
  description: "Shimmering placeholder for content that is loading.",
  components: ["Skeleton"],
  examples: [
    {
      file: "basic",
      title: "Loading card",
    },
  ],
  a11y: [
    "Skeletons are `aria-hidden`; set `aria-busy` on the region that is loading.",
    "The shimmer stops under `prefers-reduced-motion` and with `noAnimation`.",
  ],
  playground: {
    width: {
      type: "number",
      default: 160,
    },
    height: {
      type: "number",
      default: 16,
    },
    noAnimation: {
      type: "boolean",
    },
    visibilityDelay: {
      type: "number",
      default: 0,
      min: 0,
      max: 2000,
      step: 100,
    },
  },
};
