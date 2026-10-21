import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "PanelSpinner",
  category: "Feedback",
  description: "Spinner centered in a full-width block for a loading panel or section.",
  components: ["PanelSpinner"],
  examples: [
    {
      file: "basic",
      title: "Panel loading",
    },
  ],
  a11y: ['The spinner is `role="status"` and announces `label` ("Loading…").'],
  playground: {
    height: {
      type: "number",
      default: 96,
      min: 32,
      max: 300,
    },
    size: {
      type: "select",
      options: ["s", "m", "l", "xl"],
      default: "l",
    },
  },
};
