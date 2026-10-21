import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Cell",
  category: "Data display",
  description:
    "A SimpleCell with list-editing modes: selectable (checkbox or radio), removable, and draggable reordering inside `List`.",
  components: ["Cell", "List"],
  examples: [
    {
      file: "selectable",
      title: "Selectable",
      description: "The whole row is a label for a native checkbox or radio.",
    },
    {
      file: "removable",
      title: "Removable",
      description: "A trailing remove button, separate from the row's own action.",
    },
    {
      file: "draggable",
      title: "Draggable",
      description:
        "Drag the handle, or focus it and use Space and the arrow keys. You reorder the data in `onDragFinish`.",
    },
  ],
  a11y: [
    'Inside `List` the container has `role="list"` and every Cell is a `listitem`.',
    '`mode="selectable"` renders a `<label>` around a real `input type=checkbox` (or `radio`), so clicking the row or pressing Space toggles it and the row text is its name.',
    '`mode="removable"` adds a separate button labelled `removeLabel` ("Remove"); it is not nested in the row\'s button and does not trigger `onClick`.',
    'The drag handle is a button labelled `dragHandleLabel` ("Reorder") with `aria-roledescription="sortable"`. Space or Enter lifts, arrow keys move, Space or Enter drops, Escape cancels.',
    "Moves are announced through a live region; `List` accepts `announcements` and `dragInstructions` to localize them.",
    "`disabled` disables the row, the selection input, the remove button and the drag handle.",
  ],
  playground: {
    children: { type: "text", default: "Cell title" },
    subtitle: { type: "text", default: "Subtitle" },
    mode: { type: "select", options: ["selectable", "removable"] },
    selectionType: { type: "select", options: ["checkbox", "radio"], default: "checkbox" },
    chevron: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
