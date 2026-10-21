import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "CardScroll",
  category: "Data display",
  description:
    "A horizontally scrolling list of cards with snapping, optional gutters and arrows that move by one card. Built on HorizontalScroll.",
  components: ["CardScroll"],
  examples: [
    {
      file: "basic",
      title: "Sizes",
      description: "`size` sets each card's width; `false` keeps the card's own width.",
    },
    {
      file: "padding",
      title: "Gutters",
      description: "`padding` adds space before the first and after the last card.",
    },
  ],
  a11y: [
    "Renders a `<ul>`; every child becomes an `<li>`, so screen readers announce the number of cards.",
    "Native scrolling and snapping; the viewport is focusable while it overflows so arrow keys scroll it.",
    "Arrow buttons are `aria-hidden` and out of the tab order; interactive cards stay reachable with Tab.",
  ],
};
