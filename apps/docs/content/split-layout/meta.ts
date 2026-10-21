import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "SplitLayout",
  category: "Layout",
  description:
    "Multi-column app shell: a sidebar and content columns with width bounds, an optional header row and sticky columns.",
  components: ["SplitLayout", "SplitCol"],
  examples: [
    {
      file: "basic",
      title: "Sidebar and content",
      description:
        "`SplitCol` with `width` stays fixed; without it the column fills the rest. `stretchedOnMobile` takes the full width below tablet.",
    },
  ],
  a11y: [
    "Render columns as landmarks with `as` (`nav`, `aside`, `main`) so screen-reader users can jump between them.",
    "`reverseColumns` only changes the visual order (CSS `flex-direction`); reading and Tab order follow the DOM.",
    "`SplitCol animate={false}` turns off `View`/`Root` transitions inside the column.",
  ],
};
