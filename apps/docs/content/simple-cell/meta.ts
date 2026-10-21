import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "SimpleCell",
  category: "Data display",
  description:
    "Base list row with before/after slots, title, subtitles, indicator and chevron. Becomes a button with `onClick` or a link with `href`.",
  components: ["SimpleCell"],
  examples: [
    { file: "slots", title: "Slots", description: "Every slot is optional; text truncates unless `multiline`." },
    {
      file: "navigation",
      title: "Navigation rows",
      description: "`chevron` and `indicator` for settings-style lists.",
    },
  ],
  a11y: [
    'Renders `<button type="button">` with `onClick`, `<a>` with `href`, otherwise a plain `<div>`.',
    "Title, subtitle and indicator are separated by spaces so the accessible name reads naturally.",
    "The chevron is decorative (`aria-hidden`) and mirrors in right-to-left layouts.",
    "Truncated text keeps its full content in the DOM, so screen readers read all of it.",
    "Don't put buttons or links inside an interactive SimpleCell; use `Cell` modes or `RichCell` actions instead.",
  ],
  playground: {
    children: { type: "text", default: "Notifications" },
    subtitle: { type: "text", default: "Sounds, badges" },
    indicator: { type: "text", default: "On" },
    chevron: { type: "boolean", default: true },
    chevronSize: { type: "select", options: ["s", "m"], default: "m" },
    multiline: { type: "boolean" },
    disabled: { type: "boolean" },
  },
};
