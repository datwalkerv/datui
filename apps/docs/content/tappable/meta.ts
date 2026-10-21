import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Tappable & Clickable",
  category: "Primitives",
  description:
    "`Clickable` renders the right interactive element for its props; `Tappable` adds hover, press, focus and disabled feedback. Buttons, cells and tabs are built on them.",
  components: ["Tappable", "Clickable"],
  examples: [
    { file: "basic", title: "Feedback modes" },
    {
      file: "custom-element",
      title: "Non-native elements",
      description: 'A `div` with `onClick` gets `role="button"`, a tab stop and Enter/Space activation.',
    },
  ],
  a11y: [
    'With `href` renders `<a>`, with `onClick` renders `<button type="button">`; otherwise a non-interactive `div`.',
    'Non-native elements (`as="div"`) receive `role="button"`, `tabIndex=0` and Enter/Space activation.',
    "`disabled` uses the native attribute on buttons and `aria-disabled` elsewhere; links lose their `href`.",
    "Focus is shown with the shared focus ring on keyboard focus only (`:focus-visible`).",
  ],
};
