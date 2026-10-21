import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Spinner",
  category: "Feedback",
  description: "Indeterminate loading indicator that inherits the current text color.",
  components: ["Spinner"],
  examples: [{ file: "sizes", title: "Sizes and color" }],
  a11y: [
    'Renders `role="status"` with a visually hidden `label` (default “Loading…”), so screen readers announce it.',
    "Pass `label={null}` when a parent already announces the busy state; the spinner is then `aria-hidden`.",
    "Under `prefers-reduced-motion` the rotation slows down; `paused` stops it entirely.",
  ],
  playground: {
    size: { type: "select", options: ["s", "m", "l", "xl"], default: "m" },
    paused: { type: "boolean" },
    label: { type: "text", default: "Loading…" },
  },
};
