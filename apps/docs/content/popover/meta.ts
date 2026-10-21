import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Popover",
  category: "Overlays",
  description: "Floating panel anchored to a trigger, for arbitrary interactive content.",
  components: ["Popover"],
  examples: [
    { file: "basic", title: "Basic", description: "`content` can be a render function receiving `onClose`." },
    { file: "hover", title: "Hover trigger and arrow" },
  ],
  a11y: [
    'The trigger gets `aria-expanded`, `aria-controls` and `aria-haspopup="dialog"`; the panel is `role="dialog"` by default — give it an `aria-label`.',
    "A click opens it and moves focus into the panel; hover and focus triggers leave focus on the trigger.",
    "Escape and outside clicks close it and return focus to the trigger (see `disableCloseOnEscape` / `disableCloseOnClickOutside`).",
    "`modal` traps focus inside the panel.",
  ],
};
