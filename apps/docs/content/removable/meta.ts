import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Removable",
  category: "Forms",
  description:
    "Wraps a row or field with a remove action: a trailing ✕ button, or a two-step `reveal` that shows a destructive Remove button.",
  components: ["Removable"],
  examples: [
    { file: "button", title: "Button", description: "Removes in one click. `indent` keeps the space for alignment." },
    {
      file: "reveal",
      title: "Reveal",
      description:
        "The minus button reveals a labelled Remove button; Escape, clicking elsewhere or moving focus collapses it.",
    },
  ],
  a11y: [
    'The ✕ and minus buttons are labelled with `removeLabel` ("Remove"); the revealed button shows it as visible text.',
    "In `reveal`, the minus button has `aria-expanded`; activating it moves focus to the Remove button. Escape collapses and returns focus to the minus button.",
    "While collapsed, the Remove button is `inert` — out of the tab order and hidden from assistive tech.",
    "The remove click doesn't bubble to a surrounding row, so the row's own action never fires.",
  ],
  playground: {
    children: { type: "text", default: "+1 555 0100" },
    variant: { type: "select", options: ["button", "reveal"], default: "button" },
    align: { type: "select", options: ["start", "center"], default: "center" },
    indent: { type: "boolean" },
    noPadding: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
