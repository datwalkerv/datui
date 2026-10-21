import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "PanelHeaderContext",
  category: "Navigation",
  description: "Drop-down sheet that slides out under the PanelHeader, e.g. to switch modes or filters.",
  components: ["PanelHeaderContext"],
  examples: [
    {
      file: "basic",
      title: "Mode switcher",
      description: "Place it right after the `PanelHeader`. Point the trigger's `aria-controls` at the sheet's `id`.",
    },
  ],
  a11y: [
    'Renders `role="dialog"` named by `label` (default "Options"). Focus moves into the sheet when it opens and back to the previously focused element when it closes.',
    "Escape and a press outside the sheet call `onClose`; pressing the trigger (matched by `aria-controls`) is not treated as outside, so it can toggle.",
    "Set `aria-expanded` on the trigger yourself — `PanelHeaderContent` passes it through.",
    "Body scroll is locked on compact widths while open. Opening and closing animate unless reduced motion is on.",
  ],
};
