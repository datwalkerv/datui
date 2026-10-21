import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "FixedLayout",
  category: "Layout",
  description: "Pins content (a search bar, a bottom action) to the top or bottom of its panel while the rest scrolls.",
  components: ["FixedLayout"],
  examples: [
    {
      file: "bottom",
      title: "Bottom action",
      description: '`vertical="bottom"` with `filled` paints the panel background and pads for the device safe area.',
    },
  ],
  a11y: [
    "Uses sticky positioning, so content stays in DOM and Tab order; nothing is taken out of the flow.",
    "A pinned bar can cover content scrolled underneath — keep enough bottom padding in the panel so the last focusable element is not hidden.",
  ],
  playground: {
    children: { type: "text", default: "Pinned content" },
    vertical: { type: "select", options: ["top", "bottom"], default: "top" },
    filled: { type: "boolean", default: true },
  },
};
