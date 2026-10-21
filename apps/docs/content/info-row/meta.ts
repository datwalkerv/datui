import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "InfoRow",
  category: "Data display",
  description: "Label and value pair.",
  components: ["InfoRow"],
  examples: [
    {
      file: "basic",
      title: "Info rows",
    },
  ],
  a11y: ['A visually hidden ": " separates header and value so screen readers don\'t run them together.'],
  playground: {
    header: {
      type: "text",
      default: "City",
    },
    children: {
      type: "text",
      default: "Lisbon",
    },
  },
};
