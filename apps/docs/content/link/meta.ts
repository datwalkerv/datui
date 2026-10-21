import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Link",
  category: "Buttons",
  description: "Inline text link with optional icons, hover underline and visited state.",
  components: ["Link"],
  examples: [
    {
      file: "basic",
      title: "Links",
    },
  ],
  a11y: [
    "With `href` renders `<a>`; with only `onClick` renders a `<button>` (Enter/Space activate).",
    "`disabled` removes `href` and sets `aria-disabled` (or native `disabled` on buttons) and blocks clicks.",
    "`before`/`after` icons are `aria-hidden`.",
    '`target="_blank"` appends visually hidden `newTabLabel` ("(opens in a new tab)").',
  ],
  playground: {
    children: {
      type: "text",
      default: "Read more",
    },
    href: {
      type: "text",
      default: "#",
    },
    noUnderline: {
      type: "boolean",
    },
    hasVisited: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
};
