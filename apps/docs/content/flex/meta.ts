import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Flex",
  category: "Layout",
  description: "Flexbox container with gaps on the spacing scale, plus `FlexItem` for sizing children.",
  components: ["Flex", "FlexItem"],
  examples: [
    { file: "basic", title: "Gap, alignment and wrapping" },
    { file: "items", title: "Flex items" },
  ],
  a11y: ["Purely presentational. Use `as` to render a semantic element such as `ul`, `nav` or `section`."],
  playground: {
    direction: { type: "select", options: ["row", "column"], default: "row" },
    align: { type: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { type: "select", options: ["start", "center", "end", "space-between", "space-around", "space-evenly"] },
    gap: { type: "select", options: ["2xs", "xs", "s", "m", "l", "xl", "2xl"], default: "m" },
    reverse: { type: "boolean" },
    noWrap: { type: "boolean" },
  },
};
