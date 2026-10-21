import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "OnboardingTooltip",
  category: "Overlays",
  description: "Spotlight hint for onboarding: points at an element and blocks the page until dismissed.",
  components: ["OnboardingTooltip"],
  examples: [{ file: "basic", title: "Basic" }],
  a11y: [
    'Renders `role="dialog"` with `aria-modal="true"`, labelled by `title` (warns in development when it has no label) and described by `description`.',
    "The anchor gets `aria-describedby` pointing at the description while open.",
    "Focus moves into the hint, is trapped (unless `disableFocusTrap`) and returns to the previously focused element on close.",
    "Escape closes it; a full-screen layer labelled by `overlayLabel` closes it on any click.",
  ],
};
