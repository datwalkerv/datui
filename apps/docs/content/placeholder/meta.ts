import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Placeholder",
  category: "Data display",
  description: "Empty state with icon, title, description and action.",
  components: [
    "Placeholder",
    "PlaceholderContainer",
    "PlaceholderIcon",
    "PlaceholderTitle",
    "PlaceholderDescription",
    "PlaceholderActions",
  ],
  examples: [
    {
      file: "basic",
      title: "Empty state",
    },
  ],
  a11y: ["`title` renders as an `h2` (change with `titleAs`).", "The icon is `aria-hidden`."],
  playground: {
    title: {
      type: "text",
      default: "Nothing here",
    },
    children: {
      type: "text",
      default: "Try a different filter.",
    },
    stretched: {
      type: "boolean",
    },
    noPadding: {
      type: "boolean",
    },
  },
};
