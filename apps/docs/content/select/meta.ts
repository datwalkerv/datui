import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Select",
  category: "Forms",
  description:
    "Adaptive select driven by an `options` array: CustomSelect with a mouse, the platform picker (NativeSelect) on touch devices.",
  components: ["Select"],
  examples: [
    { file: "basic", title: "Options" },
    { file: "forced", title: "Forcing an implementation", description: "`native` overrides pointer detection." },
  ],
  a11y: [
    "With a fine pointer it renders CustomSelect (combobox + listbox); on coarse pointers a native `<select>`.",
    "Both implementations take their label from FormItem or `aria-label` and report `aria-invalid` from `status`.",
    '`onChange` always receives the value as a string (`""` after clearing), whichever implementation renders.',
  ],
  playground: {
    placeholder: { type: "text", default: "Choose…" },
    selectType: { type: "select", options: ["default", "plain", "accent"], default: "default" },
    native: { type: "boolean" },
    disabled: { type: "boolean" },
  },
  playgroundProps: {
    "aria-label": "Size",
    options: [
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
    ],
  },
};
