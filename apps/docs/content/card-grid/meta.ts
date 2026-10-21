import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "CardGrid",
  category: "Layout",
  description: "Responsive grid of cards.",
  components: ["CardGrid"],
  examples: [
    {
      file: "sizes",
      title: "Sizes",
    },
  ],
  a11y: ["Renders a `<ul>` list; render each card as `<li>` (`<Card asChild><li>`)."],
  playground: {
    size: {
      type: "select",
      options: ["s", "m", "l"],
      default: "s",
    },
    padding: {
      type: "boolean",
    },
  },
};
