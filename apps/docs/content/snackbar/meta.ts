import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Snackbar",
  category: "Feedback",
  description: "Temporary notification with an optional action. Hides after `duration`; swipe or Escape dismisses it.",
  components: ["Snackbar", "SnackbarBasic"],
  examples: [
    {
      file: "basic-inline",
      title: "Inline surface",
      description: "`SnackbarBasic` is the visual body without positioning or timers, for custom toast hosts.",
    },
    { file: "basic", title: "Basic", description: "Mount it to show it and unmount it in `onClosed`." },
    { file: "variants", title: "Placement, mode and layout" },
  ],
  a11y: [
    'The message is a polite live region (`role="status"`).',
    "The timer pauses while the Snackbar is hovered, focused or being dragged; use `duration={null}` for messages that need more time (WCAG 2.2.1).",
    "The action is a native button; Escape closes the Snackbar from anywhere on the page.",
  ],
};
