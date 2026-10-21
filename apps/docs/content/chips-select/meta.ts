import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ChipsSelect",
  category: "Forms",
  description: "Multi-select with chips and a filterable dropdown, optionally creatable.",
  components: ["ChipsSelect"],
  examples: [
    { file: "basic", title: "Basic" },
    { file: "creatable", title: "Creatable", description: "Typed text that matches no option can be added." },
  ],
  a11y: [
    'The input is a `role="combobox"` with `aria-autocomplete="list"`, `aria-expanded` and `aria-activedescendant`; the listbox is `aria-multiselectable`.',
    "Down/Up open the list and move the highlight, Enter adds (or removes an already selected option), Escape closes; typing filters.",
    "Chips behave as in ChipsInput: Backspace in the empty input removes the last one, each has a labelled remove button.",
    "The empty text is announced through a polite status region.",
  ],
  playground: {
    placeholder: { type: "text", default: "Pick colors" },
    creatable: { type: "boolean" },
    selectedBehavior: { type: "select", options: ["highlight", "hide"], default: "highlight" },
    closeAfterSelect: { type: "boolean", default: true },
    fetching: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  playgroundProps: {
    "aria-label": "Colors",
    options: [
      { value: "red", label: "Red" },
      { value: "green", label: "Green" },
      { value: "blue", label: "Blue" },
      { value: "black", label: "Black" },
    ],
  },
};
