import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Alert",
  category: "Overlays",
  description: "Blocking confirmation dialog with a title, description and a row of actions.",
  components: ["Alert"],
  examples: [
    { file: "basic", title: "Confirm", description: "Mount it to show it; `onClosed` fires after it has closed." },
    { file: "vertical", title: "Vertical actions" },
  ],
  a11y: [
    'Renders `role="alertdialog"` with `aria-modal="true"`, `aria-labelledby` on the title and `aria-describedby` on the description.',
    "Focus moves to the first `cancel` action (else the first action), is trapped, and returns to the previously focused element on close.",
    "Escape and an overlay click close it; action clicks close it unless `autoCloseDisabled`.",
    "The close (X) button is shown on regular width only and is labelled by `closeLabel`.",
  ],
};
