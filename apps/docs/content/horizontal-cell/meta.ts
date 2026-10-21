import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "HorizontalCell",
  category: "Data display",
  description: "Vertical tile — media on top, text below — for horizontally scrolling lists.",
  components: ["HorizontalCell", "HorizontalCellShowMore"],
  examples: [
    {
      file: "show-more",
      title: "Show more tile",
      description: "`HorizontalCellShowMore` ends a scrolling row with a link to the full list.",
    },
    { file: "sizes", title: "Sizes", description: "Token widths `s`–`xl`, `auto`, or a number of pixels." },
  ],
  a11y: [
    "With `onClick` or `href` the tile renders a `<button>` or `<a>` named by its title and subtitles; Enter/Space activate.",
    "Put tiles in a `<ul>` with each one in an `<li>` when they form a list.",
    "Give media meaningful `alt` text, or an empty `alt` when the title already names it.",
  ],
  playground: {
    title: { type: "text", default: "Album" },
    subtitle: { type: "text", default: "24 photos" },
    size: { type: "select", options: ["s", "m", "l", "xl", "auto"], default: "s" },
    textAlign: { type: "select", options: ["start", "center", "end"] },
    noPadding: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
