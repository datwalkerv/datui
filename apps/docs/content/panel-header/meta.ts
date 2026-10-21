import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "PanelHeader",
  category: "Navigation",
  description: "Top bar of a Panel: a title plus `before`/`after` slots for preset buttons.",
  components: [
    "PanelHeader",
    "PanelHeaderButton",
    "PanelHeaderBack",
    "PanelHeaderClose",
    "PanelHeaderSubmit",
    "PanelHeaderEdit",
    "PanelHeaderContent",
  ],
  examples: [
    { file: "basic", title: "Slots and presets" },
    {
      file: "edit",
      title: "Edit toggle",
      description: "`PanelHeaderEdit` switches icon, label and `aria-pressed` with `isActive`.",
    },
    {
      file: "content",
      title: "Rich title",
      description: "`PanelHeaderContent` adds an avatar, subtitle and aside; with `onClick` it is a button.",
    },
  ],
  a11y: [
    "Renders `<header>` with the title as a heading (`h2` by default, `titleAs` to change). Inside a `Panel` the title labels the panel region.",
    'The title has `tabindex="-1"`; `View`/`Root` move focus to it after navigation.',
    "Preset buttons (`Back`, `Close`, `Submit`, `Edit`) have English accessible names you can localize with `label` props. Icon-only `PanelHeaderButton`s need `aria-label`.",
    "`PanelHeaderBack`'s chevron mirrors in right-to-left layouts.",
    'Title is centered on compact widths and start-aligned from tablet width; `delimiter="auto"` draws a line in plain panels and spacing in card panels.',
  ],
  playground: {
    children: { type: "text", default: "Settings" },
    delimiter: { type: "select", options: ["auto", "none", "separator", "spacing"], default: "auto" },
    transparent: { type: "boolean" },
    titleAs: { type: "select", options: ["h1", "h2", "h3"], default: "h2" },
  },
};
