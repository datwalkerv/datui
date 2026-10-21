import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "RichCell",
  category: "Data display",
  description:
    "Taller row for rich content: large media, title with meta, subtitles, a bottom slot and action buttons below.",
  components: ["RichCell", "RichCellIcon"],
  examples: [
    { file: "basic", title: "Content slots" },
    {
      file: "actions",
      title: "Actions",
      description: "`actions` render outside the row's tappable area, so they never nest inside its button.",
    },
  ],
  a11y: [
    "With `onClick` or `href` the row renders a `<button>` or `<a>`; its name is the title and text lines, separated by spaces.",
    "`actions` sit outside that element, so there are no nested interactive controls and they don't trigger the row.",
    "`RichCellIcon` (`RichCell.Icon`) is decorative and `aria-hidden`.",
  ],
  playground: {
    children: { type: "text", default: "Design review" },
    subtitle: { type: "text", default: "Tomorrow, 10:00" },
    meta: { type: "text", default: "2h" },
    multiline: { type: "boolean" },
    disabled: { type: "boolean" },
    beforeAlign: { type: "select", options: ["start", "center", "end"], default: "start" },
  },
};
