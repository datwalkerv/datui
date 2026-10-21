import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "AppRoot",
  category: "Providers & app",
  description:
    "Root container that applies theme, density, direction and locale to the DOM and hosts the portal layer overlays render into.",
  components: ["AppRoot", "Portal"],
  examples: [{ file: "basic", title: "Setup" }],
  a11y: [
    "Sets `lang` and `dir` from `ConfigProvider` so assistive technology reads content correctly.",
    "Overlays portal into AppRoot's layer instead of `document.body`, so they inherit the theme while Radix still manages focus and `aria-hidden` on the rest of the page.",
  ],
};
