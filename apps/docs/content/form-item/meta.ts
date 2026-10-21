import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "FormItem",
  category: "Forms",
  description: "Field wrapper with label, helper or error text, required marker and optional remove action.",
  components: ["FormItem", "FormItemTop", "FormItemTopLabel", "FormItemTopAside"],
  examples: [
    {
      file: "basic",
      title: "Label, hint and error",
      description: "datui controls inside are wired to the label and bottom text automatically.",
    },
    {
      file: "top",
      title: "Custom header",
      description: "Compose `FormItemTop` with a label and an aside such as a counter.",
    },
  ],
  a11y: [
    "A text `top` renders a `<label>` pointing at the control id (generated, or `htmlFor`).",
    '`bottom` is linked through `aria-describedby`; with `status="error"` it gets `role="alert"` and the control gets `aria-invalid`.',
    "`required` sets `required` on the control; the `*` marker is `aria-hidden`.",
    "Custom controls can join the wiring through `useFormItemControl()`.",
  ],
  playground: {
    top: { type: "text", default: "Name" },
    bottom: { type: "text", default: "Helper text" },
    status: { type: "select", options: ["default", "error", "valid"], default: "default" },
    required: { type: "boolean" },
  },
};
