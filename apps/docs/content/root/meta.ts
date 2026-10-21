import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Root",
  category: "Navigation",
  description:
    "Top-level stack of Views. Shows one at a time and slides between them — a later child counts as forward, an earlier one as back.",
  components: ["Root"],
  examples: [{ file: "basic", title: "Switching views" }],
  a11y: [
    "Only the active view is rendered; the outgoing one is `inert` during the animation and loses focus immediately.",
    "After the transition, focus moves to the incoming view's panel title when focus was inside the root.",
    "Scroll position of a view is saved when leaving and restored when coming back.",
    "Respects reduced motion and `ConfigProvider transitionMotionEnabled`.",
  ],
};
