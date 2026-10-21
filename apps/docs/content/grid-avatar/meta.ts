import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "GridAvatar",
  category: "Data display",
  description: "Round avatar built from up to four images, for group chats.",
  components: ["GridAvatar"],
  examples: [
    {
      file: "layouts",
      title: "Layouts",
    },
  ],
  a11y: [
    'The root is `role="img"` labelled by `alt`; individual tiles are `aria-hidden`.',
    "More than four images are ignored (with a console warning).",
  ],
};
