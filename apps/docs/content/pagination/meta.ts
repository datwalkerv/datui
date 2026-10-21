import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Pagination",
  category: "Navigation",
  description: "Page navigation with previous/next buttons, boundary and sibling pages and ellipses.",
  components: ["Pagination"],
  examples: [
    {
      file: "basic",
      title: "Controlled",
      description:
        "`siblingCount` and `boundaryCount` control how many pages are shown around the current one and at the ends.",
    },
    {
      file: "links",
      title: "Links and captions",
      description: "`renderPageButton`/`renderNavigationButton` render your own elements, e.g. router links.",
    },
  ],
  a11y: [
    'A `<nav>` labelled by a visually hidden heading (`navigationLabel`, default "Pages").',
    'Page buttons are named "Page N" (customize with `getPageLabel`); the current one has `aria-current="page"`.',
    "Previous/next are disabled on the first/last page and named by `prevButtonLabel`/`nextButtonLabel`; visible captions are hidden from assistive tech to avoid double reading.",
    "Ellipses are `aria-hidden`.",
  ],
  playground: {
    totalPages: { type: "number", default: 20, min: 1, max: 100 },
    siblingCount: { type: "number", default: 1, min: 0, max: 3 },
    boundaryCount: { type: "number", default: 1, min: 0, max: 3 },
    navigationButtonsStyle: { type: "select", options: ["icon", "caption", "both"], default: "icon" },
    disabled: { type: "boolean" },
  },
};
