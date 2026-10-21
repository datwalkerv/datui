import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "WriteBar",
  category: "Forms",
  description: "Message composer: an auto-growing textarea with action slots and preset icon buttons.",
  components: ["WriteBar", "WriteBarIcon"],
  examples: [{ file: "basic", title: "Composer", description: "Send on Enter, newline on Shift+Enter." }],
  a11y: [
    "The textarea is native; label it with `aria-label` or a visible label.",
    "`WriteBarIcon` presets have default labels (Attach, Send, Done); the count is included in the name. Custom icons need `label`.",
  ],
  playground: {
    placeholder: { type: "text", default: "Message" },
    shadow: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
