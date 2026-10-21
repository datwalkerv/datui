import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Search",
  category: "Forms",
  description: "Search field with clear button, trailing icon button, find button and an `after` slot.",
  components: ["Search"],
  examples: [{ file: "basic", title: "Search with cancel" }],
  a11y: [
    'The input is `type="search"` with `enterKeyHint="search"`, named by `placeholder` unless labelled otherwise.',
    'It is not a landmark by default; for the main page search pass `slotProps={{ root: { role: "search" } }}` or wrap it in `<search>`.',
    "Clear button (`clearLabel`) and Esc empty the field through a real change event and keep focus in it.",
    "The icon button needs `iconLabel`. The find button is shown only at compact (desktop) density.",
  ],
  playground: {
    placeholder: { type: "text", default: "Search" },
    hideClearButton: { type: "boolean" },
    disabled: { type: "boolean" },
    noPadding: { type: "boolean" },
  },
};
