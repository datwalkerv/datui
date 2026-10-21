import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Typography",
  category: "Typography",
  description:
    "Semantic text presets on datui's type scale: `DisplayTitle`, `Title`, `Headline`, `Text`, `Paragraph`, `Subhead`, `Footnote`, `Caption` and `EllipsisText`.",
  components: [
    "Title",
    "DisplayTitle",
    "Headline",
    "Text",
    "Paragraph",
    "Subhead",
    "Footnote",
    "Caption",
    "EllipsisText",
    "Typography",
  ],
  examples: [
    { file: "scale", title: "Type scale" },
    { file: "weights", title: "Weight, element and caps", description: "`weight`, `as` and `caps` adjust any preset." },
    {
      file: "ellipsis",
      title: "Truncation",
      description: "`EllipsisText` clamps to `maxLines` and exposes the full text as a native tooltip.",
    },
  ],
  a11y: [
    "`Title` and `DisplayTitle` render `h1`–`h4` matching `level`; override with `as` when the visual size and document outline differ.",
    "`Paragraph` renders `<p>`; `Text`, `Subhead`, `Footnote` and `Caption` render `<span>`.",
    "`caps` only changes presentation; screen readers read the original text.",
  ],
  playground: {
    children: { type: "text", default: "The quick brown fox" },
    level: { type: "select", options: ["1", "2", "3"], default: "1" },
    weight: { type: "select", options: ["regular", "medium", "semibold", "bold"], default: "semibold" },
    caps: { type: "boolean" },
  },
};
