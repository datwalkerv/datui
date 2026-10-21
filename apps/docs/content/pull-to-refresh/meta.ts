import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "PullToRefresh",
  category: "Feedback",
  description:
    "Pull-down-to-refresh for touch devices. Calls `onRefresh` after a long enough pull at the top of the page and shows a spinner until `isFetching` turns false.",
  components: ["PullToRefresh"],
  examples: [
    {
      file: "basic",
      title: "Basic",
      description:
        "On a touch device pull the list down. With a keyboard, Tab to the Refresh button that appears on focus.",
    },
  ],
  a11y: [
    'Wraps content in a `role="region"` labelled by `aria-label` (default "Refreshable content") with `aria-busy` while refreshing.',
    "The gesture only runs for touch; mouse drags do nothing. Keyboard and screen-reader users get a visually hidden Refresh button (`refreshLabel`) that becomes visible on focus and is disabled while refreshing.",
    "A polite status announces `refreshingLabel` while refreshing. The spinner itself is decorative.",
    "The spinner stays for at least one second so a fast refresh doesn't flash; content movement has no transition under `prefers-reduced-motion`.",
  ],
};
