import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Tooltip",
  category: "Overlays",
  description: "Short hint shown on hover and focus of its anchor. Not for essential content.",
  components: ["Tooltip"],
  examples: [
    { file: "appearances", title: "Appearances" },
    { file: "closable", title: "Title and close button" },
  ],
  a11y: [
    'Content is exposed as `role="tooltip"`; the anchor gets `aria-describedby` only while it is shown.',
    "Shows on hover (after `hoverDelay`) and keyboard focus; hides on pointer leave, blur, click and Escape.",
    "`disableFocusTrigger` stops it opening on focus — only use it when the hint is available another way.",
    "`closable` adds a close button labelled by `closeLabel`.",
  ],
};
