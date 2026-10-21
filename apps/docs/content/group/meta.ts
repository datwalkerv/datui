import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Group",
  category: "Layout",
  description: "Content section — card or plain — with header, description and separators between siblings.",
  components: ["Group", "GroupContainer", "GroupHeader", "GroupDescription", "GroupExpandedContent"],
  examples: [
    {
      file: "basic",
      title: "Groups",
    },
  ],
  a11y: [
    "Renders `<section>` labelled by its `header` via `aria-labelledby` (unless you pass `aria-label`).",
    '`role="tabpanel"` gets `tabIndex=0` automatically.',
    "Sibling separators are `aria-hidden`.",
  ],
  playground: {
    mode: {
      type: "select",
      options: ["card", "plain"],
      default: "card",
    },
    padding: {
      type: "select",
      options: ["s", "m"],
      default: "m",
    },
    separator: {
      type: "select",
      options: ["auto", "show", "hide"],
      default: "auto",
    },
  },
};
