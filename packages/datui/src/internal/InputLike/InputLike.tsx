import * as React from "react";
import { cn } from "../../lib/utils";

const FIGURE_SPACE = " ";

export interface InputLikeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Segment length in characters; the unfilled rest is padded with figure spaces. */
  length: number;
  /** Segment position, passed back to `onElementSelect`. */
  index: number;
  value?: string;
  /** Hidden label for screen readers, e.g. "Day". */
  label?: string;
  onElementSelect?: (index: number) => void;
  readOnly?: boolean;
}

/** Focusable fake input showing one fixed-length segment (day, month, hour…). The owner handles keys. */
export const InputLike = React.forwardRef<HTMLSpanElement, InputLikeProps>(function InputLike(
  { length, index, value = "", label, onElementSelect, readOnly, onKeyDown, onFocus, className, ...rest },
  ref,
) {
  const mask = FIGURE_SPACE.repeat(Math.max(0, length - value.length));
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the owning date/time input gives segments their role (e.g. spinbutton).
    <span
      ref={ref}
      tabIndex={readOnly ? -1 : 0}
      data-filled={value.length >= length ? "" : undefined}
      onKeyDown={readOnly ? undefined : onKeyDown}
      onFocus={(e) => {
        onFocus?.(e);
        onElementSelect?.(index);
      }}
      className={cn(
        "rounded-xs tabular-nums whitespace-pre text-muted-foreground outline-none focus:bg-accent focus:text-accent-foreground data-filled:text-foreground",
        className,
      )}
      {...rest}
    >
      {label && <span className="sr-only">{label}</span>}
      {value}
      <span aria-hidden data-mask="">
        {mask}
      </span>
    </span>
  );
});

/** Static separator between InputLike segments. */
export function InputLikeDivider({ className, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span aria-hidden className={cn("text-muted-foreground", className)} {...rest} />;
}
