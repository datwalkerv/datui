import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "DropZone",
  category: "Forms",
  description: "Drag-and-drop target that highlights while files are dragged over it.",
  components: ["DropZone", "DropZoneGrid"],
  examples: [
    {
      file: "basic",
      title: "Drop or browse",
      description: "With `onFiles` the zone also opens the file dialog on click, Enter or Space.",
    },
  ],
  a11y: [
    'With `onFiles` the zone is `role="button"`, focusable, and Enter/Space/click open the file dialog; give it `aria-label`.',
    "Without `onFiles` it is a pure drop target: pair it with `File` so keyboard users can add files.",
    "Announce results yourself, e.g. with an `aria-live` region.",
  ],
};
