import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Image",
  category: "Data display",
  description: "Rounded-rectangle thumbnail with fallback icon, badges, overlay and floating elements.",
  components: ["Image", "ImageBadge", "ImageOverlay", "ImageFloatElement"],
  examples: [
    {
      file: "basic",
      title: "Images, fallback and parts",
    },
  ],
  a11y: [
    'Loaded images render `<img alt>`; the fallback has `role="img"` labelled by `alt` (none when `alt=""`).',
    "`Image.Badge` is decorative; `Image.Overlay` with `onClick` is a button and needs `aria-label`.",
    "The hover overlay also appears on keyboard focus.",
  ],
  playground: {
    alt: {
      type: "text",
      default: "Thumbnail",
    },
    size: {
      type: "number",
      default: 64,
      min: 16,
      max: 128,
    },
    borderRadius: {
      type: "select",
      options: ["s", "m", "l"],
      default: "m",
    },
    noBorder: {
      type: "boolean",
    },
  },
};
