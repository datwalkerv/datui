import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "View",
  category: "Navigation",
  description: "A stack of Panels with forward/back slide transitions, per-panel scroll restore and touch swipe-back.",
  components: ["View"],
  examples: [
    {
      file: "history",
      title: "History and swipe-back",
      description:
        "Keep a `history` array; push to go forward, pop to go back. With `onSwipeBack`, touch users can drag from the start edge to return to `history.at(-2)`.",
    },
  ],
  a11y: [
    "Only the active panel is rendered; during a transition the outgoing panel is `inert` and `aria-hidden`.",
    "After a transition, focus moves to the incoming panel's `PanelHeader` title (or the panel container) when focus was inside the view, so keyboard and screen-reader users land on the new screen.",
    "Swipe-back is touch-only — always render a visible `PanelHeaderBack` too.",
    "Transitions are skipped when `prefers-reduced-motion` is set or `ConfigProvider transitionMotionEnabled={false}`.",
    "`useNavId()`, `useNavTransition()` and `useNavDirection()` tell descendants which view/panel they are in and whether a transition is running (defer autofocus until `animating` is false).",
    "Add `data-no-swipe-back` to elements (e.g. a horizontal carousel) that should not start the gesture.",
  ],
};
