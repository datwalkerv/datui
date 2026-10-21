import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ToolButton",
  category: "Buttons",
  description: "Toolbar button with a density-adaptive icon and optional text.",
  components: ["ToolButton"],
  examples: [
    {
      file: "variants",
      title: "Variants and direction",
    },
  ],
  a11y: [
    "Renders `<button>` (or `<a>` with `href`); Enter/Space activate natively.",
    "Icon-only buttons need `aria-label`; icons are `aria-hidden`.",
    "Icons switch size (or `iconCompact`/`iconRegular`) with `AppRoot` density via CSS.",
  ],
  playground: {
    children: {
      type: "text",
      default: "Edit",
    },
    variant: {
      type: "select",
      options: ["primary", "secondary", "tertiary", "outline"],
      default: "primary",
    },
    appearance: {
      type: "select",
      options: ["accent", "neutral"],
      default: "accent",
    },
    direction: {
      type: "select",
      options: ["row", "column"],
      default: "row",
    },
    rounded: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
};
