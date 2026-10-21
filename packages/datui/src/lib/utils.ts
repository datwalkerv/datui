import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    // datui's type scale; without this `text-title-1` would be treated as a color and dropped next to `text-primary`.
    theme: {
      text: [
        "display-1",
        "display-2",
        "display-3",
        "display-4",
        "title-1",
        "title-2",
        "title-3",
        "headline-1",
        "headline-2",
        "body",
        "paragraph",
        "subhead",
        "footnote",
        "caption-1",
        "caption-2",
        "caption-3",
      ],
    },
  },
});

/** Merge class names, letting later Tailwind utilities win over earlier conflicting ones. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
