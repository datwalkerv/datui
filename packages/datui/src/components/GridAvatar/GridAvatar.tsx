import * as React from "react";
import { devWarning } from "../../internal/devWarning/devWarning";
import { cn } from "../../lib/utils";
import { AvatarBadge } from "../Avatar/Avatar";

export interface GridAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 1–4 image URLs; extras are ignored. */
  src: string[];
  /** Accessible name for the whole group, e.g. the chat title. */
  alt: string;
  /** Diameter in px. @default 48 */
  size?: number;
  noBorder?: boolean;
}

// Tile spans per image count, on a 2×2 grid.
const tiles: Record<number, string[]> = {
  1: ["col-span-2 row-span-2"],
  2: ["row-span-2", "row-span-2"],
  3: ["row-span-2", "", ""],
  4: ["", "", "", ""],
};

const GridAvatarRoot = React.forwardRef<HTMLSpanElement, GridAvatarProps>(function GridAvatar(
  { src, alt, size = 48, noBorder, className, style, children, ...rest },
  ref,
) {
  if (src.length > 4) devWarning(`GridAvatar shows at most 4 images; got ${src.length}.`);
  const shown = src.slice(0, 4);
  const layout = tiles[shown.length] ?? [];
  return (
    <span
      ref={ref}
      role="img"
      aria-label={alt}
      className={cn("relative inline-flex shrink-0 align-middle", className)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <span
        aria-hidden
        data-count={shown.length}
        className="grid size-full grid-cols-2 grid-rows-2 gap-px overflow-hidden rounded-full bg-muted"
      >
        {shown.map((url, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: positional tiles; the same URL may repeat
          <img key={`${i}-${url}`} src={url} alt="" className={cn("size-full min-h-0 object-cover", layout[i])} />
        ))}
      </span>
      {!noBorder && (
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full border border-border" />
      )}
      {children}
    </span>
  );
});

/** Round avatar made of up to four images, for group chats and teams. Accepts `GridAvatar.Badge`. */
export const GridAvatar = Object.assign(GridAvatarRoot, { Badge: AvatarBadge });
