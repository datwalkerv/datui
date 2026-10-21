import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Header",
  category: "Layout",
  description: "Section heading with subtitle, indicator and before/after slots.",
  components: ["Header"],
  examples: [
    {
      file: "sizes",
      title: "Sizes and slots",
    },
  ],
  a11y: [
    "The title is a real heading (`h2` by default, change with `as`).",
    "`beforeTitle`/`afterTitle`/`beforeSubtitle`/`afterSubtitle` icons are `aria-hidden`.",
  ],
  playground: {
    children: {
      type: "text",
      default: "Section",
    },
    size: {
      type: "select",
      options: ["s", "m", "l", "xl"],
      default: "m",
    },
    subtitle: {
      type: "text",
      default: "Subtitle",
    },
    multiline: {
      type: "boolean",
    },
  },
};
