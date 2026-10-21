import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "CustomSelect",
  category: "Forms",
  description:
    "Styled select / combobox with a positioned listbox: type-ahead, optional search, async loading, groups, custom options and a clear button.",
  components: ["CustomSelect", "CustomSelectOption", "CustomSelectDropdown"],
  examples: [
    { file: "basic", title: "Basic", description: "Disabled options, groups and a clear button." },
    {
      file: "searchable",
      title: "Searchable",
      description: "`searchable` filters by label; `filterFn` customizes it.",
    },
    {
      file: "async",
      title: "Async options",
      description: "`filterFn={false}` with `onInputChange` and `fetching` for server-side search.",
    },
    { file: "custom-options", title: "Custom options", description: "`renderOption` with descriptions and icons." },
  ],
  a11y: [
    'The field is an `<input role="combobox">` with `aria-expanded`, `aria-controls`, `aria-haspopup="listbox"` and `aria-activedescendant`; focus never leaves it.',
    "Down/Up open the list and move the highlight (disabled options are skipped), Home/End jump to the ends, Enter or Space selects, Escape closes, Tab closes and moves on.",
    "Without `searchable`, typing letters jumps to the matching option; Backspace/Delete open the list.",
    'Options are `role="option"` with `aria-selected` / `aria-disabled`; groups are `role="group"` labelled by their header.',
    "The empty text is announced in a polite status region; `fetching` sets `aria-busy` and shows a labelled spinner.",
    "Clicking outside, blurring or Escape closes the list; Escape does not also close an enclosing dialog.",
    "With `name`, a hidden input submits the value. Pass `aria-label` or wrap in FormItem for the label.",
  ],
  playground: {
    placeholder: { type: "text", default: "Choose a city" },
    searchable: { type: "boolean" },
    allowClearButton: { type: "boolean" },
    fetching: { type: "boolean" },
    selectType: { type: "select", options: ["default", "plain", "accent"], default: "default" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    disabled: { type: "boolean" },
  },
  playgroundProps: {
    "aria-label": "City",
    options: [
      { value: "lis", label: "Lisbon" },
      { value: "ber", label: "Berlin" },
      { value: "par", label: "Paris" },
      { value: "rom", label: "Rome" },
    ],
  },
};
