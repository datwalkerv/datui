import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "ButtonGroup",
  category: "Buttons",
  description: "Lays out related buttons in a row or column with a consistent gap.",
  components: ["ButtonGroup"],
  examples: [
    {
      file: "modes",
      title: "Modes",
    },
  ],
  a11y: [
    'Renders `role="group"`; give it an `aria-label` describing the set.',
    "Each button stays a separate tab stop.",
  ],
  playground: {
    mode: {
      type: "select",
      options: ["horizontal", "vertical"],
      default: "horizontal",
    },
    gap: {
      type: "select",
      options: ["none", "space", "s", "m"],
      default: "m",
    },
    align: {
      type: "select",
      options: ["left", "center", "right"],
      default: "left",
    },
    stretched: {
      type: "boolean",
    },
  },
};
