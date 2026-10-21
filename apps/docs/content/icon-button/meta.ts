import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "IconButton",
  category: "Buttons",
  description: "Square icon-only button.",
  components: ["IconButton"],
  examples: [
    {
      file: "basic",
      title: "Sizes and states",
    },
  ],
  a11y: [
    'Renders `<button type="button">`, or `<a>` with `href`.',
    "Needs an accessible name: `label` (rendered visually hidden) or `aria-label`; a console warning fires otherwise.",
    "The icon is `aria-hidden`.",
  ],
  playground: {
    label: {
      type: "text",
      default: "Settings",
    },
    size: {
      type: "select",
      options: ["s", "m"],
      default: "m",
    },
    disabled: {
      type: "boolean",
    },
  },
};
