import type { DocMeta } from "@/lib/types";

export const meta: DocMeta = {
  title: "Avatar",
  category: "Data display",
  description: "Round image for a person or entity, with initials or icon fallback.",
  components: ["Avatar", "AvatarBadge"],
  examples: [
    {
      file: "fallbacks",
      title: "Images and fallbacks",
    },
  ],
  a11y: [
    'Loaded avatars render `<img alt>`; while loading or after an error the fallback has `role="img"` labelled by `alt`.',
    "Initials and icons inside the fallback are `aria-hidden`.",
    '`Avatar.Badge` is decorative — include status (e.g. "online") in `alt`.',
    "`Avatar.Overlay` with `onClick` is a focusable button and needs `aria-label`; it is revealed on hover and focus.",
  ],
  playground: {
    alt: {
      type: "text",
      default: "Jane Doe",
    },
    initials: {
      type: "text",
      default: "JD",
    },
    size: {
      type: "number",
      default: 48,
      min: 16,
      max: 96,
      step: 4,
    },
    gradientColor: {
      type: "select",
      options: ["red", "orange", "yellow", "green", "light-blue", "violet"],
      default: "violet",
    },
    noBorder: {
      type: "boolean",
    },
  },
};
