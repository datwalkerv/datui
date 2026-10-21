import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Accordion",
  category: "Data display",
  description:
    "A single expandable section: an `Accordion.Summary` row that toggles an animated `Accordion.Content` body.",
  components: ["Accordion", "AccordionSummary", "AccordionContent", "AccordionIcon"],
  examples: [
    { file: "basic", title: "Basic" },
    {
      file: "controlled",
      title: "Controlled, one at a time",
      description: "Use `open`/`onOpenChange` to keep only one section open. `unmountOnCollapse` drops closed content.",
    },
  ],
  a11y: [
    "The summary is a `<button>` with `aria-expanded` and `aria-controls`; Enter and Space toggle it.",
    'The content is a `role="region"` labelled by the summary.',
    "Collapsed content is `inert` and `visibility: hidden` (or unmounted with `unmountOnCollapse`), so it is out of the tab order and hidden from assistive tech.",
    "The height animation uses motion tokens and is instant under `prefers-reduced-motion`.",
    "`disabled` disables the summary button.",
  ],
};
