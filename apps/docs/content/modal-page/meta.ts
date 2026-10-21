import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ModalPage",
  category: "Overlays",
  description:
    "Modal panel with header, scrollable content and footer. A centered dialog on regular width and a draggable bottom sheet on compact width.",
  components: ["ModalPage", "ModalPageHeader", "ModalPageContent", "ModalRoot"],
  examples: [
    { file: "basic", title: "Basic", description: "Controlled with `open` and `onClose(reason)`." },
    {
      file: "sheet",
      title: "Sheet with snap points",
      description: "`settlingHeight` opens the compact sheet at that height; it can be dragged up or swiped down.",
    },
    {
      file: "modal-root",
      title: "ModalRoot",
      description: "Shows one child modal by `activeModal` id; each child is still an ordinary controlled modal.",
    },
  ],
  a11y: [
    'Renders `role="dialog"` with `aria-modal="true"`, labelled by the `ModalPageHeader` title (an `h2` by default).',
    "Focus moves into the dialog on open, is trapped while open and returns to the previously focused element on close.",
    "Escape, an overlay click, the close button and (compact) a swipe down close it; `preventClose` blocks all of them.",
    "Page scroll is locked and content outside the dialog is hidden from assistive technology while it is open.",
    "`ModalPageContent` is a focusable scroll region so keyboard users can scroll long content.",
  ],
};
