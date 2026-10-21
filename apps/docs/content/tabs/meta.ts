import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Tabs",
  category: "Navigation",
  description:
    "Horizontal tabs with an underline or pill style. Scrolls horizontally when items overflow and keeps the selected tab in view.",
  components: ["Tabs", "TabsItem"],
  examples: [
    {
      file: "panels",
      title: "Tabs with panels",
      description:
        'Give each `TabsItem` an `id` and `aria-controls`, and each panel `role="tabpanel"` with `aria-labelledby`.',
    },
    {
      file: "modes",
      title: "Modes",
      description: "`default` underlines; `accent` and `secondary` use pills. `status` shows a counter.",
    },
    {
      file: "navigation",
      title: "As navigation",
      description: '`role="navigation"` renders links marked with `aria-current`.',
    },
  ],
  a11y: [
    "Follows the WAI-ARIA tabs pattern: `tablist` > `tab` with `aria-selected`; one Tab stop for the list.",
    "Left/Right arrows move between tabs (reversed in right-to-left layouts), Home/End jump to the ends; moving focus selects the tab.",
    '`status` is separated from the label by a space so it is read as "Inbox 3", not "Inbox3".',
    "Disabled tabs are skipped by the arrow keys and cannot be selected.",
    '`role="navigation"` renders a `<nav>` of links/buttons with `aria-current="page"` for site sections instead of in-page panels.',
  ],
};
