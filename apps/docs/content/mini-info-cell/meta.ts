import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "MiniInfoCell",
  category: "Data display",
  description: 'Compact info line with a small icon, for profile details, "Add info" and "Show more" rows.',
  components: ["MiniInfoCell"],
  examples: [
    { file: "modes", title: "Modes" },
    {
      file: "wrap",
      title: "Text wrapping",
      description: "`nowrap` truncates, `short` clamps to 3 lines, `full` wraps.",
    },
  ],
  a11y: [
    "Renders a `<button>` with `onClick`, otherwise a static `<div>`.",
    "Icons are decorative; pass lucide icons (which are `aria-hidden`) or mark custom ones `aria-hidden`.",
  ],
  playground: {
    children: { type: "text", default: "Lives in Lisbon" },
    mode: { type: "select", options: ["base", "accent", "add", "more"], default: "base" },
    textWrap: { type: "select", options: ["nowrap", "short", "full"], default: "nowrap" },
    chevron: { type: "boolean" },
  },
};
