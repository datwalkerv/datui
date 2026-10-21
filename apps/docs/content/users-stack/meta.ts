import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "UsersStack",
  category: "Data display",
  description: 'Overlapping avatars with a "+N" counter and caption.',
  components: ["UsersStack"],
  examples: [
    {
      file: "sizes",
      title: "Sizes and positions",
    },
  ],
  a11y: ['Avatars and the counter are `aria-hidden`; the caption must carry the meaning (e.g. "6 people").'],
};
