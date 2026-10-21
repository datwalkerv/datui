import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Button",
  category: "Buttons",
  description: "The main action control. Renders a native button, or a link when given `href`.",
  components: ["Button"],
  examples: [
    {
      file: "variants",
      title: "Variants",
      description: "`variant` sets visual weight, `appearance` sets color intent.",
    },
    { file: "sizes", title: "Sizes" },
    { file: "icons", title: "Icons and loading" },
  ],
  a11y: [
    'Renders `<button type="button">`; with `href` it renders `<a>`. Enter and Space activate natively.',
    "Icon-only buttons have no visible text — pass `aria-label`.",
    "`loading` sets `aria-busy`, announces `loadingLabel` through a status spinner and ignores clicks.",
    "`disabled` sets the native `disabled` attribute; disabled links drop `href` and get `aria-disabled`.",
  ],
  playground: {
    children: { type: "text", default: "Continue" },
    variant: { type: "select", options: ["primary", "secondary", "tertiary", "outline", "link"], default: "primary" },
    appearance: {
      type: "select",
      options: ["accent", "positive", "negative", "neutral", "overlay"],
      default: "accent",
    },
    size: { type: "select", options: ["s", "m", "l"], default: "m" },
    stretched: { type: "boolean" },
    rounded: { type: "boolean" },
    loading: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
