import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "FocusTrap",
  category: "Primitives",
  description: "Keeps keyboard focus inside its children. datui overlays use it internally; use it for custom popups.",
  components: ["FocusTrap"],
  examples: [{ file: "basic", title: "Trapped panel" }],
  a11y: [
    "Tab and Shift+Tab loop within the trap while `trapped` is true.",
    "Focuses the first focusable child on mount (`autoFocus`) and restores focus to the previously focused element on unmount (`restoreFocus`).",
    "`onEscape` fires on Escape so you can close the surface.",
  ],
};
