import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ModalCard",
  category: "Overlays",
  description:
    "Small modal for one message or decision: icon, title, description and actions. A centered card on regular width, docked to the bottom on compact width.",
  components: ["ModalCard", "ModalDismissButton", "ModalOutsideButton"],
  examples: [
    { file: "basic", title: "Basic" },
    {
      file: "outside-buttons",
      title: "Outside buttons",
      description: "On compact width the dismiss button and `outsideButtons` sit above the card.",
    },
  ],
  a11y: [
    'Renders `role="dialog"` with `aria-modal="true"`, labelled by `title` and described by `description`.',
    "Focus moves in on open, is trapped while open and returns to the previously focused element on close.",
    "Escape, an overlay click, the dismiss button and (compact) a swipe down close it; `preventClose` blocks all of them.",
    "`ModalDismissButton` and `ModalOutsideButton` are icon buttons with an accessible name; outside buttons stay inside the dialog, so they are in the focus trap.",
  ],
};
