import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Progress",
  category: "Feedback",
  description: "Determinate linear progress bar.",
  components: ["Progress"],
  examples: [
    {
      file: "basic",
      title: "Values and colors",
    },
  ],
  a11y: [
    'Radix progress semantics: `role="progressbar"` with `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax=100`.',
    "Values are clamped to 0–100.",
    "Label it with `aria-label` or `aria-labelledby`.",
  ],
  playground: {
    value: {
      type: "number",
      default: 40,
      min: 0,
      max: 100,
    },
    appearance: {
      type: "select",
      options: ["accent", "positive", "negative"],
      default: "accent",
    },
    height: {
      type: "number",
      default: 4,
      min: 2,
      max: 16,
    },
    noTrack: {
      type: "boolean",
    },
    "aria-label": {
      type: "text",
      default: "Progress",
    },
  },
};
