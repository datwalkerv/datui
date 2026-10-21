import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Counter",
  category: "Data display",
  description: "Small count pill used in tabs, buttons and cells.",
  components: ["Counter"],
  examples: [
    {
      file: "variants",
      title: "Variants",
    },
  ],
  a11y: [
    'Plain text with no role; add context such as visually hidden "unread" next to it.',
    "Renders nothing when children are empty.",
  ],
  playground: {
    children: {
      type: "text",
      default: "8",
    },
    variant: {
      type: "select",
      options: ["primary", "contrast", "tertiary", "inherit"],
      default: "primary",
    },
    appearance: {
      type: "select",
      options: ["accent", "neutral", "positive", "negative"],
      default: "accent",
    },
    size: {
      type: "select",
      options: ["s", "m"],
      default: "m",
    },
  },
};
