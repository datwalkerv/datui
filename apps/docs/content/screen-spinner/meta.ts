import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ScreenSpinner",
  category: "Feedback",
  description: "Full-screen blocking loader that can turn into a done, error or custom icon, or offer cancel.",
  components: ["ScreenSpinner", "ScreenSpinnerContainer"],
  examples: [
    {
      file: "container",
      title: "Inline container",
      description: "`ScreenSpinnerContainer` renders the status card in place, without the full-screen layer.",
    },
    { file: "states", title: "States", description: "Loading, then cancelable, then done." },
  ],
  a11y: [
    'The card is a polite live region (`role="status"`); `label` (or `loadingLabel` while loading) is announced.',
    "In the `cancelable` state the spinner holds a native button labelled by `cancelLabel` (Enter/Space activate it).",
    "It blocks pointer input to the page; it does not trap keyboard focus.",
  ],
};
