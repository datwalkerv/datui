import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "CellButton",
  category: "Buttons",
  description:
    "Full-width list-row button with the cell layout. `CellButtonGroup` stacks several into one rounded block.",
  components: ["CellButton", "CellButtonGroup", "CellButtonGroupSeparator"],
  examples: [
    {
      file: "appearances",
      title: "Appearances",
      description: "`accent`, `neutral` and `negative`; `centered` for lone actions.",
    },
    { file: "group", title: "Group", description: "`CellButtonGroup.Separator` draws an inset line between rows." },
  ],
  a11y: [
    'Always a `<button type="button">` (or `<a>` with `href`); Enter and Space activate natively.',
    'Title and subtitles are separated by spaces, so the accessible name reads "Add member Up to 10 people".',
    "`disabled` sets the native attribute. The chevron is `aria-hidden`.",
    'Give `CellButtonGroup` `role="group"` and an `aria-label` when the set of actions needs a name. Separators are decorative.',
  ],
  playground: {
    children: { type: "text", default: "Add member" },
    subtitle: { type: "text" },
    appearance: { type: "select", options: ["accent", "neutral", "negative"], default: "accent" },
    centered: { type: "boolean" },
    chevron: { type: "boolean" },
    multiline: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
