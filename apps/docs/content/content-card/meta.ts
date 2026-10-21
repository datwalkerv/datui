import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ContentCard",
  category: "Data display",
  description: "Card with an optional cover image, title, description and caption; optionally a button or link.",
  components: ["ContentCard"],
  examples: [
    {
      file: "basic",
      title: "Content cards",
    },
  ],
  a11y: [
    "With `href` renders `<a>`, with `onClick` a `<button>`, otherwise a `<div>`.",
    'Image `alt` defaults to `""` because the card text usually describes it.',
    "`disabled` blocks activation.",
  ],
  playground: {
    title: {
      type: "text",
      default: "Card title",
    },
    description: {
      type: "text",
      default: "Description",
    },
    caption: {
      type: "text",
      default: "Caption",
    },
    variant: {
      type: "select",
      options: ["tint", "shadow", "outline", "outline-tint", "plain"],
      default: "shadow",
    },
    disabled: {
      type: "boolean",
    },
  },
};
