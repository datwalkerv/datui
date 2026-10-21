import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Slider",
  category: "Forms",
  description: "Single value or range slider with optional value tooltip.",
  components: ["Slider"],
  examples: [{ file: "basic", title: "Single and range" }],
  a11y: [
    'Radix Slider: each thumb is `role="slider"` with `aria-valuenow/min/max`; use `getAriaLabel` and `getAriaValueText`.',
    "Arrow keys step, PageUp/PageDown move by larger steps, Home/End jump to the ends; range thumbs can't cross.",
  ],
  playgroundProps: { "aria-label": "Volume" },
  playground: {
    min: { type: "number", default: 0 },
    max: { type: "number", default: 100 },
    step: { type: "number", default: 1, min: 1 },
    size: { type: "select", options: ["s", "m", "l"], default: "l" },
    withTooltip: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
