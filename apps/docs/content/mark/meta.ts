import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Mark",
  category: "Typography",
  description: "Highlights a fragment of text, such as a search match.",
  components: ["Mark"],
  examples: [{ file: "basic", title: "Search highlight" }],
  a11y: ["Renders a native `<mark>`, which assistive technologies can announce as highlighted."],
};
