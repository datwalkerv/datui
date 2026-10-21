import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ChipsInput",
  category: "Forms",
  description: "Free-form tag input: Enter or a delimiter turns typed text into chips.",
  components: ["ChipsInput"],
  examples: [
    { file: "basic", title: "Basic" },
    {
      file: "controlled",
      title: "Controlled with delimiters",
      description: "Split on comma, semicolon or space; add on blur.",
    },
  ],
  a11y: [
    "The text input takes its label from FormItem or `aria-label`; chips are a list named `chipsListLabel`.",
    "Enter adds the typed text, typing or pasting a delimiter splits it into chips, Backspace in the empty input removes the last chip.",
    'Each chip\'s remove button is a labelled native button ("Remove alpha"); removing returns focus to the input.',
    "`disabled` / `readOnly` block adding and removing.",
  ],
  playground: {
    placeholder: { type: "text", default: "Add a tag" },
    allowClearButton: { type: "boolean" },
    addOnBlur: { type: "boolean" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
  },
  playgroundProps: { "aria-label": "Tags" },
};
