import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Switch",
  category: "Forms",
  description: "On/off toggle.",
  components: ["Switch"],
  examples: [{ file: "basic", title: "States" }],
  a11y: [
    'Radix Switch: `role="switch"` with `aria-checked`; Space and Enter toggle.',
    "Label it with `<label htmlFor>` or `aria-label`.",
    "`readOnly` sets `aria-readonly` and ignores toggles.",
  ],
  playground: {
    disabled: { type: "boolean" },
    readOnly: { type: "boolean" },
    "aria-label": { type: "text", default: "Notifications" },
  },
};
