import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ConfigProvider",
  category: "Providers & app",
  description:
    "App-wide settings: color scheme, locale, text direction and transition motion. `ColorSchemeProvider`, `LocaleProvider` and `DirectionProvider` are also available on their own.",
  components: ["ConfigProvider", "ColorSchemeProvider", "LocaleProvider", "DirectionProvider"],
  examples: [
    {
      file: "scheme",
      title: "Scoped color scheme",
      description: "Nest a provider with an embedded `AppRoot` to theme part of a page.",
    },
    { file: "direction", title: "Right-to-left" },
  ],
  a11y: [
    "`direction` sets the `dir` attribute on `AppRoot` and configures Radix primitives, so arrow-key navigation follows the reading direction.",
    "`locale` sets `lang` on `AppRoot`, so screen readers pick the right pronunciation.",
    "`useTransitionMotion()` returns false when `transitionMotionEnabled` is off or the user prefers reduced motion.",
  ],
};
