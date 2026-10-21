import { registry } from "@/generated/registry";
import type { Category } from "./types";

export const categoryOrder: Category[] = [
  "Providers & app",
  "Primitives",
  "Layout",
  "Typography",
  "Buttons",
  "Navigation",
  "Forms",
  "Data display",
  "Overlays",
  "Feedback",
];

export const guides = [
  { slug: "installation", title: "Installation" },
  { slug: "theming", title: "Theming" },
  { slug: "customization", title: "Customization" },
  { slug: "contributing", title: "Contributing" },
];

export interface NavItem {
  slug: string;
  title: string;
  description: string;
  category: Category;
}

export const componentPages: NavItem[] = Object.entries(registry)
  .map(([slug, { meta }]) => ({ slug, title: meta.title, description: meta.description, category: meta.category }))
  .sort((a, b) => a.title.localeCompare(b.title));

export const grouped = categoryOrder
  .map((category) => ({ category, items: componentPages.filter((p) => p.category === category) }))
  .filter((g) => g.items.length > 0);
