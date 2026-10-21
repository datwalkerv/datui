import * as React from "react";
import { cn } from "../../lib/utils";

export type UsersStackPhoto = string | { src: string; renderWrapper?: (avatar: React.ReactElement) => React.ReactNode };

export interface UsersStackProps extends React.HTMLAttributes<HTMLDivElement> {
  photos?: UsersStackPhoto[];
  /** Avatar size: s 16px, m 24px, l 32px. @default "s" */
  size?: "s" | "m" | "l";
  /** How many avatars to draw. @default 3 */
  visibleCount?: number;
  /** Number in the "+N" counter. Defaults to the hidden photo count; hidden when 0, above 99 or at size `s`. */
  count?: number;
  /** Where the avatars sit relative to the caption. @default "inline-start" */
  avatarsPosition?: "inline-start" | "block-start" | "inline-end";
}

const avatarSize = { s: "size-4", m: "size-6", l: "size-8" } as const;
const counterSize = { s: "", m: "h-6 min-w-6 text-caption-2", l: "h-8 min-w-8 text-caption-1" } as const;
const positions = {
  "inline-start": "flex-row items-center",
  "inline-end": "flex-row-reverse items-center justify-end",
  "block-start": "flex-col items-start",
} as const;

/**
 * Overlapping avatars with an optional "+N" counter and caption. The avatars are decorative —
 * the caption (children) or an `aria-label` must say who is there.
 */
export const UsersStack = React.forwardRef<HTMLDivElement, UsersStackProps>(function UsersStack(
  { photos = [], size = "s", visibleCount = 3, count, avatarsPosition = "inline-start", className, children, ...rest },
  ref,
) {
  const visible = photos.slice(0, Math.max(0, visibleCount));
  const extra = count ?? photos.length - visible.length;
  const showCounter = size !== "s" && extra > 0 && extra <= 99;
  return (
    <div ref={ref} className={cn("flex gap-2", positions[avatarsPosition], className)} {...rest}>
      {(visible.length > 0 || showCounter) && (
        <span aria-hidden className="flex shrink-0 items-center">
          {visible.map((photo, i) => {
            const src = typeof photo === "string" ? photo : photo.src;
            const avatar = (
              <img
                src={src}
                alt=""
                className={cn("rounded-full bg-muted object-cover ring-2 ring-background", avatarSize[size])}
              />
            );
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: positional tiles; the same URL may repeat
              <span key={`${i}-${src}`} className={cn("inline-flex", i > 0 && "-ms-1")}>
                {typeof photo === "string" || !photo.renderWrapper ? avatar : photo.renderWrapper(avatar)}
              </span>
            );
          })}
          {showCounter && (
            <span
              data-counter=""
              className={cn(
                "-ms-1 inline-flex items-center justify-center rounded-full bg-muted px-1 font-medium text-subtle-foreground ring-2 ring-background",
                counterSize[size],
              )}
            >
              +{extra}
            </span>
          )}
        </span>
      )}
      {children !== undefined && children !== null && (
        <span className="min-w-0 text-footnote text-muted-foreground">{children}</span>
      )}
    </div>
  );
});
