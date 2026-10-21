import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "SubnavigationBar",
  category: "Navigation",
  description: "Horizontally scrolling row of chip-like SubnavigationButtons for filters and sub-sections.",
  components: ["SubnavigationBar", "SubnavigationButton"],
  examples: [
    {
      file: "filters",
      title: "Filters",
      description: "`selected` makes a button a toggle (`aria-pressed`); `chevron` hints at a menu.",
    },
    { file: "variants", title: "Variants and sizes" },
    { file: "fixed", title: "Fixed", description: "`fixed` gives items equal width without scrolling." },
  ],
  a11y: [
    "Renders a `<nav>`; name it with `aria-label`.",
    'Buttons are ordinary Tab stops. With `selected` set, a button exposes `aria-pressed`; a link with `selected` gets `aria-current="page"`.',
    "The scroll arrows appear only for hover-capable pointers when content overflows; they are hidden from assistive tech and skipped by Tab because keyboard focus scrolls items into view.",
    "With `chevron`, pass `aria-haspopup` and `aria-expanded` for the menu you open.",
  ],
};
