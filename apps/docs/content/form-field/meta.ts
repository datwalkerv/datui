import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "FormField",
  category: "Forms",
  description: "Bordered shell shared by text-like controls, with `before`/`after` slots, status and plain mode.",
  components: ["FormField"],
  examples: [
    {
      file: "basic",
      title: "Slots and states",
      description: "Wrap any bare control. Clicking empty shell space focuses it.",
    },
  ],
  a11y: [
    "FormField is visual only. The control inside must carry its own label and `aria-invalid` (FormItem and datui inputs do this).",
    "Mouse down on empty shell space or a non-interactive slot moves focus to the first control inside.",
  ],
};
