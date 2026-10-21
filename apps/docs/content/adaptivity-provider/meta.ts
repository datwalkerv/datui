import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "AdaptivityProvider",
  category: "Providers & app",
  description:
    "Exposes viewport size classes and input capabilities via `useAdaptivity()`. Values are detected from media queries; the provider overrides them for a subtree.",
  components: ["AdaptivityProvider"],
  examples: [
    {
      file: "detected",
      title: "Detected values",
      description: "Resize the window to see `sizeX` switch at the tablet breakpoint (768px).",
    },
    { file: "override", title: "Forcing a size class" },
  ],
  a11y: [
    "Has no DOM output. Components use it to choose structure, e.g. a bottom sheet on compact widths and a dialog on regular widths.",
  ],
};
