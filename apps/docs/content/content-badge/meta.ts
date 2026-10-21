import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ContentBadge",
  category: "Data display",
  description: "Label pill for status or category, with optional icons.",
  components: ["ContentBadge", "ContentBadgeIconSlot"],
  examples: [
    {
      file: "variants",
      title: "Variants and sizes",
    },
  ],
  a11y: [
    "Custom colors are your responsibility: pick values that keep 4.5:1 text contrast in each theme, and set `--dt-content-badge-foreground` for filled custom badges (white by default).",
    "Plain inline text with no role.",
    "`ContentBadge.IconSlot` icons are `aria-hidden`; icon-only badges need `aria-label`.",
  ],
  playground: {
    children: {
      type: "text",
      default: "Beta",
    },
    variant: {
      type: "select",
      options: ["primary", "secondary", "outline"],
      default: "primary",
    },
    appearance: {
      type: "select",
      options: ["accent", "neutral", "positive", "negative", "overlay"],
      default: "accent",
    },
    size: {
      type: "select",
      options: ["s", "m", "l"],
      default: "m",
    },
    capsule: {
      type: "boolean",
    },
    weight: {
      type: "select",
      options: ["1", "2", "3"],
      default: "2",
    },
  },
};
