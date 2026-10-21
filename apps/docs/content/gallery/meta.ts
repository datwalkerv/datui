import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Gallery",
  category: "Data display",
  description:
    "A swipeable carousel of slides with snapping, bullets, arrows, looping and optional autoplay. Built on embla-carousel.",
  components: ["Gallery"],
  examples: [
    { file: "basic", title: "Basic", description: "Uncontrolled, with bullets and arrows." },
    {
      file: "controlled",
      title: "Controlled",
      description: "`slideIndex` + `onChange`. Without `onChange` the gallery can't be dragged.",
    },
    {
      file: "custom-width",
      title: "Custom slide width and looping",
      description: '`slideWidth` with `align="center"` and `looped`.',
    },
    {
      file: "autoplay",
      title: "Autoplay",
      description: "`autoplay` advances every n ms and pauses on hover, focus, drag and with its pause button.",
    },
  ],
  a11y: [
    'The root is a `role="region"` with `aria-roledescription="carousel"` and an `aria-label` (default "Gallery").',
    'Each slide is a `role="group"` with `aria-roledescription="slide"` and a "n of m" label (`slideLabel`).',
    "The root is focusable: Left/Right move one slide (flipped in RTL), Home/End jump to the first/last.",
    "Prev/next arrows are labelled buttons (`prevLabel`, `nextLabel`) with `aria-controls` pointing at the slide viewport; they hide at the ends unless `looped`.",
    'The slide viewport is `aria-live="polite"` while autoplay is not running, so manual changes are announced.',
    "Autoplay pauses on mouse hover, keyboard focus inside and dragging, has a pause/play button, and is off under `prefers-reduced-motion`.",
    "Bullets are decorative (`aria-hidden`); position is conveyed by slide labels.",
  ],
};
