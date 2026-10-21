import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Panel",
  category: "Navigation",
  description: "One screen inside a View. Plain on phones, a card on tablet width and up.",
  components: ["Panel"],
  examples: [
    { file: "modes", title: "Plain and card", description: "`mode` is chosen from the viewport unless set." },
    { file: "centered", title: "Centered", description: "`centered` for empty states and splash screens." },
  ],
  a11y: [
    "Renders a `<section>` labelled by its `PanelHeader` title, so it shows up as a named region.",
    "The `id` is used by `View`; it is not written to the DOM `id` attribute (it appears as `data-panel`).",
  ],
};
