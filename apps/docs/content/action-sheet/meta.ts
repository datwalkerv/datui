import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ActionSheet",
  category: "Overlays",
  description:
    "A list of actions: a menu anchored to its toggle on regular width, a bottom sheet with a Cancel row on compact width.",
  components: ["ActionSheet", "ActionSheetItem"],
  examples: [
    { file: "basic", title: "Basic", description: "Pass the toggle as `anchorRef`; the layout follows the viewport." },
    { file: "sheet", title: "Sheet", description: '`mode="sheet"` forces the bottom sheet.' },
  ],
  a11y: [
    'Menu layout: `role="menu"` with `menuitem` / `menuitemradio` (`aria-checked`) items; Arrow keys, Home/End and first-letter typeahead move focus; disabled items are skipped.',
    "Sheet layout: a modal dialog with a list of buttons and a Cancel button.",
    "Escape and outside clicks close it; activating an item closes it and then runs its `onClick`.",
    "Focus moves to the first item on open and returns to the anchor on close.",
  ],
};
