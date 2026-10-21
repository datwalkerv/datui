import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Epic",
  category: "Navigation",
  description:
    "Tabbed app shell: shows the active story (a View or Root) and a bottom Tabbar. Switching is instant and keeps scroll per story.",
  components: ["Epic"],
  examples: [{ file: "basic", title: "With a tabbar" }],
  a11y: [
    "Story content is rendered inside `<main>`; the `Tabbar` is a labelled `<nav>`.",
    'Mark the current tab with `selected` on `TabbarItem` (sets `aria-current="page"`).',
    "Pressing a tab keeps focus on the tab; scroll position is saved and restored per story.",
  ],
};
