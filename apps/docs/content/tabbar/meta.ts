import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Tabbar",
  category: "Navigation",
  description:
    "Bottom navigation bar with icon destinations, labels and indicators. Usually passed to `Epic`'s `tabbar` slot.",
  components: ["Tabbar", "TabbarItem"],
  examples: [
    {
      file: "basic",
      title: "Destinations",
      description: '`mode="auto"` stacks icon over label with three or more items.',
    },
    { file: "horizontal", title: "Two items", description: "With two items the label sits beside the icon." },
  ],
  a11y: [
    'A `<nav>` landmark (named "Main" by default, override with `aria-label`) containing a list of items.',
    "Items are buttons, or links with `href`; they are plain Tab stops, not a roving group.",
    'The `selected` item gets `aria-current="page"`.',
    "Items without a visible `label` need `aria-label`.",
    "Sticks to the bottom of the viewport or scroll container and pads for the device safe area.",
  ],
};
