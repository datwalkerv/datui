import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "SimpleGrid",
  category: "Layout",
  description: "CSS grid with a fixed number of equal columns, or as many columns as fit a minimum width.",
  components: ["SimpleGrid"],
  examples: [
    { file: "columns", title: "Fixed columns" },
    {
      file: "responsive",
      title: "Responsive columns",
      description: "`minColWidth` auto-fills columns; resize the window.",
    },
  ],
  a11y: ["Purely presentational; DOM order is reading order."],
  playground: {
    columns: { type: "number", default: 3, min: 1, max: 6 },
    gap: { type: "select", options: ["2xs", "xs", "s", "m", "l", "xl"], default: "m" },
  },
};
