import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "HorizontalScroll",
  category: "Layout",
  description:
    "A horizontal strip that scrolls natively and adds prev/next arrows for pointer users. Arrows hide at the start and end.",
  components: ["HorizontalScroll"],
  examples: [
    { file: "basic", title: "Basic", description: "Arrows page by one viewport width." },
    {
      file: "custom-step",
      title: "Custom step and wheel",
      description:
        "`getScrollToNext`/`getScrollToPrev` choose the target offset; `scrollOnAnyWheel` maps the vertical wheel.",
    },
  ],
  a11y: [
    "Content scrolls natively: touch, trackpad, Shift+wheel, and arrow keys once the viewport has focus.",
    "The viewport gets `tabIndex=0` only while its content overflows, so keyboard users can reach and scroll it.",
    "Arrow buttons are `aria-hidden` and out of the tab order; they duplicate native scrolling for pointer users.",
    "Arrows follow `DirectionProvider`: in RTL the previous arrow sits on the right and points right.",
    "Under `prefers-reduced-motion` arrow clicks scroll instantly instead of smoothly.",
  ],
};
