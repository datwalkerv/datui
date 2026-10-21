import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "SegmentedControl",
  category: "Forms",
  description: "Exclusive choice between a few options with a sliding indicator.",
  components: ["SegmentedControl"],
  examples: [{ file: "basic", title: "Sizes" }],
  a11y: [
    "Radio group semantics (Radix RadioGroup): Tab focuses the selected option, arrow keys move and select (RTL-aware).",
    "Name it with `aria-label` or `aria-labelledby`.",
  ],
  playgroundProps: {
    "aria-label": "View",
    options: [
      { value: "list", label: "List" },
      { value: "grid", label: "Grid" },
      { value: "map", label: "Map" },
    ],
  },
  playground: { size: { type: "select", options: ["m", "l"], default: "l" }, disabled: { type: "boolean" } },
};
