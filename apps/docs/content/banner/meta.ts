import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Banner",
  category: "Data display",
  description: "Promo or announcement block with actions and dismiss/chevron.",
  components: ["Banner"],
  examples: [
    {
      file: "basic",
      title: "Banners",
    },
  ],
  a11y: [
    "With `onClick`/`href` the title becomes the button/link, stretched over the banner; actions and dismiss stay separate controls.",
    'The dismiss button is labelled by `dismissLabel` ("Dismiss") and does not trigger `onClick`.',
    "`background` is `aria-hidden`.",
  ],
  playground: {
    title: {
      type: "text",
      default: "Announcement",
    },
    subtitle: {
      type: "text",
      default: "Something new",
    },
    variant: {
      type: "select",
      options: ["tint", "image"],
      default: "tint",
    },
    size: {
      type: "select",
      options: ["s", "m"],
      default: "s",
    },
  },
};
