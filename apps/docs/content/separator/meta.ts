import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Separator",
  category: "Layout",
  description: "Thin divider line, horizontal or vertical, optionally inset with the standard gutter.",
  components: ["Separator"],
  examples: [
    { file: "basic", title: "Appearances" },
    { file: "vertical", title: "Vertical" },
  ],
  a11y: [
    'Decorative by default (`role="none"`).',
    'Pass `decorative={false}` for a semantic `role="separator"` with `aria-orientation`.',
  ],
  playground: {
    appearance: { type: "select", options: ["primary", "secondary", "alpha"], default: "primary" },
    padding: { type: "boolean" },
    size: { type: "select", options: ["2xs", "s", "m", "l", "2xl"] },
  },
};
